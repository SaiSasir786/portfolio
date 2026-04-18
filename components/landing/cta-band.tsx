import Link from "next/link"
import { SectionMarker } from "./approach"

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionMarker roman="V" label="Begin reading" />

        <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-20">
          <h2
            id="cta-title"
            className="font-display text-4xl leading-[1.05] tracking-tight md:text-7xl"
          >
            The roster is short,
            <br />
            the reading is worth it.
          </h2>

          <div>
            <p className="text-lg leading-relaxed text-[color:var(--color-muted)]">
              Every profile is one page. Every skill is a phrase, not a tag.
              Every candidate has shipped work you can point to.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/talent"
                className="group inline-flex items-center gap-2 border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] px-6 py-3 text-sm font-medium text-[color:var(--color-accent-foreground)] transition-colors hover:bg-[color:var(--color-accent-strong)]"
              >
                Open the directory
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <a
                href="mailto:hello@helios.talent"
                className="inline-flex items-center gap-2 border border-[color:var(--color-border-strong)] px-6 py-3 text-sm text-foreground transition-colors hover:border-[color:var(--color-accent)]/60 hover:text-[color:var(--color-accent)]"
              >
                Speak with an editor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
