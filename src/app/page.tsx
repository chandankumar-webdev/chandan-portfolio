import {
  courses,
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
  social,
} from "@/data/site";

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-surface-border/80 bg-[#0b0f14]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#top" className="font-semibold tracking-tight text-ink">
            {profile.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </a>
          <nav className="flex flex-wrap gap-1 text-sm text-ink-muted">
            {["Experience", "Projects", "Skills", "Education", "Courses"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-md px-3 py-1.5 transition hover:bg-surface-elevated hover:text-ink"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Portfolio</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
            <p className="mt-2 text-lg text-ink-muted">{profile.title}</p>
            <p className="mt-2 text-sm text-ink-muted">{profile.location}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">{profile.summary}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={social.email}
                className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-surface transition hover:bg-accent-muted"
              >
                Email
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent/50"
              >
                LinkedIn
                <ExternalIcon />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent/50"
              >
                GitHub
                <ExternalIcon />
              </a>
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-surface-border bg-surface-elevated/50 p-6 sm:p-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-accent">Contact</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-ink-muted">Phone</p>
                <a href={social.phone} className="text-ink hover:text-accent">
                  +91 8860503220
                </a>
              </div>
              <div>
                <p className="text-ink-muted">Email</p>
                <a href={social.email} className="break-all text-ink hover:text-accent">
                  chandankumar.webdev@gmail.com
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-muted">Languages</h3>
              <ul className="space-y-2 text-sm">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4">
                    <span className="text-ink">{l.name}</span>
                    <span className="text-ink-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section id="experience" className="mt-24 scroll-mt-28">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Experience</h2>
          <div className="mt-8 space-y-12">
            {experience.map((job) => (
              <article
                key={`${job.company}-${job.period}`}
                className="border-l-2 border-accent/40 pl-6 sm:pl-8"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-ink">
                    {job.role} · {job.company}
                  </h3>
                  <span className="font-mono text-sm text-ink-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{job.location}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted marker:text-accent">
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 48)} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-24 scroll-mt-28">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Projects</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.name}
                className="rounded-xl border border-surface-border bg-surface-elevated/40 p-6 transition hover:border-accent/30"
              >
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-24 scroll-mt-28">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Skills</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {(
              [
                ["Front-end", skills.frontend],
                ["Back-end", skills.backend],
                ["Tools", skills.tools],
              ] as const
            ).map(([label, items]) => (
              <div key={label}>
                <h3 className="font-mono text-sm text-ink-muted">{label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-surface-border bg-surface-elevated/60 px-3 py-1 text-sm text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          <section id="education" className="scroll-mt-28">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</h2>
            <div className="mt-6 rounded-xl border border-surface-border bg-surface-elevated/40 p-6">
              <h3 className="text-lg font-semibold text-ink">{education.degree}</h3>
              <p className="mt-2 text-ink-muted">{education.school}</p>
              <p className="mt-1 text-sm text-ink-muted">{education.location}</p>
              <p className="mt-4 font-mono text-sm text-accent">{education.period}</p>
            </div>
          </section>

          <section id="courses" className="scroll-mt-28">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Courses & certifications</h2>
            <ul className="mt-6 space-y-4">
              {courses.map((c) => (
                <li key={c.title}>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{c.label}</span>
                  <a
                    href={c.url}
                    className="mt-1 flex items-start gap-2 text-ink transition hover:text-accent"
                  >
                    <span className="leading-snug">{c.title}</span>
                    {c.url !== "#" && <ExternalIcon className="mt-0.5 shrink-0 text-accent" />}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-surface-border py-8 text-center text-sm text-ink-muted">
        Built with Next.js & Tailwind — edit content in{" "}
        <code className="font-mono text-accent">src/data/site.ts</code>.
      </footer>
    </div>
  );
}
