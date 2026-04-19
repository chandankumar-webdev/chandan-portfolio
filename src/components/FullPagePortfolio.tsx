"use client";

import {
  courses,
  education,
  experience,
  importantLinks,
  languages,
  profile,
  projects,
  skills,
  social,
} from "@/data/site";
import type { ImportantLinkItem } from "@/data/site";
import { skillIconUrl } from "@/lib/skill-icons";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/** Official GitHub mark as SVG — avoids blurry favicon / boxed raster from Google favicons API */
function GitHubMarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

function ChannelIcon({ domain }: { domain: string }) {
  if (domain === "github.com") {
    return <GitHubMarkIcon className="text-ink opacity-95" />;
  }
  return (
    <Image
      src={faviconUrl(domain)}
      alt=""
      width={18}
      height={18}
      className="opacity-95"
      unoptimized
    />
  );
}

function SkillPill({ name }: { name: string }) {
  const src = skillIconUrl(name);
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-surface-border bg-surface-elevated/60 px-3 py-1.5 text-sm text-ink">
      {src ? (
        <Image src={src} alt="" width={18} height={18} className="opacity-95" unoptimized />
      ) : null}
      {name}
    </span>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/** Tailwind gradient classes — full strings for JIT */
const EXPERIENCE_CARD_ACCENTS = [
  "from-teal-900/45 via-[#0f1419]/92 to-[#0f1419]",
  "from-blue-900/45 via-[#0f1419]/92 to-[#0f1419]",
  "from-indigo-900/45 via-[#0f1419]/92 to-[#0f1419]",
] as const;

const PROJECT_CARD_ACCENTS = [
  "from-emerald-900/40 via-[#0f1419]/95 to-[#0f1419]",
  "from-sky-900/40 via-[#0f1419]/95 to-[#0f1419]",
  "from-cyan-900/35 via-[#0f1419]/95 to-[#0f1419]",
] as const;

const COURSE_CARD_ACCENTS = [
  "from-purple-900/45 via-[#0f1419]/95 to-[#0f1419]",
  "from-violet-900/40 via-[#0f1419]/95 to-[#0f1419]",
] as const;

const NAV = [
  { id: "top", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "links", label: "Links" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "courses", label: "Courses" },
] as const;

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

function LinkPreviewCard({ item }: { item: ImportantLinkItem }) {
  const bg = faviconUrl(item.previewDomain);
  const isMail = item.url.startsWith("mailto:");
  const isGithub = item.previewDomain === "github.com";
  return (
    <a
      href={item.url}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      className={`group relative flex min-h-[148px] max-w-[280px] flex-[0_0_auto] snap-start flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated/50 shadow-lg transition hover:border-accent/40`}
    >
      {!isGithub ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] transition-opacity group-hover:opacity-[0.28]"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right -24px top -28px",
            backgroundSize: "168px",
            filter: "blur(3px)",
          }}
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-[0.12] blur-2xl transition-opacity group-hover:opacity-[0.2]"
          aria-hidden
        >
          <GitHubMarkIcon className="h-full w-full text-ink" />
        </div>
      )}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} aria-hidden />
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-snug text-ink">{item.title}</h3>
            {item.subtitle ? <p className="mt-1 text-xs text-ink-muted">{item.subtitle}</p> : null}
          </div>
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-surface/80 shadow-inner">
            {isGithub ? (
              <GitHubMarkIcon className="h-7 w-7 text-ink" />
            ) : (
              <Image src={bg} alt="" width={44} height={44} className="object-contain p-1.5" unoptimized />
            )}
          </span>
        </div>
        <span className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-accent/90">Open link</span>
      </div>
    </a>
  );
}

function useSectionActive(scrollRoot: HTMLElement | null) {
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const nodes = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length || !scrollRoot) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: scrollRoot, rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.15, 0.35, 0.55] },
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scrollRoot]);

  return activeId;
}

function Reveal({
  children,
  className = "",
  delay = 0,
  scrollRoot,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scrollRoot: HTMLElement | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShow(true);
      },
      { root: scrollRoot ?? undefined, rootMargin: "-5% 0px -5% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scrollRoot]);

  return (
    <div
      ref={ref}
      className={`reveal-up ${show ? "reveal-up--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HorizontalStrip({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div
      className={`horizontal-strip -mx-4 px-4 sm:mx-0 sm:px-0 ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="flex snap-x snap-mandatory gap-4 pb-3 pt-1">{children}</div>
    </div>
  );
}

function ScrollDownCue({
  scrollRoot,
  enabled,
}: {
  scrollRoot: HTMLElement | null;
  enabled: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 12_000);
    return () => window.clearTimeout(t);
  }, [enabled]);

  useEffect(() => {
    if (!visible || !scrollRoot) return;
    const onScroll = () => {
      if (scrollRoot.scrollTop > 48) setVisible(false);
    };
    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollRoot.removeEventListener("scroll", onScroll);
  }, [visible, scrollRoot]);

  if (!enabled || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[38] flex -translate-x-1/2 px-4 sm:bottom-10"
      aria-hidden
    >
      <span className="inline-flex rounded-full border border-accent/45 bg-accent/10 p-2 text-accent shadow-lg motion-safe:animate-bounce">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </span>
    </div>
  );
}

