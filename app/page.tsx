import { Starfield } from "@/components/starfield"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Approach } from "@/components/landing/approach"
import { DisciplinesGrid } from "@/components/landing/disciplines-grid"
import { FeaturedTalent } from "@/components/landing/featured-talent"
import { SearchPreview } from "@/components/landing/search-preview"
import { CtaBand } from "@/components/landing/cta-band"

export default function HomePage() {
  return (
    <>
      <Starfield variant="hero" />
      <SiteHeader />
      <main>
        <Hero />
        <Approach />
        <DisciplinesGrid />
        <FeaturedTalent />
        <SearchPreview />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
