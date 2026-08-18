# Training Tab Audit Report

**Date:** 18 Aug 2026  
**Repos:** `SAAA` (static HTML) · `SAAA-Website-NextJS` (Next.js)  
**Reference live:** https://www.saaa.org.sg/iata-cbta-dangerous-goods-job-functions-training-courses/

---

## Summary Table

| Item | Static path | Next path | Status |
|------|-------------|-----------|--------|
| Course listing | `training-courses.html` | `/training-courses` | ✅ Exists |
| Course detail | `training-course.html?slug=` | `/training-courses/[slug]` | ✅ Exists (15/15 with content) |
| Booking form | `training-book.html?slug=` | `/training-courses/[slug]/book` | ✅ **Created** (internal routes) |
| Opening Soon page | `training-opening-soon.html?slug=` | `/training-courses/[slug]/opening-soon` | ✅ **Created** |
| Schedule (no times) | `js/training-ui.js` | `TrainingCourseRow.tsx` + `trainingCourses.ts` | ✅ **Fixed** |

---

## Schedule Format Fix

Per client PDF feedback, schedules now show **dates only**:

- **Multi-day:** `5 - 8 Oct 2026`, `23 - 26 Nov 2026`
- **Single-day:** `26 Feb 2026`, `28 Aug 2026`
- **Removed:** time ranges (`9:00 AM – 5:00 PM`), day-count labels (`(3-Day)`), delivery annotations (`(Virtual Classroom)`), radioactive variant notes in schedule display

Implementation:

- `training-data.js` / `trainingCourses.ts` — cleaned `scheduleOptions`
- `training-ui.js` / `formatSessionScheduleLine()` — removed time suffix logic
- `TrainingCourseRow.tsx` — displays schedule labels directly

---

## All 15 Courses Audit

| # | Slug | Category | Detail page | Booking page | Opening Soon | Notes |
|---|------|----------|-------------|--------------|--------------|-------|
| 1 | `dg-7-1-initial` | CBTA DG | ✅ | ✅ `/book` | — | DG registration template |
| 2 | `dg-7-2-initial` | CBTA DG | ✅ | ✅ | — | DG registration template |
| 3 | `dg-7-3-initial` | CBTA DG | ✅ | ✅ | — | DG registration template |
| 4 | `dg-7-4-initial` | CBTA DG | ✅ | ✅ | — | DG registration template |
| 5 | `dg-7-1-recurrent` | CBTA DG | ✅ | — | ✅ Badge + panel | Schedules shown, booking disabled |
| 6 | `dg-7-2-recurrent` | CBTA DG | ✅ | — | ✅ Badge + panel | No dates yet |
| 7 | `dg-7-3-recurrent` | CBTA DG | ✅ | ✅ | — | |
| 8 | `dg-7-4-recurrent` | CBTA DG | ✅ | — | ✅ Badge + panel | No dates yet |
| 9 | `htdp` | Air Cargo | ✅ | ✅ | — | Standard registration template |
| 10 | `mail-security` | Air Cargo | ✅ | ✅ | — | Standard template |
| 11 | `pharma` | Air Cargo | ✅ | ✅ | — | Standard template |
| 12 | `elearning` | Air Cargo | ✅ | ✅ | — | Self-paced date label kept |
| 13 | `affb` | Air Cargo | ✅ | ✅ | — | Standard template |
| 14 | `incoterms` | Air Cargo | ✅ | ✅ | — | Standard template |
| 15 | `uld` | Air Cargo | ✅ | ✅ | — | Standard template |

**Opening Soon courses (3):** `dg-7-1-recurrent`, `dg-7-2-recurrent`, `dg-7-4-recurrent`

---

## Internal Booking Forms

### Routes (no external saaa.org.sg redirects)

| Repo | Pattern |
|------|---------|
| Static | `training-book.html?slug={slug}` |
| Next | `/training-courses/{slug}/book` |

`bookNowUrl` updated in course data to internal paths. Book Now / Register Now links no longer use `target="_blank"`.

### Form templates

1. **`dgRegistration`** — CBTA DG courses (`dg-*` slugs)
   - Course date selection
   - Company particulars (name, UEN, contact, address)
   - Participant particulars (name, ID, email)
   - DGR manual question

2. **`standardRegistration`** — Air cargo courses
   - Course date selection
   - Company name, full name, designation, mobile, email, address

Fields modelled from live `reg-form-*` Gravity Forms (7.1 initial used as primary reference).

### Submit approach (current)

- **Method:** `mailto:admin@saaa.org.sg` with pre-filled subject/body
- **Why:** No backend registration API exists yet; matches interim static-site pattern
- **Future:** Replace with POST to `/api/training-registrations` or CRM integration; form config in `trainingBookingForms.ts` / `js/training-book-form.js` is structured for this swap

---

## Opening Soon Pages

| Repo | Dedicated page | Detail page behaviour |
|------|----------------|----------------------|
| Static | `training-opening-soon.html?slug=` | Opening Soon panel on detail pages for flagged courses |
| Next | `/training-courses/[slug]/opening-soon` | Same panel on `/training-courses/[slug]` |

List rows keep **Opening Soon** badge; Book Now is disabled.

---

## Course Content

All 15 courses have detail content (objectives, outline, who should attend, fees) in:

- Static: `js/training-course-details.js`
- Next: `src/lib/content/trainingCourseDetails.json`

**Added in this pass:** `dg-7-2-recurrent`, `dg-7-4-recurrent` (previously missing).

---

## Files Changed / Created

### SAAA (static)

| File | Change |
|------|--------|
| `js/training-data.js` | Schedule cleanup, internal `bookNowUrl`, opening-soon slugs |
| `js/training-ui.js` | No-time schedule, internal links |
| `js/training-detail.js` | Internal register link, opening-soon panel |
| `js/training-course-details.js` | Added 7.2R / 7.4R content |
| `css/training.css` | Booking + opening-soon styles |
| `training-book.html` | **New** |
| `training-opening-soon.html` | **New** |
| `js/training-book-form.js` | **New** |
| `js/training-opening-soon.js` | **New** |

### SAAA-Website-NextJS

| File | Change |
|------|--------|
| `src/lib/content/trainingCourses.ts` | Schedule, paths, helpers |
| `src/lib/content/trainingCourseDetails.json` | Added 7.2R / 7.4R |
| `src/lib/content/trainingBookingForms.ts` | **New** form config |
| `src/components/training/TrainingCourseRow.tsx` | Schedule + internal links |
| `src/components/training/TrainingBookingForm.tsx` | **New** |
| `src/app/training-courses/[slug]/book/page.tsx` | **New** |
| `src/app/training-courses/[slug]/opening-soon/page.tsx` | **New** |
| `src/app/training-courses/[slug]/page.tsx` | Opening-soon panel, internal register |
| `src/styles/legacy/training.css` | Booking + opening-soon styles |

---

## Verification

```bash
# Next.js
cd SAAA-Website-NextJS && npm run build

# Static — open in browser
training-courses.html
training-book.html?slug=dg-7-1-initial
training-opening-soon.html?slug=dg-7-2-recurrent
training-course.html?slug=dg-7-1-recurrent
```

---

## Not in scope (follow-up)

- Backend form submission / email service integration
- Multi-participant dynamic blocks (1–5 trainees) on all DG forms — structure ready, full parity with live Gravity Forms can be expanded
- `docs/SITEMAP.md` update for new routes (optional)
