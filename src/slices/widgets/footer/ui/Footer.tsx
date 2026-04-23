import { Box, Container, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PATREON_URL = "https://www.patreon.com/arkhamdivider";
const BOOSTY_URL = "https://boosty.to/arkham.divider";

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
        py: { xs: 2, sm: 2.5 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            gap: 1.5,
            justifyContent: "center",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography color="text.secondary" variant="body2">
            {t("footer.support", "Support the project")}
          </Typography>
          <Box
            component="span"
            sx={{
              alignItems: "center",
              display: "inline-flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            <Link
              color="primary"
              href={PATREON_URL}
              rel="noopener noreferrer"
              target="_blank"
              underline="hover"
              variant="body2"
            >
              {t("footer.patreon", "Patreon")}
            </Link>
            <Typography aria-hidden color="text.disabled" component="span" variant="body2">
              ·
            </Typography>
            <Link
              color="primary"
              href={BOOSTY_URL}
              rel="noopener noreferrer"
              target="_blank"
              underline="hover"
              variant="body2"
            >
              {t("footer.boosty", "Boosty")}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
