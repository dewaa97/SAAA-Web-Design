# Secretariat Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the split secretariat and cargo-services blocks in `organization.html` with one unified hierarchy chart that follows the public SAAA reference structure while keeping the current page's design language.

**Architecture:** Keep all implementation localized to `organization.html`. Rework the secretariat section into explicit chart tiers and branches, reuse the existing `sec-card`, badge, and typography styles where possible, and remove the standalone cargo-services section once its roles are absorbed into the merged hierarchy.

**Tech Stack:** Static HTML, inline CSS, browser-based manual QA, VS Code diagnostics

---

## File Map

- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html`
  - Replace the current `#secretariat` markup with a merged hierarchy chart.
  - Add chart-specific CSS for tiers, branches, connectors, and responsive stacking.
  - Remove the standalone `SAAA Cargo Services Pte Ltd` section after its content is merged.
- Reference only: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/docs/superpowers/specs/2026-07-23-secretariat-chart-design.md`
  - Use this as the scope and acceptance-criteria checklist during implementation.

## Reference Content To Mirror

Use `https://www.saaa.org.sg/organization/secretariat-chart-roles/` as the source of truth for hierarchy and content. During implementation, copy the exact names, titles, branch labels, and email/contact lines shown there, then render them using the current page's visual language.

Expected implementation shape:

- One top-level secretariat section under `#secretariat`
- One centered executive card at the top
- Multiple downstream functional branches
- Cargo-services roles absorbed into the same chart instead of a separate section

## Task 1: Replace The Secretarial Layout CSS

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html`

- [ ] **Step 1: Replace the current secretariat layout rules with chart-aware CSS**

Find the existing block near the current secretariat styles:

```css
.secretariat-tree { display: flex; flex-direction: column; align-items: center; gap: 0; }
.sec-tier { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; padding: 16px 0; }
.sec-connector { width: 2px; height: 20px; background: var(--slate-200); flex-shrink: 0; }
.dept-group { border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 16px; background: white; margin-bottom: 16px; }
.dept-group-title { font-family: Space Grotesk, sans-serif; font-size: 1rem; font-weight: 700; color: var(--slate-800); padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--slate-100); }
.dept-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
```

Replace that layout block with this chart scaffold while keeping the existing `sec-card`, `dept-badge`, `name`, `title`, and `sec-email` styling:

```css
.secretariat-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
}
.secretariat-tier {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
}
.secretariat-tier-top .sec-card {
    min-width: 300px;
}
.secretariat-connector {
    width: 2px;
    height: 28px;
    background: var(--slate-200);
}
.secretariat-tier-branches {
    max-width: 1120px;
    align-items: stretch;
    gap: 20px;
}
.secretariat-branch {
    flex: 1 1 0;
    min-width: 220px;
    background: white;
    border: 1px solid var(--slate-200);
    border-radius: var(--radius-lg);
    padding: 18px;
}
.secretariat-branch-label {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 100px;
    background: var(--slate-100);
    color: var(--slate-700);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 14px;
}
.secretariat-branch-cards {
    display: grid;
    gap: 12px;
}
.secretariat-tier-ops {
    max-width: 1120px;
    flex-wrap: wrap;
    gap: 12px;
}
.secretariat-tier-ops .sec-card {
    flex: 1 1 240px;
    min-width: 220px;
}
```

- [ ] **Step 2: Add mobile rules for the merged chart**

Inside the existing `@media (max-width: 768px)` block, remove the old secretariat-specific fallbacks:

```css
.sec-card { flex: 0 1 100%; min-width: 0; }
.dept-cards { grid-template-columns: 1fr; }
.sec-tier { flex-direction: column !important; align-items: stretch !important; }
```

Replace them with chart-specific mobile rules:

```css
.secretariat-tier,
.secretariat-tier-branches,
.secretariat-tier-ops {
    flex-direction: column;
    align-items: stretch;
}
.secretariat-branch {
    min-width: 0;
}
.secretariat-tier-top .sec-card,
.secretariat-tier-ops .sec-card,
.secretariat-branch .sec-card {
    width: 100%;
    min-width: 0;
}
```

- [ ] **Step 3: Run diagnostics after the CSS refactor**

Run: use VS Code diagnostics on `organization.html`

Expected: no CSS or HTML parsing errors introduced by the new class names.

- [ ] **Step 4: Commit the CSS scaffold**

```bash
git add organization.html
git commit -m "feat: add merged secretariat chart styles"
```

## Task 2: Rebuild The Secretariat Markup As One Chart

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html`

