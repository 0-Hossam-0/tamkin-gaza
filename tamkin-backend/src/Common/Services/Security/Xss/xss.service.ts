import { Injectable } from '@nestjs/common';
import * as xss from 'xss';

/**
 * Service that sanitizes input strings to prevent XSS attacks.
 * Uses the `xss` library which is a whitelist-based HTML sanitizer.
 *
 * Configured with a strict whitelist: no HTML tags or attributes are allowed.
 * This effectively strips ALL HTML/SVG/MathML from any string input.
 */
@Injectable()
export class XssService {
  private readonly xssOptions: xss.IFilterXSSOptions = {
    // Allow nothing – strip ALL tags and attributes
    whiteList: {},
    stripIgnoreTag: true,       // Strip tags not in the whitelist
    stripIgnoreTagBody: true,   // Also strip the body of ignored tags (e.g., <script>...</script>)
    allowCommentTag: false,     // Disallow HTML comments
    css: false,                 // Disallow CSS
  };

  /**
   * Sanitize a single string value, removing any potentially malicious content.
   */
  sanitize(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return xss.filterXSS(value, this.xssOptions);
  }

  /**
   * Deeply sanitize an object/array, recursively sanitizing all string values.
   * Handles nested objects, arrays, and primitive values.
   * This is safe because it does NOT mutate the original object.
   */
  sanitizeDeep<T>(input: T): T {
    if (input === null || input === undefined) {
      return input;
    }

    if (typeof input === 'string') {
      return this.sanitize(input) as unknown as T;
    }

    if (Array.isArray(input)) {
      return input.map((item) => this.sanitizeDeep(item)) as unknown as T;
    }

    if (typeof input === 'object' && !(input instanceof Date) && !(input instanceof Buffer)) {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
        sanitized[key] = this.sanitizeDeep(value);
      }
      return sanitized as unknown as T;
    }

    // Numbers, booleans, Dates, Buffers, etc. — pass through unchanged
    return input;
  }
}