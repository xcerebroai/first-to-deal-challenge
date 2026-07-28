/**
 * First to Deal Challenge — DealMachine AI Edition. Standalone landing page.
 * A Vite entry (challenge.html → main.tsx → this) reusing the shared design
 * system (../components/ui, index.css) with a Matrix theme layered in
 * (src/challenge/section.tsx + the .bg-matrix-* / .matrix-* utilities).
 *
 * Section order:
 *   1. Hero  2. Challenge (3-day roadmap + pillars)  3. AISystems
 *   4. Rewards  5. Register (countdown + CTA)  6. Host  7. Footer
 */
import Nav from './Nav'
import Hero from './Hero'
import Challenge from './Challenge'
import AISystems from './AISystems'
import Rewards from './Rewards'
import Register from './Register'
import Host from './Host'
import Footer from './Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#030705]">
      <Nav />
      <main>
        <Hero />
        <Challenge />
        <AISystems />
        <Rewards />
        <Register />
        <Host />
      </main>
      <Footer />
    </div>
  )
}
