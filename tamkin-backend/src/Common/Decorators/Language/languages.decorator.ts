import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SUPPORTED_LANGUAGES } from 'src/Common/Interfaces/Language/languages-config.interface';
import { TranslationService } from 'src/Common/Services/Translation/translation.service';

@ValidatorConstraint({ name: 'isLanguageRecord', async: false })
export class IsLanguageRecordConstraint implements ValidatorConstraintInterface {
  constructor(private readonly translateService: TranslationService) {}
  validate(value: any) {
    if (!value || typeof value !== 'object') return false;

    return SUPPORTED_LANGUAGES.every(
      (lang) =>
        typeof value[lang] === 'string' && value[lang].trim().length > 0,
    );
  }

  defaultMessage(args: ValidationArguments) {
    return this.translateService.translateToDefaultLanguage(``, {
      prop: args.property,
    });
  }
}
