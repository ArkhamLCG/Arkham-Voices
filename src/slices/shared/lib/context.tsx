import { createContext, useContext } from "react";
import { DEFAULT_LANGUAGE } from "../config";
import type { CampaignsListFile } from "../model";

type AppContextProps = {
  language: string;
  campaigns: CampaignsListFile;
  setLanguage: (language: string) => void;
  setCampaigns: (campaigns: CampaignsListFile) => void;
};

export const AppContext = createContext<AppContextProps>({
  language: DEFAULT_LANGUAGE,
  campaigns: [],
  setLanguage: () => {},
  setCampaigns: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}
