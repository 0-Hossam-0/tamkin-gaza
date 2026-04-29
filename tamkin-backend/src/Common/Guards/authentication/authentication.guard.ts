import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenTypeEnum } from 'src/Common/Enums/token.enum';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { TokenService } from 'src/Common/Services/Security/token.service';
import { IRequest } from 'src/Common/Types/request.types';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly responseService: ResponseService,
    private readonly translationService: TranslationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: any | IRequest = context.switchToHttp().getRequest();

    let authorization: string = '';

    switch (context.getType()) {
      /*       case "ws":
              break;
       */
      default:
        req = context.switchToHttp().getRequest();
        break;
    }

    authorization = req.cookies['access_token'];

    if (!authorization || authorization === '') {
      const userLang = req.userLanguage;
      throw this.responseService.forbidden({
        message: this.translationService.translate(
          'token:errors.you_are_not_authorized_to_access_this_resource',
          userLang,
        ),
        info: this.translationService.translate(
          'token:errors.authorization_header_missing',
          userLang,
        ),
      });
    }

    const { user, decoded } = await this.tokenService.decodeToken(
      authorization,
      TokenTypeEnum.ACCESS,
    );

    req.user = user;
    req.decoded = decoded;

    return true;
  }
}
