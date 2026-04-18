import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  title: "Helios — Precision talent discovery for modern teams",
  description:
    "A quiet, editorial platform for recruiters to discover exceptional engineers, designers, and operators across disciplines and levels.",
  applicationName: "Helios",
  authors: [{ name: "Helios Talent" }],
  keywords: [
    "talent discovery",
    "recruitment platform",
    "engineering hiring",
    "design hiring",
    "candidate profiles",
    "executive search",
  ],
  openGraph: {
    title: "Helios — Precision talent discovery",
    description:
      "Discover exceptional engineers, designers, and operators across disciplines and levels.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#060814",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
