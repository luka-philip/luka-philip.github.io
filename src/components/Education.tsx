import { GraduationCap } from 'lucide-react'
import { education } from '../data/resume'
import { ComingSoon, Reveal, Section } from './Section'

export function EducationSection() {
  return (
    <Section id="education" eyebrow="05 · education" title="Education">
      {education.length === 0 && <ComingSoon />}
      <div className="space-y-4">
        {education.map((e, i) => (
          <Reveal key={e.institution + i} delay={i * 0.08}>
            <div className="flex gap-4 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur">
              <GraduationCap className="mt-1 size-6 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="font-mono text-xs text-muted">
                  {e.start} — {e.end}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
                <p className="text-muted">{e.institution}</p>
                {e.notes && <p className="mt-2 text-sm text-muted">{e.notes}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
