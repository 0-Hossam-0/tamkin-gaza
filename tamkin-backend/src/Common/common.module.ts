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

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, JwtModel])],
  providers: [
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    JsonFileService,
  ],
  exports: [
    TypeOrmModule.forFeature([UserModel, JwtModel]),
    ResponseService,
    ClientInfoService,
    TokenService,
    HashingService,
    TranslationService,
    JsonFileService,
  ],
})
export class CommonModule {}
