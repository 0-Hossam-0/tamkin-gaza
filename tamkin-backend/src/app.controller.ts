import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGuard } from './Common/Guards/Authentication/authentication.guard';
import type { Request } from 'express';
import { AuthorizationGuard } from './Common/Guards/Authorization/authorization.guard';
import { E_UserRole } from './Common/Enums/user.enums';
import { Auth } from './Common/Decorators/auth.decorator';
import { E_TokenType } from './Common/Enums/token.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Auth([E_UserRole.ADMIN], E_TokenType.ACCESS)
  @Get()
  main(@Req() req: Request) {
    return this.appService.main(req);
  }


}