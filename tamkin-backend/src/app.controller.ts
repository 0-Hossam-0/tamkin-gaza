import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';
import { UserRoleEnum } from './Common/Enums/User/user.enum';
import { Auth } from './Common/Decorators/Auth/auth.decorator';
import { TokenTypeEnum } from './Common/Enums/token.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Auth([UserRoleEnum.SUPER_ADMIN], TokenTypeEnum.ACCESS)
  @Get()
  main(@Req() req: Request) {
    return this.appService.main(req);
  }
}
