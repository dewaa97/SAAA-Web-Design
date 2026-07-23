# Services Point 5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the incorrect card-style `Services` body in `index.html` with a compact `SAAA Services` information block that matches the approved screenshot, stays after `Training`, and opens all three service actions in new tabs.

**Architecture:** Keep all implementation work in `index.html`. Preserve the `#services` anchor and section placement after `Training`, but replace the current body structure with a smaller text-and-contact layout containing two contact groups and three compact actions. Reuse the current site typography and spacing system, while replacing the current point 5-specific CSS with rules that support the screenshot-like grouping.

**Tech Stack:** Static HTML, inline CSS, browser manual QA, VS Code diagnostics

---

## File Map

- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`
  - Replace the current card-style `Services` body with the revised `SAAA Services` content block.
  - Replace the current point 5 CSS with compact contact-row styling and small action-button styling.
- Reference only: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/docs/superpowers/specs/2026-07-23-services-point-5-design.md`
  - Use as the source of truth for wording, contact details, grouping, and new-tab behavior.

## Task 1: Replace The Current Services Markup

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Locate the current `Services` section after `Training`**

Find the current block:

```html
<section id="services" class="section services-section">
    <div class="container">
        <div class="services-header">
            <div>
                <div class="section-tag">Services</div>
                <h2 class="section-title">
                    Comprehensive <span class="accent">Cargo</span> Solutions
                </h2>
            </div>
            <p class="section-desc">
                From documentation to compliance, we provide essential services that keep Singapore's air cargo industry operating at world-class standards.
            </p>
        </div>

        <div class="services-actions">
            ...
        </div>
    </div>
</section>
```

- [ ] **Step 2: Replace the section heading and description with the approved copy**

Use:

```html
<div class="services-intro">
    <h2 class="section-title">SAAA <span class="accent">Services</span></h2>
    <p class="section-desc">
        SAAA provides permit declaration services to facilitate cargo clearance. We have a team of customs approved declarants experienced in permit declarations, e.g.: import, export permits.
    </p>
</div>
```

Do not keep:

```html
<div class="section-tag">Services</div>
Comprehensive <span class="accent">Cargo</span> Solutions
From documentation to compliance, we provide essential services that keep Singapore's air cargo industry operating at world-class standards.
```

- [ ] **Step 3: Replace the current action cards with the first contact group**

Add:

```html
<div class="services-contact-group">
    <div class="services-contact-row">
        <div class="services-contact-label">Contact SAAA Permits Office</div>
        <div class="services-contact-phone">+(65) 6545 9597</div>
        <a href="mailto:scs@saaa.org.sg" class="services-contact-email">scs@saaa.org.sg</a>
    </div>
    <a
        href="https://main.d1zqfaeaa5ju6p.amplifyapp.com/"
        target="_blank"
        rel="noopener"
        class="services-mini-btn"
    >
        Permit &amp; Certificate of Origin
    </a>
</div>
```

- [ ] **Step 4: Add the second contact group**

Add:

```html
<div class="services-contact-group">
    <div class="services-contact-row">
        <div class="services-contact-label">Contact SAAA@Singapore</div>
        <div class="services-contact-phone">+(65) 6543 0059</div>
        <a href="mailto:finance@saaa.org.sg" class="services-contact-email">finance@saaa.org.sg</a>
    </div>
    <div class="services-mini-actions">
        <a href="#" target="_blank" rel="noopener" class="services-mini-btn">Neutral Airway Bill</a>
        <a href="#" target="_blank" rel="noopener" class="services-mini-btn">Bar Code Labels</a>
    </div>
</div>
```

- [ ] **Step 5: Ensure the final `Services` body contains only the revised screenshot-like structure**

The final section body must include:

```html
SAAA Services
Contact SAAA Permits Office
+(65) 6545 9597
scs@saaa.org.sg
Permit &amp; Certificate of Origin
Contact SAAA@Singapore
+(65) 6543 0059
finance@saaa.org.sg
Neutral Airway Bill
Bar Code Labels
```

Do not keep:

```html
<div class="section-tag">Services</div>
<div class="services-actions">
<a href="#" class="service-action-card">
```

- [ ] **Step 6: Run diagnostics after the markup update**

Run: use VS Code diagnostics on `index.html`

Expected: no malformed HTML or tag mismatch errors.

- [ ] **Step 7: Commit the markup pass**

