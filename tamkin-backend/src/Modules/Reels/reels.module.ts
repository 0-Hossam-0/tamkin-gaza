import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';
import { ReelModel } from 'src/DataBase/Models/reel.model';
import { MinioModule } from './Minio/minio.module';
import { UserModel } from 'src/DataBase/Models/user.model'; // Just in case user verification is needed
import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReelModel, UserModel]),
    MinioModule,
    CommonModule,
  ],
  controllers: [ReelsController],
  providers: [ReelsService],
  exports: [ReelsService],
})
export class ReelsModule { }
