import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as crypto from 'crypto';
import { ResponseService } from 'src/Common/Services/Response/response.service';

@Injectable()
export class MinioService implements OnModuleInit {
  private baseMinioClient: Minio.Client;
  private readonly logger = new Logger(MinioService.name);
  private readonly bucketName: string;

  constructor(
    private configService: ConfigService,
    private readonly responseService :ResponseService

  ) {
    const endPoint = this.configService.get<string>('MINIO_ENDPOINT', 'localhost');
    const port = parseInt(this.configService.get<string>('MINIO_PORT', '9000'), 10);
    const useSSL = this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true';
    const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY', 'root');
    const secretKey = this.configService.get<string>('MINIO_SECRET_KEY', 'password123');
    this.bucketName = this.configService.get<string>('MINIO_BUCKET', 'reels');

    this.baseMinioClient = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey,
    });
  }

  get client(): Minio.Client {
    return this.baseMinioClient;
  }

  async onModuleInit() {
    try {
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
      this.logger.error(`Error initializing bucket "${this.bucketName}": `, err);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ fileName: string; fileUrl: string }> {


    if (!file) {
      this.responseService.badRequest({ message: 'reels:errors.invalid_file_type' });
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
        'Content-Disposition': `inline; filename="${uniqueName}"`
      },
    );

    // If bucket is public, we can just return the raw path, or we can use the server domain
    // Assuming MINIO is accessible publically by the same endPoint + port
    const endPoint = this.configService.get<string>('MINIO_ENDPOINT', 'localhost');
    const port = this.configService.get<string>('MINIO_PORT', '9000');
    const useSSL = this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true';
    const protocol = useSSL ? 'https' : 'http';

    const fileUrl = `${protocol}://${endPoint}:${port}/${this.bucketName}/${uniqueName}`;
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
