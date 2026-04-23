import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "@shared";
import { detectBrowserLanguage } from "@shared/lib";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function RootRedirectPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const next = detectBrowserLanguage(AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE);
    navigate(`/${next}`, { replace: true });
  }, [navigate]);

  return null;
}
