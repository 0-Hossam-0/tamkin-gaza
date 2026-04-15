import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto, LoginDto, RegisterDto } from './Dto/register.dto';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { ILanguageRequest } from 'src/Common/Interfaces/Language/language-request.interface';

@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
    private readonly translationService: TranslationService,
  ) {}

  @Post('google')
  async loginWithGoogle(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: GoogleLoginDto,
  ) {
    const { user, status } = await this.authService.loginWithGoogle(
      req,
      res,
      body,
    );
    const userLang = (req as ILanguageRequest).userLanguage;
    return this.responseService.success({
      message:
        status === 'register'
          ? this.translationService.translate(
              'auth:success.registeredSuccessfully',
              userLang,
            )
          : this.translationService.translate(
              'auth:success.loggedSuccessfully',
              userLang,
            ),
      info: this.translationService.translate(
        'auth:success.credentialsSavedInCookiesSuccessfully',
        userLang,
      ),
      data: {
        user,
        status,
      },
    });
  }

  @Post('register')
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterDto,
  ) {
    const { user } = await this.authService.register(req, res, body);

    const userLang = (req as ILanguageRequest).userLanguage;
    return this.responseService.success({
      message: this.translationService.translate(
        'auth:success.registeredSuccessfully',
        userLang,
      ),
      info: this.translationService.translate(
        'auth:success.credentialsSavedInCookiesSuccessfully',
        userLang,
      ),
      data: {
        user,
      },
    });
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const { user } = await this.authService.login(req, res, body);

    const userLang = (req as ILanguageRequest).userLanguage;
    return this.responseService.success({
      message: this.translationService.translate(
        'auth:success.loggedSuccessfully',
        userLang,
      ),
      info: this.translationService.translate(
        'auth:success.credentialsSavedInCookiesSuccessfully',
        userLang,
      ),
      data: {
        user,
      },
    });
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req, res);

    const userLang = (req as ILanguageRequest).userLanguage;
    return this.responseService.success({
      message: this.translationService.translate(
        'auth:success.loggedOutSuccessfully',
        userLang,
      ),
    });
  }
}
