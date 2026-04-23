import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languages } from "./languages.json";

export const AVAILABLE_LANGUAGES = languages;

export const LANGUAGE_LABELS: Record<string, string> = {
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

export const DEFAULT_LANGUAGE = "en";

void i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: AVAILABLE_LANGUAGES,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        app: { title: "Arkham Voices" },
        header: { language: "Language" },
        home: {
          lead: "Arkham Voices is where you can stream and download full narration for Arkham Horror: The Card Game—campaigns, scenarios, and the stories between them, all in one place.",
        },
        breadcrumbs: { home: "Home", campaigns: "Campaigns" },
        footer: {
          support: "Support the project",
          patreon: "Patreon",
          boosty: "Boosty",
        },
        announces: {
          appTagline: "My new project",
          appTitle: "Digital Investigator Board",
          iosUnlock: "iOS unlock",
        },
      },
    },
    ru: {
      translation: {
        app: { title: "Arkham Voices" },
        header: { language: "Язык" },
        home: {
          lead: "Arkham Voices — проект для прослушивания озвучки кампаний и сценариев для Карточного Ужаса Аркхэма.",
        },
        breadcrumbs: { home: "Главная", campaigns: "Кампании" },
        footer: {
          support: "Поддержка проекта",
          patreon: "Patreon",
          boosty: "Boosty",
          t: "T-Банк",
        },
        announces: {
          appTagline: "Мой новый проект",
          appTitle: "Цифровая планшет сыщика",
          iosUnlock: "Разблокировка",
        },
      },
    },
  },
});

export { i18n };
