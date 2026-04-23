import { isReturnCampaign } from "@entities/lib";
import {
  Box,
  type BoxProps,
  Card,
  CardContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { campaignRoute, getCampaignIdFromPath, useAppContext } from "@shared/lib";
import { Icon } from "@shared/ui";
import { groupBy, isNotNil } from "ramda";
import { Fragment, useMemo } from "react";
import { Link, useLocation } from "wouter";

export function CategoriesList({ sx, ...rest }: BoxProps) {
  const [location] = useLocation();
  const selectedCampaignId = getCampaignIdFromPath(location);
  const { language, campaigns } = useAppContext();

  const groups = useMemo(() => {
    const groups = groupBy(
      (c) => c.type,
      campaigns.filter((c) => c.id !== "side"),
    );
    return Object.values(groups).filter(isNotNil);
  }, [campaigns]);

  const side = useMemo(() => {
    return campaigns.find((c) => c.id === "side");
  }, [campaigns]);

  return (
    <Box {...rest}>
      <Stack spacing={3} sx={{ flex: 1, minHeight: 0, alignItems: "stretch" }}>
        <Card
          variant="outlined"
          sx={{ display: "flex", flex: 1, flexDirection: "column", minHeight: 0 }}
        >
          <CardContent
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              minHeight: 0,
              overflow: "auto",
            }}
          >
            <List disablePadding>
              {groups.map((campaigns, index) => (
                <Fragment key={campaigns[0].id}>
                  {index > 0 && <Divider sx={{ my: 2 }} />}
                  {campaigns.map((c) => (
                    <ListItemButton
                      key={c.id}
                      component={Link}
                      href={campaignRoute({ language, campaignId: c.id })}
                      selected={c.id === selectedCampaignId}
                      sx={{ paddingLeft: isReturnCampaign(c.id) ? 2 : 1 }}
                    >
                      <ListItemText
                        primary={
                          <Stack direction="row" sx={{ alignItems: "center", gap: 1, minWidth: 0 }}>
                            <Icon
                              icon={c.icon}
                              sx={{ flexShrink: 0, width: "1.5em", textAlign: "center" }}
                            />
                            <Box component="span" sx={{ minWidth: 0, overflowWrap: "break-word" }}>
                              {c.name}
                            </Box>
                          </Stack>
                        }
                      />
                    </ListItemButton>
                  ))}
                </Fragment>
              ))}
              {side && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <ListItemButton
                    component={Link}
                    href={campaignRoute({ language, campaignId: side.id })}
                    selected={side.id === selectedCampaignId}
                    sx={{ paddingLeft: isReturnCampaign(side.id) ? 2 : 1 }}
                  >
                    <ListItemText primary={side.name} />
                  </ListItemButton>
                </>
              )}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
