import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ascend, sortWith } from "ramda";
import type { ArkhamCardsCampaignsFile } from "../src/slices/shared/model/arkhamCards.ts";
import { CACHE_DIR } from "./util/storage.ts";

const OUT = path.join(process.cwd(), "src/slices/shared/config/languages.json");

/** One row in `cache/campaigns/*.json`: `campaign` plus optional `scenarios` blobs (см. keep-narration). */
type CampaignsFileEntry = ArkhamCardsCampaignsFile[number] & { scenarios?: unknown[] };

function uniqueNarrationLangsFromCampaignsFile(data: ArkhamCardsCampaignsFile): string[] {
  const codes = new Set<string>();
  const walk = (v: unknown) => {
    if (v === null || typeof v !== "object") return;
    if (Array.isArray(v)) {
      for (const x of v) walk(x);
      return;
    }
    const o = v as Record<string, unknown>;
    const n = o.narration;
    if (n && typeof n === "object" && !Array.isArray(n)) {
      const lang = (n as Record<string, unknown>).lang;
      if (Array.isArray(lang)) {
        for (const c of lang) {
          if (typeof c === "string" && c.length > 0) codes.add(c);
        }
      }
    }
    for (const x of Object.values(o)) walk(x);
  };

  for (const item of data as CampaignsFileEntry[]) {
    walk(item.campaign);
    if (Array.isArray(item.scenarios)) for (const s of item.scenarios) walk(s);
  }

  const list = [...codes].filter((code) => code !== "dv");
  return sortWith<string>([ascend((c) => (c === "en" ? 0 : 1)), ascend((c) => c)], list);
}

const input = path.join(CACHE_DIR, "campaigns", "en.json");
const data = JSON.parse(readFileSync(input, "utf8")) as ArkhamCardsCampaignsFile;
const languages = uniqueNarrationLangsFromCampaignsFile(data);

writeFileSync(OUT, JSON.stringify(languages, null, 2), "utf8");
console.log(`Wrote ${languages.length} codes → ${OUT}`);
console.log(languages.join(", "));
