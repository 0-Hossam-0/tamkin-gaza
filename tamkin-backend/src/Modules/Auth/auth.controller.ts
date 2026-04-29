import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto, LoginDto, RegisterDto } from './Dto/register.dto';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import type { IRequest } from 'src/Common/Types/request.types';
import { AuthenticationGuard } from 'src/Common/Guards/authentication/authentication.guard';
import { ConfirmEmailDto } from './Dto/confirm.email.dto';

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
  ) { }

  @Post('google')
  async loginWithGoogle(
    @Req() req: IRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() body: GoogleLoginDto,
  ) {
    const { user, status } = await this.authService.loginWithGoogle(
      req,
      res,
      body,
    );
    const userLang = req.userLanguage;

    return this.responseService.success({
      message:
        status === 'register'
          ? 'auth:success.registered_successfully'
          : 'auth:success.logged_successfully',
      info: 'auth:success.credentials_saved_in_cookies_successfully',
      data: {
        user,
        status,
      },
    });
  }

  @Post('register')
  async register(
    @Req() req: IRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterDto,
  ) {
    const { user } = await this.authService.register(req, res, body);

    const userLang = req.userLanguage;
    return this.responseService.success({
      message: 'auth:success.registered_successfully',
      info: 'auth:success.credentials_saved_in_cookies_successfully',
      data: {
        user,
      },
    });
  }

  @Post('login')
  async login(
    @Req() req: IRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const { user } = await this.authService.login(req, res, body);

    const userLang = req.userLanguage;
    return this.responseService.success({
      message: 'auth:success.logged_successfully',
      info: 'auth:success.credentials_saved_in_cookies_successfully',
      data: {
        user,
      },
    });
  }

  @Post('logout')
  async logout(@Req() req: IRequest, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req as unknown as Request, res);

    const userLang = req.userLanguage;
    return this.responseService.success({
      message: 'auth:success.logged_out_successfully',
    });
  }


  @UseGuards(AuthenticationGuard)
  @Post('request-confirm-email')
  async requestConfirmEmail(
    @Req() req: IRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.requestConfirmEmail(req, res);

    return this.responseService.success({
      message: 'auth:success.request_confirm_email',
      info: 'auth:success.otp_sent_to_your_email_please_check_your_email_and_confirm_your_email',
    });
  }

   @UseGuards(AuthenticationGuard)
   @Post('confirm-email')
   async confirmEmail(
     @Req() req: IRequest,
     @Body() body: ConfirmEmailDto,
   ) {
       await this.authService.confirmEmail(req, body);
 
       return this.responseService.success({
         message: 'auth:success.email_verified_successfully',
         info: 'auth:success.email_verified_successfully_info',
       });
     } 





}