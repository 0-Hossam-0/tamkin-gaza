import { Inject, Injectable } from '@nestjs/common';
import { JsonFileService } from '../Json/json-file.service';
import { LanguageCode } from 'src/Common/Interfaces/Language/languages-config.interface';
import languagesConfig from '../../../Config/Language/language.json';
import { REQUEST } from '@nestjs/core';
import type { IRequest } from 'src/Common/Types/request.types';

@Injectable()
export class TranslationService {
  constructor(
    private readonly jsonFileProvider: JsonFileService,
    @Inject(REQUEST) private readonly request: IRequest,
  ) {}

  public translate(key: string, context?: { prop?: any }): any {
    const userLanguage = this.request.userLanguage;
    return this.jsonFileProvider.get(userLanguage, key, context);
  }

  public translateToDefaultLanguage(key: string, context?: { prop?: any }): any {
    const defaultLanguageCode = this.getDefaultLanguageCode();
    return this.jsonFileProvider.get(defaultLanguageCode, key, context);
  }

  public getDefaultLanguageCode(): LanguageCode {
    const data = this.jsonFileProvider.getRawLanguageData();
    return this.validateAndExtractDefault(data);
  }

  private validateAndExtractDefault(data: typeof languagesConfig): LanguageCode {
    const defaultEntries = data.filter((item) => {
      const code = Object.keys(item)[0];
      const config = (item as any)[code];
      return config?.isDefault === true;
    });

    if (defaultEntries.length === 0)
      throw new Error('Invalid language.json: No language is marked as "isDefault": true.');

    if (defaultEntries.length > 1) {
      const foundCodes = defaultEntries.map((entry) => Object.keys(entry)[0]);
      throw new Error(
        `Invalid language.json: Multiple default languages found (${foundCodes.join(', ')}). Only one is allowed.`,
      );
    }
    return Object.keys(defaultEntries[0])[0] as LanguageCode;
  }
}
