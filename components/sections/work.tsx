import { projects } from "@/lib/portfolio"
import { SectionHeader } from "./section-header"

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        chapter="III."
        eyebrow="Selected work"
        title="A small collection of systems and end-to-end builds."
        subtitle="Each project is chosen for the problem it solved, not for the surface it presented. Stacks are noted; stories are in the writing."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
        <div />
        <ol className="divide-y divide-border-strong">
          {projects.map((p) => (
            <li key={p.id} className="grid gap-8 py-12 md:grid-cols-[80px_1fr] md:gap-12">
              <p className="font-display text-4xl italic leading-none text-accent">{p.index}.</p>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="label-mono text-muted">{p.year}</p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li key={tag} className="label-mono text-accent">
                      {tag}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground">
                  {p.summary}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  {p.detail}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="label-mono rounded-full border border-border px-3 py-1.5 text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
