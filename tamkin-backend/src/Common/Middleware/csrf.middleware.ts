import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CsrfService } from '../Services/Security/Csrf/csrf.service';
import { ResponseService } from '../Services/Response/response.service';
import { I18nService, I18nContext } from 'nestjs-i18n';

// Fallback translations for CSRF error message
const CSRF_ERROR_TRANSLATIONS: Record<string, string> = {
  ar: 'رمز CSRF غير صالح أو مفقود',
  en: 'Invalid or missing CSRF token',
  tr: 'Geçersiz veya eksik CSRF belirteci',
  ur: 'غلط یا گمشدہ CSRF ٹوکن',
};

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  constructor(
    private readonly csrfService: CsrfService,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService,
  ) {}

  private getCsrfErrorMessage(): string {
    try {
      const lang = I18nContext.current()?.lang || 'ar';
      const translatedMessage = this.i18n.translate('common.invalid_csrf_token', { lang });
      // If translation returns the key itself, use fallback
      if (translatedMessage === 'common.invalid_csrf_token') {
        return CSRF_ERROR_TRANSLATIONS[lang] || CSRF_ERROR_TRANSLATIONS.ar;
      }
      return translatedMessage;
    } catch {
      // Return fallback translation on error
      return CSRF_ERROR_TRANSLATIONS.ar;
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    // Skip CSRF for webhooks (Stripe, Iyzico, Paymob, Fawry)
    if (req.path.startsWith('/payments/webhook') || req.path.startsWith('/payments/mock-webhook')) {
      return next();
    }

    // Wrap next to catch CSRF errors and handle them gracefully
    const wrappedNext: NextFunction = (err?: any) => {
      if (err) {
        // Handle invalid CSRF token gracefully without throwing to terminal
        try {
          const translatedMessage = this.getCsrfErrorMessage();
          this.responseService.forbidden({ message: translatedMessage });
        } catch (exception: any) {
          const response = exception.getResponse();
          return res.status(403).json(response);
        }
      }
      next();
    };

    this.csrfService.doubleCsrfProtection(req, res, wrappedNext);
  }
}
