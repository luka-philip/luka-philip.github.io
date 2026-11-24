// ─────────────────────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update your CV.
//  Everything in this file is PUBLIC once pushed. Don't put anything here you
//  wouldn't print on a CV (no phone number, home address, keys, etc.).
//  Empty fields/arrays are hidden or shown as "Coming soon" on the site.
// ─────────────────────────────────────────────────────────────────────────────

export type Link = { label: string; href: string }

export type Experience = {
  company: string
  role: string
  start: string
  end: string // 'Present' for current role
  location?: string
  summary: string
  highlights: string[]
  tech: string[]
}

export type Project = {
  name: string
  description: string
  tech: string[]
  category: string
  repo?: string
  live?: string
}

export type Education = {
  institution: string
  degree: string
  start: string
  end: string
  notes?: string
}

export const profile = {
  name: 'Luka Philip',
  initials: 'LP',
  title: 'Software Engineer',
  // Rotating words in the hero ("I build ___")
  roles: ['software.', 'for the web.', 'things people use.'],
  location: '', // e.g. 'London, UK'
  tagline: 'Software engineer. My portfolio and CV are on their way, so check back soon.',
  about: [] as string[], // one string per paragraph
  // Set to an address you're happy to be public, or leave empty to hide the email button.
  email: '',
  // Add a PDF at public/resume.pdf and set this to '/resume.pdf' to show the download buttons.
  resumeUrl: '',
  links: {
    github: 'https://github.com/luka-philip',
    linkedin: '', // e.g. https://www.linkedin.com/in/your-handle
  },
  availability: '', // e.g. 'Open to new opportunities'
}

// e.g. { value: '3+', label: 'Years experience' }
export const stats: { value: string; label: string }[] = []

export const experience: Experience[] = [
  // {
  //   company: 'Company',
  //   role: 'Software Engineer',
  //   start: '2024',
  //   end: 'Present',
  //   location: 'City / Remote',
  //   summary: 'One line on the team and product.',
  //   highlights: ['Impact-focused achievement, ideally with a number.'],
  //   tech: ['TypeScript', 'React'],
  // },
]

export const projects: Project[] = [
  {
    name: 'luka-philip.github.io',
    description: 'This site. React + TypeScript + Tailwind, with a command palette, animated UI and a strict CSP, deployed to GitHub Pages via Actions.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    category: 'Web',
    repo: 'https://github.com/luka-philip/luka-philip.github.io',
  },
]

// e.g. Languages: ['TypeScript', 'Python'], Frontend: ['React']
export const skills: Record<string, string[]> = {}

export const education: Education[] = [
  // { institution: 'University', degree: 'BSc Computer Science', start: '2018', end: '2022', notes: '' },
]
