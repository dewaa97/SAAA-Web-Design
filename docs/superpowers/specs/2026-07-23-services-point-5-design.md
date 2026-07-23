# Services Point 5 Design

## Summary

This spec covers `Point 5` from `SAAA Website Update.pdf` for the new
`SAAA Services` segment on the main page.

This version replaces the earlier, incorrect assumptions about generic cards and
popup/modal behavior. The corrected source of truth is:

- the exact wording extracted from page 5 of `SAAA Website Update.pdf`,
- the approved placement after the `Training` section,
- the reference screenshot provided by the user for the required content and
  structure.

The final section should present a compact services information block with two
contact rows and three small actions:

- `Permit & Certificate of Origin`
- `Neutral Airway Bill`
- `Bar Code Labels`

All three actions must open in a new browser tab.

## Goals

- Keep the section positioned after the `Training` section.
- Present the section heading as `SAAA Services`.
- Match the approved screenshot content as closely as possible.
- Include the two required contact groups and their visible contact details.
- Render the three service actions as small buttons under their respective
  contact groups.
- Make all three service actions open in a new browser tab.
- Keep the implementation visually aligned with the current project.

## Non-Goals

- Building popup or modal windows for the service actions.
- Inventing new marketing copy beyond the approved screenshot text.
- Redesigning unrelated sections.
- Reworking the existing page navigation structure.

## Current State

The current `Services` implementation in `index.html` is now known to be
incorrect for point 5 because:

- the content body was based on an earlier interpretation rather than the final
  screenshot,
- the action layout was implemented as generic service cards,
- the section copy does not match the approved content,
- the behavior assumptions for the actions were wrong.

This means both the existing point 5 spec and the current implementation must be
treated as outdated.

## Chosen Approach

Replace the current card-like `Services` body with a more literal `SAAA
Services` information block that follows the screenshot structure.

Why this approach:

- It directly follows the approved visual/content reference.
- It removes earlier ambiguity about cards, tabs, popups, and placeholder copy.
- It keeps the section simple and production-safe.
- It still fits inside the existing homepage flow without introducing a separate
  page.

## Layout Design

### Section Position

- Keep the section after `Training`.
- Preserve the `#services` anchor.

### Heading And Description

The top of the section should read:

- title: `SAAA Services`
- description:
  `SAAA provides permit declaration services to facilitate cargo clearance. We have a team of customs approved declarants experienced in permit declarations, e.g.: import, export permits.`

This copy should be treated as fixed content for this pass.

### Contact Group 1

Render the first contact row exactly for the permits service:

- label: `Contact SAAA Permits Office`
- phone: `+(65) 6545 9597`
- email: `scs@saaa.org.sg`
- button: `Permit & Certificate of Origin`

### Contact Group 2

Render the second contact row exactly for the finance-related services:

- label: `Contact SAAA@Singapore`
- phone: `+(65) 6543 0059`
- email: `finance@saaa.org.sg`
- buttons:
  - `Neutral Airway Bill`
  - `Bar Code Labels`

### Action Placement

- `Permit & Certificate of Origin` sits below the first contact row.
- `Neutral Airway Bill` and `Bar Code Labels` sit below the second contact row.
- The buttons should remain compact and left-aligned as in the approved
  screenshot.

## Interaction Rules

The earlier popup/modal interpretation is no longer valid.

For this corrected version:

- `Permit & Certificate of Origin` opens in a new tab.
- `Neutral Airway Bill` opens in a new tab.
- `Bar Code Labels` opens in a new tab.

Required link behavior for all three actions:

```html
target="_blank"
rel="noopener"
```

Known confirmed URL:

- `Permit & Certificate of Origin` uses
  `https://main.d1zqfaeaa5ju6p.amplifyapp.com/`

The final URLs for `Neutral Airway Bill` and `Bar Code Labels` are not yet
confirmed in this spec revision. Until they exist, the implementation may keep
safe placeholder URLs while preserving the new-tab behavior.

## Visual Design Rules

- The section should visually resemble the approved screenshot in content order
  and grouping.
- The design should still use the current site's typography, spacing, and color
  system as the rendering base.
