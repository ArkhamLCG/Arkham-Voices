import { useAppContext } from "@shared/lib";
import { useEffect } from "react";

const ES_URL = import.meta.env.VITE_ES_URL;

export function useAllowedLanguage() {
  const { language } = useAppContext();
  useEffect(() => {
    if (language === "es") {
      window.location.href = ES_URL;
    }
  }, [language]);
}
