import { AppContext, type CampaignsListFile, DEFAULT_LANGUAGE } from "@shared";
import { fetchCampaigns } from "@shared/api/client";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "wouter";

export function AppContextProvider({ children }: PropsWithChildren) {
  const [pathname] = useLocation();
  const language = pathname.split("/").filter(Boolean)[0] || DEFAULT_LANGUAGE;

  const [campaigns, setCampaigns] = useState<CampaignsListFile>([]);

  useEffect(() => {
    fetchCampaigns(language).then(setCampaigns);
  }, [language]);

  return <AppContext.Provider value={{ language, campaigns }}>{children}</AppContext.Provider>;
}
