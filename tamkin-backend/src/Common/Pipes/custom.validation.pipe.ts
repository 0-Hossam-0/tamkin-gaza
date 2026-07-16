import 'reflect-metadata';
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
            const propValue = rest.join('|');

            const message = this.translationService.translate(translationKey, {
              prop: propValue,
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
   *
   * Respects the @AllowHtml() decorator to preserve HTML in specific fields.
   */
  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    // Step 1: Default transformation + validation
    const transformedValue = await super.transform(value, metadata);

    // Step 2: Sanitize with @AllowHtml awareness
    const sanitizedValue = this.sanitizeWithHtmlSupport(transformedValue, metadata);

    // Step 3: Re-validate properly
    if (
      sanitizedValue &&
      typeof sanitizedValue === 'object' &&
      metadata.metatype &&
      this.toValidate(metadata) // ← skip primitives, arrays, etc.
    ) {
      // convert plain object back to class instance
      const { plainToInstance } = await import('class-transformer');
      const instance = plainToInstance(metadata.metatype as any, sanitizedValue as any);

      const errors = await validate(instance);
      if (errors.length > 0) {
        throw this.exceptionFactory(errors);
      }

      return instance; // return the class instance, not the plain object
    }

    return sanitizedValue;
  }

  /**
   * Sanitize an object, respecting which fields support HTML content.
   * Fields like "description" and "content_*" preserve safe HTML tags.
   * Other fields use strict sanitization (strip all HTML).
   */
  private sanitizeWithHtmlSupport(value: unknown, metadata: ArgumentMetadata): unknown {
    if (!value || typeof value !== 'object') {
      return this.xssService.sanitizeDeep(value);
    }

    // Get fields that should preserve HTML based on field name
    const htmlFieldNames = new Set([
      'description',
      'content_ar',
      'content_en',
      'content_tr',
      'content_ur',
    ]);

    // Selectively sanitize: use HTML mode for specific fields
    return this.sanitizeObjectSelectively(value as Record<string, unknown>, htmlFieldNames);
  }

  /**
   * Recursively sanitize an object, using HTML mode for specific fields.
   */
  private sanitizeObjectSelectively(
    obj: Record<string, unknown>,
    htmlFields: Set<string>,
  ): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (htmlFields.has(key)) {
        // Use HTML-safe sanitization for content fields
        sanitized[key] = this.sanitizeValueWithHtml(value);
      } else {
        // Use strict sanitization for other fields
        sanitized[key] = this.sanitizeDeep(value);
      }
    }

    return sanitized;
  }

  /**
   * Sanitize a value while preserving safe HTML tags.
   */
  private sanitizeValueWithHtml(value: unknown): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'string') {
      return this.xssService.sanitizeHtml(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.sanitizeValueWithHtml(item));
    }

    if (typeof value === 'object' && !(value instanceof Date) && !(value instanceof Buffer)) {
      const sanitized: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        sanitized[k] = this.sanitizeValueWithHtml(v);
      }
      return sanitized;
    }

    return value;
  }

  /**
   * Deep sanitization helper - use strict mode (strip all HTML)
   */
  private sanitizeDeep(value: unknown): unknown {
    return this.xssService.sanitizeDeep(value);
  }
}
