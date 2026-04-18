// Removes all residual static-portfolio files that are still present in the
// sandbox and preventing the v0 dev-server manager from recognising this as a
// Next.js project. Safe to run multiple times.
import { rm, stat, readdir } from "node:fs/promises"
import { join } from "node:path"

const ROOT = process.cwd()
console.log("[v0] cleanup starting in", ROOT)

const toDelete = [
  "assets",
  "projects",
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  "bun.lockb",
  // static index fallback from the original template
  "index.html",
]

for (const rel of toDelete) {
  const abs = join(ROOT, rel)
  try {
    await stat(abs)
  } catch {
    console.log("[v0] skip (not present):", rel)
    continue
  }
  await rm(abs, { recursive: true, force: true })
  console.log("[v0] removed:", rel)
}

// Show what's left at the root so we can confirm the tree is clean.
const remaining = await readdir(ROOT)
console.log("[v0] root after cleanup:", remaining.sort().join(", "))
console.log("[v0] cleanup complete")
