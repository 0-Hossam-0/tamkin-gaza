import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../Enums/User/user.enum';

export const SetAccessRoles = (accessRoles: UserRoleEnum[] = []) => {
  return SetMetadata('accessRoles', accessRoles);
};
