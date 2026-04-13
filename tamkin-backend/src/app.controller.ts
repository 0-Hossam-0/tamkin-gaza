import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGuard } from './Common/Guards/authentication/authentication.guard';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  main(@Req() req: Request) {
    return this.appService.main(req);
  }
}
