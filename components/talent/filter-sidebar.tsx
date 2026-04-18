"use client"

import {
  AVAILABILITY,
  DISCIPLINES,
  LEVELS,
  REGIONS,
  WORK_MODES,
  type Availability,
  type Discipline,
  type Level,
  type WorkMode,
} from "@/lib/talent"
import type { TalentFilters } from "@/lib/filters"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  filters: TalentFilters
  onChange: (next: TalentFilters) => void
  onClear: () => void
  className?: string
  compact?: boolean
}

export function FilterSidebar({
  filters,
  onChange,
  onClear,
  className,
  compact,
}: FilterSidebarProps) {
  function toggle<K extends keyof TalentFilters>(
    key: K,
    value: TalentFilters[K] extends Array<infer U> ? U : never,
  ) {
    const current = filters[key] as unknown as Array<typeof value>
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  return (
    <aside
      className={cn(
        "flex flex-col gap-8",
        !compact && "sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2",
        className,
      )}
      aria-label="Filter roster"
    >
      <div className="flex items-center justify-between">
        <h2 className="label-mono text-[color:var(--color-muted)]">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-[color:var(--color-muted-foreground)] transition-colors hover:text-[color:var(--color-accent)]"
        >
          Clear all
        </button>
      </div>

      <FilterGroup
        title="Discipline"
        options={Object.entries(DISCIPLINES).map(([value, meta]) => ({
          value,
          label: meta.short,
        }))}
        selected={filters.disciplines}
        onToggle={(v) => toggle("disciplines", v as Discipline)}
      />

      <FilterGroup
        title="Level"
        options={Object.entries(LEVELS).map(([value, meta]) => ({
          value,
          label: meta.label,
          hint: meta.yearsRange,
        }))}
        selected={filters.levels}
        onToggle={(v) => toggle("levels", v as Level)}
      />

      <FilterGroup
        title="Availability"
        options={Object.entries(AVAILABILITY).map(([value, meta]) => ({
          value,
          label: meta.label,
        }))}
        selected={filters.availability}
        onToggle={(v) => toggle("availability", v as Availability)}
      />

      <FilterGroup
        title="Work mode"
        options={Object.entries(WORK_MODES).map(([value, meta]) => ({
          value,
          label: meta.label,
        }))}
        selected={filters.workModes}
        onToggle={(v) => toggle("workModes", v as WorkMode)}
      />

      <FilterGroup
        title="Region"
        options={REGIONS.map((r) => ({ value: r, label: r }))}
        selected={filters.regions}
        onToggle={(v) => toggle("regions", v as string)}
      />
    </aside>
  )
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: { value: string; label: string; hint?: string }[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <fieldset className="border-t border-[color:var(--color-border)] pt-5">
      <legend className="label-mono text-[color:var(--color-muted-foreground)]">
        {title}
      </legend>
      <ul className="mt-4 flex flex-col gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt.value)
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => onToggle(opt.value)}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 px-2 py-1.5 text-left text-sm transition-colors",
                  active
                    ? "text-[color:var(--color-accent)]"
                    : "text-[color:var(--color-foreground)]/80 hover:text-[color:var(--color-accent)]",
                )}
                aria-pressed={active}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
                      active
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]"
                        : "border-[color:var(--color-border-strong)] group-hover:border-[color:var(--color-accent)]/60",
                    )}
                  >
                    {active && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 5.2L4.1 7.3L8.5 2.9"
                          stroke="var(--color-accent-foreground)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className="text-[11px] text-[color:var(--color-muted-foreground)]">
                    {opt.hint}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
