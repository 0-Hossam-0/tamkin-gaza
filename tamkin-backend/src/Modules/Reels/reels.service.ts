import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReelModel } from 'src/DataBase/Models/reel.model';
import { UserModel } from 'src/DataBase/Models/user.model';
import { MinioService } from './Minio/minio.service';
import { IUser } from 'src/Common/Interfaces/User/user.interface';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaginationDto, SearchReelsDto, UpdateReelDto, UploadReelDto } from './Dto/reels.dto';

@Injectable()
export class ReelsService {
  constructor(
    @InjectRepository(ReelModel)
    private readonly reelRepository: Repository<ReelModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly minioService: MinioService,
    private readonly responseService: ResponseService,
  ) { }

  async uploadReel(file: Express.Multer.File, user: Partial<IUser>, dto: UploadReelDto): Promise<ReelModel> {
    const { fileName, fileUrl } = await this.minioService.uploadFile(file);

    const reel = this.reelRepository.create({
      fileName,
      fileUrl,
      title: dto.title,
      content: dto.content,
      user,
    });

    return this.reelRepository.save(reel);
  }

  async getAllReels(query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [data, totalItems] = await this.reelRepository.findAndCount({
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

  async getReelById(reelId: string): Promise<ReelModel> {
    const reel = await this.reelRepository.findOne({
      where: { uuid: reelId },
      relations: ['user'],
    });
    if (!reel) {
      this.responseService.notFound({ message: 'reels:errors.not_found' });
    }
    return reel!;
  }

  async getReelsByUserId(userId: string, query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [data, totalItems] = await this.reelRepository.findAndCount({
      where: { user: { uuid: userId } },
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

  async updateReel(reelId: string, dto: UpdateReelDto, user: IUser): Promise<ReelModel> {


    const reel = await this.reelRepository.findOne({ where: { uuid: reelId }, relations: ['user'] });

    if (!reel) {
      this.responseService.notFound({ message: 'reels:errors.not_found' });
    }

    if (reel!.user?.uuid !== user.uuid && user.role !== UserRoleEnum.SUPER_ADMIN && user.role !== UserRoleEnum.ADMIN) {
      this.responseService.forbidden({ message: 'reels:errors.forbidden' });
    }

    if (dto.title !== undefined) reel!.title = dto.title;
    if (dto.content !== undefined) reel!.content = dto.content;

    return this.reelRepository.save(reel!);
  }

  async searchReels(query: SearchReelsDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const { uploadedBy, title, content } = query;

    const queryBuilder = this.reelRepository.createQueryBuilder('reel')
      .leftJoinAndSelect('reel.user', 'user')
      .orderBy('reel.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (uploadedBy) {
      queryBuilder.andWhere('CONCAT("user"."firstName", \' \', "user"."lastName") ILIKE :uploadedBy', { uploadedBy: `%${uploadedBy}%` });
    }
    if (title) {
      queryBuilder.andWhere('reel.title ILIKE :title', { title: `%${title}%` });
    }
    if (content) {
      queryBuilder.andWhere('reel.content ILIKE :content', { content: `%${content}%` });
    }

    const [data, totalItems] = await queryBuilder.getManyAndCount();

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

  async deleteReel(reelId: string, user: IUser): Promise<void> {

    const reel = await this.reelRepository.findOne({ where: { uuid: reelId }, relations: ['user'] });

    if (!reel) {
      this.responseService.notFound({ message: 'reels:errors.not_found' });
      return;
    }

    if (reel.user?.uuid !== user.uuid && user.role !== UserRoleEnum.SUPER_ADMIN && user.role !== UserRoleEnum.ADMIN) {
      this.responseService.forbidden({ message: 'reels:errors.forbidden' });
      return;
    }

    await this.minioService.deleteFile(reel.fileName);
    await this.reelRepository.remove(reel);
  }


}