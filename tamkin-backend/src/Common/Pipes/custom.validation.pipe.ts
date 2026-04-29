import { Injectable, ValidationError, Inject, Scope } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ResponseService } from '../Services/Response/response.service';
import { TranslationService } from '../Services/Translation/translation.service';
import { REQUEST } from '@nestjs/core';
import type { IRequest } from '../Types/request.types';

@Injectable({ scope: Scope.REQUEST })
export class CustomValidationPipe extends ValidationPipe {
  constructor(
    @Inject(REQUEST) private readonly request: IRequest,
    private readonly translationService: TranslationService,
    private readonly responseService: ResponseService,
  ) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
    this.exceptionFactory = (errors) => this.transformErrors(errors);
  }

  private transformErrors(errors: ValidationError[]) {
    const userLanguage = this.request.userLanguage;

    const formattedErrors = errors.map((error) => {
      const constraints = Object.values(error.constraints || {});

      const translatedMessages: string[] = [];

      constraints.forEach((key) => {
        // check if the key is one of OUR keys (contains module:file.key)
        const isCustomKey = key.includes(':') && key.includes('.');

        if (isCustomKey) {
          if (key.includes('|')) {
            const [translationKey, ...rest] = key.split('|');
            const propStr = rest.join('|');
            const prop = propStr.split(',').map((item) => item.trim());

            const message = this.translationService.translate(
              translationKey,
              { prop: userLanguage },
            );
            translatedMessages.push(message);
          } else {
            const message = this.translationService.translate(
              key,
              { prop: userLanguage },);
            translatedMessages.push(message);
          }
        }
        // IMPORTANT: Do not add an 'else' block here.
        // If it's not a custom key, we ignore it completely.
      });

      return {
        path: error.property,
        error: translatedMessages,
      };
    });
    return this.responseService.badRequest({
      message: 'common:common.validation_failed',
      issues: formattedErrors,
    });
  }
}
