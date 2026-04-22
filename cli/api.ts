const baseUrl = process.env.VITE_ARKHAM_CARDS_REPOSITORY_BASE_URL;

export const fetchCampaignData = async (language: string) => {
  console.log(`loading campaign data for ${language}`);
  const postfix = language === "en" ? "" : `_${language}`;
  const response = await fetch(`${baseUrl}/assets/generated/all_campaigns${postfix}.txt`);
  const data = await response.text();
  return data;
};
