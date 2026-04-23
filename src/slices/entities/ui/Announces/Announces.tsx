import {
  appStoreHref,
  boostyUnlockLink,
  boostyVoiceHref,
  externalLink,
  patreonUnlockLink,
  playStoreHref,
  tBankVoiceHref,
} from "@entities/lib";
import { Alert, Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useAppContext } from "@shared/lib";
import { Row } from "@shared/ui";
import { useTranslation } from "react-i18next";

const paperSx = { p: 2, borderRadius: 2 } as const;

const publicAsset = (filename: string) => `${import.meta.env.BASE_URL}images/assets/${filename}`;

function StoreBadge({
  href,
  src,
  "aria-label": ariaLabel,
}: {
  href: string;
  src: string;
  "aria-label": string;
}) {
  return (
    <Link
      aria-label={ariaLabel}
      href={href}
      sx={{ display: "inline-flex", lineHeight: 0 }}
      underline="hover"
      {...externalLink}
    >
      <Box alt="" component="img" src={src} sx={{ display: "block", height: 30, width: "auto" }} />
    </Link>
  );
}

export function Announces() {
  const { t } = useTranslation();
  const { language } = useAppContext();
  const unlockHref = language === "ru" ? boostyUnlockLink : patreonUnlockLink;

  return (
    <Stack
      spacing={2}
      sx={{
        "@media print": { display: "none" },
        maxWidth: "100%",
        mx: "auto",
        pb: 3,
        width: "100%",
      }}
    >
      <Paper elevation={0} sx={paperSx} variant="outlined">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            columnGap: 2,
            rowGap: 2,
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Box>
            <Stack spacing={0.5}>
              <Typography color="text.secondary" variant="caption">
                {t("announces.appTagline")}
              </Typography>
              <Typography component="h2" sx={{ fontWeight: 600 }} variant="subtitle1">
                {t("announces.appTitle")}
              </Typography>
            </Stack>
          </Box>

          <Row
            sx={{
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-end" },
              flex: 1,
            }}
          >
            <StoreBadge
              aria-label="Google Play"
              href={playStoreHref}
              src={publicAsset("google-play.svg")}
            />
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <StoreBadge
                aria-label="App Store"
                href={appStoreHref}
                src={publicAsset("app-store.svg")}
              />
              <Box
                component="span"
                sx={{ display: "block", mt: 0.5, textAlign: "center", width: "100%" }}
              >
                <Link
                  href={unlockHref}
                  sx={{ display: "block" }}
                  underline="hover"
                  variant="body2"
                  {...externalLink}
                >
                  {t("announces.iosUnlock")}
                </Link>
              </Box>
            </Box>
          </Row>
        </Box>
      </Paper>

      {language === "ru" ? (
        <Paper elevation={0} sx={paperSx} variant="outlined">
          <Stack spacing={2}>
            <Alert severity="info" variant="outlined">
              Сообщество собирает средства на озвучку художественного текста в кампаниях и
              сценариях.
            </Alert>

            <Box>
              <Typography color="text.secondary" gutterBottom variant="subtitle2">
                Сбор на озвучку
              </Typography>
              <Typography variant="body2">
                <Link href={boostyVoiceHref} underline="hover" {...externalLink}>
                  Бусти
                </Link>{" "}
                (комиссия до 12%)
              </Typography>
              <Typography variant="body2">
                <Link href={tBankVoiceHref} underline="hover" {...externalLink}>
                  Т-Банк
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}
