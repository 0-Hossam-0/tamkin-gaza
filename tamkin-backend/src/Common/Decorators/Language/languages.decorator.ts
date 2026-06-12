import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SUPPORTED_LANGUAGES } from 'src/Common/Interfaces/Language/languages-config.interface';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';

import languagesConfig from '../../../Config/Language/language.json';

@ValidatorConstraint({ name: 'isLanguageRecord', async: false })
export class IsLanguageRecordConstraint implements ValidatorConstraintInterface {
  constructor(private readonly translateService: TranslationService) {}
  validate(value: any) {
    if (!value || typeof value !== 'object') return false;

    // Find default language
    const defaultLangObj = languagesConfig.find((l) => Object.values(l)[0].isDefault);
    const defaultLang = defaultLangObj ? Object.keys(defaultLangObj)[0] : 'en';

    // Default language is required
    if (typeof value[defaultLang] !== 'string' || value[defaultLang].trim().length === 0) {
      return false;
    }

    // Other provided languages must be valid and non-empty strings
    return Object.keys(value).every(
      (lang) =>
        SUPPORTED_LANGUAGES.includes(lang as any) &&
        typeof value[lang] === 'string' &&
        value[lang].trim().length > 0,
    );
  }

  defaultMessage(args: ValidationArguments) {
    return this.translateService.translateToDefaultLanguage(``, {
      prop: args.property,
    });
  }
}
