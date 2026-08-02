import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';
import { ReelModel } from 'src/DataBase/Models/reel.model';
import { CommonModule } from 'src/Common/common.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReelModel]),
    CommonModule,
    UserModule,
  ],
  controllers: [ReelsController],
  providers: [ReelsService],
  exports: [ReelsService],
})
export class ReelsModule { }
