import { SectionMarker } from "./approach"

export function SearchPreview() {
  return (
    <section
      aria-labelledby="search-title"
      className="relative border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionMarker roman="IV" label="How search feels" />

        <div className="mt-6 grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <h2
              id="search-title"
              className="max-w-xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl"
            >
              Find the right person,
              <br />
              <span className="italic text-[color:var(--color-accent)]/90">
                without the rituals.
              </span>
            </h2>

            <div className="mt-10 space-y-8 border-l border-[color:var(--color-rule)] pl-8">
              <Step
                roman="i."
                title="Phrase-aware search."
                body="Type what you mean. 'Staff backend Tokyo', 'senior designer editorial', 'ML infra GPU scheduling' — the index weighs phrases, skills, and prose together."
              />
              <Step
                roman="ii."
                title="Filters you would actually use."
                body="Discipline, level, availability, region, work mode. Stack them. Strip them down. Save the URL and share it with your team."
              />
              <Step
                roman="iii."
                title="Profiles that read like chapters."
                body="Each candidate is a single page of prose — selected work, experience, education. No popups, no dialogs, no endless clicks."
              />
            </div>
          </div>

          {/* Mocked search surface — purely visual */}
          <MockSearchSurface />
        </div>
      </div>
    </section>
  )
}

function Step({
  roman,
  title,
  body,
}: {
  roman: string
  title: string
  body: string
}) {
  return (
    <div>
      <span className="label-mono text-[color:var(--color-accent)]">{roman}</span>
      <h3 className="mt-2 font-display text-xl leading-tight tracking-tight md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
        {body}
      </p>
    </div>
  )
}

function MockSearchSurface() {
  return (
    <div className="relative">
      {/* faint amber glow behind the mock */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,163,90,0.08), transparent 70%)",
        }}
      />

      <div className="border border-[color:var(--color-border-strong)] bg-[color:var(--color-background)] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]/50" />
          </div>
          <span className="label-mono text-[color:var(--color-muted-foreground)]">
            helios.talent · roster
          </span>
        </div>

        {/* search bar */}
        <div className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-5 py-4">
          <SearchIcon />
          <span className="flex-1 font-mono text-sm text-foreground">
            staff backend tokyo
            <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[color:var(--color-accent)] align-middle" />
          </span>
          <span className="label-mono text-[color:var(--color-muted-foreground)]">
            2 results
          </span>
        </div>

        {/* chips */}
        <div className="flex flex-wrap gap-2 px-5 py-3">
          <Chip active>Backend</Chip>
          <Chip active>Staff</Chip>
          <Chip active>APAC</Chip>
          <Chip>Remote</Chip>
          <Chip>Open to conversations</Chip>
        </div>

        {/* result preview */}
        <div className="divide-y divide-[color:var(--color-border)]">
          <MockResult
            initials="FA"
            name="Felix Ando"
            title="Staff Backend Engineer · Tokyo, Japan"
            headline="Designs distributed systems that behave predictably under failure."
            dotColor="#7fa0c4"
          />
          <MockResult
            initials="ZQ"
            name="Zara Qureshi"
            title="Senior Backend Engineer · Dubai, UAE"
            headline="Ships quietly excellent APIs; has a bias toward deleting code."
            dotColor="var(--color-accent)"
            pulse
          />
        </div>
      </div>
    </div>
  )
}

function Chip({
  children,
  active,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <span
      className={
        "border px-2.5 py-1 text-[11px] tracking-wide " +
        (active
          ? "border-[color:var(--color-accent)]/60 bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]"
          : "border-[color:var(--color-border)] text-[color:var(--color-muted)]")
      }
    >
      {children}
    </span>
  )
}

function MockResult({
  initials,
  name,
  title,
  headline,
  dotColor,
  pulse,
}: {
  initials: string
  name: string
  title: string
  headline: string
  dotColor: string
  pulse?: boolean
}) {
  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] font-display text-sm text-[color:var(--color-accent)]">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-display text-base leading-tight text-foreground">
            {name}
          </p>
          <span className="relative flex h-1.5 w-1.5">
            {pulse && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: dotColor }}
              />
            )}
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          </span>
        </div>
        <p className="mt-0.5 text-xs text-[color:var(--color-muted-foreground)]">
          {title}
        </p>
        <p className="mt-1.5 font-display text-sm italic text-[color:var(--color-muted)]">
          {headline}
        </p>
      </div>
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
      className="text-[color:var(--color-accent)]"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
