import { createContext, useContext } from "react";
import { DEFAULT_LANGUAGE } from "../config";
import type { CampaignsListFile, IconEntry } from "../model";

type AppContextProps = {
  language: string;
  campaigns: CampaignsListFile;
  icons: Record<string, IconEntry>;
};

export const AppContext = createContext<AppContextProps>({
  language: DEFAULT_LANGUAGE,
  campaigns: [],
  icons: {},
});

export function useAppContext() {
  return useContext(AppContext);
}
