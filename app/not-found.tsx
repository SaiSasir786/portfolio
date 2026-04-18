import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Starfield } from "@/components/starfield"

export default function NotFound() {
  return (
    <>
      <Starfield />
      <SiteHeader />
      <main className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center px-6 md:px-10">
        <p className="label-mono text-accent">
          404 · Off chart
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl">
          This path is unmapped.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The profile or page you were looking for is no longer on the registry. It
          may have been archived, or the link may be mistyped.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="label-mono inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Return home
          </Link>
          <Link
            href="/talent"
            className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Browse the directory
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
