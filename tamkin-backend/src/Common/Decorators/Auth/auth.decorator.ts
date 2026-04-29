import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from '../../Enums/User/user.enum';
import { TokenTypeEnum } from '../../Enums/token.enum';
import { SetTokenType } from './token.decorator';
import { AuthorizationGuard } from '../../Guards/Authorization/authorization.guard';
import { SetAccessRoles } from './roles.decorator';
import { AuthenticationGuard } from 'src/Common/Guards/authentication/authentication.guard';

export function Auth(
  accessRoles: UserRoleEnum[] = [],
  tokenType: TokenTypeEnum = TokenTypeEnum.ACCESS,
) {
  return applyDecorators(
    SetAccessRoles(accessRoles),
    SetTokenType(tokenType),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
}
