import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { AdminFilterUsersDto } from './Dtos/admin-filter-users.dto';
import { BanUserDto } from './Dtos/ban-user.dto';
import { AuthenticationGuard } from 'src/Common/Guards/Authentication/authentication.guard';
import { AuthorizationGuard } from 'src/Common/Guards/Authorization/authorization.guard';
import { SetAccessRoles } from 'src/Common/Decorators/Auth/roles.decorator';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  // Admin Endpoints
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Get('admin/all')
  async findAllAdmin(@Query() filters: AdminFilterUsersDto) {
    const result = await this.userService.findAllAdmin(filters);
    return this.responseService.success({
      data: result,
    });
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Get('admin/:uuid')
  async findOneAdmin(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const user = await this.userService.findOneAdmin(uuid);
    if (!user) {
      this.responseService.notFound({ message: 'common.common.user_not_found' });
    }
    return this.responseService.success({
      data: user,
    });
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Patch('admin/:uuid/ban')
  async banUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() banUserDto: BanUserDto,
  ) {
    const user = await this.userService.banUser(uuid, banUserDto);
    if (!user) {
      this.responseService.notFound({ message: 'common.common.user_not_found' });
    }
    const message = user!.isBanned
      ? 'common.common.user_banned_successfully'
      : 'common.common.user_unbanned_successfully';
    return this.responseService.success({
      message,
      data: user!,
    });
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN])
  @Patch('admin/:uuid/role')
  async updateUserRole(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body('role') role: UserRoleEnum,
  ) {
    const user = await this.userService.updateUserRole(uuid, role);
    if (!user) {
      this.responseService.notFound({ message: 'common.common.user_not_found' });
    }
    return this.responseService.success({
      message: 'common.common.user_role_updated_successfully',
      data: user,
    });
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Patch('admin/:uuid')
  async adminUpdate(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(uuid, updateUserDto);
    if (!user) {
      this.responseService.notFound({ message: 'common.common.user_not_found' });
    }
    return this.responseService.success({
      message: 'common.common.user_updated_successfully',
      data: user,
    });
  }

}