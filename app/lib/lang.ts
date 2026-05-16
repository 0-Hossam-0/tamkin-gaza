export const DEFAULT_LANG = 'ar';
export const SUPPORTED_LANGS = ['ar', 'en', 'tr', 'ur'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function getLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = localStorage.getItem('lang');
  if (stored && SUPPORTED_LANGS.includes(stored as Lang)) return stored as Lang;
  return DEFAULT_LANG;
}

export function setLang(lang: Lang): void {
  localStorage.setItem('lang', lang);
}

export function langHeaders(): Record<string, string> {
  return { 'Accept-Language': getLang() };
}
