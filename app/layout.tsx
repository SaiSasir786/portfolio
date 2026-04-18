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
  title: "Sai Sasir K — Gen-AI & ML Engineer",
  description:
    "Applied AI engineer designing large language model systems, retrieval pipelines, and autonomous agents with production reliability in mind.",
  applicationName: "Sai Sasir K",
  authors: [{ name: "Sai Sasir K" }],
  keywords: [
    "Sai Sasir",
    "Gen-AI engineer",
    "ML engineer",
    "machine learning",
    "LLM",
    "generative AI",
    "RAG",
    "LangChain",
    "PyTorch",
    "AI systems",
    "robotics",
  ],
  openGraph: {
    title: "Sai Sasir K — Gen-AI & ML Engineer",
    description:
      "Applied AI engineer designing LLM systems, retrieval pipelines, and autonomous agents.",
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
