import { Injectable } from '@nestjs/common';
import { doubleCsrf, DoubleCsrfUtilities } from 'csrf-csrf';
import type { Request, Response, NextFunction } from 'express';
import { IRequest } from 'src/Common/Types/request.types';

@Injectable()
export class CsrfService {
  private readonly csrfUtilities: DoubleCsrfUtilities;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const secret = process.env.CSRF_SECRET;
    if (!secret) {
      if (isProduction) throw new Error('CSRF_SECRET env var is required in production');
      console.warn('⚠️  Using insecure default CSRF secret — dev only');
    }

    // Use __Host- prefix only in production (requires secure=true + HTTPS).
    // In dev, use a plain name so the cookie works over plain HTTP.
    const cookieName = isProduction ? '__Host-x-csrf-token' : 'x-csrf-token';

    this.csrfUtilities = doubleCsrf({
      getSecret: () => secret ?? 'dev-only-insecure-secret',
      // Bind to the JWT's own unique identifier
      getSessionIdentifier: (req: Request) => {
        const user = (req as IRequest).user; // ← undefined, no JWT
        if (user?.uuid) return user.uuid.toString();
        return 'anonymous'; // ← falls here
      },
      cookieName,
      cookieOptions: {
        httpOnly: false,
        sameSite: isProduction ? 'strict' : ('lax' as const),
        secure: isProduction,
        path: '/',
      },
      size: 64,
      getCsrfTokenFromRequest: (req) => {
        // Header is the primary source; fall back to body for convenience
        const header = req.headers['x-csrf-token'];
        const token = Array.isArray(header) ? header[0] : header;
        if (token) return token;
        return (req.body as Record<string, unknown> | undefined)?.['_csrf'] as string | undefined;
      },
    });
  }

  /**
   * Generates a CSRF token (or returns existing) and sets it as a cookie.
   * Call this on GET /csrf-token or as part of the first page load.
   */
  generateToken(req: Request, res: Response): string {
    return this.csrfUtilities.generateCsrfToken(req, res, { overwrite: true });
  }

  /**
   * Forces a NEW CSRF token, invalidating any previous one.
   * Use after authentication state changes (login, logout).
   */
  rotateToken(req: Request, res: Response): string {
    return this.csrfUtilities.generateCsrfToken(req, res, { overwrite: true });
  }

  /**
   * Express middleware that validates the CSRF token on mutating requests.
   */
  doubleCsrfProtection(req: Request, res: Response, next: NextFunction): void {
    return this.csrfUtilities.doubleCsrfProtection(req, res, next);
  }
}
