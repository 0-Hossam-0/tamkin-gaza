import languagesConfig from '../../../Config/Language/language.json';

type ElementType = (typeof languagesConfig)[number];

export type LanguageCode = keyof ElementType;

export const SUPPORTED_LANGUAGES = languagesConfig.flatMap((obj) =>
  Object.keys(obj),
) as LanguageCode[];
