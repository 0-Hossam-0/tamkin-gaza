import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsLanguageRecordConstraint } from './languages.decorator';

export function IsLanguageRecord(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLanguageRecordConstraint,
    });
  };
}
