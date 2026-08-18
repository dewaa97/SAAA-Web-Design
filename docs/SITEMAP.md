# SAAA Website Sitemap

> **Maintained in parity** with `SAAA-Website-NextJS/docs/SITEMAP.md`. Last scanned: 2026-08-18.

## Overview

| Item | Value |
|------|-------|
| **Production base URL** | `https://www.saaa.org.sg` (from `site.ts` / `js/training-data.js`) |
| **Static HTML repo** | `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA` — files use `.html` suffix locally |
| **Next.js repo** | `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA-Website-NextJS` — App Router clean URLs |
| **Legend** | **Static** = static HTML only · **Next** = Next.js only · **Both** = implemented in both repos |

### URL mapping

| Context | Example |
|---------|---------|
| Static local file | `history.html` |
| Next.js route | `/history` |
| Production (intended) | `https://www.saaa.org.sg/history` |

Homepage sections use hash anchors: `#about`, `#training`, `#services`, `#events`, `#members`, `#publication`.

---

## 1. Home

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Homepage | `index.html` | `/` | Both |
| About (section) | `index.html#about` | `/#about` | Both |
| Training preview (section) | `index.html#training` | `/#training` | Both |
| Services preview (section) | `index.html#services` | `/#services` | Both |
| Events preview (section) | `index.html#events` | `/#events` | Both |
| Members preview (section) | `index.html#members` | `/#members` | Both |
| Publications preview (section) | `index.html#publication` | `/#publication` | Both |

---

## 2. About Us

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Our History | `history.html` | `/history` | Both |
| Milestones | `milestones.html` | `/milestones` | Both |
| Organisation Structure | `organization.html` | `/organization` | Both |
| Standard Trading Conditions | `stc.html` | `/stc` | Both |
| Programmes | `programmes.html` | `/programmes` | Both |

### Programmes — on-page sections (`programmes.html` / `/programmes`)

| Section | Anchor |
|---------|--------|
| Project IMDD | `#project-imdd` |
| Career Conversion Programme | `#career-conversion-programme` |
| Job Redesign Playbook | `#job-redesign-playbook` |

### Internal / non-production (static only)

| Page | Static path | Notes |
|------|-------------|-------|
| Secretariat chart reference | `organization-secretariat-v1-reference.html` | Design reference; not in nav |

---

## 3. Members

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Membership Sign-Up | `membership-application.html` | `/membership-application` | Both |
| SAAA Members Listing | `members-listing.html` | `/members-listing` | Both |
| Members Portal Log In | `members-login.html` | `/members-login` | Both |
| Coming Soon (placeholder) | `coming-soon.html` | `/coming-soon` | Both |

> **Note:** `members-login.html` is a placeholder login UI. Legacy live site member pages (alphabetic listing under `/logo-of-saaa-members/…`) exist on WordPress only — scraped copies in `.cache/` are **not** part of this redesign.

---

## 4. Services

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Permit & Certificate of Origin | `permit-certificate-of-origin.html` | `/permit-certificate-of-origin` | Both |
| Neutral Airway Bill | `neutral-airway-bill.html` | `/neutral-airway-bill` | Both |
| Bar Code Labels | `bar-code-labels.html` | `/bar-code-labels` | Both |

> Services pages link to the SCS permits app (`https://main.d1zqfaeaa5ju6p.amplifyapp.com`) for live permit workflows.

---

## 5. Training

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Training courses catalog | `training-courses.html` | `/training-courses` | Both |
| Training course detail (template) | `training-course.html?slug={slug}` | `/training-courses/{slug}` | Both |
| CBTA / Training Centre Opening (archive) | `training-opening.html` | `/training-opening` | Both |

### Training course detail — dynamic routes (`slug`)

