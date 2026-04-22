import { createContext, useContext } from "react";
import { DEFAULT_LANGUAGE } from "../config";
import type { CampaignsListFile } from "../model";

type AppContextProps = {
  language: string;
  campaigns: CampaignsListFile;
};

export const AppContext = createContext<AppContextProps>({
  language: DEFAULT_LANGUAGE,
  campaigns: [],
});

export function useAppContext() {
  return useContext(AppContext);
}
