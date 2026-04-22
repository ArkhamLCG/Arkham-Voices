export const campaignRoute = ({ language, campaignId }: { language: string; campaignId: string }) =>
  `/${language}/campaign/${campaignId}`;

/** Current campaign id from location, e.g. `/ru/campaign/night` → `night`. */
export function getCampaignIdFromPath(pathname: string): string | undefined {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("campaign");
  if (i >= 0) {
    const id = parts[i + 1];
    if (id) return decodeURIComponent(id);
  }
  return undefined;
}
