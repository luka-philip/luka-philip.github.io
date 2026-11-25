// Generates public/Luka_Philip_CV.pdf from src/data/resume.ts.
// Runs as part of `npm run build` (and on its own with `npm run cv`).
//
// Layout mirrors Luka's hand-made CV: centred header, ruled uppercase section
// headings, bold "Role, Company, Location" lines with italic dates, a tech
// line per role and **bold** key phrases.
//
// Privacy: the CV never includes a phone number or email. Recruiters are
// pointed to LinkedIn instead, and the build fails if any email address or
// phone number slips into the content.

import { Document, Font, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseBold } from '../src/components/RichText'
import * as data from '../src/data/resume'
import { cv, education, experience, profile, projects, type Experience } from '../src/data/resume'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const CV_FILENAME = 'Luka_Philip_CV.pdf'
const out = resolve(root, 'public', CV_FILENAME)
const siteUrl = 'https://luka-philip.github.io'

// ── Privacy guard ────────────────────────────────────────────────────────────
const allText = JSON.stringify(data)
const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
const phoneRe = /(\+?\d[\d\s().-]{8,}\d)/
const leak = allText.match(emailRe) ?? allText.match(phoneRe)
if (leak) {
  console.error(`✗ CV build aborted: resume.ts appears to contain contact details ("${leak[0]}").`)
  process.exit(1)
}

// Never split words across lines (the original CV doesn't hyphenate)
Font.registerHyphenationCallback((word) => [word])

// ── Styles (monochrome, like the original) ───────────────────────────────────
const linkBlue = '#1155cc'
const s = StyleSheet.create({
  page: { paddingTop: 26, paddingBottom: 30, paddingHorizontal: 38, fontFamily: 'Helvetica', fontSize: 9, color: '#000', lineHeight: 1.28 },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', textAlign: 'center', lineHeight: 1.1 },
  headline: { textAlign: 'center', marginTop: 3 },
  contact: { textAlign: 'center', marginTop: 1 },
  contactLink: { color: linkBlue, textDecoration: 'underline' },
  h2: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 1.5, marginTop: 8, marginBottom: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 },
  roleLine: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, flex: 1, paddingRight: 8 },
  date: { fontFamily: 'Helvetica-Oblique', fontSize: 9.5 },
  techLine: { marginTop: 0.5 },
  bold: { fontFamily: 'Helvetica-Bold' },
  bullet: { flexDirection: 'row', marginTop: 1, paddingLeft: 8 },
  dot: { width: 9 },
  bulletText: { flex: 1 },
  link: { color: '#000', textDecoration: 'none' },
  sourceLink: { color: '#000', textDecoration: 'underline' },
})

/** Renders "plain **bold** plain" with Helvetica-Bold for the bold parts. */
const Rich = ({ children }: { children: string }) => (
  <>
    {parseBold(children).map((seg, i) =>
      seg.bold ? (
        <Text key={i} style={s.bold}>
          {seg.text}
        </Text>
      ) : (
        seg.text
      ),
    )}
  </>
)

const Bullet = ({ children }: { children: ReactNode }) => (
  <View style={s.bullet} wrap={false}>
    <Text style={s.dot}>•</Text>
    <Text style={s.bulletText}>{children}</Text>
  </View>
)

const Heading = ({ children }: { children: string }) => (
  <Text style={s.h2} minPresenceAhead={30}>
    {children}
  </Text>
)

const RoleRow = ({ title, dates }: { title: string; dates?: string }) => (
  <View style={s.row} wrap={false}>
    <Text style={s.roleLine}>{title}</Text>
    {dates && <Text style={s.date}>{dates}</Text>}
  </View>
)

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

