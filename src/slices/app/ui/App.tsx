import { Box, Stack } from "@mui/material";
import { CampaignPage } from "@pages/campaign";
import { HomePage } from "@pages/home";
import { NotFoundPage } from "@pages/not-found";
import { Header } from "@widgets/header";
import { Route, Switch } from "wouter";
import { AppContextProvider, AppThemeProvider, LanguageProvider } from "../providers";

export function App() {
  return (
    <AppContextProvider>
      <AppThemeProvider>
        <LanguageProvider>
          <Stack sx={{ flex: 1, minHeight: "100vh" }}>
            <Header />
            <Box component="main" sx={{ py: 4 }}>
              <Switch>
                <Route path="/:language/campaign/:campaignId" component={CampaignPage} />
                <Route path="/:language" component={HomePage} />
                <Route path="/" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Box>
          </Stack>
        </LanguageProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
}
