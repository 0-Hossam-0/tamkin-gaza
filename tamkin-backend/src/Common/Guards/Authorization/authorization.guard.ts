import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { IRequest } from 'src/Common/Types/request.types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly responseService: ResponseService,
    private readonly translationService: TranslationService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessRoles: UserRoleEnum[] =
      this.reflector.getAllAndOverride('accessRoles', [context.getHandler()]) ||
      [];

    let req: any;
    let role: UserRoleEnum = UserRoleEnum.USER;

    switch (context.getType()) {
      case 'http':
        req = context.switchToHttp().getRequest();
        role = req.user.role;
        break;
      default:
        break;
    }

    if (accessRoles.length === 0) {
      return true;
    }

    if (!accessRoles.includes(role)) {
      const userLang = (req as IRequest).userLanguage;
      throw this.responseService.unauthorized({
        message: this.translationService.translate(
          'auth:errors.unauthorized',
          { prop: userLang }),
        info: this.translationService.translate(
          'auth:errors.unauthorized_info',
          { prop: userLang }),
      });
    }

    return true;
  }
}
