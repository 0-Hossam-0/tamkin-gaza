import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { LanguageCode } from 'src/Common/Interfaces/Language/languages-config.interface';
import languagesConfig from '../Config/Language/language.json';
import { ILanguageRequest } from 'src/Common/Interfaces/Language/language-request.interface';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private translationService: TranslationService) {}
  use(req: ILanguageRequest, res: Response, next: NextFunction) {
    const header = req.headers['accept-language'] || '';

    const requestedLang = header.split(',')[0].split('-')[0].toLowerCase();

    const isSupported = languagesConfig.some(
      (item) => Object.keys(item)[0] === requestedLang,
    );

    if (isSupported) {
      req.userLanguage = requestedLang as LanguageCode;
    } else {
      req.userLanguage = this.translationService.getDefaultLanguageCode();
    }
    next();
  }
}
