# Members Point 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two CTA buttons to the `Members` section in `index.html` using existing button styles and temporary placeholder links.

**Architecture:** Keep all changes in `index.html`. Add a small `members-cta` wrapper below the existing member statistics grid, reuse the current `.btn`, `.btn-primary`, and `.btn-secondary` styles, and add only the minimum section-specific spacing and responsive stacking needed for clean layout.

**Tech Stack:** Static HTML, inline CSS, browser manual QA, VS Code diagnostics

---

## File Map

- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`
  - Add CTA markup in the `Members` section.
  - Add minimal CSS for spacing and responsive stacking.
- Reference only: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/docs/superpowers/specs/2026-07-23-members-point-4-design.md`
  - Use as the source of truth for labels, placement, and placeholder-link behavior.

## Task 1: Add Members CTA Markup

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Locate the current `Members` section block**

Find this block:

```html
<section id="members" class="section">
    <div class="container">
        <div style="text-align: center; max-width: 560px; margin: 0 auto 48px;">
            <div class="section-tag">Members</div>
            <h2 class="section-title" style="margin: 0 auto 16px;">
                Trusted by Industry <span class="accent">Leaders</span>
            </h2>
            <p class="section-desc">
                Over 200 member companies trust SAAA to represent their interests and advance the air cargo profession.
            </p>
        </div>

        <div class="members-grid">
            ...
        </div>
    </div>
</section>
```

- [ ] **Step 2: Insert the CTA wrapper directly below `members-grid`**

Add this block immediately after the closing `</div>` of `.members-grid`:

```html
<div class="members-cta">
    <a href="#" class="btn btn-primary">Membership Sign-up</a>
    <a href="#" class="btn btn-secondary">SAAA Members Listing</a>
</div>
```

- [ ] **Step 3: Preserve the rest of the section unchanged**

Do not alter:

```html
- the title
- the description
- the three member stat cards
- the member marquee section below
```

Only add the CTA row.

- [ ] **Step 4: Run diagnostics after the markup edit**

Run: use VS Code diagnostics on `index.html`

Expected: no malformed HTML or tag mismatch errors.

- [ ] **Step 5: Commit the markup change**

```bash
git add index.html
git commit -m "feat: add members call-to-action buttons"
```

## Task 2: Add Minimal Styling And Responsive Behavior

**Files:**
- Modify: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Add a section-specific CTA style block near the existing Members styles**

Find the Members styling area around:

```css
/* Members */
```

Add these rules there:

```css
.members-cta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
}
```

- [ ] **Step 2: Add the mobile stacking rule**

Inside the existing mobile breakpoint, add:

```css
.members-cta {
    flex-direction: column;
    align-items: stretch;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
}

.members-cta .btn {
    justify-content: center;
}
```

This keeps the buttons stacked and centered on smaller screens.

- [ ] **Step 3: Keep the button design system unchanged**

Do not edit the shared button rules:

```css
.btn
.btn-primary
.btn-secondary
```

The new CTA row should rely on those existing styles exactly as-is.

- [ ] **Step 4: Run diagnostics after the CSS edit**

Run: use VS Code diagnostics on `index.html`

Expected: no CSS parse errors or HTML errors.

- [ ] **Step 5: Commit the styling pass**

```bash
git add index.html
git commit -m "style: add members cta spacing and mobile layout"
```

## Task 3: Verify Visual Placement

**Files:**
- Modify if needed: `/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/index.html`

- [ ] **Step 1: Start or reuse a local preview**

Open:

```text
http://127.0.0.1:4173/index.html#members
```

Expected: the page loads with the `Members` section visible.

- [ ] **Step 2: Validate the desktop layout**

Check:

```text
1. The two buttons appear below the member statistics cards.
2. The buttons are centered.
3. Membership Sign-up is visually primary.
4. SAAA Members Listing is visually secondary.
5. The member marquee below still has comfortable spacing.
```

- [ ] **Step 3: Validate the mobile layout**

Check at mobile width:

```text
1. Buttons stack vertically.
2. Button labels remain readable.
3. The CTA row does not overflow horizontally.
```

- [ ] **Step 4: Run final diagnostics**

Run: use VS Code diagnostics on `index.html`

Expected: diagnostics remain empty.

- [ ] **Step 5: Commit the final verification**

```bash
git add index.html
git commit -m "fix: finalize members point 4 cta layout"
```

## Self-Review Checklist

- Spec coverage:
  - Two requested labels: covered by Task 1
  - Placement below member stats: covered by Task 1
  - Existing button styles reused: covered by Task 2
  - Desktop and mobile behavior: covered by Tasks 2 and 3
  - Placeholder links only: covered by Task 1
- Placeholder scan:
  - No `TODO`, `TBD`, or undefined later work remains in this plan
- Type consistency:
  - The wrapper class is consistently named `members-cta`
  - The links consistently use `.btn`, `.btn-primary`, and `.btn-secondary`
