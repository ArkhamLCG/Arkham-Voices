const baseUrl = process.env.VITE_ARKHAM_CARDS_REPOSITORY_BASE_URL;

export const fetchCampaignData = async (language: string) => {
  console.log(`loading campaign data for ${language}`);
  if (!baseUrl) {
    throw new Error("VITE_ARKHAM_CARDS_REPOSITORY_BASE_URL is not set");
  }
  const postfix = language === "en" ? "" : `_${language}`;
  const url = `${baseUrl}/assets/generated/all_campaigns${postfix}.txt`;
  const response = await fetch(url);
  const data = await response.text();

  const trimmed = data.trimStart();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} when fetching ${url}`);
  }

  // These files are JSON arrays. If we get HTML, it usually means a 404 page from hosting.
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html") || trimmed.startsWith("<")) {
    throw new Error(`Expected JSON but got HTML when fetching ${url}`);
  }

  if (!trimmed.startsWith("[")) {
    throw new Error(`Expected JSON array when fetching ${url}`);
  }

  return data;
};
