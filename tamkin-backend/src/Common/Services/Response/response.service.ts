import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ExceptionOptions,
  IResponse,
} from '../../Interfaces/Response/response.interface';
import { TranslationService } from '../Translation/translation.service';

@Injectable({ scope: Scope.REQUEST })
export class ResponseService {
  constructor(private readonly translationService: TranslationService) {}

  private translateIfKey(text: string | any): string | any {
    if (typeof text === 'string' && text.includes(':') && text.includes('.')) {
      return this.translationService.translate(text);
    }
    return text;
  }

  success<T = any>({
    message = 'common:common.operation_successful',
    info,
    statusCode = HttpStatus.OK,
    data,
  }: IResponse<T> = {}): IResponse<T> {
    return {
      message: this.translateIfKey(message),
      info: this.translateIfKey(info),
      statusCode,
      data,
    };
  }

  private createErrorPayload(
    name: string,
    statusCode: number,
    options: ExceptionOptions,
  ) {
    return {
      name,
      statusCode,
      message: this.translateIfKey(options.message || name),
      info: this.translateIfKey(options.info),
      issues: options.issues,
      timestamp: new Date().toISOString(),
    };
  }

  badRequest(options: ExceptionOptions = {}) {
    throw new BadRequestException(
      this.createErrorPayload(
        'BadRequestException',
        HttpStatus.BAD_REQUEST,
        options,
      ),
    );
  }

  notFound(options: ExceptionOptions = {}) {
    throw new NotFoundException(
      this.createErrorPayload(
        'NotFoundException',
        HttpStatus.NOT_FOUND,
        options,
      ),
    );
  }

  forbidden(options: ExceptionOptions = {}) {
    throw new ForbiddenException(
      this.createErrorPayload(
        'ForbiddenException',
        HttpStatus.FORBIDDEN,
        options,
      ),
    );
  }

  conflict(options: ExceptionOptions = {}) {
    throw new ConflictException(
      this.createErrorPayload(
        'ConflictException',
        HttpStatus.CONFLICT,
        options,
      ),
    );
  }

  unauthorized(options: ExceptionOptions = {}) {
    throw new UnauthorizedException(
      this.createErrorPayload(
        'unauthorizedException',
        HttpStatus.UNAUTHORIZED,
        options,
      ),
    );
  }

  serverError(options: ExceptionOptions = {}) {
    throw new InternalServerErrorException(
      this.createErrorPayload(
        'InternalServerErrorException',
        HttpStatus.INTERNAL_SERVER_ERROR,
        options,
      ),
    );
  }
}
