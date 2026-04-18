import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Globe, Linkedin, Mail, MapPin, Twitter } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Starfield } from "@/components/starfield"
import { CandidateCard } from "@/components/talent/candidate-card"
import {
  AVAILABILITY,
  CANDIDATES,
  DISCIPLINES,
  LEVELS,
  WORK_MODES,
  getAllSlugs,
  getCandidateBySlug,
} from "@/lib/talent"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)
  if (!candidate) return { title: "Profile not found — Helios" }
  return {
    title: `${candidate.name} — ${candidate.title} · Helios`,
    description: candidate.headline,
  }
}

function formatCompensation(c: { min: number; max: number; currency: string }) {
  const symbol = c.currency === "USD" ? "$" : c.currency === "EUR" ? "€" : "£"
  return `${symbol}${c.min}k – ${symbol}${c.max}k`
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)
  if (!candidate) notFound()

  const discipline = DISCIPLINES[candidate.discipline]
  const level = LEVELS[candidate.level]
  const availability = AVAILABILITY[candidate.availability]
  const workMode = WORK_MODES[candidate.workMode]

  const similar = CANDIDATES.filter(
    (c) => c.discipline === candidate.discipline && c.slug !== candidate.slug,
  ).slice(0, 3)

  return (
    <>
      <Starfield />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-32 pt-12 md:px-10">
        {/* Breadcrumb */}
        <nav className="mb-12 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link
            href="/talent"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            Back to directory
          </Link>
        </nav>

        {/* Editorial header */}
        <header className="mb-16 border-b border-border/60 pb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-accent">
              {String(CANDIDATES.findIndex((c) => c.slug === candidate.slug) + 1).padStart(3, "0")}
            </span>
            <span aria-hidden>·</span>
            <span>{discipline.short}</span>
            <span aria-hidden>·</span>
            <span>{level.label}</span>
            <span aria-hidden>·</span>
            <span>{candidate.region}</span>
          </div>

          <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl">
            {candidate.name}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
            <span className="text-foreground">{candidate.title}.</span>{" "}
            <span className="italic">{candidate.headline}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent/70" aria-hidden />
              {candidate.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    candidate.availability === "active"
                      ? "var(--color-accent)"
                      : candidate.availability === "open"
                        ? "#9aa3b2"
                        : "#5a6478",
                }}
                aria-hidden
              />
              {availability.label}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              Last active {candidate.lastActiveDays}d ago
            </span>
          </div>
        </header>

        {/* Two-column body */}
        <div className="grid gap-16 lg:grid-cols-[300px_1fr]">
          {/* Sticky fact panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4 border-b border-border/60 pb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface font-display text-2xl text-accent ring-1 ring-border">
                {initials(candidate.name)}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Candidate ref.
                </p>
                <p className="font-mono text-sm text-foreground">
                  HLS-{candidate.slug.slice(0, 4).toUpperCase()}
                </p>
              </div>
            </div>

            <dl className="mt-6 space-y-5 text-sm">
              <Row label="Discipline" value={discipline.label} />
              <Row label="Seniority" value={`${level.label} · ${level.yearsRange}`} />
              <Row label="Experience" value={`${candidate.years} years`} />
              <Row label="Work mode" value={workMode.label} />
              <Row label="Region" value={`${candidate.region} · ${candidate.timezone}`} />
              <Row label="Compensation" value={formatCompensation(candidate.compensation)} />
              <Row label="Languages" value={candidate.languages.join(", ")} />
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:intro@helios.work?subject=Introduction to ${encodeURIComponent(candidate.name)}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-background transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Request introduction
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Save to shortlist
              </button>
            </div>

            {/* External links */}
            {Object.keys(candidate.links).length > 0 ? (
              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Presence
                </p>
                <div className="flex flex-wrap gap-2">
                  {candidate.links.website ? (
                    <ExternalLinkChip href={candidate.links.website} icon={<Globe className="h-3.5 w-3.5" />}>
                      Website
                    </ExternalLinkChip>
                  ) : null}
                  {candidate.links.github ? (
                    <ExternalLinkChip href={candidate.links.github} icon={<Github className="h-3.5 w-3.5" />}>
                      GitHub
                    </ExternalLinkChip>
                  ) : null}
                  {candidate.links.linkedin ? (
                    <ExternalLinkChip href={candidate.links.linkedin} icon={<Linkedin className="h-3.5 w-3.5" />}>
                      LinkedIn
                    </ExternalLinkChip>
                  ) : null}
                  {candidate.links.twitter ? (
                    <ExternalLinkChip href={candidate.links.twitter} icon={<Twitter className="h-3.5 w-3.5" />}>
                      X / Twitter
                    </ExternalLinkChip>
                  ) : null}
                </div>
              </div>
            ) : null}
          </aside>

          {/* Main content */}
          <div className="space-y-16">
            {/* Bio */}
            <section>
              <SectionLabel numeral="I" title="Profile" />
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {candidate.bio}
              </p>
            </section>

            {/* Selected work */}
            {candidate.selectedWork.length > 0 ? (
              <section>
                <SectionLabel numeral="II" title="Selected work" />
                <div className="mt-6 space-y-6">
                  {candidate.selectedWork.map((work, i) => (
                    <article
                      key={i}
                      className="group relative rounded-xl border border-border/70 bg-surface/60 p-6 transition-colors hover:border-accent/50"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl text-foreground">{work.title}</h3>
                        {work.href ? (
                          <a
                            href={work.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent"
                          >
                            View
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {work.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Experience */}
            <section>
              <SectionLabel numeral="III" title="Experience" />
              <ol className="mt-6 space-y-8 border-l border-border/70 pl-8">
                {candidate.experience.map((exp, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-[33px] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-background"
                      aria-hidden
                    />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {exp.period}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-foreground">
                      {exp.role}{" "}
                      <span className="text-muted-foreground">· {exp.company}</span>
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Education */}
            {candidate.education.length > 0 ? (
              <section>
                <SectionLabel numeral="IV" title="Education" />
                <ul className="mt-6 space-y-4">
                  {candidate.education.map((edu, i) => (
                    <li
                      key={i}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/50 pb-4 last:border-b-0"
                    >
                      <div>
                        <p className="font-display text-lg text-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {edu.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Skills */}
            <section>
              <SectionLabel numeral="V" title="Skills & tools" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border/70 bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Similar practitioners */}
        {similar.length > 0 ? (
          <section className="mt-32 border-t border-border/60 pt-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Adjacent practitioners
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground md:text-4xl">
                  Others working in {discipline.short.toLowerCase()}
                </h2>
              </div>
              <Link
                href={`/talent?discipline=${candidate.discipline}`}
                className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent"
              >
                View all →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((c) => (
                <CandidateCard key={c.slug} candidate={c} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-4 last:border-b-0">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right text-sm text-foreground">{value}</dd>
    </div>
  )
}

function SectionLabel({ numeral, title }: { numeral: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border/60 pb-3">
      <span className="font-display text-sm italic text-accent">{numeral}.</span>
      <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
    </div>
  )
}

function ExternalLinkChip({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
    >
      {icon}
      {children}
    </a>
  )
}
