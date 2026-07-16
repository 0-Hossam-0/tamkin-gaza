import { Injectable } from '@nestjs/common';
import * as xss from 'xss';

/**
 * Service that sanitizes input strings to prevent XSS attacks.
 * Uses the `xss` library which is a whitelist-based HTML sanitizer.
 *
 * Supports two modes:
 * 1. Strict mode (default): Strips ALL HTML tags and attributes
 * 2. HTML mode: Allows common safe HTML tags for rich content
 */
@Injectable()
export class XssService {
  private readonly strictXssOptions: xss.IFilterXSSOptions = {
    // Allow nothing – strip ALL tags and attributes
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
    allowCommentTag: false,
    css: false,
  };

  private readonly htmlXssOptions: xss.IFilterXSSOptions = {
    // Whitelist of safe HTML tags for rich content
    whiteList: {
      p: [],
      br: [],
      strong: [],
      b: [],
      em: [],
      i: [],
      u: [],
      del: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      ul: [],
      ol: [],
      li: [],
      blockquote: [],
      a: ['href', 'title'],
      img: ['src', 'alt', 'width', 'height'],
      table: [],
      thead: [],
      tbody: [],
      tr: [],
      th: [],
      td: [],
      code: [],
      pre: [],
      hr: [],
      div: ['class'],
      span: ['class'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: false,
    allowCommentTag: false,
    css: false,
  };

  /**
   * Sanitize a single string value in STRICT mode, removing all HTML.
   */
  sanitize(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return xss.filterXSS(value, this.strictXssOptions);
  }

  /**
   * Sanitize a single string value, allowing safe HTML tags.
   * Use this for rich content like campaign descriptions and post content.
   */
  sanitizeHtml(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return xss.filterXSS(value, this.htmlXssOptions);
  }

  /**
   * Deeply sanitize an object/array in STRICT mode.
   * Recursively sanitizes all string values, stripping all HTML.
   * This is safe because it does NOT mutate the original object.
   */
  sanitizeDeep<T>(input: T): T {
    return this.sanitizeDeepInternal(input, false);
  }

  /**
   * Deeply sanitize an object/array, allowing safe HTML tags.
   * Recursively sanitizes all string values, preserving safe HTML.
   * Use this for objects containing rich content fields.
   */
  sanitizeDeepHtml<T>(input: T): T {
    return this.sanitizeDeepInternal(input, true);
  }

  private sanitizeDeepInternal<T>(input: T, allowHtml: boolean): T {
    if (input === null || input === undefined) {
      return input;
    }

    if (typeof input === 'string') {
      const sanitized = allowHtml ? this.sanitizeHtml(input) : this.sanitize(input);
      return sanitized as unknown as T;
    }

    if (Array.isArray(input)) {
      return input.map((item) => this.sanitizeDeepInternal(item, allowHtml)) as unknown as T;
    }

    if (typeof input === 'object' && !(input instanceof Date) && !(input instanceof Buffer)) {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
        sanitized[key] = this.sanitizeDeepInternal(value, allowHtml);
      }
      return sanitized as unknown as T;
    }

    // Numbers, booleans, Dates, Buffers, etc. — pass through unchanged
    return input;
  }
}