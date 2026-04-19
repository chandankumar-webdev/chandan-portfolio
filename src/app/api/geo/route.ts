import type { GeoPayload } from "@/lib/geo";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Best-effort city from Vercel geo headers or a public IP lookup.
 * Local dev usually has no city — UI should omit that line.
 */
export async function GET() {
  const h = await headers();

  const vercelCity = h.get("x-vercel-ip-city");
  if (vercelCity) {
    return NextResponse.json({
      city: decodeURIComponent(vercelCity),
      country: h.get("x-vercel-ip-country") || null,
      region: h.get("x-vercel-ip-country-region") || null,
    } satisfies GeoPayload);
  }

  const fwd = h.get("x-forwarded-for");
  const clientIp = fwd?.split(",")[0]?.trim();
  if (
    clientIp &&
    clientIp !== "127.0.0.1" &&
    clientIp !== "::1" &&
    !clientIp.startsWith("192.168.") &&
    !clientIp.startsWith("10.")
  ) {
    try {
      const res = await fetch(`https://ipwho.is/${encodeURIComponent(clientIp)}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("geo fetch failed");
      const data = (await res.json()) as {
        success?: boolean;
        city?: string;
        country_code?: string;
        region?: string;
      };
      if (data.city && data.success !== false) {
        return NextResponse.json({
          city: data.city,
          country: data.country_code ?? null,
          region: data.region ?? null,
        } satisfies GeoPayload);
      }
    } catch {
      /* fall through */
    }
  }

  return NextResponse.json({ city: null } satisfies GeoPayload);
}
