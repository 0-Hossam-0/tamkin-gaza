import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/DataBase/Models/user.model';
import { JwtModel } from 'src/DataBase/Models/jwt.model';
import { ClientInfoService } from './Services/Security/client-info.service';
import { ResponseService } from './Services/Response/response.service';
import { CookiesService } from './Services/Cookies/cookies.service';
import { TokenService } from './Services/Security/token.service';
import { HashingService } from './Services/Security/Hash/hash.service';
import { TranslationService } from './Services/Translation/translation.service';
import { EmailService } from './Services/Email/email.service';
import { OTPService } from './Services/Otp/otp.service';
import { OtpModel } from 'src/DataBase/Models/otp.model';
import { MailModel } from 'src/DataBase/Models/mail.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel, MailModel])],
  providers: [
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    EmailService,
    OTPService,
    CookiesService,
  ],
  exports: [
    TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel]),
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    EmailService,
    OTPService,
    CookiesService,
  ],
})
export class CommonModule {}
