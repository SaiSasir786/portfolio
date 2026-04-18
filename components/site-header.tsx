import Link from "next/link"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  className?: string
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/75 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground transition-opacity hover:opacity-80"
          aria-label="Helios home"
        >
          <HeliosMark />
          <span className="font-display text-xl leading-none tracking-tight">
            Helios
          </span>
          <span className="label-mono hidden text-[color:var(--color-muted-foreground)] md:inline-block">
            Talent
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <NavLink href="/talent">Browse talent</NavLink>
          <NavLink href="/#disciplines">Disciplines</NavLink>
          <NavLink href="/#approach">Approach</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/talent"
            className="group relative inline-flex items-center gap-2 rounded-none border border-[color:var(--color-accent)]/30 bg-transparent px-4 py-2 text-sm text-[color:var(--color-accent)] transition-colors hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10"
          >
            <span>Open roster</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="label-mono text-[color:var(--color-muted)] transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}

function HeliosMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="3.5" fill="var(--color-accent)" />
      <circle
        cx="11"
        cy="11"
        r="9.5"
        stroke="var(--color-accent)"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="var(--color-accent)"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
    </svg>
  )
}