| Slug | Example static URL | Example Next.js URL |
|------|-------------------|---------------------|
| `dg-7-1-initial` | `training-course.html?slug=dg-7-1-initial` | `/training-courses/dg-7-1-initial` |
| `dg-7-2-initial` | `training-course.html?slug=dg-7-2-initial` | `/training-courses/dg-7-2-initial` |
| `dg-7-3-initial` | `training-course.html?slug=dg-7-3-initial` | `/training-courses/dg-7-3-initial` |
| `dg-7-4-initial` | `training-course.html?slug=dg-7-4-initial` | `/training-courses/dg-7-4-initial` |
| `dg-7-1-recurrent` | `training-course.html?slug=dg-7-1-recurrent` | `/training-courses/dg-7-1-recurrent` |
| `dg-7-2-recurrent` | `training-course.html?slug=dg-7-2-recurrent` | `/training-courses/dg-7-2-recurrent` |
| `dg-7-3-recurrent` | `training-course.html?slug=dg-7-3-recurrent` | `/training-courses/dg-7-3-recurrent` |
| `dg-7-4-recurrent` | `training-course.html?slug=dg-7-4-recurrent` | `/training-courses/dg-7-4-recurrent` |
| `htdp` | `training-course.html?slug=htdp` | `/training-courses/htdp` |
| `mail-security` | `training-course.html?slug=mail-security` | `/training-courses/mail-security` |
| `pharma` | `training-course.html?slug=pharma` | `/training-courses/pharma` |
| `elearning` | `training-course.html?slug=elearning` | `/training-courses/elearning` |
| `affb` | `training-course.html?slug=affb` | `/training-courses/affb` |
| `incoterms` | `training-course.html?slug=incoterms` | `/training-courses/incoterms` |
| `uld` | `training-course.html?slug=uld` | `/training-courses/uld` |

> Course registration forms remain on the live WordPress site (`bookNowUrl` in `js/training-data.js`).

---

## 6. Events

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Calendar of Events | `events.html` | `/events` | Both |
| Event detail (template) | `event-detail.html?id={id}` | `/events/{id}` | Both |
| Event booking | `event-booking.html` | `/event-booking` | Both |
| Event booking summary | `event-booking-summary.html` | `/event-booking-summary` | Both |

### Event detail — dynamic routes (`id`)

| Event ID | Example static URL | Example Next.js URL |
|----------|-------------------|---------------------|
| `business-networking-aug-2026` | `event-detail.html?id=business-networking-aug-2026` | `/events/business-networking-aug-2026` |
| `dg-workshop-sep-2026` | `event-detail.html?id=dg-workshop-sep-2026` | `/events/dg-workshop-sep-2026` |
| `agm-2026` | `event-detail.html?id=agm-2026` | `/events/agm-2026` |
| `industry-networking-oct-2026` | `event-detail.html?id=industry-networking-oct-2026` | `/events/industry-networking-oct-2026` |
| `empire-bison-networking-2026` | `event-detail.html?id=empire-bison-networking-2026` | `/events/empire-bison-networking-2026` |
| `cargo-tech-briefing-nov-2026` | `event-detail.html?id=cargo-tech-briefing-nov-2026` | `/events/cargo-tech-briefing-nov-2026` |
| `leadership-roundtable-dec-2026` | `event-detail.html?id=leadership-roundtable-dec-2026` | `/events/leadership-roundtable-dec-2026` |
| `cargo-compliance-forum-2025` | `event-detail.html?id=cargo-compliance-forum-2025` | `/events/cargo-compliance-forum-2025` |
| `networking-evening-2025` | `event-detail.html?id=networking-evening-2025` | `/events/networking-evening-2025` |
| `dg-refresher-2025` | `event-detail.html?id=dg-refresher-2025` | `/events/dg-refresher-2025` |
| `agm-2025` | `event-detail.html?id=agm-2025` | `/events/agm-2025` |
| `supply-chain-forum-2025` | `event-detail.html?id=supply-chain-forum-2025` | `/events/supply-chain-forum-2025` |
| `networking-lunch-2025` | `event-detail.html?id=networking-lunch-2025` | `/events/networking-lunch-2025` |
| `dg-awareness-2024` | `event-detail.html?id=dg-awareness-2024` | `/events/dg-awareness-2024` |
| `partner-briefing-2024` | `event-detail.html?id=partner-briefing-2024` | `/events/partner-briefing-2024` |
| `cargo-security-forum-2024` | `event-detail.html?id=cargo-security-forum-2024` | `/events/cargo-security-forum-2024` |
| `midyear-networking-2024` | `event-detail.html?id=midyear-networking-2024` | `/events/midyear-networking-2024` |
| `dg-initial-workshop-2024` | `event-detail.html?id=dg-initial-workshop-2024` | `/events/dg-initial-workshop-2024` |
| `agm-2024` | `event-detail.html?id=agm-2024` | `/events/agm-2024` |
| `trade-lanes-briefing-2024` | `event-detail.html?id=trade-lanes-briefing-2024` | `/events/trade-lanes-briefing-2024` |
| `new-year-networking-2024` | `event-detail.html?id=new-year-networking-2024` | `/events/new-year-networking-2024` |
| `compliance-clinic-2023` | `event-detail.html?id=compliance-clinic-2023` | `/events/compliance-clinic-2023` |
| `stakeholder-roundtable-2023` | `event-detail.html?id=stakeholder-roundtable-2023` | `/events/stakeholder-roundtable-2023` |

