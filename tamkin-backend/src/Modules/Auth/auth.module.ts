import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleAuthService } from './Google-Auth/google.auth';
import { CommonModule } from '../../Common/common.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService],
  exports: [GoogleAuthService],
})
export class AuthModule {}
