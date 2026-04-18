import Link from "next/link"
import { getStats } from "@/lib/talent"

export function Hero() {
  const stats = getStats()

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <div className="label-mono mb-10 flex items-center gap-3 text-[color:var(--color-accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-px w-10 bg-[color:var(--color-accent)]"
          />
          Helios · Talent Directory
        </div>

        <h1 className="max-w-5xl font-display text-[44px] leading-[1.02] tracking-[-0.02em] text-foreground md:text-[76px] lg:text-[92px]">
          Precision talent discovery
          <br />
          <span className="italic text-[color:var(--color-accent)]/90">
            for teams that care about craft.
          </span>
        </h1>

        <p className="mt-10 max-w-2xl font-display text-xl italic leading-relaxed text-[color:var(--color-muted)] md:text-2xl">
          A quiet, editorial directory of senior engineers, designers, and operators —
          curated for depth, searched with intent, read like a book.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/talent"
            className="group inline-flex items-center gap-2 border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] px-6 py-3 text-sm font-medium text-[color:var(--color-accent-foreground)] transition-colors hover:bg-[color:var(--color-accent-strong)]"
          >
            Browse the roster
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="#approach"
            className="inline-flex items-center gap-2 border border-[color:var(--color-border-strong)] px-6 py-3 text-sm text-foreground transition-colors hover:border-[color:var(--color-accent)]/60 hover:text-[color:var(--color-accent)]"
          >
            How it works
          </Link>
        </div>

        {/* Trust row */}
        <dl className="mt-24 grid max-w-4xl grid-cols-2 gap-x-10 gap-y-10 border-t border-[color:var(--color-border)] pt-10 md:grid-cols-4">
          <Stat num={stats.total} label="Practitioners" />
          <Stat num={stats.disciplines} label="Disciplines" />
          <Stat num={stats.active} label="Actively looking" accent />
          <Stat num={stats.countries} label="Countries" />
        </dl>
      </div>
    </section>
  )
}

function Stat({
  num,
  label,
  accent,
}: {
  num: number
  label: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="label-mono text-[color:var(--color-muted-foreground)]">
        {label}
      </dt>
      <dd
        className={
          "font-display text-5xl tracking-tight " +
          (accent ? "text-[color:var(--color-accent)]" : "text-foreground")
        }
      >
        {num}
      </dd>
    </div>
  )
}
