import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { ResponseService } from './Common/Services/Response/response.service';
import { TranslationService } from './Common/Services/Translation/translation.service';

@Injectable()
export class AppService {

  constructor(
    private readonly responseService: ResponseService,
    private readonly translationService: TranslationService,
  ){}

  main(req: Request) {
    const data = this.translationService.translate('main:main.data');
    return this.responseService.success({
      data: {
        ...data,
      },
    });
  }
}