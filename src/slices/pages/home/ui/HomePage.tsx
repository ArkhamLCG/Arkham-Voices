import { useAllowedLanguage } from "@entities/lib";
import { Announces, CategoriesList } from "@entities/ui";
import { Box, Container, Stack, Typography } from "@mui/material";
import { PageBreadcrumbs } from "@widgets";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  useAllowedLanguage();

  return (
    <Container maxWidth="md" sx={{ px: { xs: 1.5, sm: 2 } }}>
      <Stack>
        <PageBreadcrumbs variant="home" />
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}images/marie.png`}
          alt="Arkham Voices"
          sx={{ maxWidth: "100%", marginBottom: 2 }}
        />
        <Typography
          color="text.secondary"
          component="p"
          sx={{ mb: 2, maxWidth: 640 }}
          variant="body1"
        >
          {t("home.lead")}
        </Typography>
        <Announces />
        <CategoriesList />
      </Stack>
    </Container>
  );
}
