import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { LanguageCode, SUPPORTED_LANGUAGES } from 'src/Common/Interfaces/Language/languages-config.interface';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';
import { IRequest } from 'src/Common/Types/request.types';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private translationService: TranslationService) {}
  use(req: IRequest, res: Response, next: NextFunction) {
    const header = req.headers['accept-language'] || '';

    const requestedLang = header.split(',')[0].split('-')[0].toLowerCase();

    const isSupported = SUPPORTED_LANGUAGES.some(
      (lang) => lang === requestedLang,
    );

    if (isSupported) {
      req.userLanguage = requestedLang as LanguageCode;
    } else {
      req.userLanguage = this.translationService.getDefaultLanguageCode();
    }
    next();
  }
}
