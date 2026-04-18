import { profile } from "@/lib/portfolio"
import { SectionHeader } from "./section-header"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <SectionHeader
        chapter="I."
        eyebrow="About"
        title="A quiet, rigorous practice in applied intelligence."
      />
      <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
        <div />
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-foreground md:text-xl">
          <p>{profile.intro}</p>
          <p className="text-muted">{profile.philosophy}</p>
        </div>
      </div>
    </section>
  )
}
