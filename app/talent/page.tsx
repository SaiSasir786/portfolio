import { Suspense } from "react"
import type { Metadata } from "next"
import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TalentBrowse } from "@/components/talent/talent-browse"

export const metadata: Metadata = {
  title: "Browse the roster — Helios",
  description:
    "Search the Helios directory by discipline, level, availability, and region.",
}

export default function TalentPage() {
  return (
    <>
      <Starfield variant="quiet" />
      <SiteHeader />
      <main>
        <Suspense fallback={<BrowseSkeleton />}>
          <TalentBrowse />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

function BrowseSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
      <div className="h-4 w-24 bg-[color:var(--color-surface)]" />
      <div className="mt-6 h-16 w-2/3 bg-[color:var(--color-surface)]" />
      <div className="mt-10 grid gap-12 md:grid-cols-[280px_1fr]">
        <div className="h-96 bg-[color:var(--color-surface)]/50" />
        <div className="grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-[color:var(--color-surface)]/50"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
