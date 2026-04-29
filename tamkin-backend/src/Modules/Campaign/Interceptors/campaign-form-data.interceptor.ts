import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CampaignFormDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const value = request.body;

    if (value && typeof value === 'object') {
      const transformed = { ...value };

      // Group title fields
      if (
        transformed.arTitle !== undefined ||
        transformed.enTitle !== undefined ||
        transformed.urTitle !== undefined ||
        transformed.trTitle !== undefined
      ) {
        transformed.title = {
          ...(transformed.arTitle !== undefined && { ar: transformed.arTitle }),
          ...(transformed.enTitle !== undefined && { en: transformed.enTitle }),
          ...(transformed.urTitle !== undefined && { ur: transformed.urTitle }),
          ...(transformed.trTitle !== undefined && { tr: transformed.trTitle }),
        };
        delete transformed.arTitle;
        delete transformed.enTitle;
        delete transformed.urTitle;
        delete transformed.trTitle;
      }

      // Group description fields
      if (
        transformed.arDescription !== undefined ||
        transformed.enDescription !== undefined ||
        transformed.urDescription !== undefined ||
        transformed.trDescription !== undefined
      ) {
        transformed.description = {
          ...(transformed.arDescription !== undefined && { ar: transformed.arDescription }),
          ...(transformed.enDescription !== undefined && { en: transformed.enDescription }),
          ...(transformed.urDescription !== undefined && { ur: transformed.urDescription }),
          ...(transformed.trDescription !== undefined && { tr: transformed.trDescription }),
        };
        delete transformed.arDescription;
        delete transformed.enDescription;
        delete transformed.urDescription;
        delete transformed.trDescription;
      }

      // Convert target_amount if it is a string
      if (typeof transformed.target_amount === 'string') {
        const parsedAmount = parseFloat(transformed.target_amount);
        if (!isNaN(parsedAmount)) {
          transformed.target_amount = parsedAmount;
        }
      }

      request.body = transformed;
    }

    return next.handle();
  }
}