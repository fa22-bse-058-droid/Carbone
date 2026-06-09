import Hero from '../components/Hero/Hero'
import CinematicSection from '../components/CinematicSection/CinematicSection'
import StatsSection from '../components/StatsSection/StatsSection'
import FeaturedCars from '../components/FeaturedCars/FeaturedCars'
import AIFinderCTA from '../components/AIFinderCTA/AIFinderCTA'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <main style={{ background: '#080808' }}>
      <Hero />
      <CinematicSection />
      <StatsSection />
      <FeaturedCars />
      <AIFinderCTA />
      <Footer />
    </main>
  )
}