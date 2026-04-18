import { cn } from "@/lib/utils"

interface StarfieldProps {
  /** `quiet` for inner pages (no horizon glow), `hero` for the landing */
  variant?: "quiet" | "hero"
  className?: string
}

/**
 * Cinematic backdrop — a tesseract lattice, a faint starfield, and on the
 * landing, a warm horizon glow. Purely decorative, aria-hidden. Respects
 * `prefers-reduced-motion` via globals.css.
 */
export function Starfield({ variant = "quiet", className }: StarfieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Faint tesseract lattice */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Pinprick starfield */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.9), transparent 50%)",
            "radial-gradient(1px 1px at 28% 74%, rgba(255,255,255,0.65), transparent 50%)",
            "radial-gradient(1.5px 1.5px at 41% 32%, rgba(255,255,255,0.85), transparent 50%)",
            "radial-gradient(1px 1px at 58% 88%, rgba(255,255,255,0.55), transparent 50%)",
            "radial-gradient(1.5px 1.5px at 67% 11%, rgba(255,255,255,0.95), transparent 50%)",
            "radial-gradient(1px 1px at 73% 55%, rgba(255,255,255,0.75), transparent 50%)",
            "radial-gradient(1px 1px at 82% 28%, rgba(255,255,255,0.55), transparent 50%)",
            "radial-gradient(1px 1px at 91% 72%, rgba(255,255,255,0.7), transparent 50%)",
            "radial-gradient(1px 1px at 7% 48%, rgba(255,255,255,0.65), transparent 50%)",
            "radial-gradient(1.5px 1.5px at 34% 8%, rgba(255,255,255,0.9), transparent 50%)",
            "radial-gradient(1px 1px at 52% 62%, rgba(255,255,255,0.55), transparent 50%)",
            "radial-gradient(1px 1px at 94% 44%, rgba(255,255,255,0.75), transparent 50%)",
            "radial-gradient(1px 1px at 22% 92%, rgba(255,255,255,0.65), transparent 50%)",
            "radial-gradient(1px 1px at 46% 20%, rgba(255,255,255,0.5), transparent 50%)",
            "radial-gradient(1.5px 1.5px at 78% 80%, rgba(255,255,255,0.88), transparent 50%)",
          ].join(","),
        }}
      />

      {/* A single, warm amber 'twinkle' star */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 71% 23%, rgba(232,163,90,0.9), transparent 55%), radial-gradient(1.5px 1.5px at 19% 62%, rgba(232,163,90,0.7), transparent 55%)",
        }}
      />

      {/* Hero-only warm horizon glow, rising from lower-left */}
      {variant === "hero" && (
        <>
          <div
            className="absolute -bottom-[420px] left-[6%] h-[880px] w-[880px] rounded-full blur-[10px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(232,163,90,0.18), rgba(232,163,90,0.07) 40%, transparent 72%)",
            }}
          />
          <div
            className="absolute -top-[180px] right-[-60px] h-[460px] w-[460px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(127,160,196,0.11), transparent 70%)",
            }}
          />
        </>
      )}

      {/* Top fade to make the header legible */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,8,20,0.85), transparent)",
        }}
      />
    </div>
  )
}
