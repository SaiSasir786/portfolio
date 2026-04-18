import Link from "next/link"
import {
  AVAILABILITY,
  DISCIPLINES,
  LEVELS,
  type Candidate,
} from "@/lib/talent"
import { cn, formatYears, initials } from "@/lib/utils"

interface CandidateCardProps {
  candidate: Candidate
  /** `row` = browse-grid density. `featured` = landing/feature density. */
  variant?: "row" | "featured"
  className?: string
}

export function CandidateCard({
  candidate,
  variant = "row",
  className,
}: CandidateCardProps) {
  const availability = AVAILABILITY[candidate.availability]
  const discipline = DISCIPLINES[candidate.discipline]
  const level = LEVELS[candidate.level]

  return (
    <Link
      href={`/talent/${candidate.slug}`}
      className={cn(
        "group relative flex flex-col border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 transition-colors hover:border-[color:var(--color-accent)]/45 hover:bg-[color:var(--color-surface)]",
        variant === "featured" ? "p-8" : "p-6",
        className,
      )}
    >
      {/* top meta row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <InitialsTile name={candidate.name} size={variant === "featured" ? "lg" : "md"} />
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display leading-tight tracking-tight text-foreground",
                variant === "featured" ? "text-2xl" : "text-xl",
              )}
            >
              {candidate.name}
            </h3>
            <p className="mt-0.5 text-sm text-[color:var(--color-muted)]">
              {candidate.title}
            </p>
          </div>
        </div>
        <AvailabilityPip availability={candidate.availability} />
      </div>

      {/* headline */}
      <p
        className={cn(
          "mt-5 font-display italic text-[color:var(--color-foreground)]/90",
          variant === "featured" ? "text-lg leading-snug" : "text-base leading-snug",
        )}
      >
        {candidate.headline}
      </p>

      {/* metadata row */}
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
        <MetaRow label="Discipline" value={discipline.short} />
        <MetaRow label="Level" value={level.label} />
        <MetaRow label="Location" value={shortLocation(candidate.location)} />
        <MetaRow
          label="Experience"
          value={formatYears(candidate.years)}
        />
      </dl>

      {/* skills */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, variant === "featured" ? 6 : 5).map((skill) => (
          <span
            key={skill}
            className="border border-[color:var(--color-border)] px-2.5 py-1 text-[11px] tracking-wide text-[color:var(--color-muted)]"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > (variant === "featured" ? 6 : 5) && (
          <span className="px-2.5 py-1 text-[11px] text-[color:var(--color-muted-foreground)]">
            +{candidate.skills.length - (variant === "featured" ? 6 : 5)}
          </span>
        )}
      </div>

      {/* footer */}
      <div className="mt-6 flex items-center justify-between border-t border-[color:var(--color-border)] pt-4 text-xs text-[color:var(--color-muted-foreground)]">
        <span className="label-mono">{availability.label}</span>
        <span className="flex items-center gap-1.5 text-[color:var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
          View profile
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="label-mono text-[10px] text-[color:var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd className="text-sm text-[color:var(--color-foreground)]/90">
        {value}
      </dd>
    </div>
  )
}

function shortLocation(loc: string): string {
  const parts = loc.split(",").map((p) => p.trim())
  if (parts.length <= 1) return loc
  return `${parts[0]}`
}

export function InitialsTile({
  name,
  size = "md",
}: {
  name: string
  size?: "sm" | "md" | "lg" | "xl"
}) {
  const dim = {
    sm: "h-10 w-10 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  }[size]
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-[color:var(--color-border-strong)] bg-gradient-to-br from-[color:var(--color-surface-2)] to-[color:var(--color-surface)] font-display tracking-tight text-[color:var(--color-accent)]",
        dim,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}

export function AvailabilityPip({
  availability,
}: {
  availability: Candidate["availability"]
}) {
  const meta = AVAILABILITY[availability]
  return (
    <div
      className="flex shrink-0 items-center gap-2"
      title={meta.label}
      aria-label={meta.label}
    >
      <span className="relative flex h-2 w-2">
        {availability === "active" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
        )}
        <span
          className={cn("relative inline-flex h-2 w-2 rounded-full", meta.dotClass)}
        />
      </span>
    </div>
  )
}
