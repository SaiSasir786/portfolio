import { experience, skills } from "@/lib/portfolio"
import { SectionHeader } from "./section-header"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        chapter="IV."
        eyebrow="Experience & toolkit"
        title="A working record, and the instruments I reach for."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
        <div />
        <div className="space-y-14">
          {/* Timeline */}
          <ol className="relative space-y-10 border-l border-border pl-8">
            {experience.map((item) => (
              <li key={item.role} className="relative">
                <span
                  className="absolute -left-[33px] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden
                />
                <p className="label-mono text-accent">{item.period}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-foreground md:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-base text-muted">{item.org}</p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground">
                  {item.summary}
                </p>
                <ul className="mt-4 max-w-2xl space-y-2 text-base leading-relaxed text-muted">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-3 h-px w-3 shrink-0 bg-accent" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {/* Skills */}
          <div>
            <p className="label-mono text-muted">Toolkit</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="border-t border-border pt-5">
                  <p className="font-display text-xl text-foreground">{group}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <li
                        key={s}
                        className="label-mono rounded-full border border-border px-3 py-1.5 text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
