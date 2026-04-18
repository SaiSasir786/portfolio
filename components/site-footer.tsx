import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl tracking-tight">Helios</span>
              <span className="label-mono text-[color:var(--color-muted-foreground)]">
                Talent
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
              A quiet, editorial platform for discovering exceptional
              practitioners across engineering, design, and product.
            </p>
          </div>

          <FooterColumn
            title="Directory"
            links={[
              { label: "Browse talent", href: "/talent" },
              { label: "Disciplines", href: "/#disciplines" },
              { label: "Availability", href: "/talent?availability=active" },
            ]}
          />
          <FooterColumn
            title="For teams"
            links={[
              { label: "How it works", href: "/#approach" },
              { label: "Recruiter guide", href: "#" },
              { label: "Contact", href: "mailto:hello@helios.talent" },
            ]}
          />
          <FooterColumn
            title="Elsewhere"
            links={[
              { label: "LinkedIn", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "Changelog", href: "#" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-border)] pt-8 md:flex-row md:items-center">
          <p className="label-mono text-[color:var(--color-muted-foreground)]">
            © {new Date().getFullYear()} Helios Talent — all rights reserved.
          </p>
          <p className="text-xs italic text-[color:var(--color-muted-foreground)]">
            <span className="font-display text-sm not-italic text-[color:var(--color-muted)]">
              ad astra per aspera
            </span>{" "}
            — to the stars through difficulty.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="label-mono mb-4 text-[color:var(--color-muted-foreground)]">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
