import { Injectable } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from '../Utils/Response/error.response';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor(private readonly errorResponse: ErrorResponse) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          path: error.property,
          errors: Object.values(error.constraints || {}),
        }));

        return errorResponse.badRequest({
          message: 'Validation failed',
          info: 'One or more fields contain invalid data',
          issues: formattedErrors,
        });
      },
    });
  }
}