const Job = ({ job }: { job: Experience }) => (
  <View>
    <RoleRow title={[job.role, job.company, job.location].filter(Boolean).join(', ')} dates={`${job.start} – ${job.end}`} />
    {job.tech.length > 0 && <Text style={s.techLine}>{job.tech.join(' · ')}</Text>}
    <Bullet>
      <Rich>{job.summary}</Rich>
    </Bullet>
    {job.recognition?.map((r) => (
      <Bullet key={r.url}>
        <Text style={s.bold}>Award: </Text>
        {r.title} (
        <Link src={r.url} style={s.sourceLink}>
          {r.source}
        </Link>
        ).
      </Bullet>
    ))}
    {job.engagements?.map((e) => (
      <Bullet key={e.client}>
        <Text style={s.bold}>
          {e.client} ({e.dates})
        </Text>{' '}
        <Rich>{e.description}</Rich>
      </Bullet>
    ))}
    {job.highlights.map((h) => (
      <Bullet key={h}>
        <Rich>{h}</Rich>
      </Bullet>
    ))}
  </View>
)

// Personal projects (this site is already linked in the header)
const personalProjects = projects.filter((p) => p.category === 'Personal' && !p.repo?.endsWith('/luka-philip.github.io'))

const CV = () => (
  <Document title={`${profile.name} · CV`} author={profile.name} subject={`${profile.title} CV`} creator={siteUrl} producer={siteUrl}>
    <Page size="A4" style={s.page}>
      <Text style={s.name}>{profile.name}</Text>
      <Text style={s.headline}>{cv.headline}</Text>
      <Text style={s.contact}>
        Please get in touch via LinkedIn:{' '}
        <Link src={profile.links.linkedin} style={s.contactLink}>
          {stripProtocol(profile.links.linkedin)}
        </Link>
        {' · '}
        <Link src={profile.links.github} style={s.link}>
          {stripProtocol(profile.links.github)}
        </Link>
        {' · '}
        <Link src={siteUrl} style={s.link}>
          {stripProtocol(siteUrl)}
        </Link>
      </Text>

      <Heading>Profile</Heading>
      <Text>
        <Rich>{cv.summary}</Rich>
      </Text>

      <Heading>Experience</Heading>
      {experience.map((job) => (
        <Job key={job.company + job.start} job={job} />
      ))}

      {/* Keep Education in one piece so no bullet is stranded on the next page */}
      <View wrap={false}>
      <Heading>Education</Heading>
      {education.map((e) => (
        <View key={e.institution}>
          <RoleRow title={`${e.degree}, ${e.institution}`} dates={`${e.start} – ${e.end}`} />
          {e.highlights?.map((h) => (
            <Bullet key={h}>
              <Rich>{h}</Rich>
            </Bullet>
          ))}
        </View>
      ))}

      </View>

      <Heading>Technical Skills</Heading>
      {Object.entries(cv.skills).map(([group, items]) => (
        <Text key={group} style={{ marginBottom: 0.5 }}>
          <Text style={s.bold}>{group}: </Text>
          {items}
        </Text>
      ))}

      {personalProjects.length > 0 && (
        <>
          <Heading>Projects</Heading>
          {personalProjects.map((p) => (
            <Bullet key={p.name}>
              {p.repo ? (
                <Link src={p.repo} style={[s.link, s.bold]}>
                  {p.name}
                </Link>
              ) : (
                <Text style={s.bold}>{p.name}</Text>
              )}{' '}
              ({p.tech.join(', ')}){p.status && <Text style={{ fontFamily: 'Helvetica-Oblique' }}> ({p.status.toLowerCase()})</Text>}:{' '}
              <Rich>{p.description}</Rich>
            </Bullet>
          ))}
        </>
      )}

      <Heading>Volunteering & Other</Heading>
      {cv.other.map((o) => (
        <Bullet key={o}>
          <Rich>{o}</Rich>
        </Bullet>
      ))}
    </Page>
  </Document>
)

mkdirSync(dirname(out), { recursive: true })
await renderToFile(<CV />, out)
console.log(`✓ CV written to public/${CV_FILENAME}`)
