import { useEffect, useState } from 'react'
import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ExperienceSection } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Writing } from './components/Writing'
import { EducationSection } from './components/Education'
import { Contact } from './components/Contact'
import { CommandPalette } from './components/CommandPalette'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Background />
      <Nav theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero />
        <About />
        <ExperienceSection />
        <Projects />
        <Writing />
        <Skills />
        <EducationSection />
        <Contact />
      </main>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggle} />
    </>
  )
}
