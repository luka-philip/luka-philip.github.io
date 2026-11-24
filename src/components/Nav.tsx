import { AnimatePresence, motion } from 'motion/react'
import { Command, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import type { Theme } from '../hooks/useTheme'

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void }

export function Nav({ theme, onToggleTheme, onOpenPalette }: Props) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const iconBtn =
    'grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:text-fg'

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen ? 'border-b border-border bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-gradient">{profile.initials}</span>
          <span className="text-muted">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === s.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {s.label}
              </a>
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-border bg-surface"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg sm:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" />
            <span className="font-mono">Ctrl K</span>
          </button>
          <button
            onClick={onToggleTheme}
            className={iconBtn}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`${iconBtn} md:hidden`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-5 md:hidden"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setMenuOpen(false)} className="block py-3 text-muted hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
