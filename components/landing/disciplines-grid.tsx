import Link from "next/link"
import { DISCIPLINES, getStats, type Discipline } from "@/lib/talent"
import { SectionMarker } from "./approach"

export function DisciplinesGrid() {
  const stats = getStats()

  const entries = (Object.keys(DISCIPLINES) as Discipline[]).map((key, i) => ({
    key,
    meta: DISCIPLINES[key],
    count: stats.byDiscipline[key],
    roman: romanize(i + 1),
  }))

  return (
    <section
      id="disciplines"
      aria-labelledby="disciplines-title"
      className="relative border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionMarker roman="II" label="Disciplines" />

        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="disciplines-title"
            className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl"
          >
            Ten disciplines,
            <br />
            <span className="italic text-[color:var(--color-muted)]">
              one shared standard of care.
            </span>
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[color:var(--color-muted)]">
            From foundation-model research to ledger engineering and editorial design —
            every roster member has shipped work you can read, test, or verify.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)] md:grid-cols-2 md:divide-x">
          {entries.map((entry, i) => (
            <DisciplineRow
              key={entry.key}
              roman={entry.roman}
              label={entry.meta.label}
              description={entry.meta.description}
              count={entry.count}
              href={`/talent?discipline=${entry.key}`}
              isLastOnRow={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DisciplineRow({
  roman,
  label,
  description,
  count,
  href,
}: {
  roman: string
  label: string
  description: string
  count: number
  href: string
  isLastOnRow: boolean
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 p-8 transition-colors hover:bg-[color:var(--color-surface-2)]/60 md:p-10"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="label-mono text-[color:var(--color-accent)]">{roman}</span>
        <span className="text-xs text-[color:var(--color-muted-foreground)]">
          {count} {count === 1 ? "practitioner" : "practitioners"}
        </span>
      </div>
      <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-[color:var(--color-accent)] md:text-3xl">
        {label}
      </h3>
      <p className="text-[15px] leading-relaxed text-[color:var(--color-muted)]">
        {description}
      </p>
      <span
        aria-hidden="true"
        className="mt-3 inline-flex items-center gap-1 text-xs text-[color:var(--color-muted-foreground)] transition-all group-hover:gap-2 group-hover:text-[color:var(--color-accent)]"
      >
        View practitioners →
      </span>
    </Link>
  )
}

function romanize(n: number): string {
  const map: Array<[number, string]> = [
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ]
  let result = ""
  let num = n
  for (const [val, sym] of map) {
    while (num >= val) {
      result += sym
      num -= val
    }
  }
  return result + "."
}