---

## 7. Publications & News

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Announcements listing | `announcements.html` | `/announcements` | Both |
| Featured News listing | `featured-news.html` | `/featured-news` | Both |
| Publications (Perspectives) | `publications.html` | `/publications` | Both |
| Article detail (template) | `article-detail.html?type={type}&id={id}` | `/article-detail?id={id}` | Both |

### Featured News — article detail (`type=featured`)

| Article ID | Static URL | Next.js URL |
|------------|------------|-------------|
| `cbta-framework-update` | `article-detail.html?type=featured&id=cbta-framework-update` | `/article-detail?id=cbta-framework-update` |
| `stc-2025-update` | `article-detail.html?type=featured&id=stc-2025-update` | `/article-detail?id=stc-2025-update` |
| `perspectives-q2-2025` | `article-detail.html?type=featured&id=perspectives-q2-2025` | `/article-detail?id=perspectives-q2-2025` |
| `digital-cargo-outlook-2025` | `article-detail.html?type=featured&id=digital-cargo-outlook-2025` | `/article-detail?id=digital-cargo-outlook-2025` |
| `member-spotlight-feb-2025` | `article-detail.html?type=featured&id=member-spotlight-feb-2025` | `/article-detail?id=member-spotlight-feb-2025` |
| `iata-regulatory-roundup-2025` | `article-detail.html?type=featured&id=iata-regulatory-roundup-2025` | `/article-detail?id=iata-regulatory-roundup-2025` |
| `talent-development-2024` | `article-detail.html?type=featured&id=talent-development-2024` | `/article-detail?id=talent-development-2024` |
| `sustainability-initiatives-2024` | `article-detail.html?type=featured&id=sustainability-initiatives-2024` | `/article-detail?id=sustainability-initiatives-2024` |

### Announcements — article detail (`type=announcements`)

| Article ID | Static URL | Next.js URL | Notes |
|------------|------------|-------------|-------|
| `perspectives-contributions` | `article-detail.html?type=announcements&id=perspectives-contributions` | `/article-detail?id=perspectives-contributions` | |
| `empire-bison-networking` | `article-detail.html?type=announcements&id=empire-bison-networking` | `/article-detail?id=empire-bison-networking` | |
| `training-centre-opening` | `article-detail.html?type=announcements&id=training-centre-opening` | `/training-opening` | Links to archive page |
| `agm-notice-2026` | `article-detail.html?type=announcements&id=agm-notice-2026` | `/article-detail?id=agm-notice-2026` | |
| `training-schedule-q3-2026` | `article-detail.html?type=announcements&id=training-schedule-q3-2026` | `/article-detail?id=training-schedule-q3-2026` | |
| `membership-renewal-2026` | `article-detail.html?type=announcements&id=membership-renewal-2026` | `/article-detail?id=membership-renewal-2026` | |
| `holiday-office-closure-2025` | `article-detail.html?type=announcements&id=holiday-office-closure-2025` | `/article-detail?id=holiday-office-closure-2025` | |
| `cbta-transition-2025` | `article-detail.html?type=announcements&id=cbta-transition-2025` | `/article-detail?id=cbta-transition-2025` | |
| `editorial-deadline-2025` | `article-detail.html?type=announcements&id=editorial-deadline-2025` | `/article-detail?id=editorial-deadline-2025` | |

