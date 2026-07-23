# Secretariat Chart Design

## Summary

This spec defines a redesign of the `Secretariat` area in `organization.html` so
that the organisation structure follows the hierarchy shown on the public SAAA
`Secretariat Chart & Roles` reference page.

The redesign combines the current `SAAA@Singapore Secretariat` and `SAAA Cargo
Services Pte Ltd` sections into one continuous organisation chart. The structure
and content should follow the reference website, while the visual language should
continue to use the current project styling already present in `organization.html`.

## Goals

- Combine the current secretariat-related sections into one readable organisation
  chart.
- Match the hierarchy and role coverage from the SAAA `Secretariat Chart & Roles`
  reference page.
- Keep the current page's design language for labels, typography, spacing, card
  styling, and color tokens.
- Improve structural readability so users can understand reporting/grouping at a
  glance.
- Preserve responsive behavior for tablet and mobile widths.

## Non-Goals

- Redesigning the council chart again.
- Copying the exact old-site visual styling pixel for pixel.
- Introducing a new global design system or unrelated page refactor.
- Converting the chart into a flat image.

## Current State

`organization.html` currently splits this information into two separate sections:

- `SAAA@Singapore Secretariat`
- `SAAA Cargo Services Pte Ltd`

This makes the content look like two independent information blocks instead of
one connected organisation structure. The cards themselves already use a visual
language that fits the project well, but the grouping does not communicate the
overall hierarchy clearly enough.

The local content is also incomplete compared with the public reference page, so
the current data should not be treated as the source of truth for the redesign.

## Chosen Approach

Use one merged hierarchy chart that:

- follows the structure and role coverage from the reference website,
- keeps the current project's labels, font styles, font sizes, spacing, badges,
  and card treatment,
- uses explicit chart tiers and grouped branches so hierarchy is visible without
  abandoning the existing UI language.

Why this approach:

- It solves the user's main issue: structure is easier to understand when viewed
  as one connected chart.
- It avoids a visual mismatch with the rest of the page.
- It is lower risk than rebuilding the section in a totally different style.
- It keeps the content editable and maintainable in HTML.

## Source Of Truth

The implementation should treat the public SAAA reference page as the source of
truth for:

- organisation hierarchy,
- role grouping,
- node order,
- role names,
- staff names,
- emails or contact lines where they are shown in the reference content.

The local `organization.html` content should only be reused where it already
matches the reference or where styling hooks are needed.

If there is a mismatch between the current local content and the reference page,
the reference page wins for this redesign.

## Information Architecture

### High-Level Structure

The two current blocks will be merged into one section under the existing
`Secretariat` anchor. The content should read as one organisation chart with a
clear top-to-bottom hierarchy.

Expected behavior:

1. One top-level secretariat chart section.
2. A top node for the highest executive role.
3. A visible split into downstream functional branches.
4. Cargo services roles shown as part of the same structure rather than as a
   disconnected second section.

### Chart Model

The merged section should use explicit levels, for example:

1. `Top level`
   The head/executive node shown first and centered.
2. `Functional level`
   Immediate reporting groups or department-level branches.
3. `Operational level`
   Staff or role cards under those branches.

The exact node names and grouping should be synced from the reference page during
implementation, but the rendered model must visually read as a single connected
organisation chart rather than stacked content buckets.

## Layout Design

### Desktop

Desktop should prioritize chart readability:

- Center the top executive card.
- Show branch groupings below it using chart connectors or grouped spacing.
- Keep cards aligned in rows by level where practical.
- Merge former secretariat and cargo-services content into the same visual flow.

### Tablet

- Keep the hierarchy visible, but allow branch groups to wrap earlier.
- Preserve the order and parent-child relationships.

### Mobile

- Collapse into a stacked hierarchy.
- Keep each parent branch followed immediately by its child cards.
- Prioritize readability over exact desktop alignment.

## Visual Design Rules

The redesign should reuse the current page's design language instead of copying
the legacy website styling.

Keep:

- existing section header treatment,
- current color tokens,
- existing badge styles and semantic color usage,
- current card surface style,
- current font families,
- current font-size rhythm where already established in the section,
- current link presentation for email/contact details.

