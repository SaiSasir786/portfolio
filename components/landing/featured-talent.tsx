import Link from "next/link"
import { CANDIDATES } from "@/lib/talent"
import { CandidateCard } from "@/components/talent/candidate-card"
import { SectionMarker } from "./approach"

export function FeaturedTalent() {
  const featured = CANDIDATES.filter((c) => c.featured).slice(0, 3)

  return (
    <section aria-labelledby="featured-title" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionMarker roman="III" label="Currently on the roster" />

        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="featured-title"
            className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl"
          >
            Three practitioners, picked at random
            <br />
            <span className="italic text-[color:var(--color-muted)]">
              from this week&apos;s directory.
            </span>
          </h2>
          <Link
            href="/talent"
            className="label-mono text-[color:var(--color-accent)] transition-opacity hover:opacity-80"
          >
            See all twenty-five →
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((candidate) => (
            <CandidateCard
              key={candidate.slug}
              candidate={candidate}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