type FullPagePortfolioProps = {
  /** Shown on the main page after the welcome overlay is dismissed */
  showScrollHint?: boolean;
};

export function FullPagePortfolio({ showScrollHint = false }: FullPagePortfolioProps) {
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const activeId = useSectionActive(scrollRoot);
  const scrollToId = useCallback((id: string) => {
    const root = scrollRoot;
    const el = document.getElementById(id);
    if (!root || !el) return;
    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const nextTop = root.scrollTop + (elRect.top - rootRect.top);
    root.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
  }, [scrollRoot]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <ScrollDownCue scrollRoot={scrollRoot} enabled={showScrollHint} />
      <header className="z-40 shrink-0 border-b border-surface-border/80 bg-[#0b0f14]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b0f14]/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="text-left font-semibold tracking-tight text-ink"
          >
            {profile.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </button>
          <nav
            className="flex max-w-[min(100%,72vw)] flex-wrap justify-end gap-0.5 overflow-x-auto text-sm text-ink-muted scrollbar-none sm:max-w-none"
            aria-label="Section navigation"
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`whitespace-nowrap rounded-md px-2.5 py-1.5 transition sm:px-3 ${
                  activeId === item.id ? "bg-surface-elevated text-ink" : "hover:bg-surface-elevated/80 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div
        ref={setScrollRoot}
        className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth"
      >
      <main>
        <section
          id="top"
          className="relative flex min-h-[100dvh] snap-start snap-always flex-col justify-center px-4 py-8 sm:px-6 sm:py-10"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-blue-900/20 blur-3xl" />
          </div>
          <div className="mx-auto w-full max-w-5xl">
            <Reveal scrollRoot={scrollRoot}>
              <div className="intro-hero-card rounded-3xl border border-accent/15 bg-gradient-to-b from-surface-elevated/95 to-[#0c1017]/98 p-6 backdrop-blur-md sm:p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                  <div className="relative mx-auto shrink-0 lg:mx-0">
                    <div className="intro-photo-ring relative h-[8.75rem] w-[8.75rem] overflow-hidden rounded-2xl bg-surface sm:h-[10rem] sm:w-[10rem]">
                      <Image
                        src={profile.photoSrc}
                        alt={profile.name}
                        width={320}
                        height={320}
                        className="h-full w-full object-cover object-[center_18%]"
                        priority
                        sizes="(max-width:1024px) 140px, 160px"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 space-y-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent/90">Portfolio</p>
                      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                        {profile.name}
                      </h1>
                      <p className="mt-2 text-[15px] leading-snug text-ink-muted sm:text-lg">{profile.title}</p>
                    </div>
                    <p className="max-w-2xl text-[15px] leading-[1.65] text-ink-muted/95 sm:text-base lg:leading-relaxed">
                      {profile.summary}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a
                        href={social.email}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/35 hover:bg-white/[0.06]"
                      >
                        <MailIcon />
                        Email me
                      </a>
                      <a
                        href={social.gmailWeb}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/35 hover:bg-white/[0.06]"
                      >
                        <ChannelIcon domain="mail.google.com" />
                        Gmail me
                      </a>
                      <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/35 hover:bg-white/[0.06]"
                      >
                        <ChannelIcon domain="linkedin.com" />
                        LinkedIn
                      </a>
                      <a
                        href={social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent/35 hover:bg-white/[0.06]"
                      >
                        <ChannelIcon domain="github.com" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent/80">Contact</p>
                  <div className="mt-5 flex flex-col gap-5 text-sm md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-10 md:gap-y-4">
                    <div className="min-w-0 md:max-w-[220px]">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted/90">Location</p>
                      <a
                        href={profile.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1.5 block leading-snug font-medium text-ink transition hover:text-accent"
                      >
                        {profile.location}
                      </a>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted/90">Phone</p>
                      <a href={social.phone} className="mt-1.5 block font-medium text-ink hover:text-accent">
                        +91 8860503220
                      </a>
                    </div>
                    <div className="min-w-0 flex-1 md:min-w-[240px] md:max-w-md">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted/90">Email</p>
                      <a href={social.email} className="mt-1.5 block break-all font-medium text-ink hover:text-accent">
                        chandankumar.webdev@gmail.com
                      </a>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted/90">Languages</p>
                      <p className="mt-1.5 font-medium text-ink/95">
                        {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="experience"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Experience</h2>
            </Reveal>
            <HorizontalStrip ariaLabel="Experience timeline" className="mt-8">
              {experience.map((job, i) => (
                <Reveal scrollRoot={scrollRoot} key={`${job.company}-${job.period}`} delay={i * 70} className="min-w-[min(100%,340px)] flex-[0_0_auto] snap-start sm:min-w-[380px]">
                  <article className="relative h-full overflow-hidden rounded-2xl border border-surface-border shadow-lg shadow-black/25">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${EXPERIENCE_CARD_ACCENTS[i % EXPERIENCE_CARD_ACCENTS.length]}`}
                      aria-hidden
                    />
                    <div className="relative z-[1] p-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold leading-snug text-ink">{job.role}</h3>
                        <p className="text-base font-medium text-ink-muted">{job.company}</p>
                        <span className="font-mono text-sm text-accent">{job.period}</span>
                        <p className="text-sm text-ink-muted/90">{job.location}</p>
                      </div>
                      <ul className="mt-4 max-h-[min(50vh,28rem)] list-disc space-y-2 overflow-y-auto pl-5 text-sm leading-relaxed text-ink-muted marker:text-accent scrollbar-thin">
                        {job.highlights.map((h) => (
                          <li key={h.slice(0, 48)}>{h}</li>
                        ))}
                      </ul>
                      {"links" in job && job.links && job.links.length > 0 ? (
                        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                          {job.links.map((ln) => (
                            <a
                              key={ln.url}
                              href={ln.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-ink backdrop-blur-sm transition hover:border-accent/40 hover:text-accent"
                            >
                              {ln.label}
                              <ExternalIcon className="text-accent" />
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </HorizontalStrip>
          </div>
        </section>

        <section
          id="projects"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Projects</h2>
            </Reveal>
            <HorizontalStrip ariaLabel="Projects" className="mt-8">
              {projects.map((p, i) => (
                <Reveal scrollRoot={scrollRoot} key={p.name} delay={i * 60} className="min-w-[min(100%,300px)] flex-[0_0_auto] snap-start sm:min-w-[320px]">
                  <article className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-surface-border transition hover:border-accent/35">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${PROJECT_CARD_ACCENTS[i % PROJECT_CARD_ACCENTS.length]}`}
                      aria-hidden
                    />
                    <div className="relative z-[1] flex flex-1 flex-col p-6">
                      <h3 className="font-semibold text-ink">{p.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{p.description}</p>
                      {"url" in p && p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accent-muted"
                        >
                          Visit site
                          <ExternalIcon />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </HorizontalStrip>
          </div>
        </section>

        <section
          id="links"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Important links</h2>
            </Reveal>
            <div className="horizontal-strip mt-10">
              <div className="flex w-max snap-x snap-mandatory gap-4 pb-3 pt-1">
                {importantLinks.map((item) => (
                  <LinkPreviewCard key={item.url} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Skills</h2>
            </Reveal>
            <div className="mt-10 space-y-10">
              {(
                [
                  ["Front-end", skills.frontend],
                  ["Back-end", skills.backend],
                  ["Tools", skills.tools],
                ] as const
              ).map(([label, items], idx) => (
                <Reveal scrollRoot={scrollRoot} key={label} delay={idx * 80}>
                  <h3 className="font-mono text-sm text-ink-muted">{label}</h3>
                  <div className="horizontal-strip mt-3 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex w-max min-w-full flex-nowrap gap-2 pb-2">
                      {items.map((s) => (
                        <SkillPill key={s} name={s} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</h2>
            </Reveal>
            <Reveal scrollRoot={scrollRoot} delay={100} className="mt-8">
              <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-surface-border shadow-lg shadow-black/20">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-950/35 via-[#0f1419]/95 to-[#0f1419]"
                  aria-hidden
                />
                <div className="relative z-[1] p-8">
                  <h3 className="text-xl font-semibold text-ink">{education.degree}</h3>
                  <p className="mt-3 text-ink-muted">{education.school}</p>
                  <p className="mt-1 text-sm text-ink-muted">{education.location}</p>
                  <p className="mt-6 font-mono text-sm text-accent">{education.period}</p>
                  {"url" in education && education.url ? (
                    <a
                      href={education.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accent-muted"
                    >
                      University website
                      <ExternalIcon />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="courses"
          className="flex min-h-[100dvh] snap-start snap-always flex-col justify-center border-t border-surface-border/60 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal scrollRoot={scrollRoot}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Courses & certifications</h2>
            </Reveal>
            <HorizontalStrip ariaLabel="Courses and certifications" className="mt-8">
              {courses.map((c, i) => (
                <Reveal scrollRoot={scrollRoot} key={c.title} delay={i * 80} className="min-w-[min(100%,320px)] flex-[0_0_auto] snap-start sm:min-w-[360px]">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-surface-border shadow-md">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${COURSE_CARD_ACCENTS[i % COURSE_CARD_ACCENTS.length]}`}
                      aria-hidden
                    />
                    <div className="relative z-[1] p-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{c.label}</span>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex items-start gap-2 text-ink transition hover:text-accent"
                      >
                        <span className="text-base font-medium leading-snug">{c.title}</span>
                        {c.url !== "#" && <ExternalIcon className="mt-1 shrink-0 text-accent" />}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </HorizontalStrip>
          </div>
        </section>
      </main>

      <footer className="snap-start border-t border-surface-border py-8 text-center text-sm text-ink-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
      </div>
    </div>
  );
}
