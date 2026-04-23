const globalBaseUrl = import.meta.env.VITE_NARRATION_BASE_URL;
const ruBaseUrl = import.meta.env.VITE_RU_NARRATION_BASE_URL;
const asJSON = (response: Response) => response.json();

function apiPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export function fetchIcons() {
  return fetch(apiPath(`icons/icons.json`)).then(asJSON);
}

export function fetchCampaigns(language: string) {
  return fetch(apiPath(`api/campaigns/${language}.json`)).then(asJSON);
}

export function fetchCampaign({ language, campaignId }: { language: string; campaignId: string }) {
  return fetch(apiPath(`api/campaigns/${language}/${campaignId}.json`)).then(asJSON);
}

export function getNarrationUrl({
  language,
  narrationId,
}: {
  language: string;
  narrationId: string;
}) {
  const baseUrl = language === "ru" ? ruBaseUrl : `${globalBaseUrl}/${language}`;

  return `${baseUrl}/${narrationId}.mp3`;
}