- [ ] **Step 1: Replace the existing `#secretariat` body with one merged hierarchy**

Remove the current split structure:

```html
<div class="secretariat-tree">
    ...
</div>
```

and replace it with chart-aware markup shaped like this:

```html
<div class="secretariat-chart">
    <div class="secretariat-tier secretariat-tier-top">
        <article class="sec-card">
            <div class="dept-badge executive">Executive Director</div>
            <div class="name">Pauline Tok</div>
            <div class="title">Executive Director</div>
            <a href="mailto:pauline.tok@saaa.org.sg" class="sec-email">pauline.tok@saaa.org.sg</a>
        </article>
    </div>
    <div class="secretariat-connector"></div>
    <div class="secretariat-tier secretariat-tier-branches">
        <section class="secretariat-branch">
            <div class="secretariat-branch-label">Corporate Affairs</div>
            <div class="secretariat-branch-cards">
                <article class="sec-card">
                    <div class="dept-badge corp-affairs">HR &amp; Finance</div>
                    <div class="name">Azlinda Bte Hassan</div>
                    <div class="title">Assistant Manager, HR and Finance</div>
                    <a href="mailto:azlinda.hassan@saaa.org.sg" class="sec-email">azlinda.hassan@saaa.org.sg</a>
                </article>
            </div>
        </section>
        <section class="secretariat-branch">
            <div class="secretariat-branch-label">Membership &amp; Events</div>
            <div class="secretariat-branch-cards">
                <article class="sec-card">
                    <div class="dept-badge membership">Industry Engagement</div>
                    <div class="name">Pammie Loh</div>
                    <div class="title">Executive, Industry Engagement</div>
                    <a href="mailto:pammie.loh@saaa.org.sg" class="sec-email">pammie.loh@saaa.org.sg</a>
                </article>
            </div>
        </section>
        <section class="secretariat-branch">
            <div class="secretariat-branch-label">Industry Projects</div>
            <div class="secretariat-branch-cards">
                <article class="sec-card">
                    <div class="dept-badge industry-projects">Senior Manager</div>
                    <div class="name">Evelyn Tan</div>
                    <div class="title">Senior Manager</div>
                    <a href="mailto:evelyn.tan@saaa.org.sg" class="sec-email">evelyn.tan@saaa.org.sg</a>
                </article>
            </div>
        </section>
    </div>
</div>
```

This is the minimum scaffold. Then expand it so the full chart matches the public reference page, including any missing branches, roles, and shared contact lines that are not yet present locally.

- [ ] **Step 2: Preserve the current section header and copy**

Keep the existing section shell intact:

```html
<section id="secretariat" class="section secretariat-section">
    <div class="container">
        <div class="section-header" style="text-align:center;">
            <div class="section-tag">Secretariat</div>
            <h2 class="section-title">SAAA@Singapore <span class="accent">Secretariat</span></h2>
            <p class="section-desc" style="margin:0 auto;">The dedicated team managing the day-to-day operations, membership services, training programs, and industry projects of SAAA.</p>
        </div>
        <!-- replace only the body below -->
    </div>
</section>
```

Only the chart body changes in this task.

- [ ] **Step 3: Sync the full content against the reference page**

As you fill the chart, mirror the public page in this order:

```text
1. Top executive node
2. Secretariat branches directly under that node
3. Cargo-services and operational roles that belong in the same structure
4. Shared department emails exactly where the reference shows them
```

Do not keep any local-only placeholder rows just because they existed in the old split layout.

- [ ] **Step 4: Run diagnostics after the markup rewrite**

Run: use VS Code diagnostics on `organization.html`

