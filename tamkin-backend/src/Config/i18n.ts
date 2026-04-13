import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import { join } from 'path';

const languages =['en', 'ar', 'tr', 'ur']

export const i18nInit = async () => {
  await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      supportedLngs: languages,
      preload: languages,

      ns: ['auth', 'token', 'main'],
      defaultNS: 'common',
      backend: {
        loadPath: join(__dirname, '../Locales/{{lng}}/{{ns}}.json'),
      },
      detection: {
        order: ['header'],
        lookupHeader: 'accept-language',
        caches: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18next;