export function cn(...inputs: Array<string | number | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ")
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function formatYears(years: number): string {
  if (years < 1) return "< 1 yr"
  if (years === 1) return "1 yr"
  return `${years} yrs`
}
