import { Box } from "@mui/material";
import { useEffect } from "react";
import { Route, Switch } from "wouter";
import { HomePage } from "../../pages/home";
import { NotFoundPage } from "../../pages/not-found";
import { i18n } from "../../shared/config";
import { useAppStore } from "../../shared/lib";
import { Header } from "../../widgets/header";
import { AppThemeProvider } from "../providers";

export function App() {
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <AppThemeProvider>
      <Header />
      <Box component="main" sx={{ py: 4 }}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Box>
    </AppThemeProvider>
  );
}
