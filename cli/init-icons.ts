import { mkdirSync, writeFileSync } from "node:fs";
import "./util/env";
import path from "node:path";
import type { ArkhamDivider } from "arkham-divider-data";
import { CACHE_DIR, PUBLIC_DIR } from "./util/storage";

const baseUrl = process.env.VITE_ARKHAM_DIVIDER_DATA_URL;
const url = `${baseUrl}/core.json`;

const outFile = path.join(CACHE_DIR, "icons.json");
const iconsFile = path.join(PUBLIC_DIR, "icons", "icons.json");

export async function run() {
  if (!url) {
    throw new Error("VITE_ARKHAM_DIVIDER_DATA_URL is not set");
  }
  const response = await fetch(url);
  const { stories, icons }: ArkhamDivider.Core = await response.json();

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
  const mapping = {
    ...iconMapping,
    core: "core",
  };
  mkdirSync(path.join(PUBLIC_DIR, "icons"), { recursive: true });
  mkdirSync(CACHE_DIR, { recursive: true });

  type IconEntry = (typeof icons)[number];

  const iconEntryMapping: Record<string, IconEntry> = icons.reduce(
    (acc, icon) => {
      acc[icon.icon] = icon;
      return acc;
    },
    {} as Record<string, IconEntry>,
  );

  writeFileSync(iconsFile, JSON.stringify(iconEntryMapping, null, 2));
  writeFileSync(outFile, JSON.stringify(mapping, null, 2));
}

run();
