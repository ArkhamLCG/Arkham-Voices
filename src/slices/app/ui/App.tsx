import { Box, Stack } from "@mui/material";
import { CampaignPage } from "@pages/campaign";
import { HomePage } from "@pages/home";
import { NotFoundPage } from "@pages/not-found";
import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { AppContextProvider, AppThemeProvider } from "../providers";

export function App() {
  return (
    <Router hook={useHashLocation}>
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
            <Footer />
          </Stack>
        </AppThemeProvider>
      </AppContextProvider>
    </Router>
  );
}
