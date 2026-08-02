import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as crypto from 'crypto';
import { ResponseService } from 'src/Common/Services/Response/response.service';

@Injectable()
export class MinioService implements OnModuleInit {
  private baseMinioClient: Minio.Client;
  private readonly logger = new Logger(MinioService.name);
  private readonly bucketName: string;
  private readonly minioEnabled: boolean;
  private readonly endPoint: string;
  private readonly port: number;
  private readonly useSSL: boolean;

  constructor(
    private configService: ConfigService,
    private readonly responseService: ResponseService,
  ) {
    this.endPoint = this.configService.get<string>('MINIO_ENDPOINT', 'localhost') ?? 'localhost';
    this.port = parseInt(this.configService.get<string>('MINIO_PORT', '9000'), 10) || 9000;
    this.useSSL = this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true';
    const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY', 'root') ?? 'root';
    const secretKey = this.configService.get<string>('MINIO_SECRET_KEY', 'password123') ?? 'password123';
    this.bucketName = this.configService.get<string>('MINIO_BUCKET', 'uploads') ?? 'uploads';
    this.minioEnabled = this.configService.get<string>('MINIO_ENABLED', 'true') !== 'false';

    this.baseMinioClient = new Minio.Client({
      endPoint: this.endPoint,
      port: this.port,
      useSSL: this.useSSL,
      accessKey,
      secretKey,
    });
  }

  get client(): Minio.Client {
    return this.baseMinioClient;
  }

  private async ensureStorageAvailable(): Promise<void> {
    if (!this.minioEnabled) {
      throw new InternalServerErrorException('MinIO storage is disabled by configuration.');
    }

    try {
      await this.client.listBuckets();
    } catch (error) {
      this.logger.warn(
        `MinIO storage is unavailable at ${this.endPoint}:${this.port}. Uploads and bucket initialization will be skipped.`,
        error,
      );
      throw new InternalServerErrorException(
        'MinIO storage is currently unavailable. Please start the storage service or disable file uploads.',
      );
    }
  }

  async onModuleInit() {
    if (!this.minioEnabled) {
      this.logger.warn('MinIO initialization skipped because MINIO_ENABLED=false.');
      return;
    }

    try {
      await this.ensureStorageAvailable();
      const exists = await this.client.bucketExists(this.bucketName);
      if (!exists) {
        await this.client.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Bucket "${this.bucketName}" created successfully.`);

        // Set policy to make the bucket public for reading
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetBucketLocation', 's3:ListBucket', 's3:ListBucketMultipartUploads'],
              Resource: [`arn:aws:s3:::${this.bucketName}`],
            },
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: [
                's3:GetObject',
                's3:PutObject',
                's3:DeleteObject',
                's3:ListMultipartUploadParts',
                's3:AbortMultipartUpload',
              ],
              Resource: [`arn:aws:s3:::${this.bucketName}/*`],
            },
          ],
        };
        await this.client.setBucketPolicy(this.bucketName, JSON.stringify(policy));
        this.logger.log(`Bucket policy set to public read for "${this.bucketName}".`);
      } else {
        this.logger.log(`Bucket "${this.bucketName}" already exists.`);
      }
    } catch (err) {
      this.logger.error(
        `Failed to initialize MinIO bucket "${this.bucketName}". Bucket will be created on first upload.`,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ fileName: string; fileUrl: string }> {
    if (!file) {
      this.responseService.badRequest({ message: 'reels.errors.invalid_file_type' });
    }

    await this.ensureStorageAvailable();

    // Ensure bucket exists before uploading
    const bucketExists = await this.client.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.client.makeBucket(this.bucketName, 'us-east-1');
      this.logger.log(`Bucket "${this.bucketName}" was created during upload.`);
    }

    const ext = file.originalname.split('.').pop();
    const uniqueName = `${crypto.randomUUID()}.${ext}`;

    await this.client.putObject(
      this.bucketName,
      uniqueName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
        'Content-Disposition': `inline; filename="${uniqueName}"`,
      },
    );

    // Generate presigned URL valid for 7 days (604800 seconds)
    const fileUrl = await this.client.presignedGetObject(
      this.bucketName,
      uniqueName,
      604800, // 7 days
    );

    return { fileName: uniqueName, fileUrl };
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.client.removeObject(this.bucketName, fileName);
    } catch (error) {
      this.logger.error(`Failed to delete object "${fileName}" from Minio: `, error);
      throw error;
    }
  }
}
