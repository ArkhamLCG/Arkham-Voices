import {
  Card,
  CardContent,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { campaignRoute, useAppContext } from "@shared/lib";
import { Link } from "wouter";

export function HomePage() {
  const { language, campaigns } = useAppContext();

  return (
    <Container maxWidth="sm">
      <Stack spacing={3} sx={{ alignItems: "stretch" }}>
        <Card variant="outlined">
          <CardContent>
            <List disablePadding>
              {campaigns.map((c) => (
                <ListItemButton
                  key={c.id}
                  component={Link}
                  href={campaignRoute({ language, campaignId: c.id })}
                >
                  <ListItemText primary={c.name} />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
