import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "wouter";

export function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1.5, sm: 2 } }}>
      <Stack spacing={2} sx={{ alignItems: "center", py: 4, textAlign: "center" }}>
        <Typography component="h1" variant="h3">
          404
        </Typography>
        <Typography color="text.secondary">Page not found</Typography>
        <Button component={Link} href="/" variant="outlined" color="primary">
          Go home
        </Button>
      </Stack>
    </Container>
  );
}
