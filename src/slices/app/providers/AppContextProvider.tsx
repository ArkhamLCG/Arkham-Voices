import {
  AppContext,
  AVAILABLE_LANGUAGES,
  type CampaignsListFile,
  DEFAULT_LANGUAGE,
  type IconEntry,
  i18n,
} from "@shared";
import { fetchCampaigns, fetchIcons } from "@shared/api/client";
import { detectBrowserLanguage, useHashPathname } from "@shared/lib";
import { type PropsWithChildren, useEffect, useState } from "react";

export function AppContextProvider({ children }: PropsWithChildren) {
  const pathname = useHashPathname();
  const langFromPath = pathname.split("/").filter(Boolean)[0];
  const language = langFromPath || detectBrowserLanguage(AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE);

  const [campaigns, setCampaigns] = useState<CampaignsListFile>([]);
  const [icons, setIcons] = useState<Record<string, IconEntry>>({});

  useEffect(() => {
    i18n.changeLanguage(language);
    fetchCampaigns(language).then(setCampaigns);
  }, [language]);

  useEffect(() => {
    fetchIcons().then(setIcons);
  }, []);

  return (
    <AppContext.Provider value={{ language, campaigns, icons }}>{children}</AppContext.Provider>
  );
}
