import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import "./util/env.ts";
import { fetchCampaignData } from "./util/api.ts";
import { languages } from "./util/i18n.ts";
import { CACHE_DIR } from "./util/storage.ts";

export async function run() {
  const dir = path.join(CACHE_DIR, "campaigns");

  mkdirSync(dir, { recursive: true });

  for (const language of languages) {
    try {
      const data = await fetchCampaignData(language);
      const filename = path.join(dir, `${language}.json`);
      writeFileSync(filename, data);
    } catch (e) {
      console.error(`[download-campaigns] ${language}: ${(e as Error).message}`);
    }
  }
}

run();
