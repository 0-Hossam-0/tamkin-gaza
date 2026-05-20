export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

function getCookieValue(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

/** True when access_token is present (refresh_token may be httpOnly-only). */
export function hasAuthCookies(cookieHeader: string): boolean {
  return Boolean(getCookieValue(cookieHeader, ACCESS_TOKEN_COOKIE));
}

export function hasAuthCookiesFromDocument(): boolean {
  if (typeof document === 'undefined') return false;
  return hasAuthCookies(document.cookie);
}