- The heading should emphasize `Services` in the same spirit as the screenshot,
  without introducing an unrelated design language.
- Contact rows should read as informational lines, not as large marketing cards.
- Action buttons should be compact and understated.

## Markup Strategy

The implementation should remain inside the existing `#services` section in
`index.html`, but the current body content should be replaced.

Representative structure:

```html
<section id="services" class="section services-section">
  <div class="container">
    <div class="services-intro">
      <h2 class="section-title">SAAA <span class="accent">Services</span></h2>
      <p class="section-desc">
        SAAA provides permit declaration services to facilitate cargo
        clearance. We have a team of customs approved declarants experienced in
        permit declarations, e.g.: import, export permits.
      </p>
    </div>

    <div class="services-contact-group">
      <div class="services-contact-row">
        <div class="services-contact-label">Contact SAAA Permits Office</div>
        <div class="services-contact-phone">+(65) 6545 9597</div>
        <a href="mailto:scs@saaa.org.sg">scs@saaa.org.sg</a>
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

    <div class="services-contact-group">
      <div class="services-contact-row">
        <div class="services-contact-label">Contact SAAA@Singapore</div>
        <div class="services-contact-phone">+(65) 6543 0059</div>
        <a href="mailto:finance@saaa.org.sg">finance@saaa.org.sg</a>
      </div>
      <div class="services-mini-actions">
        <a href="#" target="_blank" rel="noopener" class="services-mini-btn">
          Neutral Airway Bill
        </a>
        <a href="#" target="_blank" rel="noopener" class="services-mini-btn">
          Bar Code Labels
        </a>
      </div>
    </div>
  </div>
</section>
```

The exact class names may adapt during implementation, but the grouping and
content order should stay faithful to the screenshot.

## Responsive Rules

- On desktop, the contact row items can sit inline as long as they remain easy
  to scan.
- On smaller screens, each contact row may wrap into multiple lines.
- The small action buttons may stack when necessary.
- The section must stay readable without collapsing into oversized cards.

## Testing Plan

Manual verification is sufficient for this pass.

Checks:

1. The `Services` section still appears after `Training`.
2. The section title reads `SAAA Services`.
3. The paragraph text matches the approved screenshot wording.
4. The first contact group shows:
   - `Contact SAAA Permits Office`
   - `+(65) 6545 9597`
   - `scs@saaa.org.sg`
   - `Permit & Certificate of Origin`
5. The second contact group shows:
   - `Contact SAAA@Singapore`
   - `+(65) 6543 0059`
   - `finance@saaa.org.sg`
   - `Neutral Airway Bill`
   - `Bar Code Labels`
6. All three action buttons open in a new tab.
7. The section remains visually consistent across desktop and mobile widths.

## Risks And Mitigations

- Risk: the existing point 5 implementation may bias future edits toward the
  wrong structure.
  Mitigation: treat this revised spec as the new source of truth.

- Risk: developers may revert to popup/modal behavior because of earlier notes.
  Mitigation: make the new-tab behavior explicit in the interaction rules.

- Risk: the section may accidentally become too card-like and drift from the
  approved screenshot.
  Mitigation: keep the design compact and grouped around contact information.

## Implementation Notes

- Keep changes localized to `index.html`.
- Preserve the `#services` anchor and the section order after `Training`.
- Replace the current point 5 body implementation instead of layering new
  content on top of it.
- Remove the earlier card-style action assumptions from the implementation.
- Use `mailto:` links for the visible emails.
- Keep `target="_blank"` and `rel="noopener"` on all three service actions.

## Acceptance Criteria

- The page includes a `SAAA Services` section after `Training`.
- The section description matches the approved screenshot copy.
- The first contact group shows:
  - `Contact SAAA Permits Office`
  - `+(65) 6545 9597`
  - `scs@saaa.org.sg`
  - `Permit & Certificate of Origin`
- The second contact group shows:
  - `Contact SAAA@Singapore`
  - `+(65) 6543 0059`
  - `finance@saaa.org.sg`
  - `Neutral Airway Bill`
  - `Bar Code Labels`
- All three action buttons open in a new tab.
- The section visually follows the approved screenshot more closely than the
  previous card-based implementation.
