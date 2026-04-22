const rawLanguageList = process.env.VITE_APP_LANGUAGE_LIST ?? "";
export const languages = rawLanguageList
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
