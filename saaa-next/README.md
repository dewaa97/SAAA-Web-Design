# SAAA Next.js Site

Next.js (App Router) conversion of the SAAA static website. The original HTML/CSS/JS in the parent directory remains the **source of truth** for content and visual reference during migration.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (installed; legacy CSS used first for pixel parity)
- **React 19**

## Getting started

```bash
cd saaa-next
npm install   # if needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project structure

```
saaa-next/
├── public/
│   ├── css/           # Copied from ../css/ (nav-dropdown, training, subpage)
│   └── images/        # Symlink → ../images/
├── src/
│   ├── app/           # Routes (mirror static .html pages)
│   │   ├── page.tsx           # Homepage (index.html)
│   │   └── history/page.tsx   # Example subpage (history.html)
│   ├── components/
│   │   ├── layout/    # SiteNav, SiteFooter, SubpageHero
│   │   └── home/      # Homepage sections + client widgets
│   ├── data/          # TypeScript ports of js/*.js data modules
│   └── styles/legacy/ # Extracted inline CSS from static HTML
└── README.md
```

## Migration approach

### Phase 1 (this scaffold) ✅

- [x] Next.js app in `saaa-next/`
- [x] Design tokens + legacy CSS import strategy
- [x] Shared `SiteNav` / `SiteFooter` (from `partials/nav-*.html`)
- [x] Homepage with all major sections
- [x] History subpage as subpage pattern
- [x] Data modules: events, publications, training, marquees, navigation
- [x] Images via symlink to parent `images/`

### Phase 2 — Remaining pages

| Route | Static source | Notes |
|-------|---------------|-------|
| `/milestones` | `milestones.html` | Subpage hero + timeline |
| `/organization` | `organization.html` | Org chart image |
| `/stc` | `stc.html` | Long-form legal content |
| `/programmes` | `programmes.html` | Programme cards |
| `/membership-application` | `membership-application.html` | Multi-step form |
| `/members-listing` | `members-listing.html` | Search/filter listing |
| `/members-login` | `members-login.html` | Login form |
| `/permit-certificate-of-origin` | `permit-certificate-of-origin.html` | Service subpage |
| `/neutral-airway-bill` | `neutral-airway-bill.html` | Service subpage |
| `/bar-code-labels` | `bar-code-labels.html` | Service subpage |
| `/training-courses` | `training-courses.html` | Full training catalog |
| `/training-opening` | `training-opening.html` | Archive article |
| `/events` | `events.html` | Filterable events list |
| `/event-detail` | `event-detail.html` | Dynamic `[id]` route |
| `/event-booking` | `event-booking.html` | Booking flow |
| `/event-booking-summary` | `event-booking-summary.html` | Booking confirmation |
| `/announcements` | `announcements.html` | Article listing |
| `/featured-news` | `featured-news.html` | Article listing |
| `/publications` | `publications.html` | Full publication archive |
| `/article-detail` | `article-detail.html` | Dynamic article route |
| `/coming-soon` | `coming-soon.html` | Placeholder |
| `/project-imdd` | `project-imdd.html` | IMDD hub — **complex** |
| `/project-imdd-program` | `project-imdd-program.html` | IMDD sub-nav |
| `/project-imdd-companies` | `project-imdd-companies.html` | IMDD sub-nav |
| `/project-imdd-applicants` | `project-imdd-applicants.html` | IMDD sub-nav |
| `/project-imdd-employers` | `project-imdd-employers.html` | IMDD sub-nav |

### Phase 3 — Refinement

- Gradually replace legacy CSS classes with Tailwind utilities
- Convert remaining `js/*.js` modules to TypeScript hooks/components
- Add dynamic routes (`[id]`) for events and articles
- SEO metadata per page
- Optional: move images into `saaa-next/public/images` for standalone deploy

## Static source reference

| Static asset | Purpose |
|--------------|---------|
| `index.html` | Homepage structure + inline CSS → `styles/legacy/homepage.css` |
| `history.html` | Subpage pattern → `styles/legacy/history.css` |
| `css/nav-dropdown.css` | Shared navigation |
| `css/training.css` | Training section |
| `css/subpage.css` | Shared subpage styles (copy in `public/css/`) |
| `js/content-data.js` | Events, news, announcements data |
| `js/homepage.js` | Stat counters, publication carousel, marquees |
| `js/nav.js` | Mobile nav behavior → `SiteNav.tsx` |
| `partials/nav-home.html` | Home nav hash links |
| `partials/nav-subpage.html` | Subpage nav with `index.html#` prefixes |

## Known blockers / complexity

1. **Project IMDD** — Separate nav system (`project-imdd-nav-option-*.css`, `project-imdd.js`, multi-page client nav). Recommend dedicated layout group `app/(imdd)/` in Phase 2.
2. **Event booking flow** — Multi-page form with `event-booking-utils.js`; needs client state or URL params.
3. **Members listing** — Large dataset in `members-data.js`; needs search/pagination component.
4. **Publications** — External flipbook URLs; carousel ported, full archive page pending.
5. **Image symlink** — `public/images` → `../images`. Works locally; CI/deploy may need copy step or monorepo-aware build.

## Conventions

- **camelCase** for TypeScript/React identifiers
- Routes use clean paths (no `.html` suffix)
- `SiteNav` accepts `variant: "home" | "subpage"` for hash vs absolute links
- Data separated from presentation in `src/data/`
