import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import "./util/env.ts";
import type {
  CampaignListItem,
  CampaignNarrationIndex,
  NarratedStep,
  NarrationScenarioIndex,
} from "../src/slices/shared/model";
import type {
  ArkhamCardsCampaignsFile,
  Narration,
} from "../src/slices/shared/model/arkhamCards.ts";
import { unique } from "../src/slices/shared/util";
import { languages } from "./util/i18n.ts";
import { CACHE_DIR, PUBLIC_DIR } from "./util/storage.ts";

function safeCampaignFilename(id: string) {
  return id.replaceAll("/", "_");
}

function parseCampaignsFile(raw: string, filename: string): ArkhamCardsCampaignsFile {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html") || trimmed.startsWith("<")) {
    throw new Error(
      `Expected JSON but got HTML in ${filename}. This usually means a 404/403 error page was cached.`,
    );
  }

  try {
    return JSON.parse(raw) as ArkhamCardsCampaignsFile;
  } catch (e) {
    const preview = trimmed.slice(0, 200).replaceAll("\n", "\\n");
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to parse JSON in ${filename}: ${msg}. Preview: "${preview}"`);
  }
}

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

function isNarratedStep(value: unknown): value is NarratedStep {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.type === "string" &&
    typeof v.narration === "object" &&
    v.narration !== null
  );
}

function toNarratedStep(value: unknown): NarratedStep | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  const narration = v.narration as Narration | undefined;
  if (!narration) return null;
  if (!Array.isArray(narration.lang) || narration.lang.length === 0) return null;
  if (typeof v.id !== "string" || typeof v.type !== "string") return null;

  return {
    id: v.id,
    type: v.type,
    title: typeof v.title === "string" ? v.title : undefined,
    text: typeof v.text === "string" ? v.text : undefined,
    narration,
  };
}

function collectNarratedSteps(root: unknown): NarratedStep[] {
  const out: NarratedStep[] = [];
  const seen = new Set<string>(); // prefer narration id as stable unique key

  const stack: unknown[] = [root];
  while (stack.length > 0) {
    const cur = stack.pop();

    const step = toNarratedStep(cur);
    if (step) {
      const key = step.narration.id || `${step.id}:${step.type}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(step);
      }
    }

    if (Array.isArray(cur)) {
      for (const item of cur) stack.push(item);
      continue;
    }

    if (cur && typeof cur === "object") {
      for (const val of Object.values(cur as Record<string, unknown>)) stack.push(val);
    }
  }

  return out.filter(isNarratedStep);
}

type ScenarioLike = {
  id: string;
  scenario_name?: string;
  full_name?: string;
  steps?: unknown[];
  [key: string]: unknown;
};

function isScenarioLike(value: unknown): value is ScenarioLike {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "string";
}

function toScenarioIndex(scenario: ScenarioLike): NarrationScenarioIndex | null {
  const steps = collectNarratedSteps(scenario);
  if (steps.length === 0) return null;

  return {
    id: scenario.id,
    name:
      (typeof scenario.scenario_name === "string" && scenario.scenario_name) ||
      (typeof scenario.full_name === "string" && scenario.full_name) ||
      scenario.id,
    steps,
  };
}

export async function run() {
  const srcDir = path.join(CACHE_DIR, "campaigns");
  const campaignsBaseDir = path.join(PUBLIC_DIR, "api", "campaigns");
  mkdirSync(campaignsBaseDir, { recursive: true });

  for (const language of languages) {
    console.log(`processing narration for ${language}...`);
    const filename = path.join(srcDir, `${language}.json`);
    const raw = readFileSync(filename, "utf8");
    let data: ArkhamCardsCampaignsFile;
    try {
      data = parseCampaignsFile(raw, filename);
    } catch (e) {
      console.error(`[keep-narration] ${language}: ${(e as Error).message}`);
      continue;
    }

    const outLangDir = path.join(campaignsBaseDir, language);
    mkdirSync(outLangDir, { recursive: true });

    const campaigns: CampaignListItem[] = data
      .map((entry) => {
        const campaign = entry.campaign;
        const scenariosRaw = (entry as Record<string, unknown>).scenarios;
        const scenarios = Array.isArray(scenariosRaw)
          ? (scenariosRaw
              .filter(isScenarioLike)
              .map(toScenarioIndex)
              .filter(Boolean) as NarrationScenarioIndex[])
          : [];

        // Keep narrated steps that live on campaign-level (outside scenarios) in a synthetic scenario.
        const scenarioNarrationIds = new Set<string>();
        for (const s of scenarios) {
          for (const step of s.steps) scenarioNarrationIds.add(step.narration.id);
        }
        const campaignSteps = collectNarratedSteps(campaign).filter(
          (s) => !scenarioNarrationIds.has(s.narration.id),
        );
        if (campaignSteps.length > 0) {
          scenarios.unshift({
            id: "campaign",
            name: "Campaign",
            steps: campaignSteps,
          });
        }

        if (scenarios.length === 0) return null;

        const langs = unique(
          scenarios.flatMap((s) => {
            return s.steps.flatMap((step) => step.narration.lang);
          }),
        );

        if (!langs.includes(language)) {
          return null;
        }

        const reduced: CampaignNarrationIndex = {
          id: campaign.id,
          name: campaign.name,
          position: campaign.position,
          scenarios,
        };

        return reduced;
      })
      .filter(isNotNull)
      .sort((a, b) => a.position - b.position);

    for (const c of campaigns) {
      const outCampaignFile = path.join(outLangDir, `${safeCampaignFilename(c.id)}.json`);
      writeFileSync(outCampaignFile, JSON.stringify(c, null, 2));
    }

    const listFile = path.join(campaignsBaseDir, `${language}.json`);
    writeFileSync(
      listFile,
      JSON.stringify(
        campaigns.map((c) => ({ id: c.id, name: c.name, position: c.position })),
        null,
        2,
      ),
    );
    console.log(`campaigns list saved: ${listFile} (${campaigns.length} campaigns)`);
  }
}

await run();
