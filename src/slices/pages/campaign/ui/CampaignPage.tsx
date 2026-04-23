import { filterSideScenarios } from "@entities/lib";
import { CategoriesList } from "@entities/ui";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { fetchCampaign, getNarrationUrl } from "@shared/api/client";
import { useAppContext } from "@shared/lib";
import type { CampaignNarrationIndex } from "@shared/model";
import { Icon, Row, Spoiler } from "@shared/ui";
import { PageBreadcrumbs } from "@widgets";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "wouter";

const listBoxSx = { minWidth: 0, width: 1, flex: 1 } as const;

export function CampaignPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const { language, campaignId } = useParams<{ language: string; campaignId: string }>();
  const { campaigns } = useAppContext();
  const [campaign, setCampaign] = useState<CampaignNarrationIndex | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentListName = useMemo(
    () => campaigns.find((c) => c.id === campaignId)?.name ?? campaign?.name ?? campaignId ?? "",
    [campaigns, campaignId, campaign?.name],
  );

  useEffect(() => {
    fetchCampaign({ language, campaignId }).then(setCampaign);
  }, [language, campaignId]);

  useEffect(() => {
    if (campaignId) setMobileNavOpen(false);
  }, [campaignId]);

  const scenarios = useMemo(() => {
    const scenarios = campaign?.scenarios ?? [];

    if (campaignId === "side") {
      return scenarios.filter(filterSideScenarios);
    }
    return scenarios;
  }, [campaign, campaignId]);

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
      <PageBreadcrumbs campaignName={campaign?.name ?? campaignId ?? ""} variant="campaign" />
      <Row
        sx={{
          alignItems: "stretch",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {isDesktop ? (
          <CategoriesList sx={listBoxSx} />
        ) : (
          <Box sx={{ alignSelf: "stretch", flex: "none", width: 1 }}>
            <Button
              endIcon={mobileNavOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              fullWidth
              onClick={() => setMobileNavOpen((o) => !o)}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                textTransform: "none",
              }}
            >
              <Box sx={{ minWidth: 0, textAlign: "left" }}>
                <Typography color="text.secondary" component="div" variant="caption">
                  {t("breadcrumbs.campaigns")}
                </Typography>
                <Typography component="div" variant="body1">
                  {currentListName}
                </Typography>
              </Box>
            </Button>
            <Collapse in={mobileNavOpen}>
              <Box
                sx={{
                  pt: 2,
                }}
              >
                <CategoriesList sx={{ minWidth: 0, width: 1 }} />
              </Box>
            </Collapse>
          </Box>
        )}

        <Stack spacing={{ xs: 2, sm: 3 }} sx={{ minWidth: 0, width: 1, flex: { md: 1 } }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            {campaign?.name}
          </Typography>
          <Stack spacing={1}>
            {scenarios.map((scenario) => (
              <Accordion key={scenario.id} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ "& .MuiAccordionSummary-content": { minWidth: 0, my: 0.5, mr: 1 } }}
                >
                  <Row
                    sx={{
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                      rowGap: 0.5,
                    }}
                  >
                    <Icon
                      icon={scenario.icon}
                      sx={{
                        flexShrink: 0,
                        width: { xs: "1.75em", sm: "2em" },
                        textAlign: "center",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        minWidth: 0,
                        wordBreak: "break-word",
                        flex: 1,
                        lineHeight: 1.25,
                        py: 1,
                      }}
                    >
                      {scenario.name}
                    </Typography>
                  </Row>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense disablePadding>
                    {scenario.steps.map((step) => {
                      const narrationUrl = getNarrationUrl({
                        language,
                        narrationId: step.narration.id,
                      });
                      return (
                        <ListItem
                          key={step.narration.id}
                          disableGutters
                          sx={{ py: { xs: 1.5, sm: 2 }, px: { xs: 0, sm: 0 } }}
                        >
                          <Stack sx={{ width: 1, minWidth: 0, gap: 1.5 }}>
                            <ListItemText
                              primary={step.narration.name}
                              secondary={step.text && <Spoiler>{step.text}</Spoiler>}
                              slotProps={{
                                primary: { variant: "subtitle2", sx: { wordBreak: "break-word" } },
                                secondary: { component: "div" as const, sx: { mt: 0.5 } },
                              }}
                            />
                            <Row
                              sx={{
                                alignItems: "center",
                                gap: 1,
                                minWidth: 0,
                                width: 1,
                              }}
                            >
                              <Box
                                component="audio"
                                controls
                                preload="metadata"
                                src={narrationUrl}
                                sx={{ display: "block", flex: 1, minWidth: 0, maxWidth: 1 }}
                              />
                              <IconButton
                                aria-label={t("campaign.openAudio", "Open audio in new tab")}
                                color="primary"
                                component="a"
                                href={narrationUrl}
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ flexShrink: 0 }}
                                download={`${step.narration.id}.mp3`}
                                target="_blank"
                              >
                                <DownloadIcon fontSize="small" />
                              </IconButton>
                            </Row>
                          </Stack>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Row>
    </Container>
  );
}
