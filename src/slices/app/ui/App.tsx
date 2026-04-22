import { Box, Stack } from "@mui/material";
import { CampaignPage } from "@pages/campaign";
import { HomePage } from "@pages/home";
import { NotFoundPage } from "@pages/not-found";
import { Header } from "@widgets/header";
import { Route, Router, Switch } from "wouter";
import { AppContextProvider, AppThemeProvider } from "../providers";

export function App() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <AppContextProvider>
        <AppThemeProvider>
          <Stack sx={{ flex: 1, minHeight: "100vh" }}>
            <Header />
            <Box
              component="main"
              sx={{
                flex: 1,
                minWidth: 0,
                py: { xs: 2, sm: 4 },
              }}
            >
              <Switch>
                <Route path="/:language/campaign/:campaignId" component={CampaignPage} />
                <Route path="/:language" component={HomePage} />
                <Route path="/" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Box>
          </Stack>
        </AppThemeProvider>
      </AppContextProvider>
    </Router>
  );
}
