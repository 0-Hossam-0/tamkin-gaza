import { Injectable } from '@nestjs/common';
import { GoogleLoginDto, LoginDto, RegisterDto } from './Dto/register.dto';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { GoogleAuthService } from './Google-Auth/google.auth';
import { UserService } from 'src/Modules/User/user.service';
import { Request, Response } from 'express';
import { TokenTypeEnum } from 'src/Common/Enums/token.enum';
import { CookiesService } from 'src/Common/Services/Cookies/cookies.service';
import { UserProviderEnum } from 'src/Common/Enums/User/user.enum';
import countries from 'i18n-iso-countries';
import { TokenService } from 'src/Common/Services/Security/token.service';
import { ClientInfoService } from 'src/Common/Services/Security/client-info.service';
import { HashingService } from 'src/Common/Services/Security/Hash/hash.service';
import { IRequest } from 'src/Common/Types/request.types';
import { OTPTypeEnum } from 'src/Common/Enums/Otp/otp.enum';
import { OTPService } from 'src/Common/Services/Otp/otp.service';
import { ConfirmEmailDto } from './Dto/confirm.email.dto';
import { CreateUserDto } from 'src/Modules/User/Dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly googleAuth: GoogleAuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly clientInfoService: ClientInfoService,
    private readonly cookiesService: CookiesService,
    private readonly hashingService: HashingService,
    private readonly otpService: OTPService
  ) { }

  async loginWithGoogle(req: IRequest, res: Response, body: GoogleLoginDto) {
    const { email, picture, given_name, family_name } = await this.googleAuth.verifyGmailAccount(
      body.id_token,
      req,
    );

    if (!email) {
      throw this.responseService.badRequest({
        message: 'auth.errors.invalid_google_token',
        info: 'auth.errors.could_not_retrieve_email_from_google',
      });
    }

    let user = await this.userService.findByEmail(email);

    let status: 'login' | 'register' = 'login';

    if (!user) {
      status = 'register';

      if (!given_name || !family_name) {
        throw this.responseService.badRequest({
          message: 'auth.errors.invalid_google_token',
          info: 'auth.errors.could_not_retrieve_name_from_google',
        });
      }

      const createUserDto: CreateUserDto = {
        email,
        firstName: given_name,
        lastName: family_name,
        picture,
        provider: UserProviderEnum.GOOGLE,
      };

      const newUser = await this.userService.create(createUserDto);

      if (!newUser) {
        throw this.responseService.serverError({
          message: 'auth.errors.fail_to_create_user',
          info: 'auth.errors.something_went_wrong_please_try_again',
        });
      }

      user = newUser;
    }

    const tokens = await this.tokenService.createLoginCredentials(user.uuid, user.role);

    const session = this.clientInfoService.getUserSessionContext(req);

    Promise.all([
      this.tokenService.saveJwt(
        user.uuid,
        tokens.access_token.jti,
        tokens.access_token.token,
        TokenTypeEnum.ACCESS,
        session,
      ),

      this.tokenService.saveJwt(
        user.uuid,
        tokens.refresh_token.jti,
        tokens.refresh_token.token,
        TokenTypeEnum.REFRESH,
        session,
      ),
    ]);

    this.cookiesService.setTokenToCookies(res, tokens.access_token.token, TokenTypeEnum.ACCESS);
    this.cookiesService.setTokenToCookies(res, tokens.refresh_token.token, TokenTypeEnum.REFRESH);

    return {
      user,
      status,
    };
  }

  async register(req: IRequest, res: Response, body: RegisterDto) {
    let user = await this.userService.findByEmail(body.email);

    if (user) {
      throw this.responseService.badRequest({
        message: 'auth.errors.email_already_exists',
        info: 'auth.errors.this_account_is_already_registered_please_login',
      });
    }

    if (body.password !== body.confirmPassword) {
      throw this.responseService.badRequest({
        message: 'validation.user.passwords_not_match',
      });
    }

    const createUserDto: CreateUserDto = {
      email: body.email,
      password: await this.hashingService.generateHash({ text: body.password }),
      firstName: body.fullName.split(' ')[0],
      lastName: body.fullName.split(' ')[1],
      nationality: countries.getName(body.nationality, 'en'),
      provider: UserProviderEnum.SYSTEM,
    };

    const newUser = await this.userService.create(createUserDto);

    if (!newUser) {
      throw this.responseService.serverError({
        message: 'auth.errors.fail_to_create_user',
        info: 'auth.errors.something_went_wrong_please_try_again',
      });
    }

    const tokens = await this.tokenService.createLoginCredentials(newUser.uuid, newUser.role);

    const session = this.clientInfoService.getUserSessionContext(req);

    Promise.all([
      this.tokenService.saveJwt(
        newUser.uuid,
        tokens.access_token.jti,
        tokens.access_token.token,
        TokenTypeEnum.ACCESS,
        session,
      ),

      this.tokenService.saveJwt(
        newUser.uuid,
        tokens.refresh_token.jti,
        tokens.refresh_token.token,
        TokenTypeEnum.REFRESH,
        session,
      ),
    ]);

    this.cookiesService.setTokenToCookies(res, tokens.access_token.token, TokenTypeEnum.ACCESS);
    this.cookiesService.setTokenToCookies(res, tokens.refresh_token.token, TokenTypeEnum.REFRESH);

    return {
      user: newUser,
    };
  }

  async login(req: IRequest, res: Response, body: LoginDto) {
    let user = await this.userService.findByEmail(body.email);

    if (!user || !user.password) {
      throw this.responseService.badRequest({
        message: 'auth.errors.invalid_credentials',
        info: 'auth.errors.invalid_credentials_info',
      });
    }

    if (!(await this.hashingService.compareHash({ plainText: body.password, hashText: user.password }))) {
      throw this.responseService.badRequest({
        message: 'auth.errors.invalid_credentials',
        info: 'auth.errors.invalid_credentials_info',
      });
    }

    const tokens = await this.tokenService.createLoginCredentials(user.uuid, user.role);

    const session = this.clientInfoService.getUserSessionContext(req);

    Promise.all([
      this.tokenService.saveJwt(
        user.uuid,
        tokens.access_token.jti,
        tokens.access_token.token,
        TokenTypeEnum.ACCESS,
        session,
      ),

      this.tokenService.saveJwt(
        user.uuid,
        tokens.refresh_token.jti,
        tokens.refresh_token.token,
        TokenTypeEnum.REFRESH,
        session,
      ),
    ]);

    this.cookiesService.setTokenToCookies(res, tokens.access_token.token, TokenTypeEnum.ACCESS);
    this.cookiesService.setTokenToCookies(res, tokens.refresh_token.token, TokenTypeEnum.REFRESH);

    return {
      user,
    };
  }

  async logout(req: Request, res: Response) {
    const access_token = req.cookies['access_token'];
    const refresh_token = req.cookies['refresh_token'];

    await this.tokenService.revokeSessionTokens(access_token, refresh_token);

    this.cookiesService.removeTokenFromCookies(res, TokenTypeEnum.ACCESS);
    this.cookiesService.removeTokenFromCookies(res, TokenTypeEnum.REFRESH);
  }

  async requestConfirmEmail(req: IRequest, res: Response) {

    if (req.user?.emailVerified) {
      throw this.responseService.badRequest({
        message: 'auth.errors.email_already_verified',
        info: 'auth.errors.email_already_verified_info'
      });
    }

    const result = await this.otpService.sendOTP({
      userId: req.user!._id,
      email: req.user!.email,
      userName: req.user!.firstName,
      type: OTPTypeEnum.CONFIRM_EMAIL,

    });

    if (!result) {
      throw this.responseService.badRequest({
        message: 'auth.errors.fail_to_send_otp',
        info: 'auth.errors.fail_to_send_otp_info'
      });
    }

  }

  async confirmEmail(req: IRequest, body: ConfirmEmailDto) {

    if (req.user?.emailVerified) {
      throw this.responseService.badRequest({
        message: 'email.errors.email_already_verified',
        info: 'email.errors.email_already_verified_info'
      });
    }

    const result = await this.otpService.verifyOTP({
      userId: req.user!._id,
      code: body.code,
      type: OTPTypeEnum.CONFIRM_EMAIL,
    });

    if (!result) {
      throw this.responseService.badRequest({
        message: 'email.errors.otp_invalid',
        info: 'email.errors.otp_invalid_info'
      });
    }

    await this.userService.updateById(req.user!._id, { emailVerified: true });

  }

}