"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  AVAILABILITY,
  CANDIDATES,
  DISCIPLINES,
  LEVELS,
  WORK_MODES,
  type Availability,
  type Discipline,
  type Level,
  type WorkMode,
} from "@/lib/talent"
import {
  EMPTY_FILTERS,
  activeFilterCount,
  filterCandidates,
  sortCandidates,
  type SortOption,
  type TalentFilters,
} from "@/lib/filters"
import { CandidateCard } from "./candidate-card"
import { FilterSidebar } from "./filter-sidebar"

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently active" },
  { value: "experience-desc", label: "Most experience" },
  { value: "experience-asc", label: "Least experience" },
  { value: "name", label: "A — Z" },
]

export function TalentBrowse() {
  const searchParams = useSearchParams()

  // Seed filters from URL params on first render.
  const initial = useMemo<TalentFilters>(() => {
    const discipline = searchParams.get("discipline") as Discipline | null
    const availability = searchParams.get("availability") as Availability | null
    return {
      ...EMPTY_FILTERS,
      disciplines: discipline && discipline in DISCIPLINES ? [discipline] : [],
      availability:
        availability && availability in AVAILABILITY ? [availability] : [],
    }
    // only seed once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [filters, setFilters] = useState<TalentFilters>(initial)
  const [sort, setSort] = useState<SortOption>("recent")
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Lock body scroll when drawer is open on mobile.
  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawerOpen])

  const results = useMemo(() => {
    return sortCandidates(filterCandidates(CANDIDATES, filters), sort)
  }, [filters, sort])

  const activeCount = activeFilterCount(filters)

  function clearFilters() {
    setFilters(EMPTY_FILTERS)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
      {/* Header band */}
      <div className="mb-12">
        <div className="label-mono flex items-center gap-3 text-[color:var(--color-accent)]">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
          Directory
        </div>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
          The roster,
          <span className="italic text-[color:var(--color-muted)]"> in full.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-muted)]">
          Every practitioner on Helios, searchable by discipline, level, availability, and region.
          Read a profile as you would a short essay.
        </p>
      </div>

      {/* Search + controls */}
      <div className="sticky top-16 z-20 -mx-6 border-y border-[color:var(--color-border)] bg-[color:var(--color-background)]/85 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <SearchInput
            value={filters.query}
            onChange={(v) => setFilters((f) => ({ ...f, query: v }))}
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 border border-[color:var(--color-border-strong)] px-4 py-2.5 text-sm text-foreground transition-colors hover:border-[color:var(--color-accent)]/60 md:hidden"
            >
              <FilterIcon />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center bg-[color:var(--color-accent)] px-1 text-[11px] font-medium text-[color:var(--color-accent-foreground)]">
                  {activeCount}
                </span>
              )}
            </button>

            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        {/* active chips */}
        {activeCount > 0 && (
          <ActiveChips filters={filters} onChange={setFilters} />
        )}
      </div>

      {/* Body: sidebar + results */}
      <div className="mt-10 grid gap-10 md:grid-cols-[260px_1fr] md:gap-12 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
          />
        </div>

        {/* Results column */}
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <p className="text-sm text-[color:var(--color-muted)]">
              <span className="font-display text-2xl text-foreground">
                {results.length}
              </span>
              <span className="ml-2 text-[color:var(--color-muted)]">
                {results.length === 1 ? "practitioner" : "practitioners"}
              </span>
            </p>
            <p className="label-mono hidden text-[color:var(--color-muted-foreground)] md:block">
              Sorted · {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            </p>
          </div>

          {results.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
              {results.map((candidate) => (
                <CandidateCard key={candidate.slug} candidate={candidate} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-[color:var(--color-background)] shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-6 py-4">
              <h2 className="font-display text-xl tracking-tight">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-sm text-[color:var(--color-muted)] hover:text-foreground"
                aria-label="Close"
              >
                Close ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
                compact
              />
            </div>
            <div className="border-t border-[color:var(--color-border)] p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-[color:var(--color-accent)] px-4 py-3 text-sm font-medium text-[color:var(--color-accent-foreground)] transition-colors hover:bg-[color:var(--color-accent-strong)]"
              >
                Show {results.length} {results.length === 1 ? "result" : "results"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Sub-components ---------------------------------------------------------

function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[color:var(--color-accent)]">
        <SearchIcon />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, skill, company, or phrase…"
        className="w-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] py-2.5 pl-11 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-[color:var(--color-muted-foreground)] focus:border-[color:var(--color-accent)]/70 focus:bg-[color:var(--color-surface-2)]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center text-[color:var(--color-muted)] hover:text-foreground"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortOption
  onChange: (v: SortOption) => void
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="label-mono text-[color:var(--color-muted-foreground)]">
        Sort
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="cursor-pointer appearance-none border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] py-2.5 pl-3 pr-9 text-sm text-foreground outline-none transition-colors hover:border-[color:var(--color-accent)]/60 focus:border-[color:var(--color-accent)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[color:var(--color-accent)]"
        >
          ▾
        </span>
      </div>
    </label>
  )
}

function ActiveChips({
  filters,
  onChange,
}: {
  filters: TalentFilters
  onChange: (next: TalentFilters) => void
}) {
  const chips: { label: string; remove: () => void }[] = []

  if (filters.query) {
    chips.push({
      label: `"${filters.query}"`,
      remove: () => onChange({ ...filters, query: "" }),
    })
  }
  for (const d of filters.disciplines) {
    chips.push({
      label: DISCIPLINES[d].short,
      remove: () =>
        onChange({
          ...filters,
          disciplines: filters.disciplines.filter((x) => x !== d),
        }),
    })
  }
  for (const l of filters.levels) {
    chips.push({
      label: LEVELS[l].label,
      remove: () =>
        onChange({ ...filters, levels: filters.levels.filter((x) => x !== l) }),
    })
  }
  for (const a of filters.availability) {
    chips.push({
      label: AVAILABILITY[a].label,
      remove: () =>
        onChange({
          ...filters,
          availability: filters.availability.filter((x) => x !== a),
        }),
    })
  }
  for (const w of filters.workModes) {
    chips.push({
      label: WORK_MODES[w].label,
      remove: () =>
        onChange({
          ...filters,
          workModes: filters.workModes.filter((x) => x !== w),
        }),
    })
  }
  for (const r of filters.regions) {
    chips.push({
      label: r,
      remove: () =>
        onChange({
          ...filters,
          regions: filters.regions.filter((x) => x !== r),
        }),
    })
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.remove}
          className="group flex items-center gap-1.5 border border-[color:var(--color-accent)]/50 bg-[color:var(--color-accent)]/10 px-2.5 py-1 text-[11px] tracking-wide text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent)]/20"
        >
          {chip.label}
          <span aria-hidden="true" className="opacity-60 group-hover:opacity-100">
            ×
          </span>
        </button>
      ))}
    </div>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-start border border-dashed border-[color:var(--color-border-strong)] px-8 py-16">
      <span className="label-mono text-[color:var(--color-accent)]">
        Nothing matched
      </span>
      <h3 className="mt-4 max-w-lg font-display text-3xl leading-tight tracking-tight">
        No practitioners fit this shape quite yet.
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[color:var(--color-muted)]">
        Try removing a filter, or broaden the search to something like{" "}
        <span className="italic text-[color:var(--color-foreground)]/90">
          senior backend
        </span>{" "}
        or{" "}
        <span className="italic text-[color:var(--color-foreground)]/90">
          product designer editorial
        </span>
        .
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-accent-foreground)] transition-colors hover:bg-[color:var(--color-accent-strong)]"
      >
        Clear all filters
      </button>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11 11L14 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
