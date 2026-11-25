// ─────────────────────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update your CV.
//  Everything in this file is PUBLIC once pushed. Don't put anything here you
//  wouldn't print on a CV (no phone number, home address, keys, etc.).
//  Keep employer work descriptions free of client, mandate or internal figures.
//  Empty fields/arrays are hidden or shown as "Coming soon" on the site.
//  Wrap key phrases in **double asterisks** to bold them on the site and in the CV.
// ─────────────────────────────────────────────────────────────────────────────

export type Experience = {
  company: string
  role: string
  start: string
  end: string // 'Present' for current role
  location?: string
  summary: string
  highlights: string[]
  tech: string[]
  recognition?: { title: string; source: string; url: string }[]
}

export type Project = {
  name: string
  description: string
  tech: string[]
  category: string
  repo?: string
  live?: string
  context?: string // e.g. 'Volunteer consultant developer · Code for Good'
  organisation?: string // short name used in the CV
  dates?: string
  status?: 'In progress' // shown as a badge on the site and noted in the CV
}

export type Article = {
  title: string
  publication: string
  date: string
  url: string
  summary: string
  notes?: string[]
}

export type Education = {
  institution: string
  degree: string
  start: string
  end: string
  highlights?: string[]
}

export const profile = {
  name: 'Luka Philip',
  initials: 'LP',
  title: 'Software Engineer',
  // Rotating words in the hero ("I build ___")
  roles: ['full-stack products.', 'AI developer tooling.', 'things people love using.'],
  location: 'London, UK',
  tagline:
    'Full-stack software engineer at J.P. Morgan Asset Management, building a greenfield portfolio-optimisation platform and the AI tooling that speeds up how we build it.',
  about: [
    "I'm a full-stack software engineer at J.P. Morgan Asset Management, working on a greenfield portfolio-optimisation platform. Alongside feature work, I build MCP servers, harnesses and custom AI skills that accelerate how our team ships software.",
    "I thrive in collaborative, high-ownership environments where engineers help shape the bigger picture, whether that's contributing to product strategy, improving user journeys or mentoring junior developers. I care about building things people genuinely love using.",
    "I studied Mathematics at the University of Bath. Outside of work I'm interested in where technology meets education and health. I volunteer as a panel speaker for Generation Tech, encouraging students aged 14–17 to explore careers in technology, and you'll usually find me bouldering, running, or practising my Italian and Spanish.",
  ],
  photo: '/profile.webp', // set to '' to hide
  // Set to an address you're happy to be public, or leave empty to hide the email button.
  email: '',
  // Generated from this file at build time by scripts/build-cv.tsx (no phone/email; points to LinkedIn).
  resumeUrl: '/Luka_Philip_CV.pdf',
  links: {
    github: 'https://github.com/luka-philip',
    linkedin: 'https://www.linkedin.com/in/luka-philip',
  },
  availability: '', // e.g. 'Open to new opportunities'
}

// ── CV-only content (scripts/build-cv.tsx) ──────────────────────────────────
export const cv = {
  headline: 'Software Engineer · J.P. Morgan Asset Management · MMath Mathematics',
  summary:
    '**Full-Stack Software Engineer** at J.P. Morgan Asset Management with **3+ years** of experience, working on an award-winning portfolio-optimisation platform and the AI tooling that accelerates it. **1 of 9 national recipients of the J.P. Morgan Winning Women in Technology Scholarship**.',
  // Code for Good volunteer work is listed as one experience entry, built from the 'Tech for Good' projects below
  volunteerRole: { role: 'Voluntary Consultant Salesforce Developer', company: 'Code for Good', insertAfter: 'Runna' },
  skills: {
    Languages: 'Python (NumPy, SciPy, Pandas, PyTorch, TensorFlow), TypeScript/React, Dart/Flutter, R, Scala (Cats), Haskell',
    'Quantitative & ML': 'probability, statistics, linear algebra, optimisation; Bayesian-network structure learning; Kaggle competitions',
    'AI tooling': 'MCP servers (co-built and deployed for team use), Roo Code, Claude, Copilot, Windsurf; OpenAI SDK',
    Engineering:
      'AWS (OpenSearch, Serverless), Grafana, Tableau, Jenkins, Git, Bitbucket, Jira, Figma; REST / GraphQL / WebSockets; TDD (Jest, RTL, Vite); RFCs; Terraform; Docker',
  } as Record<string, string>,
  other: [
    'Volunteer panel speaker for **Generation Tech** events, sharing career advice and encouraging students aged 14–17 to explore pathways into technology.',
    'Strong interest in health and fitness: I keep active through bouldering and running regularly.',
    'Learning Italian and Spanish.',
  ],
}

