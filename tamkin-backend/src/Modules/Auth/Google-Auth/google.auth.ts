import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ErrorResponse } from 'src/Common/Utils/Response/error.response';
import { Request } from 'express';
import { AR_GOOGLE_SIGN_IN_FAILED } from '../Messages/Error/ar.error.messages';
import { EN_GOOGLE_SIGN_IN_FAILED } from '../Messages/Error/en.error.messages';
import { TU_GOOGLE_SIGN_IN_FAILED } from '../Messages/Error/tu.error.messages';
import { URDU_GOOGLE_SIGN_IN_FAILED } from '../Messages/Error/ur.error.messages';
import { GOOGLE_SIGN_IN_FAILED } from '../Messages/Error/interfaces';
import { handleLanguage } from 'src/Common/Utils/Lang/handle-language';

@Injectable()
export class GoogleAuth {
  constructor(
    private readonly ErrorResponse: ErrorResponse
  ) { }

  verifyGmailAccount = async (
    id_token: string,
    req: Request,
  ): Promise<TokenPayload> => {

    const errorMessages = handleLanguage(req.headers['accept-language'] as string, {
      ar: AR_GOOGLE_SIGN_IN_FAILED,
      en: EN_GOOGLE_SIGN_IN_FAILED,
      tu: TU_GOOGLE_SIGN_IN_FAILED,
      au: URDU_GOOGLE_SIGN_IN_FAILED
    }) as GOOGLE_SIGN_IN_FAILED;

    
    try {

      const client = new OAuth2Client();

      let ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.WEB_CLIENT_ID as string,
      });

      const payload = ticket.getPayload();

      if (!payload?.email_verified) {
        throw this.ErrorResponse.badRequest({
          message: errorMessages.MAIN_MESSAGE,
        });
      }

      return payload;


    } catch (error) {


      if (error.message.startsWith("Invalid argument: id_token")) {
        throw this.ErrorResponse.badRequest({
          message: errorMessages.MAIN_MESSAGE,
          info: errorMessages.INVALID_ARGUMENT.INFO
        });
      }

      else if (error.message.startsWith("Token used too late")) {
        throw this.ErrorResponse.badRequest({
          message: errorMessages.MAIN_MESSAGE,
          info: errorMessages.TOKEN_USED_TOO_LATE.INFO
        });
      }

      else {
        throw this.ErrorResponse.badRequest({
          message: errorMessages.MAIN_MESSAGE,
          info: errorMessages.FAIL_TO_VERIFY_TOKEN.INFO
        });
      }
    }
  };

}