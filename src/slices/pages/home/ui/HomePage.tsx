import { CategoriesList } from "@entities/ui";
import { Box, Container, Stack } from "@mui/material";
import { PageBreadcrumbs } from "@widgets";

export function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1.5, sm: 2 } }}>
      <Stack>
        <PageBreadcrumbs variant="home" />
        <Box
          component="img"
          src="/marie.png"
          alt="Arkham Voices"
          sx={{ maxWidth: "100%", marginBottom: 2 }}
        />
        <CategoriesList />
      </Stack>
    </Container>
  );
}
