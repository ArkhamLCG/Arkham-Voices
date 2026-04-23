export function detectBrowserLanguage(available: readonly string[], fallback: string): string {
  if (typeof window === "undefined") return fallback;

  const avail = new Map(available.map((l) => [l.toLowerCase(), l]));

  const raw = (
    window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language]
  ).filter(Boolean);

  for (const lang of raw) {
    const normalized = lang.toLowerCase();
    const underscore = normalized.replace("-", "_");
    const base = normalized.split(/[-_]/)[0] ?? "";

    const hit = avail.get(normalized) ?? avail.get(underscore) ?? (base ? avail.get(base) : null);
    if (hit) return hit;
  }

  return fallback;
}
