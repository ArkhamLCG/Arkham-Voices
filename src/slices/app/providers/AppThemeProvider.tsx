import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    // Slightly above default MUI dark (#121212) — muted eldritch / card-table feel
    primary: { main: "#5e8f82", light: "#7fae9e", dark: "#3d655c" },
    secondary: { main: "#8f7a5c", light: "#a69378", dark: "#6a5a44" },
    background: {
      default: "#1b211f",
      paper: "#252b29",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.9)",
      secondary: "rgba(255, 255, 255, 0.68)",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
});

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
