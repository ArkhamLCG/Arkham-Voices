import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import "./env.ts";
import { fetchCampaignData } from "./api.ts";
import { CACHE_DIR } from "./storage.ts";

export async function run() {
  const rawLanguageList = process.env.VITE_APP_LANGUAGE_LIST ?? "";
  const languages = rawLanguageList
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const dir = path.join(CACHE_DIR, "campaigns");

  mkdirSync(dir, { recursive: true });

  for (const language of languages) {
    const data = await fetchCampaignData(language);
    const filename = path.join(dir, `${language}.json`);
    writeFileSync(filename, data);
  }
}

run();
