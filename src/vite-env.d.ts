/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_LANGUAGE_LIST: string;
  readonly VITE_ARKHAM_CARDS_REPOSITORY_BASE_URL: string;
  readonly VITE_NARRATION_BASE_URL: string;
  readonly VITE_RU_NARRATION_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
