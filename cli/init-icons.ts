import { mkdirSync, writeFileSync } from "node:fs";
import "./util/env";
import path from "node:path";
import type { ArkhamDivider } from "arkham-divider-data";
import { CACHE_DIR } from "./util/storage";

const baseUrl = process.env.VITE_ARKHAM_DIVIDER_DATA_URL;
const url = `${baseUrl}/core.json`;

const outFile = path.join(CACHE_DIR, "icons.json");

export async function run() {
  if (!url) {
    throw new Error("VITE_ARKHAM_DIVIDER_DATA_URL is not set");
  }
  const response = await fetch(url);
  const { stories }: ArkhamDivider.Core = await response.json();

  const iconMapping: Record<string, string> = {
    tdea: "dream",
    tdeb: "dream",
    gob: "guardians",
  };
  for (const story of stories) {
    if (story.icon) {
      iconMapping[story.code] = story.icon;
    }
    const { scenarios = [], scenario } = story;
    const storyScenarios = [...scenarios, ...(scenario ? [scenario] : [])];
    for (const scenario of storyScenarios) {
      if (scenario.icon) {
        iconMapping[scenario.id] = scenario.icon;
      }
    }
  }
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(outFile, JSON.stringify(iconMapping, null, 2));
}

run();
