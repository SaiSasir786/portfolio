import type { ReactNode } from "react"

type Props = {
  chapter: string
  eyebrow?: string
  title: string
  subtitle?: ReactNode
}

export function SectionHeader({ chapter, eyebrow, title, subtitle }: Props) {
  return (
    <header className="grid gap-10 border-t border-border-strong pt-14 md:grid-cols-[200px_1fr] md:gap-16 md:pt-20">
      <div>
        <p className="font-display text-xl italic leading-none text-accent">{chapter}</p>
        {eyebrow ? (
          <p className="label-mono mt-4 text-muted">{eyebrow}</p>
        ) : null}
      </div>
      <div>
        <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  )
}
