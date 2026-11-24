import { profile } from '../data/resume'
import { ComingSoon, Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="01 · about" title="A bit about me">
      <div className="grid gap-10 md:grid-cols-[1fr_auto]">
        {profile.about.length > 0 ? (
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <div className="self-start">
            <ComingSoon label="Writing this bit. Coming soon" />
          </div>
        )}

        {/* Decorative "code card" summarising you */}
        <div className="no-print hidden w-72 overflow-hidden rounded-2xl border border-border bg-surface/70 font-mono text-xs shadow-2xl shadow-accent/5 backdrop-blur md:block">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 text-muted">me.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 leading-6">
            <span className="text-accent">const</span> <span className="text-accent-2">engineer</span> = {'{'}
            {'\n'}  name: <span className="text-emerald-500">'{profile.name}'</span>,
            {'\n'}  role: <span className="text-emerald-500">'{profile.title}'</span>,
            {'\n'}  coffee: <span className="text-orange-400">true</span>,
            {'\n'}  learning: <span className="text-orange-400">Infinity</span>,
            {'\n'}{'}'}
          </pre>
        </div>
      </div>
    </Section>
  )
}
