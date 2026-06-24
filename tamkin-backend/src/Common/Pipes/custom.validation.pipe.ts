import { Injectable, ValidationError, Inject, Scope } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { ResponseService } from '../Services/Response/response.service';
import { TranslationService } from '../Services/Translation/translation.service';
import { XssService } from '../Services/Security/Xss/xss.service';
import { REQUEST } from '@nestjs/core';
import type { IRequest } from '../Types/request.types';
import type { ArgumentMetadata } from '@nestjs/common';

const KNOWN_MODULES = [
  'auth',
  'campaign',
  'common',
  'email',
  'main',
  'reels',
  'token',
  'validation',
];

@Injectable({ scope: Scope.REQUEST })
export class CustomValidationPipe extends ValidationPipe {
  constructor(
    @Inject(REQUEST) private readonly request: IRequest,
    private readonly translationService: TranslationService,
    private readonly responseService: ResponseService,
    private readonly xssService: XssService,
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
        // check if the key is one of OUR keys (starts with module.file.key)
        const isCustomKey = KNOWN_MODULES.some((m) => key.startsWith(m + '.'));

        if (isCustomKey) {
          if (key.includes('|')) {
            const [translationKey, ...rest] = key.split('|');
            const propStr = rest.join('|');
            const prop = propStr.split(',').map((item) => item.trim());

            const message = this.translationService.translate(translationKey, {
              prop: userLanguage,
            });
            translatedMessages.push(message);
          } else {
            const message = this.translationService.translate(key, { prop: userLanguage });
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
      message: 'common.common.validation_failed',
      issues: formattedErrors,
    });
  }

  /**
   * Override transform to sanitize the validated value against XSS
   * AFTER class-validator and class-transformer have run, then re-validate
   * to ensure sanitized data still meets DTO constraints.
   */
  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    // Step 1: Default transformation + validation
    const transformedValue = await super.transform(value, metadata);

    // Step 2: Sanitize
    const sanitizedValue = this.xssService.sanitizeDeep(transformedValue);

    // Step 3: Re-validate properly
    if (
      sanitizedValue &&
      typeof sanitizedValue === 'object' &&
      metadata.metatype &&
      this.toValidate(metadata) // ← skip primitives, arrays, etc.
    ) {
      // convert plain object back to class instance
      const { plainToInstance } = await import('class-transformer');
      const instance = plainToInstance(metadata.metatype as any, sanitizedValue);

      const errors = await validate(instance);
      if (errors.length > 0) {
        throw this.exceptionFactory(errors);
      }

      return instance; // return the class instance, not the plain object
    }

    return sanitizedValue;
  }
}
