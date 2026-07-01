import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/DataBase/Models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
