import { motion } from 'motion/react'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile, stats } from '../data/resume'
import { GithubIcon, LinkedinIcon } from './Icons'

function useTypewriter(words: string[], typeMs = 70, holdMs = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length] ?? ''
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? typeMs / 2 : typeMs,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, holdMs])

  return text
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
})

function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative order-1 w-fit md:order-2"
    >
      <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent to-accent-2 opacity-40 blur-2xl" />
      <div className="relative rounded-full bg-gradient-to-tr from-accent to-accent-2 p-[3px]">
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={480}
          height={480}
          className="size-28 rounded-full border-4 border-bg object-cover sm:size-36 md:size-72"
        />
      </div>
    </motion.div>
  )
}

export function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="top" className="flex min-h-[100svh] items-center pt-24 pb-16">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1fr_auto]">
      <div className="order-2 md:order-1">
      {profile.availability && (
        <motion.div {...fadeUp(0)} className="mb-6 w-fit">
          <span className="no-print inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
        </motion.div>
      )}

      <motion.p {...fadeUp(0.05)} className="font-mono text-sm text-accent">
        Hi, my name is
      </motion.p>
      <motion.h1 {...fadeUp(0.1)} className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">
        {profile.name}
        <span className="text-gradient">.</span>
      </motion.h1>
      <motion.p {...fadeUp(0.2)} className="mt-4 text-2xl font-medium text-muted sm:text-4xl">
        I build <span className="text-fg">{typed}</span>
        <span className="cursor-blink text-accent">▍</span>
      </motion.p>
      {profile.tagline && (
        <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {profile.tagline}
        </motion.p>
      )}
      {profile.location && (
        <motion.p {...fadeUp(0.35)} className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4" /> {profile.location}
        </motion.p>
      )}

      <motion.div {...fadeUp(0.45)} className="no-print mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          View my work
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-accent/50"
          >
            <Download className="size-4" /> Download CV
          </a>
        )}
        <div className="ml-1 flex items-center gap-1">
          {profile.links.github && (
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg">
              <GithubIcon />
            </a>
          )}
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg">
              <LinkedinIcon />
            </a>
          )}
        </div>
      </motion.div>

      {stats.length > 0 && (
        <motion.dl {...fadeUp(0.55)} className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      )}
      </div>
      {profile.photo && <Portrait />}
      </div>
    </section>
  )
}
