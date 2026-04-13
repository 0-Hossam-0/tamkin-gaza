import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { E_TokenType } from 'src/Common/Enums/token.enum';
import { I_Request } from 'src/Common/Types/request.types';
import { ErrorResponse } from 'src/Common/Utils/Response/error.response';
import { TokenService } from 'src/Common/Utils/Security/token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly tokenService: TokenService,
    private readonly errorResponse: ErrorResponse
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {


    let req: any | I_Request = context.switchToHttp().getRequest();

    let authorization: string = ""

    switch (context.getType()) {
      /*       case "ws":
              break;
       */
      default:
        req = context.switchToHttp().getRequest();
        break;
    }

    authorization = req.cookies["access_token"];

    if (!authorization || authorization === "") {
      throw this.errorResponse.forbidden({
        message: req.t('token:errors.you_are_not_authorized_to_access_this_resource'),
        info:req.t('token:errors.authorization_header_missing')
      })
    }

    const {user,decoded} = await this.tokenService.decodeToken(authorization,E_TokenType.ACCESS);

    req.user = user;
    req.decoded = decoded;

    return true;
  }
}