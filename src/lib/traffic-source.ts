/** Labels for `?source=` — used when building “Thanks … from {label}”. Resume/PDF use custom welcome lines elsewhere. */
const SOURCE_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  naukri: "Naukri",
  github: "GitHub",
  indeed: "Indeed",
  glassdoor: "Glassdoor",
  resume: "Resume link",
  pdf: "PDF link",
  cv: "CV link",
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
 * Prefer explicit `source` query param (resume PDF links, etc.); else infer from document.referrer.
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

/**
 * Copy for the welcome popup. Resume/PDF/CV use dedicated lines — avoids awkward “from your resume” phrasing.
 */
export function getWelcomeTrafficLine(
  sourceParam: string | null,
  referrerLabel: string | null,
): string | null {
  const key = sourceParam?.trim().toLowerCase() ?? "";

  if (key === "resume" || key === "résumé") {
    return "Glad you followed my resume link — excited you're here!";
  }
  if (key === "cv") {
    return "Glad you followed my CV link — excited you're here!";
  }
  if (key === "pdf") {
    return "Great to see you after the PDF link — thanks for stopping by!";
  }

  if (referrerLabel) {
    return `Thanks for stopping by from ${referrerLabel}.`;
  }
  return null;
}
