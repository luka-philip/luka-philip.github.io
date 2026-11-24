import { Download, Mail } from 'lucide-react'
import { profile } from '../data/resume'
import { GithubIcon, LinkedinIcon } from './Icons'
import { Section } from './Section'

export function Contact() {
  const btn =
    'inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-accent/50'

  return (
    <>
      <Section id="contact" eyebrow="06 · contact" title="Let's work together">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 backdrop-blur sm:p-12">
          <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-accent/20 blur-3xl" />
          <p className="relative max-w-xl text-lg text-muted">
            I'm always happy to chat about new roles, interesting problems or side projects. The best way to reach me is below.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]">
                <Mail className="size-4" /> Say hello
              </a>
            )}
            {profile.links.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={btn}>
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            )}
            {profile.links.github && (
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={btn}>
                <GithubIcon className="size-4" /> GitHub
              </a>
            )}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download className={`${btn} no-print`}>
                <Download className="size-4" /> Download CV
              </a>
            )}
          </div>
        </div>
      </Section>
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript & Tailwind
      </footer>
    </>
  )
}
