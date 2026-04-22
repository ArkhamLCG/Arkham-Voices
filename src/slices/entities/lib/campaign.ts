import type { NarrationScenarioIndex } from "@shared/model";

export const isReturnCampaign = (code: string) => code.startsWith("rt");

export const filterSideScenarios = (scenario: NarrationScenarioIndex) => {
  return (
    !scenario.id.startsWith("fortune_and_folly") &&
    !["the_nights_usurper", "the_eternal_slumber"].includes(scenario.id)
  );
};
