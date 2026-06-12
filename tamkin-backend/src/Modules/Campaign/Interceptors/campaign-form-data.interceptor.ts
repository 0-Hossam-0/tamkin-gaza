import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CampaignFormDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const value = request.body;

    if (value && typeof value === 'object') {
      const transformed = { ...value };

      // Handle bracket notation like title[en] or description[ar]
      for (const key of Object.keys(transformed)) {
        const match = key.match(/^(title|description)\[([a-z]{2})\]$/);
        if (match) {
          const field = match[1];
          const lang = match[2];
          if (!transformed[field] || typeof transformed[field] !== 'object') {
            transformed[field] = {};
          }
          transformed[field][lang] = transformed[key];
          delete transformed[key];
        }
      }

      // Group title fields (Legacy camelCase format)
      if (
        transformed.arTitle !== undefined ||
        transformed.enTitle !== undefined ||
        transformed.urTitle !== undefined ||
        transformed.trTitle !== undefined
      ) {
        if (!transformed.title || typeof transformed.title !== 'object') {
          transformed.title = {};
        }
        if (transformed.arTitle !== undefined) transformed.title.ar = transformed.arTitle;
        if (transformed.enTitle !== undefined) transformed.title.en = transformed.enTitle;
        if (transformed.urTitle !== undefined) transformed.title.ur = transformed.urTitle;
        if (transformed.trTitle !== undefined) transformed.title.tr = transformed.trTitle;

        delete transformed.arTitle;
        delete transformed.enTitle;
        delete transformed.urTitle;
        delete transformed.trTitle;
      }

      // Group description fields (Legacy camelCase format)
      if (
        transformed.arDescription !== undefined ||
        transformed.enDescription !== undefined ||
        transformed.urDescription !== undefined ||
        transformed.trDescription !== undefined
      ) {
        if (!transformed.description || typeof transformed.description !== 'object') {
          transformed.description = {};
        }
        if (transformed.arDescription !== undefined)
          transformed.description.ar = transformed.arDescription;
        if (transformed.enDescription !== undefined)
          transformed.description.en = transformed.enDescription;
        if (transformed.urDescription !== undefined)
          transformed.description.ur = transformed.urDescription;
        if (transformed.trDescription !== undefined)
          transformed.description.tr = transformed.trDescription;

        delete transformed.arDescription;
        delete transformed.enDescription;
        delete transformed.urDescription;
        delete transformed.trDescription;
      }

      // Convert amounts if they are strings
      if (typeof transformed.target_amount === 'string') {
        const parsedAmount = parseFloat(transformed.target_amount);
        if (!isNaN(parsedAmount)) {
          transformed.target_amount = parsedAmount;
        }
      }

      if (typeof transformed.current_amount === 'string') {
        const parsedAmount = parseFloat(transformed.current_amount);
        if (!isNaN(parsedAmount)) {
          transformed.current_amount = parsedAmount;
        }
      }

      request.body = transformed;
    }

    return next.handle();
  }
}
