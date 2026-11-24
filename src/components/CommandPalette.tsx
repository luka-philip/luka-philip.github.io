import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Download, ExternalLink, Palette, Printer, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { profile } from '../data/resume'
import { sections } from './Nav'

type Action = { id: string; label: string; group: string; icon: ReactNode; run: () => void }

type Props = { open: boolean; onClose: () => void; onToggleTheme: () => void }

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

export function CommandPalette({ open, onClose, onToggleTheme }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = [
      { id: 'top', label: 'Home', group: 'Navigate', icon: <ArrowRight className="size-4" />, run: () => document.getElementById('top')?.scrollIntoView() },
      ...sections.map((s) => ({
        id: s.id,
        label: s.label,
        group: 'Navigate',
        icon: <ArrowRight className="size-4" />,
        run: () => document.getElementById(s.id)?.scrollIntoView(),
      })),
      { id: 'theme', label: 'Toggle theme', group: 'Actions', icon: <Palette className="size-4" />, run: onToggleTheme },
      { id: 'print', label: 'Print this page as a CV', group: 'Actions', icon: <Printer className="size-4" />, run: () => window.print() },
    ]
    if (profile.resumeUrl)
      list.push({
        id: 'cv',
        label: 'Download CV',
        group: 'Actions',
        icon: <Download className="size-4" />,
        run: () => {
          const a = document.createElement('a')
          a.href = profile.resumeUrl
          a.download = ''
          a.click()
        },
      })
    if (profile.links.github)
      list.push({ id: 'gh', label: 'Open GitHub', group: 'Links', icon: <ExternalLink className="size-4" />, run: () => openExternal(profile.links.github) })
    if (profile.links.linkedin)
      list.push({ id: 'li', label: 'Open LinkedIn', group: 'Links', icon: <ExternalLink className="size-4" />, run: () => openExternal(profile.links.linkedin) })
    return list
  }, [onToggleTheme])

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setSelected(0), [query])

  const run = (a: Action | undefined) => {
    if (!a) return
    onClose()
    a.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') run(filtered[selected])
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null
                lastGroup = a.group
                return (
                  <li key={a.id}>
                    {header && <p className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-wider text-muted uppercase">{header}</p>}
                    <button
                      onClick={() => run(a)}
                      onMouseMove={() => setSelected(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === selected ? 'bg-accent/15 text-fg' : 'text-muted'
                      }`}
                    >
                      {a.icon}
                      {a.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
