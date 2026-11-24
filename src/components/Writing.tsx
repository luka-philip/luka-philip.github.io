import { ArrowUpRight, PenLine } from 'lucide-react'
import { writing } from '../data/resume'
import { ComingSoon, Reveal, Section, trackSpotlight } from './Section'

export function Writing() {
  return (
    <Section id="writing" eyebrow="04 · writing" title="Things I've written">
      {writing.length === 0 && <ComingSoon />}
      <div className="space-y-4">
        {writing.map((a, i) => (
          <Reveal key={a.url} delay={i * 0.08}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerMove={trackSpotlight}
              className="spotlight-card group block rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-colors hover:border-accent/40 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-center gap-2 font-mono text-xs text-muted">
                  <PenLine className="size-3.5 text-accent" />
                  {a.publication} · {a.date}
                </p>
                <ArrowUpRight className="no-print size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
              </div>
              <h3 className="mt-3 text-xl font-semibold transition-colors group-hover:text-accent sm:text-2xl">{a.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{a.summary}</p>
              {a.notes && a.notes.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {a.notes.map((n) => (
                    <span key={n} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-fg">
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
