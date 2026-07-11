import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from 'src/DataBase/Models/post.model';
import { UserModel } from 'src/DataBase/Models/user.model';
import { MinioService } from 'src/Common/Minio/minio.service';
import { IUser } from 'src/Common/Interfaces/User/user.interface';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaginationDto, UpdatePostDto, UploadPostDto } from './Dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly minioService: MinioService,
    private readonly responseService: ResponseService,
  ) { }

  async createPost(file: Express.Multer.File, user: Partial<IUser>, dto: UploadPostDto): Promise<PostModel> {
    if (!file) {
      this.responseService.badRequest({ message: 'posts.errors.file_required' });
    }
    const { fileName, fileUrl } = await this.minioService.uploadFile(file);

    const post = this.postRepository.create({
      fileName,
      fileUrl,
      title_ar: dto.title_ar,
      title_en: dto.title_en,
      title_tr: dto.title_tr,
      title_ur: dto.title_ur,
      content_ar: dto.content_ar,
      content_en: dto.content_en,
      content_tr: dto.content_tr,
      content_ur: dto.content_ur,
      user,
    });

    return this.postRepository.save(post);
  }

  async getAllPosts(query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [data, totalItems] = await this.postRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async getPostById(postId: string): Promise<PostModel> {
    const post = await this.postRepository.findOne({
      where: { uuid: postId },
      relations: ['user'],
    });
    if (!post) {
      this.responseService.notFound({ message: 'posts.errors.not_found' });
    }
    return post!;
  }

  async updatePost(postId: string, dto: UpdatePostDto, user: IUser, file?: Express.Multer.File): Promise<PostModel> {
    const post = await this.postRepository.findOne({ where: { uuid: postId }, relations: ['user'] });

    if (!post) {
      this.responseService.notFound({ message: 'posts.errors.not_found' });
    }

    if (user.role !== UserRoleEnum.SUPER_ADMIN && user.role !== UserRoleEnum.ADMIN) {
      this.responseService.forbidden({ message: 'posts.errors.forbidden' });
    }

    if (file) {
      await this.minioService.deleteFile(post!.fileName);
      const { fileName, fileUrl } = await this.minioService.uploadFile(file);
      post!.fileName = fileName;
      post!.fileUrl = fileUrl;
    }

    if (dto.title_ar !== undefined) post!.title_ar = dto.title_ar;
    if (dto.title_en !== undefined) post!.title_en = dto.title_en;
    if (dto.title_tr !== undefined) post!.title_tr = dto.title_tr;
    if (dto.title_ur !== undefined) post!.title_ur = dto.title_ur;

    if (dto.content_ar !== undefined) post!.content_ar = dto.content_ar;
    if (dto.content_en !== undefined) post!.content_en = dto.content_en;
    if (dto.content_tr !== undefined) post!.content_tr = dto.content_tr;
    if (dto.content_ur !== undefined) post!.content_ur = dto.content_ur;

    return this.postRepository.save(post!);
  }

  async deletePost(postId: string, user: IUser): Promise<void> {
    const post = await this.postRepository.findOne({ where: { uuid: postId }, relations: ['user'] });

    if (!post) {
      this.responseService.notFound({ message: 'posts.errors.not_found' });
      return;
    }

    if (user.role !== UserRoleEnum.SUPER_ADMIN && user.role !== UserRoleEnum.ADMIN) {
      this.responseService.forbidden({ message: 'posts.errors.forbidden' });
      return;
    }

    await this.minioService.deleteFile(post.fileName);
    await this.postRepository.remove(post);
  }
}
