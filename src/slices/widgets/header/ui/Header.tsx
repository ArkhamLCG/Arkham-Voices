import TranslateIcon from "@mui/icons-material/Translate";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { AVAILABLE_LANGUAGES, type AvailableLanguage, LANGUAGE_LABELS } from "@shared/config";
import { useAppContext } from "@shared/lib";
import { useTranslation } from "react-i18next";
import { navigate } from "wouter/use-browser-location";

export function Header() {
  const { t, i18n } = useTranslation();
  const { language } = useAppContext();

  const onChangeLanguage = async (next: AvailableLanguage) => {
    await i18n.changeLanguage(next);
    navigate(`/${next}`);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {t("app.title", "Arkham Voices")}
          </Typography>

          <Box sx={{ flex: 1 }} />

          <IconButton
            aria-label={t("header.language", "Language")}
            color="inherit"
            size="small"
            disabled
          >
            <TranslateIcon fontSize="small" />
          </IconButton>

          <Select
            size="small"
            value={language}
            onChange={(e) => void onChangeLanguage(e.target.value as AvailableLanguage)}
            aria-label={t("header.language", "Language")}
            sx={{ minWidth: 160 }}
          >
            {AVAILABLE_LANGUAGES.map((lng) => (
              <MenuItem key={lng} value={lng}>
                {LANGUAGE_LABELS[lng]}
              </MenuItem>
            ))}
          </Select>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
