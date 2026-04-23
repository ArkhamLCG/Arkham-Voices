import { AppContext, type CampaignsListFile, DEFAULT_LANGUAGE, i18n } from "@shared";
import { fetchCampaigns } from "@shared/api/client";
import { useHashPathname } from "@shared/lib";
import { type PropsWithChildren, useEffect, useState } from "react";

export function AppContextProvider({ children }: PropsWithChildren) {
  const pathname = useHashPathname();
  const language = pathname.split("/").filter(Boolean)[0] || DEFAULT_LANGUAGE;

  const [campaigns, setCampaigns] = useState<CampaignsListFile>([]);

  useEffect(() => {
    i18n.changeLanguage(language);
    fetchCampaigns(language).then(setCampaigns);
  }, [language]);

  return <AppContext.Provider value={{ language, campaigns }}>{children}</AppContext.Provider>;
}
