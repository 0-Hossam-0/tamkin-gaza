import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "src/DataBase/Models/user.model";
import { JwtModel } from "src/DataBase/Models/jwt.model";
import { OTPService } from "../Utils/Otp/otp.service";
import { OtpModel } from "src/DataBase/Models/otp.model";
import { EmailService } from "../Utils/Email/email.service";
import { ResponseService } from "../Services/Response/response.service";
import { ClientInfoService } from "../Services/Security/client-info.service";
import { TokenService } from "../Services/Security/token.service";
import { CookiesService } from "../Services/Cookies/cookies.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel])
    ],
    providers: [
        ResponseService,
        ClientInfoService,
        TokenService,
        EmailService,
        OTPService,
        CookiesService
    ],
    exports: [
        TypeOrmModule.forFeature([UserModel, JwtModel, OtpModel]),
        ResponseService,
        ClientInfoService,
        TokenService,
        EmailService,
        OTPService,
        CookiesService
    ],
})
export class CommonModule { }
