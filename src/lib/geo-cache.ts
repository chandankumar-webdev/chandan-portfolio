import type { GeoPayload } from "@/lib/geo";

const KEY = "chandan-portfolio-geo-cache-v1";

type Stored = GeoPayload & { cachedAt: number };

export function readGeoCache(): GeoPayload | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (typeof parsed.cachedAt !== "number") return null;
    return {
      city: parsed.city ?? null,
      country: parsed.country,
      region: parsed.region,
    };
  } catch {
    return null;
  }
}

export function writeGeoCache(payload: GeoPayload): void {
  try {
    const stored: Stored = {
      ...payload,
      cachedAt: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {
    /* quota / private mode */
  }
}
