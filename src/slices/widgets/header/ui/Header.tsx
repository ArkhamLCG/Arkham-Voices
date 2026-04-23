import TranslateIcon from "@mui/icons-material/Translate";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Link as MuiLink,
  Select,
  Toolbar,
} from "@mui/material";
import { AVAILABLE_LANGUAGES, LANGUAGE_LABELS } from "@shared/config";
import { useAppContext } from "@shared/lib";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

export function Header() {
  const { t, i18n } = useTranslation();
  const { language } = useAppContext();
  const [, navigate] = useLocation();

  const onChangeLanguage = async (next: string) => {
    await i18n.changeLanguage(next);
    navigate(`/${next}`);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        backgroundImage: "none",
        borderBottom: 1,
        borderColor: "divider",
        paddingBlock: 1,
      }}
    >
      <Toolbar disableGutters variant="dense">
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            justifyContent: "space-between",
            width: 1,
            maxWidth: "100%",
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.75, sm: 0.5 },
          }}
        >
          <MuiLink
            color="inherit"
            component={Link}
            href={`/${language}`}
            noWrap
            underline="none"
            variant="h6"
            aria-label={t("header.home", "Home")}
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              minWidth: 0,
              flex: "1 1 0",
              pr: 1,
              WebkitTapHighlightColor: "transparent",
              "&:visited": { color: "inherit" },
              "&:active": { color: "inherit" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            {t("app.title", "Arkham Voices")}
          </MuiLink>

          <Box sx={{ alignItems: "center", display: "flex", flexShrink: 0, gap: 0.5 }}>
            <IconButton
              aria-label={t("header.language", "Language")}
              color="inherit"
              size="small"
              disabled
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <TranslateIcon fontSize="small" />
            </IconButton>
            <Select
              size="small"
              value={language}
              onChange={(e) => void onChangeLanguage(String(e.target.value))}
              aria-label={t("header.language", "Language")}
              sx={{ minWidth: { xs: 110, sm: 160 } }}
            >
              {AVAILABLE_LANGUAGES.map((lng) => (
                <MenuItem key={lng} value={lng}>
                  {LANGUAGE_LABELS[lng]}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
