import { CategoriesList } from "@entities/ui";
import { Container, Stack } from "@mui/material";
import { PageBreadcrumbs } from "@widgets";

export function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1.5, sm: 2 } }}>
      <Stack>
        <PageBreadcrumbs variant="home" />
        <CategoriesList />
      </Stack>
    </Container>
  );
}
