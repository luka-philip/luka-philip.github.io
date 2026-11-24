import { motion } from 'motion/react'
import { useState } from 'react'
import { experience, projects, skills } from '../data/resume'
import { ComingSoon, Section, trackSpotlight } from './Section'

/** Hovering a skill highlights the jobs/projects where it's been used. */
export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null)

  const usage = hovered
    ? [
        ...experience.filter((e) => e.tech.includes(hovered)).map((e) => e.company),
        ...projects.filter((p) => p.tech.includes(hovered)).map((p) => p.name),
      ]
    : []

  return (
    <Section id="skills" eyebrow="04 · skills" title="My toolkit">
      {Object.keys(skills).length === 0 && <ComingSoon />}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onPointerMove={trackSpotlight}
            className="spotlight-card rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur"
          >
            <h3 className="font-mono text-xs tracking-wider text-muted uppercase">{group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s) => (
                <span
                  key={s}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-default rounded-lg border px-3 py-1.5 text-sm transition-all ${
                    hovered === s
                      ? 'scale-105 border-accent bg-accent/10 text-fg'
                      : 'border-border bg-bg/50 text-muted hover:text-fg'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="no-print mt-6 h-5 font-mono text-xs text-muted">
        {hovered &&
          (usage.length ? (
            <>
              <span className="text-accent">{hovered}</span> → used at {usage.join(', ')}
            </>
          ) : (
            <>
              <span className="text-accent">{hovered}</span> → personal & coursework
            </>
          ))}
      </p>
    </Section>
  )
}
