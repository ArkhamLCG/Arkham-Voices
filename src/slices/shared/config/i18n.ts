import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const AVAILABLE_LANGUAGES = process.env.VITE_APP_LANGUAGE_LIST?.split(",") ?? [];

export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<AvailableLanguage, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ko: "한국어",
  pl: "Polski",
  pt: "Português",
  ru: "Русский",
  vi: "Tiếng Việt",
  zh: "中文",
  zh_cn: "中文 (简体)",
};

void i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: AVAILABLE_LANGUAGES,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        app: { title: "Arkham Voices" },
        header: { language: "Language" },
      },
    },
    ru: {
      translation: {
        app: { title: "Arkham Voices" },
        header: { language: "Язык" },
      },
    },
  },
});

export { i18n };
