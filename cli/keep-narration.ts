import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import "./util/env.ts";
import { ascend, pick, sortWith } from "ramda";
import icons from "../cache/icons.json";
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
import { languages } from "./util/i18n.ts";
import { CACHE_DIR, PUBLIC_DIR } from "./util/storage.ts";

const findIcon = (id: string, campaignId?: string) => {
  if (id === "campaign" && campaignId) {
    return icons[campaignId] || campaignId;
  }
  return icons[id] || id;
};

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
  if (typeof v.id !== "string") return null;

  const typeRaw = v.type;
  const type =
    typeof typeRaw === "string"
      ? typeRaw
      : // Some story steps in ArkhamCards caches omit `"type": "story"`, but still have narration + text.
        "story";

  return {
    id: v.id,
    type,
    title: typeof v.title === "string" ? v.title : undefined,
    text: typeof v.text === "string" ? v.text : undefined,
    narration,
  };
}

function collectNarratedSteps(root: unknown): NarratedStep[] {
  const out: NarratedStep[] = [];
  const seen = new Set<string>(); // prefer narration id as stable unique key

  const walk = (cur: unknown) => {
    const step = toNarratedStep(cur);
    if (step) {
      const key = step.narration.id || `${step.id}:${step.type}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(step);
      }
    }

    if (Array.isArray(cur)) {
      for (const item of cur) walk(item);
      return;
    }

    if (cur && typeof cur === "object") {
      const obj = cur as Record<string, unknown>;
      for (const k of Object.keys(obj)) walk(obj[k]);
    }
  };

  walk(root);

  return out.filter(isNarratedStep);
}

/** `collectNarratedSteps` uses a LIFO graph walk and is not in source-JSON order. Prefer `steps[]` as written in cache. */
function narratedStepsFromNode(node: unknown): NarratedStep[] {
  if (node && typeof node === "object" && "steps" in (node as object)) {
    const stepsRaw = (node as { steps?: unknown[] }).steps;
    if (Array.isArray(stepsRaw) && stepsRaw.length > 0) {
      const keyOf = (s: NarratedStep) => s.narration.id || `${s.id}:${s.type}`;
      const ordered: NarratedStep[] = [];
      const seen = new Set<string>();
      for (const item of stepsRaw) {
        const step = toNarratedStep(item);
        if (step) {
          const k = keyOf(step);
          if (!seen.has(k)) {
            seen.add(k);
            ordered.push(step);
          }
        }
      }
      if (ordered.length > 0) {
        const inOrdered = new Set(ordered.map(keyOf));
        const extra = collectNarratedSteps(node).filter((s) => !inOrdered.has(keyOf(s)));
        return [...ordered, ...extra];
      }
    }
  }
  return collectNarratedSteps(node);
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

function orderScenariosByCampaign(scenarios: ScenarioLike[], order: unknown): ScenarioLike[] {
  if (!Array.isArray(order) || order.length === 0) return scenarios;
  const orderIds = order.filter((x): x is string => typeof x === "string");
  if (orderIds.length === 0) return scenarios;

  const byId = new Map<string, ScenarioLike>();
  for (const s of scenarios) {
    if (!byId.has(s.id)) byId.set(s.id, s);
  }

  const out: ScenarioLike[] = [];
  const used = new Set<string>();
  for (const id of orderIds) {
    const hit = byId.get(id);
    if (hit) {
      out.push(hit);
      used.add(id);
    }
  }

  // Keep any extra scenarios (unknown to `campaign.scenarios`) at the end, preserving input order.
  for (const s of scenarios) {
    if (!used.has(s.id)) out.push(s);
  }

  return out;
}

function toScenarioIndex(
  scenario: ScenarioLike,
  campaignId: string,
): NarrationScenarioIndex | null {
  const steps = narratedStepsFromNode(scenario);
  if (steps.length === 0) return null;

  return {
    id: scenario.id,
    name:
      (typeof scenario.scenario_name === "string" && scenario.scenario_name) ||
      (typeof scenario.full_name === "string" && scenario.full_name) ||
      scenario.id,
    steps,
    icon: findIcon(scenario.id, campaignId),
  };
}

function filterScenariosByLanguage(
  scenarios: NarrationScenarioIndex[],
  language: string,
): NarrationScenarioIndex[] {
  return scenarios
    .map((s) => ({
      ...s,
      steps: s.steps.filter((step) => step.narration.lang.includes(language)),
    }))
    .filter((s) => s.steps.length > 0);
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
        const scenarioLikes = Array.isArray(scenariosRaw)
          ? scenariosRaw.filter(isScenarioLike)
          : [];
        const orderedScenarioLikes = orderScenariosByCampaign(scenarioLikes, campaign.scenarios);
        const scenarios =
          orderedScenarioLikes.length > 0
            ? (orderedScenarioLikes
                .map((s) => toScenarioIndex(s, campaign.id))
                .filter(Boolean) as NarrationScenarioIndex[])
            : [];

        // Keep narrated steps that live on campaign-level (outside scenarios) in a synthetic scenario.
        const scenarioNarrationIds = new Set<string>();
        for (const s of scenarios) {
          for (const step of s.steps) scenarioNarrationIds.add(step.narration.id);
        }
        const campaignSteps = narratedStepsFromNode(campaign).filter(
          (s) => !scenarioNarrationIds.has(s.narration.id),
        );
        if (campaignSteps.length > 0) {
          scenarios.unshift({
            id: "campaign",
            name: "Campaign",
            steps: campaignSteps,
            icon: findIcon(campaign.id),
          });
        }

        const scenariosForLanguage = filterScenariosByLanguage(scenarios, language);

        if (scenariosForLanguage.length === 0) {
          return null;
        }

        const reduced: CampaignNarrationIndex = {
          id: campaign.id,
          name: campaign.name,
          position: campaign.position,
          type: campaign.campaign_type,
          scenarios: scenariosForLanguage,
          icon: findIcon(campaign.id),
        };

        return reduced;
      })
      .filter(isNotNull);
    // .sort((a, b) => {
    //   const aSide = Number(a.id === "side");
    //   const bSide = Number(b.id === "side");
    //   if (aSide !== bSide) return aSide - bSide;
    //   return a.position - b.position;
    // });
    const sortedCampaigns = sortWith(
      [
        ascend((c) => c.type),
        ascend((c) => c.position),
        ascend((c) => c.id === "side"),
        ascend((c) => c.position),
        ascend((c) => c.id.startsWith("rt")),
      ],
      campaigns,
    );

    for (const c of sortedCampaigns) {
      const outCampaignFile = path.join(outLangDir, `${safeCampaignFilename(c.id)}.json`);
      writeFileSync(outCampaignFile, JSON.stringify(c, null, 2));
    }

    const listFile = path.join(campaignsBaseDir, `${language}.json`);
    const campaignsList = sortedCampaigns.map(pick(["id", "name", "position", "type", "icon"]));

    writeFileSync(listFile, JSON.stringify(campaignsList, null, 2));
    console.log(`campaigns list saved: ${listFile} (${campaigns.length} campaigns)`);
  }
}

await run();
