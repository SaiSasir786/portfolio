import { profile } from "@/lib/portfolio"
import { SectionHeader } from "./section-header"

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
      <SectionHeader
        chapter="V."
        eyebrow="Contact"
        title="Open to collaboration on applied AI and research-driven engineering."
        subtitle="The best correspondence is short and direct. Reach out over email or any of the channels below — I respond to everything thoughtful."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
        <div />
        <div>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-baseline gap-4 font-display text-4xl leading-tight tracking-tight text-foreground transition-colors hover:text-accent md:text-6xl"
          >
            <span className="border-b border-accent/40 pb-1 transition-colors group-hover:border-accent">
              {profile.email}
            </span>
            <span className="label-mono text-accent transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
            {profile.socials.map((s) => (
              <li key={s.label} className="bg-background">
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col gap-2 px-6 py-6 transition-colors hover:bg-surface"
                >
                  <span className="label-mono text-muted">{s.label}</span>
                  <span className="font-display text-xl text-foreground transition-colors group-hover:text-accent">
                    {s.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
