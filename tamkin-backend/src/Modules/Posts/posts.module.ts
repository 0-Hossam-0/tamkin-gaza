import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostModel } from 'src/DataBase/Models/post.model';
import { UserModel } from 'src/DataBase/Models/user.model';
import { MinioModule } from 'src/Common/Minio/minio.module';

import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostModel, UserModel]),
    MinioModule,
    CommonModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