> **Publications flipbooks:** `publications.html` links to legacy WordPress flipbook URLs on `www.saaa.org.sg` (not separate pages in this redesign).

---

## 8. Project IMDD Hub

| Page | Static path | Next.js route | Availability |
|------|-------------|---------------|--------------|
| Overview | `project-imdd.html` | `/project-imdd` | Both |
| Program | `project-imdd-program.html` | `/project-imdd/program` | Both |
| For Employers | `project-imdd-employers.html` | `/project-imdd/employers` | Both |
| For Applicants | `project-imdd-applicants.html` | `/project-imdd/applicants` | Both |
| Companies | `project-imdd-companies.html` | `/project-imdd/companies` | Both |

### IMDD anchors

| Anchor | Page | Purpose |
|--------|------|---------|
| `#imdd-internship-form` | `project-imdd-applicants.html` / `/project-imdd/applicants` | Apply & submit resume |

---

## 9. Admin (Next.js only)

> Not indexed (`robots: noindex`). Requires authentication.

| Page | Route | Notes |
|------|-------|-------|
| Admin login | `/admin/login` | |
| Admin dashboard | `/admin` | Module hub |
| IMDD Companies | `/admin/imdd/companies` | Partner company logos & links |
| Brochure & Forms | `/admin/imdd/brochures` | PDF uploads, form builder |
| IMDD Programmes | `/admin/imdd/programmes` | Training programme publishing |
| Users | `/admin/users` | Admin accounts & menu access |
| Forms (alias) | `/admin/imdd/forms` | Redirects to `/admin/imdd/brochures` |

### Admin API routes (not user-facing pages)

- `/api/admin/auth`
- `/api/admin/users`, `/api/admin/users/[id]`
- `/api/admin/imdd/companies`, `/api/admin/imdd/companies/[id]`, `/api/admin/imdd/companies/reorder`
- `/api/admin/imdd/brochures`, `/api/admin/imdd/brochures/[id]`
- `/api/admin/imdd/forms`, `/api/admin/imdd/forms/[id]`
- `/api/admin/imdd/programmes`, `/api/admin/imdd/programmes/[id]`
- `/api/admin/imdd/upload`

---

## 10. External & legacy (not in redesign repos)

| Resource | URL | Notes |
|----------|-----|-------|
| LinkedIn | `https://www.linkedin.com/company/saaa-singapore` | Footer / nav social |
| Facebook | `https://www.facebook.com/pages/SAAA/834894096585648` | Footer / nav social |
| Instagram | `https://www.instagram.com/saaasingapore/` | Footer / nav social |
| SCS Permits app | `https://main.d1zqfaeaa5ju6p.amplifyapp.com` | Services CTAs |
| Live WordPress site | `https://www.saaa.org.sg` | Training reg forms, flipbooks, legacy member pages |
| Legacy member directory | `https://www.saaa.org.sg/logo-of-saaa-members/` | WordPress only |

---

## 11. Machine-readable sitemaps

| Repo | File | Notes |
|------|------|-------|
| Static HTML | `sitemap.xml` (repo root) | Production-style URLs; see file header |
| Next.js | `src/app/sitemap.ts` | Auto-generated at `/sitemap.xml` on deploy |

### Page counts (public redesign)

| Category | Count |
|----------|-------|
| Static HTML files (production root) | 29 |
| Next.js `page.tsx` routes | 36 |
| Shared public pages | 27 |
| Training course detail pages | 15 |
| Event detail pages | 22 |
| Article detail pages | 16 (+ 1 alias to `/training-opening`) |
| Admin pages | 7 |
| Homepage sections (anchors) | 6 |

---

## Navigation source files

| Repo | Files |
|------|-------|
| Static | `partials/nav-home.html`, `partials/nav-subpage.html`, `scripts/sync_nav.py` |
| Next.js | `src/lib/content/navigation.ts`, `src/components/layout/SiteNav.tsx` |
