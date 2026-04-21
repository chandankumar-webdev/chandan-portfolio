"use client";

import { profile } from "@/data/site";
import type { GeoPayload } from "@/lib/geo";
import { readGeoCache, writeGeoCache } from "@/lib/geo-cache";
import { getTimeGreeting } from "@/lib/greeting";
import { getWelcomeTrafficLine, resolveTrafficSource } from "@/lib/traffic-source";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_DISMISS_MS = 12_000;

type Props = {
  onClose?: () => void;
};

export function FirstVisitWelcome({ onClose }: Props) {
  const [show, setShow] = useState(false);
  const [greeting, setGreeting] = useState(() => getTimeGreeting());
  const [geo, setGeo] = useState<GeoPayload | null>(null);
  const [trafficLine, setTrafficLine] = useState<string | null>(null);
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
    const label = resolveTrafficSource(sourceParam, ref);
    setTrafficLine(getWelcomeTrafficLine(sourceParam?.trim() ?? null, label));

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

  const hasBody = Boolean(cityLine || trafficLine);

  const trafficAccentEmoji = (() => {
    if (!trafficLine) return null;
    const s = trafficLine.toLowerCase();
    if (s.includes("pdf")) return "📕";
    if (s.includes("cv link")) return "📋";
    if (s.includes("resume link")) return "📄";
    return "🌐";
  })();

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
        className={`welcome-card relative z-[101] w-full max-w-lg rounded-2xl border border-surface-border bg-surface-elevated/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-300 ${
          exiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        {...(hasBody ? { "aria-describedby": "welcome-body" } : {})}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-lg border border-surface-border bg-surface/80 p-2 text-ink-muted transition hover:border-accent/45 hover:text-accent"
          aria-label="Close welcome"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="pr-12">
          <p
            id="welcome-title"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            <span className="select-none text-base leading-none sm:text-[1.05rem]" aria-hidden>
              ✨
            </span>
            <span>{profile.name.split(" ")[0]}&apos;s portfolio</span>
          </p>
          <h2 className="mt-3 flex items-start gap-3 text-lg font-semibold leading-snug tracking-tight sm:gap-3.5 sm:text-2xl">
            <span className="select-none pt-0.5 text-[1.35rem] leading-none sm:text-[1.6rem]" aria-hidden>
              👋
            </span>
            <span className="min-w-0 text-ink">
              <span className="whitespace-nowrap sm:whitespace-normal">{greeting}!</span>{" "}
              <span className="text-ink-muted">Nice to meet you.</span>
            </span>
          </h2>
        </div>
        {hasBody ? (
          <div id="welcome-body" className="mt-5 space-y-3.5 text-sm leading-relaxed text-ink-muted">
            {cityLine && (
              <p className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-base leading-none opacity-95" aria-hidden>
                  📍
                </span>
                <span>{cityLine}</span>
              </p>
            )}
            {trafficLine && (
              <p className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-base leading-none opacity-95" aria-hidden>
                  {trafficAccentEmoji ?? "🌐"}
                </span>
                <span>{trafficLine}</span>
              </p>
            )}
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-3" aria-hidden>
          <span className="shrink-0 select-none text-[1.15rem] leading-none opacity-90">🚀</span>
          <div className="pointer-events-none h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-border">
            <div className="welcome-progress h-full w-full origin-left rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
