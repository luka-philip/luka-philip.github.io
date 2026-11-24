import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { experience } from '../data/resume'
import { ComingSoon, Reveal, Section, Tag } from './Section'

export function ExperienceSection() {
  const [open, setOpen] = useState<number | null>(0)
  const [printing, setPrinting] = useState(false)

  // Expand every role when printing so the printed CV is complete
  useEffect(() => {
    const before = () => setPrinting(true)
    const after = () => setPrinting(false)
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [])

  return (
    <Section id="experience" eyebrow="02 · experience" title="Where I've worked">
      {experience.length === 0 && <ComingSoon />}
      <ol className={`relative border-l border-border ${experience.length === 0 ? 'hidden' : ''}`}>
        {experience.map((job, i) => {
          const isOpen = printing || open === i
          return (
            <li key={`${job.company}-${i}`} className="relative pb-10 pl-8 last:pb-0">
              <span
                className={`absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 transition-colors ${
                  isOpen ? 'border-accent bg-accent' : 'border-border bg-bg'
                }`}
              />
              <Reveal delay={i * 0.08}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="font-mono text-xs text-muted">
                      {job.start} — {job.end}
                      {job.location && ` · ${job.location}`}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">
                      {job.role} <span className="text-gradient">@ {job.company}</span>
                    </h3>
                    <p className="mt-1 text-muted">{job.summary}</p>
                  </div>
                  <ChevronDown
                    className={`no-print mt-6 size-5 shrink-0 text-muted transition-transform group-hover:text-fg ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2">
                        {job.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3 text-muted">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.tech.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
