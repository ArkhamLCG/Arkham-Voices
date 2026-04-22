import { AppContext, type CampaignsListFile, DEFAULT_LANGUAGE } from "@shared";
import { type PropsWithChildren, useState } from "react";

export function AppContextProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [campaigns, setCampaigns] = useState<CampaignsListFile>([]);

  return (
    <AppContext.Provider value={{ language, campaigns, setLanguage, setCampaigns }}>
      {children}
    </AppContext.Provider>
  );
}
