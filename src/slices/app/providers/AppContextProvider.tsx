import {
  AppContext,
  AVAILABLE_LANGUAGES,
  type CampaignsListFile,
  DEFAULT_LANGUAGE,
  i18n,
} from "@shared";
import { fetchCampaigns } from "@shared/api/client";
import { detectBrowserLanguage, useHashPathname } from "@shared/lib";
import { type PropsWithChildren, useEffect, useState } from "react";

export function AppContextProvider({ children }: PropsWithChildren) {
  const pathname = useHashPathname();
  const langFromPath = pathname.split("/").filter(Boolean)[0];
  const language = langFromPath || detectBrowserLanguage(AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE);

  const [campaigns, setCampaigns] = useState<CampaignsListFile>([]);

  useEffect(() => {
    i18n.changeLanguage(language);
    fetchCampaigns(language).then(setCampaigns);
  }, [language]);

  return <AppContext.Provider value={{ language, campaigns }}>{children}</AppContext.Provider>;
}
