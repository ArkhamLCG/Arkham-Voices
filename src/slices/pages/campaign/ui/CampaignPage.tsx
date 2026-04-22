import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { CampaignNarrationIndex } from "@shared/model";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "wouter";

export function CampaignPage() {
  const { language, campaignId } = useParams<{ language: string; campaignId: string }>();
  const [campaign, setCampaign] = useState<CampaignNarrationIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const url = useMemo(() => {
    if (!language || !campaignId) return null;
    return `/api/campaigns/${language}/${campaignId}.json`;
  }, [language, campaignId]);

  useEffect(() => {
    if (!url) {
      setCampaign(null);
      setError("Missing language or campaign id");
      return;
    }

    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
        }
        setCampaign((await res.json()) as CampaignNarrationIndex);
      } catch (e) {
        setCampaign(null);
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography>Loading…</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5">Campaign not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1">
            {campaign.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {campaign.id}
          </Typography>
        </Box>

        <Stack spacing={1}>
          {campaign.scenarios.map((scenario) => (
            <Accordion key={scenario.id} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{scenario.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense disablePadding>
                  {scenario.steps.map((step) => (
                    <ListItem key={step.narration.id} disableGutters>
                      <ListItemText
                        primary={step.narration.name}
                        secondary={step.text ? step.text : step.narration.id}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
