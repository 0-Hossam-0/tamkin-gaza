import { Inject, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { LanguageCode } from 'src/Common/Interfaces/Language/languages-config.interface';
import languagesConfig from '../../../Config/Language/language.json';
import { REQUEST } from '@nestjs/core';
import type { IRequest } from 'src/Common/Types/request.types';

const KNOWN_MODULES = ['auth', 'campaign', 'common', 'email', 'main', 'payment', 'reels', 'token', 'validation'];

@Injectable()
export class TranslationService {
  constructor(
    private readonly i18n: I18nService,
    @Inject(REQUEST) private readonly request: IRequest,
    private readonly configService: ConfigService,
  ) {}

  public translate(key: string, context?: { prop?: any }): any {
    const userLanguage = this.request.userLanguage;
    return this.resolveTranslation(key, userLanguage, context);
  }

  public translateToDefaultLanguage(key: string, context?: { prop?: any }): any {
    const defaultLanguageCode = this.getDefaultLanguageCode();
    return this.resolveTranslation(key, defaultLanguageCode, context);
  }

  public getDefaultLanguageCode(): LanguageCode {
    return this.validateAndExtractDefault(languagesConfig);
  }

  private resolveTranslation(key: string, lang: LanguageCode, context?: { prop?: any }): any {
    if (!KNOWN_MODULES.some((m) => key.startsWith(m + '.'))) return key;

    try {
      const result = this.i18n.translate(key, { lang });
      return this.replacePlaceholders(result, context);
    } catch {
      return key;
    }
  }

  private replacePlaceholders(data: any, context?: { prop?: any }): any {
    const baseUrl = this.configService.get<string>('BASE_URL') || '';

    if (typeof data === 'string') {
      let result = data;
      if (context?.prop) {
        const propValue = Array.isArray(context.prop)
          ? context.prop.join(', ')
          : context.prop;
        result = result.replace(/{prop}/g, propValue);
      }
      return result.replace(/{{baseUrl}}/g, baseUrl);
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.replacePlaceholders(item, context));
    }

    if (typeof data === 'object' && data !== null) {
      const replaced: any = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          replaced[key] = this.replacePlaceholders(data[key], context);
        }
      }
      return replaced;
    }

    return data;
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
