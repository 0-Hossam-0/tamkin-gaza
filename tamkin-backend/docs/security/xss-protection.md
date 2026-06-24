# XSS Protection in Tamkin-Backend

This document explains how Cross-Site Scripting (XSS) attacks are prevented in the Tamkin backend. The protection uses a **defense-in-depth** strategy with three complementary layers.

---

## Table of Contents

1. [Overview](#overview)
2. [Layer 1 — Input Sanitization via `XssService`](#layer-1--input-sanitization-via-xssservice)
3. [Layer 2 — Global Validation Pipe Integration](#layer-2--global-validation-pipe-integration)
4. [Layer 3 — HTTP Headers via Helmet (Defense-in-Depth)](#layer-3--http-headers-via-helmet-defense-in-depth)
5. [How It Works End-to-End](#how-it-works-end-to-end)
6. [What Gets Stripped](#what-gets-stripped)
7. [Security Considerations](#security-considerations)

---

## Overview

The XSS protection strategy is built on three layers:

| Layer | Component | Purpose |
|-------|-----------|---------|
| **1** | `XssService` | Core sanitization engine — strips HTML/JS from strings |
| **2** | `CustomValidationPipe` | Automatically applies sanitization to **all** incoming request bodies |
| **3** | `helmet` middleware | Sets strict HTTP headers (CSP, etc.) to mitigate browser-based XSS even if sanitization fails |

---

## Layer 1 — Input Sanitization via `XssService`

**File:** `src/Common/Services/Security/Xss/xss.service.ts`

### What it does

`XssService` wraps the [`xss` npm library](https://www.npmjs.com/package/xss) (version `^1.0.15`) — a whitelist-based HTML sanitizer.

### Configuration

```ts
private readonly xssOptions: xss.IFilterXSSOptions = {
  whiteList: {},            // Allow NO HTML tags
  stripIgnoreTag: true,      // Strip tags not in the whitelist (all of them)
  stripIgnoreTagBody: true,  // Strip the body/content of ignored tags too
  allowCommentTag: false,    // Disallow HTML comments
  css: false,                // Disallow any CSS
};
```

The `whiteList` is set to an **empty object** `{}`. This means **no HTML tags whatsoever** are permitted — not even `<b>`, `<i>`, or `<a>`. Any HTML tag is stripped entirely, including its content when `stripIgnoreTagBody` is `true`.

### Methods

#### `sanitize(value: string): string`
Sanitizes a single string. If the value is not a string, it returns it unchanged.

#### `sanitizeDeep<T>(input: T): T`
Recursively walks through an object/array and sanitizes every string value. It handles:

| Type | Behavior |
|------|----------|
| `string` | Sanitized via `xss.filterXSS()` |
| `Array` | Each element sanitized recursively |
| `Object` | Each property value sanitized recursively |
| `number`, `boolean` | Passed through unchanged |
| `Date`, `Buffer` | Passed through unchanged (safe types) |
| `null`, `undefined` | Returned as-is |

This is a **non-mutating** operation — it creates a new object rather than modifying the original.

---

## Layer 2 — Global Validation Pipe Integration

**File:** `src/Common/Pipes/custom.validation.pipe.ts`

### How XSS is injected into the request pipeline

`CustomValidationPipe` extends NestJS's built-in `ValidationPipe` and overrides its `transform()` method:

```ts
async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
  // Step 1: Run class-validator & class-transformer (whitelist, forbidNonWhitelisted, transform)
  const transformedValue = await super.transform(value, metadata);

  // Step 2: Deeply sanitize all strings against XSS
  const sanitizedValue = this.xssService.sanitizeDeep(transformedValue);

  // Step 3: Re-validate sanitized data to ensure it still meets DTO constraints
  if (sanitizedValue && typeof sanitizedValue === 'object' && metadata.metatype) {
    const errors = await validate(sanitizedValue as object);
    if (errors.length > 0) {
      throw this.exceptionFactory(errors);
    }
  }

  return sanitizedValue;
}
```

**Order of execution:**
1. NestJS's built-in validation runs first:
   - `whitelist: true` — strips unknown properties
   - `forbidNonWhitelisted: true` — rejects unknown properties as errors
   - `transform: true` — converts plain JSON into typed class instances
2. **After** initial validation succeeds, `xssService.sanitizeDeep()` is called on the validated (and transformed) object to strip any malicious HTML/JS from string values
3. **Re-validation** — The sanitized object is validated again against the DTO constraints to ensure the sanitized data still meets all validation rules (e.g., `@MinLength`, `@Matches`, `@IsString`, etc.)

### Registration

`CustomValidationPipe` is injected with `XssService` via constructor injection:

```ts
constructor(
  @Inject(REQUEST) private readonly request: IRequest,
  private readonly translationService: TranslationService,
  private readonly responseService: ResponseService,
  private readonly xssService: XssService,  // <-- XSS sanitizer
)
```

### Why Re-validation After Sanitization?

Sanitization can change the content of string fields by stripping HTML tags. This may cause the sanitized data to fail validation constraints that were passing before sanitization. For example:

| Scenario | Before Sanitization | After Sanitization | Validation Result |
|----------|---------------------|--------------------|-------------------|
| `@MinLength(10)` | `<b>hello world</b>` (17 chars) | `hello world` (11 chars) | ✅ Still passes |
| `@MinLength(10)` | `<b>hi</b>` (9 chars) | `hi` (2 chars) | ❌ Fails after sanitization |
| `@Matches(/^[a-z]+$/)` | `<script>hello</script>` | `hello` | ✅ Now passes (was failing) |
| `@IsNotEmpty()` | `<p>   </p>` | `   ` (whitespace) | ❌ May fail if trimmed |

The re-validation step ensures that **only data that passes all DTO constraints after sanitization** reaches the controller, providing an additional layer of data integrity.

`XssService` is provided and exported by `CommonModule` (`src/Common/common.module.ts`), making it injectable into the pipe. Because `CustomValidationPipe` is registered as a global pipe, **every incoming request body** automatically goes through XSS sanitization.

---

## Layer 3 — HTTP Headers via Helmet (Defense-in-Depth)

**File:** `src/main.ts`

Even with server-side sanitization, Helmet's `contentSecurityPolicy` is configured as a **third line of defense** to prevent browser-based XSS execution if sanitization somehow fails:

```ts
helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
    },
  },
  xssFilter: true,
  frameguard: { action: 'deny' },
  noSniff: true,
  // ... other security headers
});
```

**Key XSS-relevant directives:**

| Directive | Value | Effect |
|-----------|-------|--------|
| `scriptSrc` | `["'self'"]` | Only scripts from the same origin can execute. Blocks inline scripts and `eval()`. |
| `defaultSrc` | `["'none'"]` | Everything else is blocked by default |
| `frameAncestors` | `["'none'"]` | Prevents clickjacking |
| `formAction` | `["'self'"]` | Forms can only submit to the same origin |
| `xssFilter` | `true` | Enables the browser's legacy reflected XSS filter (X-XSS-Protection) |

---

## How It Works End-to-End

```
Client Request (POST /api/endpoint)
        │
        ▼
  1. HTTP Middleware (cookie-parser, CSRF double-cookie check)
        │
        ▼
  2. CustomValidationPipe.transform()
        │
        ├─ 2a. super.transform() → class-validator validates DTO
        │       - whitelist: strips unknown properties
        │       - forbidNonWhitelisted: throws if unknown props present
        │       - transform: converts JSON → typed class instance
        │
        ├─ 2b. xssService.sanitizeDeep(transformedValue)
        │       - Recursively walks the entire object
        │       - Strips ALL HTML/JS from every string property
        │       - Returns a new sanitized object (non-mutating)
        │
        ├─ 2c. Re-validate sanitized object against DTO
        │       - Runs class-validator again on sanitized data
        │       - Ensures sanitized data still meets all constraints
        │       - Throws validation error if constraints fail
        │
        ▼
  3. Controller handler receives sanitized, validated data
        │
        ▼
  4. Response sent back with strict CSP headers (helmet)
```

**Result:** An attacker cannot inject `<script>alert('xss')</script>` into any string field — it will be stripped down to `alert('xss')` (just text, no HTML).

---

## What Gets Stripped

| Input | Output | Explanation |
|-------|--------|-------------|
| `<script>alert(1)</script>` | `alert(1)` | Tag + body stripped, text content remains |
| `hello <b>world</b>` | `hello world` | Tag stripped, text content remains |
| `<!-- comment -->` | `` (empty string) | HTML comments disallowed |
| `<a href="http://evil.com">click</a>` | `click` | Tag stripped, text content remains |
| `<img src=x onerror=alert(1)>` | `` (empty string) | Tag stripped, no attributes allowed |
| `<svg onload=alert(1)>` | `` (empty string) | SVG tags stripped like any other tag |
| `javascript:alert(1)` | `javascript:alert(1)` | Not HTML — passed through as-is (mitigated by CSP) |
| `normal text` | `normal text` | Unchanged |

> **Note:** The sanitizer works at the **HTML/XML level** — it strips HTML tags and attributes. Non-HTML payloads (e.g., `javascript:` in a URL context) are not removed by the sanitizer but are mitigated by Content Security Policy headers (`scriptSrc: ["'self'"]` prevents `javascript:` URLs in `<a>` tags from executing in modern browsers).

---

## Security Considerations

### Strengths
- **Recursive sanitization** — deeply nested objects are fully covered
- **Non-mutating** — original input objects are not modified
- **Zero-trust whitelist** — no tags allowed, not even "safe" ones like `<b>` or `<i>`
- **Defense-in-depth** — sanitization + CSP + other helmet headers
- **Applied globally** — every endpoint benefits automatically without manual decorators
- **Post-sanitization validation** — ensures sanitized data still meets all DTO constraints

### Limitations
- **Request body only** — `CustomValidationPipe` only sanitizes request bodies (POST/PUT/PATCH). Query parameters and route path parameters are **not** automatically sanitized by this pipe. If they are reflected in responses or stored, additional sanitization should be applied.
- **`javascript:` URLs** — The sanitizer does not remove `javascript:` protocol strings since they are valid text. CSP's `scriptSrc` directive is relied upon to prevent execution.
- **`unsafe-inline` for styles** — CSP allows `'unsafe-inline'` for `styleSrc`. This is a common trade-off in SPAs but slightly reduces CSP's XSS protection for inline styles.
- **Database read-back** — Data is sanitized on input. If data is later rendered in a web view without escaping, it is already safe (HTML tags stripped). However, the frontend should still use proper output escaping as a best practice.
- **Safe types passed through** — Numbers, booleans, Dates, and Buffers are not sanitized. This is safe because these types cannot contain HTML.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `xss` | `^1.0.15` | HTML sanitization engine |
| `helmet` | `^8.1.0` | HTTP security headers (CSP, etc.) |

---

## Files Involved

| File | Role |
|------|------|
| `src/Common/Services/Security/Xss/xss.service.ts` | Core XSS sanitization service |
| `src/Common/Pipes/custom.validation.pipe.ts` | Global validation pipe that invokes XSS sanitization |
| `src/Common/common.module.ts` | Declares and exports `XssService` as a provider |
| `src/main.ts` | Configures helmet CSP headers globally |

---
*Last updated: June 2026*