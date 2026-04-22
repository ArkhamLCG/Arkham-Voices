/**
 * Types derived from `cache/campaigns/*.json`.
 *
 * Each locale file is a JSON array where every element looks like:
 * `{ "campaign": { ...campaign data... } }`
 *
 * In the app we usually work with the inner `Campaign` objects.
 */

/** Raw file shape as it exists in `cache/campaigns/*.json`. */
export type ArkhamCardsCampaignsFile = Array<{ campaign: Campaign }>;

export interface Campaign {
  id: string;
  name: string;
  position: number;
  version: number;

  tarot?: string[];
  campaign_type: string;

  campaign_log?: CampaignLogEntry[];
  scenarios?: string[];
  setup?: string[];

  steps: CampaignStep[];
  resolutions?: CampaignResolution[];

  /** Forward-compat: ArkhamCards can add more fields. */
  [key: string]: unknown;
}

export interface CampaignLogEntry {
  id: string;
  title: string;
  hidden?: boolean;
  [key: string]: unknown;
}

export type CampaignStep = InputStep | StoryStep | ResolutionStep | GenericStep;

export interface StepBase {
  id: string;
  type: string;
  title?: string;
  text?: string;
  bullet_type?: string;
  hidden?: boolean;
  [key: string]: unknown;
}

export interface StoryStep extends StepBase {
  type: "story";
  text: string;
  narration?: Narration;
}

export interface ResolutionStep extends StepBase {
  type: "resolution";
  resolution: string;
}

export interface InputStep extends StepBase {
  type: "input";
  input: InputDefinition;
}

export interface GenericStep extends StepBase {
  /** Any other step `type` we don't explicitly model yet. */
  type: Exclude<string, "story" | "resolution" | "input">;
}

export type InputDefinition =
  | ChooseOneInput
  | InvestigatorChoiceInput
  | ScenarioInvestigatorsInput
  | SaveDecksInput
  | UnknownInput;

export interface InputBase {
  type: string;
  [key: string]: unknown;
}

export interface ChooseOneInput extends InputBase {
  type: "choose_one";
  default_choice?: string;
  choices: Choice[];
}

export interface InvestigatorChoiceInput extends InputBase {
  type: "investigator_choice";
  source?: string;
  investigator?: string;
  choices: Choice[];
}

export interface ScenarioInvestigatorsInput extends InputBase {
  type: "scenario_investigators";
}

export interface SaveDecksInput extends InputBase {
  type: "save_decks";
  trauma?: boolean;
}

export interface UnknownInput extends InputBase {
  /** Keep this last to retain autocomplete for known variants. */
  type: Exclude<
    string,
    "choose_one" | "investigator_choice" | "scenario_investigators" | "save_decks"
  >;
}

export interface Choice {
  id: string;
  text: string;
  description?: string;
  tokens?: string[];
  effects?: Effect[];
  steps?: string[];
  [key: string]: unknown;
}

export interface Effect {
  type: string;
  [key: string]: unknown;
}

export interface Narration {
  id: string;
  name: string;
  lang: string[];
  [key: string]: unknown;
}

export interface CampaignResolution {
  id: string;
  title: string;
  description?: string;
  investigator_status?: string[];
  text?: string;
  hidden?: boolean;
  narration?: Narration;
  steps?: string[];
  [key: string]: unknown;
}
