import { profile, stats } from "@/lib/portfolio"

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-40 md:px-10"
    >
      {/* Editorial reference */}
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-accent" aria-hidden />
        <p className="label-mono text-accent">Ref. 001 · An applied AI practice</p>
      </div>

      {/* Name — large cinematic serif */}
      <h1 className="mt-10 font-display text-6xl leading-[0.94] tracking-tight text-foreground md:text-[128px]">
        {profile.name}
      </h1>

      {/* Italic tagline */}
      <p className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-muted md:text-3xl">
        {profile.tagline}
      </p>

      {/* Role line */}
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
        {profile.role}
        <span className="mx-3 text-muted-foreground">·</span>
        <span className="text-muted">Systems Architect</span>
        <span className="mx-3 text-muted-foreground">·</span>
        <span className="text-muted">Deep Learning Practitioner</span>
      </p>

      {/* Status dot + location */}
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="label-mono text-foreground">{profile.status}</span>
        </div>
        <p className="label-mono text-muted">{profile.location}</p>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#work"
          className="label-mono inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          View selected work
        </a>
        <a
          href="#contact"
          className="label-mono inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Start a conversation
        </a>
      </div>

      {/* Stats strip */}
      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-5 py-6 md:px-6 md:py-7">
            <p className="font-display text-3xl leading-none text-accent md:text-4xl">{s.value}</p>
            <p className="label-mono mt-3 text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="mt-16 flex items-center gap-3 text-muted">
        <span className="h-px w-8 bg-border-strong" aria-hidden />
        <span className="label-mono">Scroll · I. About below</span>
      </div>
    </section>
  )
}
