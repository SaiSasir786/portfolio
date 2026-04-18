import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Expertise } from "@/components/sections/expertise"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Starfield } from "@/components/starfield"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Starfield variant="hero" />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <About />
        <Expertise />
        <Work />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
