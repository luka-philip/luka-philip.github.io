import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { profile, projects } from '../data/resume'
import { GithubIcon } from './Icons'
import { RichText } from './RichText'
import { Section, Tag, trackSpotlight } from './Section'

export function Projects() {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [])
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="projects" eyebrow="03 · projects" title="Things I've built">
      <div className={`no-print mb-8 flex-wrap gap-2 ${categories.length > 2 ? 'flex' : 'hidden'}`}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === c ? 'text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {filter === c && (
              <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {visible.map((p) => (
            <motion.article
              key={p.name + p.category}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -4 }}
              onPointerMove={trackSpotlight}
              className="spotlight-card group flex flex-col rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between">
                <FolderGit2 className="size-8 text-accent" strokeWidth={1.5} />
                <div className="flex items-center gap-1">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code`} className="grid size-8 place-items-center rounded-full text-muted hover:text-fg">
                      <GithubIcon className="size-4" />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live site`} className="grid size-8 place-items-center rounded-full text-muted hover:text-fg">
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="mt-5 flex flex-wrap items-center gap-2 text-lg font-semibold">
                <span className="transition-colors group-hover:text-accent">{p.name}</span>
                {p.status && (
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-amber-500 uppercase">
                    {p.status}
                  </span>
                )}
              </h3>
              {(p.context || p.dates) && (
                <p className="mt-1 font-mono text-xs text-muted">{[p.context, p.dates].filter(Boolean).join(' · ')}</p>
              )}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                <RichText>{p.description}</RichText>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {filter === 'All' && (
          <motion.a
            layout
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/30 p-6 text-center transition-colors hover:border-accent/50"
          >
            <GithubIcon className="size-8 text-muted transition-colors group-hover:text-fg" />
            <p className="inline-flex items-center gap-1 font-mono text-sm text-muted transition-colors group-hover:text-fg">
              More on GitHub <ArrowUpRight className="size-4" />
            </p>
          </motion.a>
        )}
      </motion.div>
    </Section>
  )
}
