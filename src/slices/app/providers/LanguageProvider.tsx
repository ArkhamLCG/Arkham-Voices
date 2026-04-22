import { DEFAULT_LANGUAGE, i18n } from "@shared/config";
import { useAppContext } from "@shared/lib";
import { type PropsWithChildren, useEffect } from "react";
import { useLocation } from "wouter";

export function LanguageProvider({ children }: PropsWithChildren) {
  const [pathname] = useLocation();
  const language = pathname.split("/").filter(Boolean)[0] || DEFAULT_LANGUAGE;
  const ctx = useAppContext();

  useEffect(() => {
    i18n.changeLanguage(language);
    ctx.setLanguage(language);
  }, [language, ctx.setLanguage]);

  return children;
}
