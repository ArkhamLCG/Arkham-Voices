import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "wouter";
import viteLogo from "/vite.svg";
import reactLogo from "../../../shared/assets/react.svg";
import { useAppStore } from "../../../shared/lib/store";
import styles from "./HomePage.module.css";

export function HomePage() {
  const count = useAppStore((s) => s.count);
  const inc = useAppStore((s) => s.inc);
  const dec = useAppStore((s) => s.dec);
  const reset = useAppStore((s) => s.reset);

  return (
    <Container maxWidth="sm">
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
          </a>
        </Stack>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Arkham Voices
          </Typography>
          <Typography variant="body2" color="text.secondary">
            FSD + wouter + zustand + MUI. Edit{" "}
            <Box component="code" sx={{ fontFamily: "monospace" }}>
              src/slices/pages/home/ui/HomePage.tsx
            </Box>
            .
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ width: "100%" }}>
          <CardContent>
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="subtitle1">zustand count: {count}</Typography>

              <ButtonGroup variant="contained" aria-label="counter">
                <Button onClick={dec} startIcon={<RemoveIcon />}>
                  -1
                </Button>
                <Button onClick={inc} startIcon={<AddIcon />}>
                  +1
                </Button>
                <Button onClick={reset} variant="outlined" startIcon={<RestartAltIcon />}>
                  reset
                </Button>
              </ButtonGroup>

              <Typography variant="body2">
                <Link href="/nope">go to 404</Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
