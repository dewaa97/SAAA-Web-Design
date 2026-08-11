# SAAA Next.js — Architecture

## Component hierarchy

```
RootLayout (fonts, globals.css, default metadata)
└── Page routes
    ├── SiteLayout (home | subpage)
    │   ├── SiteNav (client — dropdowns, mobile menu)
    │   ├── <main> content
    │   └── SiteFooter
    │
    ├── SubpageLayout
    │   └── SiteLayout(subpage)
    │       ├── Hero (title, description, bgImage)
    │       └── <main> page sections
    │
    └── ImddLayout
        └── SiteLayout(subpage)
            ├── Hero (+ breadcrumb)
            └── imdd-page-shell
                ├── ImddSidebarNav (client)
                └── imdd-main content
```

### UI primitives (`src/components/ui/`)

| Component | Role |
|-----------|------|
| `Hero` | Shared hero with background image, optional actions/breadcrumb |
| `Button` | `btn` variants (`primary`, `secondary`, `outlineWhite`) — link or button |
| `Card` | Programme/subpage card shell (`programme-card`) |
| `Badge` | Section tags and status badges |
| `SectionHeader` | Tag + title + description block |

Primitives map to existing static-site CSS classes — no inline styles.

## Data flow

```
src/lib/content/*.ts  →  Page / Section components  →  Layout  →  HTML
```

Content modules are plain TypeScript (no CMS yet). They mirror the legacy `js/content-data.js` and `js/project-imdd-data.js` patterns with full typing.

| Module | Legacy source | Used by |
|--------|---------------|---------|
| `navigation.ts` | `js/nav.js` / shared nav HTML | `SiteNav`, `SiteFooter` |
| `homepage.ts` | `js/content-data.js` (ticker) | Homepage ticker, about |
| `history.ts` | `history.html` body | `/history` |
| `programmes.ts` | `programmes.html` | `/programmes` |
| `imdd.ts` | `js/project-imdd-data.js` | `/project-imdd` hub |
| `trainingCourses.ts` | `js/training-data.js` | `TrainingSection` |
| `events.ts` | `js/content-data.js` | `HomeEventsSection` |
| `publications.ts` | `publications-data.js` | `PublicationCarousel` |
| `marquees.ts` | `js/members-data.js` | Member/partner marquees |

**Rule:** Pages import from `@/lib/content/*`, not from JSX string literals.

## Layout variants

### `SiteNav` variant

| Variant | Hash links | Example |
|---------|------------|---------|
| `home` | `#about`, `#training` | Homepage sections |
| `subpage` | `/#about`, `/#training` | All other pages |

One component, one HTML structure — eliminates 30+ duplicated nav blocks from the static site.

### `SiteFooter` variant

Same hash vs absolute pattern as nav for about/training/members links.

## SEO layer

```
createPageMetadata({ title, description, path })
  → title, description
  → alternates.canonical (absoluteUrl)
  → openGraph + twitter cards

app/sitemap.ts     → static route list
app/robots.ts      → allow all + sitemap pointer
OrganizationJsonLd   → homepage JSON-LD
```

Every migrated page exports `metadata` via `createPageMetadata`.

## Styling strategy

1. **Design tokens** — CSS variables in `globals.css` (`--red-600`, slate scale, radii).
2. **Legacy parity** — `styles/legacy/homepage.css` carries the bulk of migrated rules.
3. **Route CSS** — `programmes.css`, `project-imdd.css`, `subpage.css` imported in route layouts only.
4. **Tailwind** — `@theme inline` maps tokens; no inline `style={{}}` in components.
5. **No copy-paste page HTML** — Sections composed from components + content modules.

## Client vs server

| Client (`"use client"`) | Server (default) |
|-------------------------|------------------|
| `SiteNav` | All page.tsx files |
| `TrainingSection` | `HistoryPage`, `ProgrammesPage` |
| `PublicationCarousel` | `ImddLayout` shell |
| `StatCounters` | `SectionHeader`, `Hero` |
| `ImddSidebarNav` | `OrganizationJsonLd` |

## Static generation

All Phase 1 routes are statically generated (`○` in build output). No `fetch` without cache; content is compile-time from TS modules.

## Phase 2 migration targets

Prioritize high-traffic and structurally similar pages:

1. **About cluster** — `/milestones`, `/organization`, `/stc`
2. **Members** — `/members-listing`, `/membership-application`, `/members-login`
3. **Services** — `/permit-certificate-of-origin`, `/neutral-airway-bill`, `/bar-code-labels`
4. **Events** — `/events`, `/events/[id]`
5. **Publications** — `/publications`, `/featured-news`, `/announcements`, article detail pattern
6. **Training** — `/training-courses`
7. **IMDD sub-routes** — `/project-imdd/program`, `/employers`, `/applicants`, `/companies`
8. **Remaining static HTML** — scan repo root `*.html` for parity

For each batch: extract content → `lib/content/` → page with `SubpageLayout` or `ImddLayout` → sitemap entry.

## Comparison vs static site

| Static site | Next.js |
|-------------|---------|
| Nav HTML duplicated in every file | Single `SiteNav` + `navigation.ts` |
| Inline `<style>` per page | Shared CSS + route layouts |
| `content-data.js` global | Typed `lib/content/*` modules |
| Manual meta tags | Metadata API + helpers |
| No sitemap/robots | `sitemap.ts`, `robots.ts` |
| `<img>` tags | `next/image` + alt text |
| jQuery/DOM scripts for sections | React state in isolated client components |
