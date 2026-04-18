export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionMarker roman="I" label="Approach" />

        <h2
          id="approach-title"
          className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl"
        >
          A directory is easy. A useful one is not.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-muted)]">
          Helios is not a job board and not a marketplace. It is a curated reading
          room — a place to find practitioners the way a good editor finds a writer.
        </p>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-10">
          <Pillar
            roman="i."
            title="Curated, not catalogued."
            body="Every profile is reviewed by hand. No stock portraits, no keyword soup, no vanity metrics — just the work and the people who did it."
          />
          <Pillar
            roman="ii."
            title="Depth over breadth."
            body="Twenty-five practitioners today, growing slowly. We would rather you spend an hour reading two profiles carefully than a minute scrolling twenty."
          />
          <Pillar
            roman="iii."
            title="Decisions, in an afternoon."
            body="Filters that match the way recruiters actually think — by discipline, level, availability, region — and a search that understands skills as phrases, not tokens."
          />
        </div>
      </div>
    </section>
  )
}

function Pillar({
  roman,
  title,
  body,
}: {
  roman: string
  title: string
  body: string
}) {
  return (
    <article className="border-t border-[color:var(--color-rule)] pt-8">
      <span className="label-mono text-[color:var(--color-accent)]">
        {roman}
      </span>
      <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
        {body}
      </p>
    </article>
  )
}

export function SectionMarker({
  roman,
  label,
}: {
  roman: string
  label: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-lg italic text-[color:var(--color-accent)]">
        Chapter {roman}
      </span>
      <span
        aria-hidden="true"
        className="inline-block h-px w-16 bg-[color:var(--color-accent)]/40"
      />
      <span className="label-mono text-[color:var(--color-muted)]">
        {label}
      </span>
    </div>
  )
}
