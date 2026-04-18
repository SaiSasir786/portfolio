import { profile } from "@/lib/portfolio"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10 md:px-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-display text-xl text-foreground">{profile.name}</p>
          <p className="label-mono mt-2 text-muted">
            © {year} · Designed and built with quiet intent
          </p>
        </div>
        <a
          href="#top"
          className="label-mono inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
