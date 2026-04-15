import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { Request } from 'express';
import { ILanguageRequest } from 'src/Common/Interfaces/Language/language-request.interface';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly translationService: TranslationService,
  ) {}

  verifyGmailAccount = async (
    id_token: string,
    req: Request,
  ): Promise<TokenPayload> => {
    try {
      const client = new OAuth2Client();

      let ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.WEB_CLIENT_ID as string,
      });

      const payload = ticket.getPayload();

      if (!payload?.email_verified) {
        const userLang = (req as ILanguageRequest).userLanguage;
        throw this.responseService.badRequest({
          message: this.translationService.translate(
            'auth:errors.failToVerifyThisToken',
            userLang,
          ),
          info: this.translationService.translate(
            'auth:errors.failToVerifyThisAccount',
            userLang,
          ),
        });
      }

      return payload;
    } catch (error: any) {
      const userLang = (req as ILanguageRequest).userLanguage;
      if (error.message.startsWith('Invalid argument: id_token')) {
        throw this.responseService.badRequest({
          message: this.translationService.translate(
            'auth:errors.failToVerifyThisToken',
            userLang,
          ),
          info: 'Invalid argument: id_token',
        });
      } else if (error.message.startsWith('Token used too late')) {
        throw this.responseService.badRequest({
          message: this.translationService.translate(
            'auth:errors.failToVerifyThisToken',
            userLang,
          ),
          info: this.translationService.translate(
            'auth:errors.tokenUsedTooLate',
            userLang,
          ),
        });
      } else {
        throw this.responseService.badRequest({
          message: this.translationService.translate(
            'auth:errors.failToVerifyThisToken',
            userLang,
          ),
        });
      }
    }
  };
}
