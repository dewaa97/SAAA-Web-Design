# SAAA Next.js

Production-oriented Next.js rebuild of the Singapore Aircargo Agents Association (SAAA) website. This app replaces copy-pasted static HTML with reusable components, typed content modules, and Next.js SEO primitives while preserving visual parity with the legacy site.

## Quick start

```bash
cd saaa-next
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

## Architecture summary

| Layer | Location | Purpose |
|-------|----------|---------|
| Routes | `src/app/` | App Router pages (SSG by default) |
| Layouts | `src/components/layout/` | `SiteLayout`, `SubpageLayout`, `ImddLayout` |
| UI primitives | `src/components/ui/` | `Hero`, `Button`, `Card`, `Badge`, `SectionHeader` |
| Content | `src/lib/content/` | Single source of truth (typed TS modules) |
| SEO | `src/lib/seo/` + `app/sitemap.ts` + `app/robots.ts` | Metadata API, canonical URLs, sitemap |
| Styles | `src/app/globals.css` + `src/styles/legacy/` | Design tokens + migrated static CSS |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for component hierarchy and data flow.

## Adding a new page

1. **Content** — Add or extend a module in `src/lib/content/` (never hardcode long copy in JSX).
2. **Metadata** — Export `metadata` via `createPageMetadata()` from `src/lib/seo/metadata.ts`.
3. **Page** — Create `src/app/<route>/page.tsx` using `SubpageLayout` or `ImddLayout` when appropriate.
4. **Navigation** — Update `src/lib/content/navigation.ts` if the page belongs in the main nav.
5. **Sitemap** — Add the path to `staticRoutes` in `src/app/sitemap.ts`.
6. **Styles** — Reuse legacy classes from `homepage.css`; add route-specific CSS in `src/styles/legacy/` only when needed.

## SEO checklist (per page)

- [ ] Unique `title` and `description` via Metadata API
- [ ] `openGraph` and `twitter` (handled by `createPageMetadata`)
- [ ] Canonical URL (`alternates.canonical`)
- [ ] One semantic `<h1>` per page
- [ ] `next/image` with descriptive `alt` text
- [ ] Semantic landmarks: `<main>`, `<nav>`, `<section>`, `<article>` where appropriate
- [ ] Route listed in `sitemap.ts`

## Folder structure

```
saaa-next/
├── public/
│   ├── css/              # Legacy nav CSS (also imported in globals)
│   └── images/           # Symlink → ../../images (repo root)
├── src/
│   ├── app/              # Routes, layout, error/loading, sitemap, robots
│   ├── components/
│   │   ├── layout/       # Site chrome + layout wrappers
│   │   ├── ui/           # Reusable primitives
│   │   ├── home/         # Homepage sections (client where needed)
│   │   ├── imdd/         # Project IMDD hub (client nav)
│   │   └── seo/          # JSON-LD helpers
│   ├── lib/
│   │   ├── config/       # Site URL, contact, env-driven config
│   │   ├── content/      # Typed content modules
│   │   └── seo/          # Metadata helpers
│   └── styles/legacy/    # Migrated static-site CSS
```

## Migrated routes (Phase 1 + Phase 2)

### Core
- `/` — Homepage
- `/history` — Our History
- `/programmes` — Industry programmes hub
- `/coming-soon` — Placeholder for in-progress features

### About
- `/milestones` — SAAA timeline
- `/organization` — Council & Secretariat
- `/stc` — Standard Trading Conditions

### Members
- `/members-listing` — Member directory
- `/membership-application` — Membership sign-up form
- `/members-login` — Members portal login

### Services
- `/permit-certificate-of-origin` — Permits & COO
- `/neutral-airway-bill` — NAB ordering
- `/bar-code-labels` — Bar code labels

### Training
- `/training-courses` — Full training catalogue
- `/training-opening` — Training centre archive announcement

### Events
- `/events` — Calendar of events
- `/events/[id]` — Event detail
- `/event-booking` — Event registration form
- `/event-booking-summary` — Registration confirmation

### Publications
- `/announcements` — Announcements listing
- `/featured-news` — Featured news listing
- `/publications` — Perspectives newsletter archive
- `/article-detail` — Article detail (query: `?id=`)

### Project IMDD (route group)
- `/project-imdd` — Overview
- `/project-imdd/program` — Training programmes
- `/project-imdd/companies` — Partner companies
- `/project-imdd/applicants` — Internship application (`?company=` preselect)
- `/project-imdd/employers` — Employer enquiry form

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (default: `https://www.saaa.org.sg`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (SSG) |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js core-web-vitals) |

## Design decisions

- **Legacy CSS first** — Visual parity uses migrated `homepage.css` and route-specific sheets; Tailwind provides tokens in `globals.css` without inline styles.
- **Server Components default** — Client components only for nav dropdowns, training tabs, publication carousel, stat counters, and IMDD sidebar.
- **Images** — Shared asset pool via `public/images` symlink to repo-root `images/`.
- **No duplicate nav HTML** — Single `SiteNav` with `home` vs `subpage` variant for hash links.