```bash
git add index.html
git commit -m "feat: revise services section content for point 5"
```

## Task 2: Replace The Current Services CSS

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Locate the existing point 5 CSS**

Find the current services styling area around:

```css
.services-header
.services-actions
.service-action-card
.service-link
```

- [ ] **Step 2: Add intro spacing for the new compact block**

Add:

```css
.services-intro {
    margin-bottom: 28px;
}
```

- [ ] **Step 3: Add contact-group layout rules**

Add:

```css
.services-contact-group + .services-contact-group {
    margin-top: 40px;
}

.services-contact-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 28px;
    margin-bottom: 14px;
}

.services-contact-label {
    font-size: 15px;
    font-weight: 700;
    color: var(--slate-900);
}

.services-contact-phone,
.services-contact-email {
    font-size: 14px;
    font-weight: 600;
    color: var(--slate-800);
}
```

- [ ] **Step 4: Add compact action-button styling**

Add:

```css
.services-mini-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.services-mini-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 220px;
    padding: 10px 18px;
    border-radius: 8px;
    background: #e9e9e9;
    color: var(--slate-800);
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
}

.services-mini-btn:hover {
    background: var(--red-50);
    color: var(--red-600);
}
```

- [ ] **Step 5: Remove or stop relying on the obsolete card rules**

The revised implementation should no longer depend on:

```css
.services-actions
.service-action-card
.service-number
.service-link
```

If those rules are not reused anywhere else, replace them with the revised point 5 rules rather than keeping both systems active for the same section.

- [ ] **Step 6: Update responsive behavior for the new structure**

Inside the responsive rules, add:

```css
.services-contact-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.services-mini-actions {
    flex-direction: column;
    align-items: stretch;
}

.services-mini-btn {
    min-width: 0;
    width: 100%;
}
```

- [ ] **Step 7: Run diagnostics after the CSS update**

Run: use VS Code diagnostics on `index.html`

Expected: no CSS parse errors or HTML errors.

- [ ] **Step 8: Commit the styling pass**

```bash
git add index.html
git commit -m "style: revise services point 5 layout"
```

## Task 3: Verify Content Accuracy And New-Tab Behavior

**Files:**
- Modify if needed: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Start or reuse a local preview**

Open:

```text
http://127.0.0.1:4173/index.html#services
```

Expected: the `SAAA Services` section is visible after `Training`.

- [ ] **Step 2: Validate the visible content**

Check:

```text
1. The heading reads "SAAA Services".
2. The description matches the approved screenshot wording.
3. The first row shows Contact SAAA Permits Office, +(65) 6545 9597, and scs@saaa.org.sg.
4. The second row shows Contact SAAA@Singapore, +(65) 6543 0059, and finance@saaa.org.sg.
5. The buttons read Permit & Certificate of Origin, Neutral Airway Bill, and Bar Code Labels.
```

- [ ] **Step 3: Validate interaction behavior**

Check:

```text
1. Permit & Certificate of Origin opens a new tab.
2. Neutral Airway Bill opens a new tab.
3. Bar Code Labels opens a new tab.
```

- [ ] **Step 4: Validate responsive layout**

Check at desktop and mobile widths:

```text
1. Desktop keeps the content compact and grouped.
2. Mobile wraps the contact rows cleanly.
3. The three buttons remain readable and usable.
```

- [ ] **Step 5: Run final diagnostics**

Run: use VS Code diagnostics on `index.html`

Expected: diagnostics remain empty.

- [ ] **Step 6: Commit the verified result**

```bash
git add index.html
git commit -m "fix: finalize revised services point 5 section"
```

## Self-Review Checklist

- Spec coverage:
  - Keep section after `Training`: covered by Tasks 1 and 3
  - Use `SAAA Services` heading and screenshot copy: covered by Task 1
  - Show both contact groups and exact details: covered by Task 1
  - Keep all three actions opening in new tabs: covered by Tasks 1 and 3
  - Match the compact screenshot-like layout: covered by Tasks 1, 2, and 3
- Placeholder scan:
  - No `TODO`, `TBD`, or vague implementation handoffs remain in this plan
- Type consistency:
  - The revised structure consistently uses `services-intro`, `services-contact-group`, `services-contact-row`, `services-contact-label`, `services-contact-phone`, `services-contact-email`, `services-mini-actions`, and `services-mini-btn`
  - New-tab behavior is consistently required for all three actions
