import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/DataBase/Models/user.model';
import { JwtModel } from 'src/DataBase/Models/jwt.model';
import { ClientInfoService } from './Services/Security/client-info.service';
import { ResponseService } from './Services/Response/response.service';
import { TokenService } from './Services/Security/token.service';
import { HashingService } from './Services/Security/Hash/hash.service';
import { TranslationService } from './Services/Translation/translation.service';
import { JsonFileService } from './Services/Json/json-file.service';
import { EmailService } from './Services/Email/email.service';
import { OTPService } from './Services/Otp/otp.service';
import { OtpModel } from 'src/DataBase/Models/otp.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel])],
  providers: [
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    JsonFileService,
    EmailService,
    OTPService,
  ],
  exports: [
    TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel]),
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    JsonFileService,
    EmailService,
    OTPService,
  ],
})
export class CommonModule {}