Expected: no malformed HTML, no duplicated closing tags, no attribute errors.

- [ ] **Step 5: Commit the unified markup**

```bash
git add organization.html
git commit -m "feat: merge secretariat and cargo services chart"
```

## Task 3: Remove The Standalone Cargo Section And Tighten Hierarchy Spacing

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html`

- [ ] **Step 1: Delete the standalone cargo-services section**

Remove the entire section that starts like this:

```html
<section class="section" style="border-top:1px solid var(--slate-200);">
    <div class="container">
        <div class="section-header" style="text-align:center;">
            <div class="section-tag">SAAA Cargo Services</div>
            <h2 class="section-title">SAAA Cargo Services <span class="accent">Pte Ltd</span></h2>
```

and ends at its closing `</section>`.

The information from this section should already be present inside the merged `#secretariat` chart from Task 2.

- [ ] **Step 2: Tune branch spacing so the chart reads as one structure**

Adjust the new chart CSS if needed so the hierarchy reads clearly. Use these values as the first pass:

```css
.secretariat-chart { gap: 18px; }
.secretariat-tier-branches { gap: 20px; }
.secretariat-branch { padding: 18px; }
.secretariat-branch-cards { gap: 12px; }
.secretariat-connector { height: 28px; }
```

If the merged chart looks too flat, slightly increase connector height or branch gap before adding more visual chrome.

- [ ] **Step 3: Keep the existing card language intact**

Do not change these existing presentation rules unless the merged chart becomes unreadable:

```css
.sec-card { background: white; border: 1px solid var(--slate-200); border-radius: var(--radius); padding: 20px; text-align: center; transition: all 0.3s; }
.sec-card .dept-badge { ... }
.sec-card .name { ... }
.sec-card .title { ... }
.sec-card .sec-email { ... }
```

This task is about hierarchy and composition, not redesigning the cards themselves.

- [ ] **Step 4: Commit the cleanup and spacing pass**

```bash
git add organization.html
git commit -m "refactor: fold cargo section into secretariat hierarchy"
```

## Task 4: Verify Against The Reference And Responsive Breakpoints

**Files:**
- Modify if needed: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html`

- [ ] **Step 1: Start a local preview server**

Run:

```bash
python3 -m http.server 4173
```

Expected: terminal prints `Serving HTTP on 0.0.0.0 port 4173`.

- [ ] **Step 2: Open and inspect the local page**

Open:

```text
http://127.0.0.1:4173/organization.html
```

Check these acceptance points:

```text
1. There is only one secretariat chart section.
2. The top executive node is centered and visually separated from child branches.
3. Cargo-services roles are shown inside the same hierarchy.
4. Card styling still matches the current project language.
5. No gap in the reading flow suggests a separate second section.
```

- [ ] **Step 3: Check tablet and mobile layouts**

Resize to these widths and verify there is no horizontal overflow:

```text
1024px
768px
480px
```

Expected:

```text
- branches wrap without breaking hierarchy meaning
- cards remain readable
- emails do not overflow card width
- section spacing stays balanced
```

- [ ] **Step 4: Run final diagnostics**

Run: use VS Code diagnostics on `organization.html`

Expected: diagnostics remain empty.

- [ ] **Step 5: Commit the final verification pass**

```bash
git add organization.html
git commit -m "fix: finalize secretariat organization chart"
```

## Self-Review Checklist

- Spec coverage:
  - Unified chart: covered by Tasks 2 and 3
  - Reference-page structure and content: covered by Task 2
  - Current design language preserved: covered by Tasks 1 and 3
  - Responsive behavior: covered by Tasks 1 and 4
  - Removal of separate cargo section: covered by Task 3
- Placeholder scan:
  - No `TODO`, `TBD`, or deferred requirements remain in this plan
- Type consistency:
  - Chart class names are consistent across Tasks 1 through 4: `secretariat-chart`, `secretariat-tier`, `secretariat-tier-top`, `secretariat-tier-branches`, `secretariat-branch`, `secretariat-branch-label`, `secretariat-branch-cards`, `secretariat-connector`
