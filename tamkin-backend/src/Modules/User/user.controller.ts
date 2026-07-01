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
import { UpdateUserDto } from './Dtos/update-user.dto';
import { AdminFilterUsersDto } from './Dtos/admin-filter-users.dto';
import { BanUserDto } from './Dtos/ban-user.dto';
import { AuthenticationGuard } from 'src/Common/Guards/Authentication/authentication.guard';
import { AuthorizationGuard } from 'src/Common/Guards/Authorization/authorization.guard';
import { SetAccessRoles } from 'src/Common/Decorators/Auth/roles.decorator';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Admin Endpoints
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Get('admin/all')
  async findAllAdmin(@Query() filters: AdminFilterUsersDto) {
    return this.userService.findAllAdmin(filters);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @SetAccessRoles([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Get('admin/:uuid')
  async findOneAdmin(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const user = await this.userService.findOneAdmin(uuid);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
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
      return { message: 'User not found' };
    }
    return {
      message: user.isBanned ? 'User banned successfully' : 'User unbanned successfully',
      user,
    };
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
      return { message: 'User not found' };
    }
    return {
      message: 'User role updated successfully',
      user,
    };
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
      return { message: 'User not found' };
    }
    return {
      message: 'User updated successfully',
      user,
    };
  }

}
