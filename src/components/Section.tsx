import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { id: string; eyebrow: string; title: string; children: ReactNode }

export function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <p className="font-mono text-sm text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  )
}

/** Reveal-on-scroll wrapper for staggered children */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Tracks the cursor inside a .spotlight-card so its glow follows the mouse */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Placeholder shown for sections that don't have content yet */
export function ComingSoon({ label = 'Coming soon' }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-surface/40 p-6 backdrop-blur">
      <span className="relative flex size-2.5 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
      </span>
      <p className="font-mono text-sm text-muted">
        {label}
        <span className="cursor-blink text-accent">_</span>
      </p>
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  )
}
