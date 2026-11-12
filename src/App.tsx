import { About } from './sections/About'
import { BitStrip } from './sections/BitStrip'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { SiteFooter } from './sections/SiteFooter'
import { SiteHeader } from './sections/SiteHeader'

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BitStrip />
        <About />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