export const stats: { value: string; label: string }[] = [
  { value: '3+', label: 'Years in industry' },
  { value: 'MMath', label: 'Mathematics, Bath' },
  { value: '1 of 9', label: 'National WiT scholars' },
]

export const experience: Experience[] = [
  {
    company: 'J.P. Morgan Asset Management',
    role: 'Associate Software Engineer',
    start: 'Feb 2025',
    end: 'Present',
    location: 'London',
    summary:
      'Small team building a greenfield portfolio-optimisation platform. I own features end to end, from scoping with quantitative analysts through to production. Promoted from Software Engineer to Associate in Feb 2026.',
    highlights: [
      'Deliver **core optimisation features** for the platform, partnering closely with key users to scope and prioritise new capabilities.',
      'Co-built **AI developer tooling**, including an **MCP server** and custom GitHub Copilot and Roo Code skills for project management, code generation, testing and reviews. Used them to finish large migrations in a fraction of the expected time.',
      "Automated the team's market-data ingestion pipeline, turning a multi-step manual weekly process into a **fully automated workflow** that has run reliably since.",
      'Moved the search layer to AWS OpenSearch, added caching for long-running analytics requests, and introduced Grafana observability so incidents are detected in **seconds rather than minutes**.',
      "Helping build an **AI-powered assistant** for the platform's users.",
      '**Mentor** early-career engineers and **co-founded an internal developer community** that publishes a bi-monthly technology research newsletter.',
      "Advocate for AI acceleration and early-career technologists through panels, presentations and technical writing. **Selected from hundreds** of Associate SWEs to present research on AI's impact on early-career engineers to **Global Technology Leadership**, and authored a J.P. Morgan Tech Blog post shared by **three company CIOs, including the Global CIO**.",
    ],
    tech: ['Python', 'React', 'TypeScript', 'AWS', 'OpenSearch', 'Grafana', 'MCP'],
    recognition: [
      {
        title: "Part of the team behind J.P. Morgan Asset Management's Spectrum platform, winner of Best Digital / AI Innovation in Insurance Investing",
        source: 'AsianInvestor Insurance Awards 2027',
        url: 'https://www.asianinvestor.net/article/insurance-awards-2027-asias-top-client-service-delivery-service-provider-cat/508712',
      },
    ],
  },
  {
    company: 'Runna',
    role: 'Full-Stack Engineering Intern',
    start: 'Jun 2024',
    end: 'Sep 2024',
    location: 'London',
    summary: 'Growth and Core App teams at a fast-growing consumer fitness startup.',
    highlights: [
      'Built **feature-flagged experimentation flows** with Mixpanel and Iterable for controlled rollouts and A/B testing, then analysed engagement and retention and presented the findings to the team.',
      'Designed and prototyped a **React Native localisation solution** for multi-language support, evaluating candidate libraries against performance and stack constraints.',
    ],
    tech: ['React Native', 'TypeScript', 'Mixpanel', 'Iterable', 'Maestro'],
  },
  {
    company: 'J.P. Morgan',
    role: 'Software Engineering Intern · Market Rates Technology',
    start: 'Jun 2023',
    end: 'Aug 2023',
    location: 'London',
    summary: 'Summer internship on a front-end team in Markets technology.',
    highlights: [
      'Built a **React component library** to standardise UI development across the team, including advanced data-grid features with AG Grid.',
      'Presented the finished work to quantitative research and technology stakeholders.',
    ],
    tech: ['React', 'TypeScript', 'AG Grid', 'Jest'],
  },
  {
    company: 'J.P. Morgan',
    role: 'Industrial Placement · Data Engineering & Architecture',
    start: 'Jun 2021',
    end: 'Aug 2022',
    location: 'London',
    summary: '14-month placement as part of my Year in Industry.',
    highlights: [
      "Extended the team's web application with new data-visualisation features.",
      'Built a **metrics service** that captures user interactions into a data lake, surfaced through Tableau reporting.',
      'Wrote **functional Scala** with Cats, extended APIs, supported release cycles and led monthly team retrospectives.',
      '**1st place, J.P. Morgan Annual Technology Hackathon 2022.**',
    ],
    tech: ['Scala', 'Tableau', 'Jenkins'],
  },
]

