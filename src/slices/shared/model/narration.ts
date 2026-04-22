import type { Narration } from "./arkhamCards";

/**
 * Narration data derived from `cache/campaigns/*.json` and emitted by
 * `cli/keep-narration.ts` into `public/api/campaigns/<lang>.json` (list) and
 * `public/api/campaigns/<lang>/<campaignId>.json` (per-campaign, full `text`).
 */
export type CampaignListItem = {
  id: string;
  name: string;
  position: number;
  type: string;
  icon: string;
};

export type CampaignsListFile = CampaignListItem[];

export type NarratedStep = {
  id: string;
  type: string;
  title?: string;
  text?: string;
  narration: Narration;
};

export type CampaignNarrationIndex = {
  id: string;
  name: string;
  position: number;
  type: string;
  icon: string;
  scenarios: NarrationScenarioIndex[];
};

export type NarrationScenarioIndex = {
  id: string;
  name: string;
  steps: NarratedStep[];
  icon: string;
};
