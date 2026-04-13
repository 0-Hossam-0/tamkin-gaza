import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { E_UserRole } from 'src/Common/Enums/user.enums';
import { ErrorResponse } from 'src/Common/Utils/Response/error.response';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private readonly reflector: Reflector, private readonly errorResponse: ErrorResponse) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessRoles: E_UserRole[] =
      this.reflector.getAllAndOverride('accessRoles', [context.getHandler()]) ||
      [];

    let req: any;
    let role: E_UserRole = E_UserRole.USER;

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
      throw this.errorResponse.unauthorized({
        message: req.t('auth:errors.unAuthorized'),
        info: req.t('auth:errors.unAuthorizedInfo')
      });
    }

    return true;

  }
}