export const projects: Project[] = [
  {
    name: 'LanGo',
    description:
      'An Android app for learning Italian, with practice sentences built from themed vocabulary, **spaced repetition**, a 12-week plan and a **hands-free audio mode**. It **listens to spoken Italian and grades** whether you said it correctly, and everything runs on the phone, offline.',
    tech: ['Flutter', 'Dart', 'SQLite', 'ML Kit'],
    category: 'Personal',
  },
  {
    name: 'Run Route Generator',
    description:
      'Turns plain-English requests into running loops. It builds an OpenStreetMap graph, searches with A*, and **ranks loops on distance, overlap, scenery, main roads and elevation**, running in a Web Worker with GPX export. A dedicated **MCP server** is coming soon.',
    tech: ['React', 'TypeScript', 'Leaflet', 'OpenStreetMap'],
    category: 'Personal',
  },
  {
    name: 'Taskbar Farm',
    description:
      "A tiny farmer who lives on your Windows taskbar. He wanders, flees your cursor, and plants crops that grow in real time. It's a click-through Electron overlay locked down with a sandboxed renderer, a strict CSP, zero network access and minimal validated IPC.",
    tech: ['TypeScript', 'Electron'],
    category: 'Personal',
    repo: 'https://github.com/luka-philip/taskbar-farm',
  },
  {
    name: 'Beta Cracker',
    description:
      'A browser app to work out how to climb a bouldering problem: photograph the wall, tap the holds (segmented on-device with **SlimSAM**), enter your height, and a shortest-path search over limb positions returns a **move sequence tailored to your body**. Photos never leave the phone.',
    tech: ['React', 'TypeScript', 'Transformers.js'],
    category: 'Personal',
    status: 'In progress',
  },
  {
    name: 'Options Pricer',
    description:
      'An experiment in pricing options, with a Python pricing backend and a React + TypeScript front end for exploring options and their profit and loss.',
    tech: ['Python', 'React', 'TypeScript'],
    category: 'Personal',
    repo: 'https://github.com/luka-philip/optionsPricer',
  },
  {
    name: 'luka-philip.github.io',
    description:
      'This site. React + TypeScript + Tailwind, with a command palette, animated UI and a strict Content-Security-Policy, deployed to GitHub Pages via Actions.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Personal',
    repo: 'https://github.com/luka-philip/luka-philip.github.io',
  },
  {
    name: 'Bloomsbury Football CRM',
    description:
      'Architected and implemented a **Salesforce CRM** for a growing children’s football non-profit, designed for scalability and long-term use.',
    tech: ['Salesforce'],
    category: 'Tech for Good',
    context: 'Volunteer consultant developer · Code for Good',
    organisation: 'Bloomsbury Football',
    dates: 'Nov 2021 – Jun 2022',
  },
  {
    name: 'Career Ready Automation',
    description:
      'Built **automation workflows** to process student data for a social-mobility charity, identifying data-quality issues and improving stakeholder reporting accuracy.',
    tech: ['Salesforce'],
    category: 'Tech for Good',
    context: 'Volunteer consultant developer · Code for Good',
    organisation: 'Career Ready',
    dates: 'Mar – Oct 2025',
  },
]

export const writing: Article[] = [
  {
    title: 'The future engineer is a problem framer',
    publication: 'J.P. Morgan Tech Blog',
    date: '2026',
    url: 'https://www.jpmorganchase.com/about/technology/blog/the-future-engineer-is-a-problem-framer',
    summary:
      "AI is changing much more than just the technology we build. It's changing the skills and mindset we need to build it. My thoughts on what that means for the next generation of engineers.",
    notes: ['Shared by three company CIOs, including the Global CIO', '5,000+ LinkedIn impressions'],
  },
]

export const skills: Record<string, string[]> = {
  Languages: ['Python', 'TypeScript', 'Dart', 'Scala', 'R', 'Haskell'],
  'Frontend & Mobile': ['React', 'React Native', 'Flutter', 'AG Grid', 'Tailwind CSS', 'Electron', 'Leaflet'],
  'Data & ML': ['NumPy', 'Pandas', 'SciPy', 'PyTorch', 'TensorFlow', 'Bayesian networks', 'Tableau'],
  'AI Tooling': ['MCP', 'Claude', 'GitHub Copilot', 'Roo Code', 'Windsurf', 'OpenAI SDK'],
  'Cloud & DevOps': ['AWS', 'OpenSearch', 'Grafana', 'Docker', 'Terraform', 'Jenkins', 'Git'],
  Practices: ['TDD (Jest, RTL)', 'REST / GraphQL / WebSockets', 'RFCs', 'A/B testing', 'Mentoring'],
}

export const education: Education[] = [
  {
    institution: 'University of Bath',
    degree: 'MMath Mathematics with Year in Industry (2:1)',
    start: 'Sep 2019',
    end: 'Jun 2024',
    highlights: [
      '**First-class dissertation:** an empirical evaluation of structure-learning algorithms for Bayesian networks in R, using a five-metric framework across reference networks of 4–223 nodes and datasets of up to ~1M observations.',
      '**Modules:** Machine Learning, Bayesian Statistics, Multivariate Data Analysis, Scientific Computing, Functional Programming.',
      '**One of 9 national recipients** of the J.P. Morgan Winning Women in Technology Scholarship.',
    ],
  },
]
