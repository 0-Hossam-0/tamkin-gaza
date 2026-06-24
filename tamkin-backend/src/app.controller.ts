import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';
import { CsrfService } from './Common/Services/Security/Csrf/csrf.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly csrfService: CsrfService,
  ) {}

  @Get()
  main(@Req() req: Request) {
    return this.appService.main(req);
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = this.csrfService.generateToken(req, res);
    return { token };
  }
}