Change:

- move from separate content groups to one chart-like hierarchy,
- add visible relationship cues between tiers,
- adjust spacing so level changes read clearly,
- use grouping containers only where they help explain structure.

## Content Presentation

Each role node should keep the same type of information pattern already used in
the page:

- badge or functional label,
- person name,
- role title,
- email or contact line when available in the reference.

Text styling should follow the same standards already visible in the existing
secretariat cards. The redesign must not invent a different typography treatment
for names, titles, or contact lines.

## Markup Strategy

The section should move from simple card groups to chart-aware markup with clear
tiers and branches.

Representative structure:

```html
<section id="secretariat" class="section secretariat-section">
  <div class="container">
    <div class="secretariat-chart">
      <div class="secretariat-tier secretariat-tier-top">
        <article class="sec-card">...</article>
      </div>
      <div class="secretariat-connector"></div>
      <div class="secretariat-tier secretariat-tier-branches">
        <section class="secretariat-branch">
          <header class="branch-label">...</header>
          <div class="branch-cards">...</div>
        </section>
      </div>
    </div>
  </div>
</section>
```

This keeps the hierarchy explicit and easier to maintain than a purely visual CSS
illusion over flat markup.

## Connector Strategy

The chart should use subtle relationship cues, not heavy diagram lines.

Acceptable implementations:

- slim vertical connectors between tiers,
- horizontal branch dividers for sibling groups,
- spacing and grouping that reinforce relationships even if some connectors are
  visually minimized.

The goal is clarity, not an overly technical org-chart drawing.

## Data Sync Rules

During implementation:

- replace incomplete local entries with reference-page content,
- add missing nodes required by the reference structure,
- remove local-only placeholders that do not exist in the source hierarchy,
- keep labels and naming consistent with the reference page.

If the reference page includes repeated shared contact emails across several
roles, that repetition should be preserved rather than artificially normalized.

## Error Handling And Edge Cases

- If a branch becomes too wide on desktop, wrap child cards within the branch
  before breaking the overall hierarchy.
- If role names or titles are long, prefer line wrapping and controlled card
  widths over abbreviating the source content.
- If a branch has only one child, keep it visually attached to its parent so it
  does not look like a separate section.
- If a role appears operationally related to cargo services, it should still sit
  inside the unified chart rather than being pushed back into a separate section.

## Testing Plan

Manual verification is sufficient for this redesign.

Checks:

1. The current separate secretariat and cargo-services sections are replaced by
   one continuous chart section.
2. The hierarchy is easier to read than the current grouped-card layout.
3. The content coverage matches the reference page more closely than the current
   local implementation.
4. Visual styling still matches the current page language for badges, fonts,
   spacing, and card appearance.
5. Desktop, tablet, and mobile layouts remain readable without horizontal
   overflow.

## Risks And Mitigations

- Risk: the reference site structure may not map one-to-one to the current local
  section grouping.
  Mitigation: use explicit tiers and branches instead of trying to preserve the
  old section split.

- Risk: too many visible connectors could make the chart feel noisy.
  Mitigation: keep connectors subtle and let spacing/grouping do most of the
  hierarchy work.

- Risk: syncing data from the reference page may require updating more nodes than
  the current local HTML contains.
  Mitigation: treat the reference page as the source of truth and keep changes
  localized to the secretariat area.

## Implementation Notes

- Prefer keeping all work inside `organization.html` unless content volume or
  maintainability strongly justifies extracting data later.
- Reuse current secretariat CSS hooks where practical instead of renaming
  everything.
- Keep the `#secretariat` anchor intact so existing navigation continues to work.
- Remove the standalone `SAAA Cargo Services Pte Ltd` section once its content is
  absorbed into the unified hierarchy.

## Acceptance Criteria

- `organization.html` shows one merged secretariat organisation chart instead of
  two disconnected sections.
- The chart structure and displayed roles follow the public SAAA reference page.
- The section keeps the current project's design language for labels, typography,
  spacing, badges, and card presentation.
- Users can understand the organisation structure more clearly at a glance.
- The layout remains stable and readable across desktop, tablet, and mobile
  widths.
