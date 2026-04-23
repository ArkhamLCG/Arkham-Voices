export function detectBrowserLanguage(available: readonly string[], fallback: string): string {
  if (typeof window === "undefined") return fallback;

  const avail = new Map(available.map((l) => [l.toLowerCase(), l]));

  const raw = (
    window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language]
  ).filter(Boolean);

  for (let i = raw.length - 1; i >= 0; i -= 1) {
    const lang = raw[i];
    const normalized = lang.toLowerCase();
    const underscore = normalized.replace("-", "_");
    const base = normalized.split(/[-_]/)[0] ?? "";

    const hit = avail.get(normalized) ?? avail.get(underscore) ?? (base ? avail.get(base) : null);
    if (hit) return hit;
  }

  return fallback;
}
