# luka-philip.github.io

My personal site and CV, served at **https://luka-philip.github.io**.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and Motion.

## Features

- Command palette (<kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>) to jump around, switch theme, download or print the CV
- Dark/light theme that follows your system setting by default
- Background glow that follows the cursor, spotlight cards and scroll-reveal animations
- Expandable experience timeline, filterable projects, and skills that show where you've used them
- Printing the page (<kbd>Ctrl</kbd> + <kbd>P</kbd>) gives a clean, ink-friendly CV
- Respects `prefers-reduced-motion`

## Editing content

All content lives in **[`src/data/resume.ts`](src/data/resume.ts)**. The website and the downloadable CV are both generated from it.

## Downloadable CV

`npm run build` generates `public/Luka_Philip_CV.pdf` from `resume.ts` (via `scripts/build-cv.tsx`), so the PDF always matches the site. It's gitignored because it's rebuilt on every deploy.

- It never includes a phone number or email. Recruiters are asked to get in touch via LinkedIn.
- The build **fails** if an email address or phone number is ever added to `resume.ts`.
- Run `npm run cv` to regenerate it on its own (`npm run dev` does this automatically).

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Deployment

Every push to `main` builds and deploys the site through GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Security

This is a static site, so there's no server, database, API calls or tokens.

- **Strict Content-Security-Policy** in production builds. Scripts, styles, fonts and images can load only from this site, and the page has no inline scripts.
- **No third parties.** Fonts are self-hosted, and the site has no analytics, trackers or CDNs.
- **Least-privilege CI.** The workflow can only read the repo and publish to Pages. It uses no secrets, and `persist-credentials: false` keeps the git token out of the build.
- **`npm audit` runs on every deploy**, and Dependabot keeps dependencies and actions up to date.
- **External links** open with `rel="noopener noreferrer"`.
- **`.gitignore`** excludes `.env` files and key files (`*.pem`, `*.key`, `id_rsa*`, `id_ed25519*`).

Everything in `src/data/resume.ts` and `public/` is public once pushed, so keep phone numbers and home addresses out of it.
