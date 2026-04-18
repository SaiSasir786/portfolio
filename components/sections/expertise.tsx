import { expertise } from "@/lib/portfolio"
import { SectionHeader } from "./section-header"

export function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        chapter="II."
        eyebrow="Expertise"
        title="Core disciplines where rigour meets applied intelligence."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
        <div />
        <ul className="divide-y divide-border">
          {expertise.map((item, idx) => (
            <li key={item.id} className="grid gap-6 py-8 md:grid-cols-[48px_1fr] md:gap-10">
              <p className="label-mono text-muted">{String(idx + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  {item.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tools.map((t) => (
                    <li
                      key={t}
                      className="label-mono rounded-full border border-border px-3 py-1.5 text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
