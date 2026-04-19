/** Labels for `?source=` — extend as needed for résumé/PDF links. */
const SOURCE_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  naukri: "Naukri",
  github: "GitHub",
  indeed: "Indeed",
  glassdoor: "Glassdoor",
  resume: "your résumé",
  pdf: "your résumé PDF",
  cv: "your CV",
  email: "email",
};

function hostnameTrafficLabel(hostname: string): string | null {
  const h = hostname.toLowerCase();
  if (h.includes("linkedin")) return "LinkedIn";
  if (h.includes("naukri")) return "Naukri";
  if (h.includes("github")) return "GitHub";
  if (h.includes("google.") || h === "google") return "Google";
  if (h.includes("bing.")) return "Bing";
  if (h.includes("duckduckgo")) return "DuckDuckGo";
  return null;
}

/**
 * Prefer explicit `source` query param (résumé links); else infer from document.referrer.
 */
export function resolveTrafficSource(
  sourceParam: string | null,
  referrerUrl: string | undefined,
): string | null {
  if (sourceParam) {
    const key = sourceParam.trim().toLowerCase();
    if (!key) return null;
    if (SOURCE_LABELS[key]) return SOURCE_LABELS[key];
    return sourceParam.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  if (!referrerUrl) return null;
  try {
    const { hostname } = new URL(referrerUrl);
    return hostnameTrafficLabel(hostname);
  } catch {
    return null;
  }
}
