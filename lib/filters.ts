import type {
  Availability,
  Candidate,
  Discipline,
  Level,
  WorkMode,
} from "@/lib/talent"

export type SortOption =
  | "recent"
  | "experience-desc"
  | "experience-asc"
  | "name"

export interface TalentFilters {
  query: string
  disciplines: Discipline[]
  levels: Level[]
  availability: Availability[]
  workModes: WorkMode[]
  regions: string[]
}

export const EMPTY_FILTERS: TalentFilters = {
  query: "",
  disciplines: [],
  levels: [],
  availability: [],
  workModes: [],
  regions: [],
}

function matchesQuery(candidate: Candidate, query: string): boolean {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    candidate.name,
    candidate.title,
    candidate.headline,
    candidate.bio,
    candidate.location,
    ...candidate.skills,
    ...candidate.experience.map((e) => `${e.company} ${e.role}`),
  ]
    .join(" ")
    .toLowerCase()
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

export function filterCandidates(
  candidates: Candidate[],
  filters: TalentFilters,
): Candidate[] {
  return candidates.filter((c) => {
    if (!matchesQuery(c, filters.query)) return false
    if (
      filters.disciplines.length > 0 &&
      !filters.disciplines.includes(c.discipline)
    )
      return false
    if (filters.levels.length > 0 && !filters.levels.includes(c.level))
      return false
    if (
      filters.availability.length > 0 &&
      !filters.availability.includes(c.availability)
    )
      return false
    if (
      filters.workModes.length > 0 &&
      !filters.workModes.includes(c.workMode)
    )
      return false
    if (filters.regions.length > 0 && !filters.regions.includes(c.region))
      return false
    return true
  })
}

export function sortCandidates(
  candidates: Candidate[],
  sort: SortOption,
): Candidate[] {
  const arr = [...candidates]
  switch (sort) {
    case "recent":
      return arr.sort((a, b) => a.lastActiveDays - b.lastActiveDays)
    case "experience-desc":
      return arr.sort((a, b) => b.years - a.years)
    case "experience-asc":
      return arr.sort((a, b) => a.years - b.years)
    case "name":
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return arr
  }
}

export function activeFilterCount(filters: TalentFilters): number {
  return (
    (filters.query ? 1 : 0) +
    filters.disciplines.length +
    filters.levels.length +
    filters.availability.length +
    filters.workModes.length +
    filters.regions.length
  )
}
