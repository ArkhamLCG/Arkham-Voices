import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { useAppContext } from "@shared/lib";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

type PageBreadcrumbsProps = { variant: "home" } | { variant: "campaign"; campaignName: string };

export function PageBreadcrumbs(props: PageBreadcrumbsProps) {
  const { t } = useTranslation();
  const { language } = useAppContext();
  const homeHref = `/${language}`;
  const campaignsLabel = t("breadcrumbs.campaigns", "Campaigns");

  if (props.variant === "home") {
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Typography color="text.primary">{campaignsLabel}</Typography>
      </Breadcrumbs>
    );
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: { xs: 1.5, sm: 2 } }}>
      <MuiLink
        color="inherit"
        component={Link}
        href={homeHref}
        sx={{ display: "inline" }}
        underline="hover"
        variant="body2"
      >
        {campaignsLabel}
      </MuiLink>
      <Typography color="text.primary" variant="body2">
        {props.campaignName}
      </Typography>
    </Breadcrumbs>
  );
}
