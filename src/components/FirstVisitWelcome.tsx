"use client";

import { profile } from "@/data/site";
import type { GeoPayload } from "@/lib/geo";
import { readGeoCache, writeGeoCache } from "@/lib/geo-cache";
import { getTimeGreeting } from "@/lib/greeting";
import { resolveTrafficSource } from "@/lib/traffic-source";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_DISMISS_MS = 12_000;

type Props = {
  onClose?: () => void;
};

export function FirstVisitWelcome({ onClose }: Props) {
  const [show, setShow] = useState(false);
  const [greeting, setGreeting] = useState(() => getTimeGreeting());
  const [geo, setGeo] = useState<GeoPayload | null>(null);
  const [trafficLabel, setTrafficLabel] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);
  const dismissed = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setExiting(true);
    window.setTimeout(() => {
      setShow(false);
      onCloseRef.current?.();
    }, 320);
  }, []);

  useEffect(() => {
    setGreeting(getTimeGreeting());
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get("source");
    const ref = document.referrer || undefined;
    setTrafficLabel(resolveTrafficSource(sourceParam, ref));

    if (sourceParam && window.history.replaceState) {
      try {
        const u = new URL(window.location.href);
        u.searchParams.delete("source");
        const next = u.pathname + (u.search ? u.search : "") + u.hash;
        window.history.replaceState({}, "", next);
      } catch {
        /* ignore */
      }
    }

    const cached = readGeoCache();
    if (cached) setGeo(cached);

    setShow(true);

    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data: GeoPayload) => {
        if (cancelled) return;
        setGeo(data);
        writeGeoCache(data);
      })
      .catch(() => {
        if (cancelled) return;
        if (!cached) setGeo({ city: null });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!show || exiting) return;
    const t = window.setTimeout(close, AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [show, exiting, close]);

  useEffect(() => {
    if (!show || exiting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, exiting, close]);

  if (!show) return null;

  const cityLine =
    geo?.city && geo.city.trim().length > 0 ? `Looks like you're visiting from ${geo.city.trim()}.` : null;

  const trafficLine = trafficLabel ? `Thanks for stopping by from ${trafficLabel}.` : null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Dismiss welcome"
        className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm transition-opacity"
        onClick={close}
      />
      <div
        className={`welcome-card relative z-[101] w-full max-w-md rounded-2xl border border-surface-border bg-surface-elevated/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-300 ${
          exiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-body"
      >
        <p id="welcome-title" className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {profile.name.split(" ")[0]}&apos;s portfolio
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          {greeting}! <span className="text-ink-muted">Nice to meet you.</span>
        </h2>
        <div id="welcome-body" className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
          {cityLine && <p>{cityLine}</p>}
          {trafficLine && <p>{trafficLine}</p>}
        </div>

        <div className="pointer-events-none mt-5 h-1 overflow-hidden rounded-full bg-surface-border" aria-hidden>
          <div className="welcome-progress h-full w-full origin-left rounded-full bg-accent" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">Closes automatically — or use Esc / click outside.</p>
          <button
            type="button"
            onClick={close}
            className="shrink-0 rounded-lg border border-surface-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
