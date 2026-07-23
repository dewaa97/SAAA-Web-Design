# Council Organisation Chart Design

## Summary

This spec defines a low-risk redesign of the `Council Organisation Chart` section in
`organization.html` so that the council member layout matches the supplied
reference image more closely.

The redesign only applies to the council chart section. The `Secretariat` section
and other page sections remain unchanged.

## Goals

- Match the desktop council chart arrangement to the reference layout as closely as
  practical using HTML and CSS, not a flattened image.
- Improve portrait framing so each person's face is visible within the circular
  photo area.
- Keep names, roles, and companies editable as text content.
- Preserve a responsive fallback for tablet and mobile screens.
- Avoid changes to unrelated sections or files unless required for this chart.

## Non-Goals

- Redesigning the `Secretariat` section.
- Replacing the council chart with a single static image.
- Performing a broad visual refactor of the page hero, footer, or navigation.
- Building a reusable data-driven component system for all future organisation
  charts.

## Current State

The current implementation in `organization.html` renders the council members as
modern cards with borders, role badges, shadows, and hover effects. This differs
from the supplied reference, which is a flatter organisation chart with simple
typography and fixed row groupings.

The current image treatment also uses a small circular crop with:

```css
object-fit: cover;
width: 90px;
height: 90px;
```

This causes several source portraits to center poorly, so some faces are partially
hidden while hands, jackets, or arms dominate the crop.

## Chosen Approach

Use a manually structured council chart with explicit row groupings and per-person
photo alignment controls.

Why this approach:

- It best matches the requested visual target.
- It keeps content editable and accessible.
- It avoids the responsiveness and maintenance problems of a single baked image.
- It limits scope to one section and does not require touching the original image
  files unless CSS tuning proves insufficient for specific portraits.

## Layout Design

### Desktop Structure

The council chart will be rendered in five fixed rows matching the reference:

1. Row 1: 3 people
2. Row 2: 3 people
3. Row 3: 4 people
4. Row 4: 5 people
5. Row 5: 2 people

The order will follow the existing content order already present in
`organization.html`:

1. Gabriel Lam
2. Paul Teo
3. Benjamin Ong
4. Steven Lee
5. Ken Chua
6. Jimmy Ler
7. Ramadas Naidu
8. Daniel Chng
9. Chorina Khoo
10. Tan Liang Jian
11. Roger Chew
12. Andrea Bettoni
13. Lim Zhiwei
14. Ms Kitty Teo
15. Eric Tan
16. Richard Chua
17. Michael Yew

### Visual Styling

The chart styling will shift from card-based UI to a flatter presentation:

- Remove card borders, shadows, and hover lift behavior.
- Use center-aligned chart items with tighter vertical spacing.
- Keep the neutral grey circular photo background seen in the reference.
- Reduce decorative UI chrome such as colored role badges.
- Present name, title, and company as stacked text under each portrait.

Typography intent:

- Name: strongest weight in the stack.
- Role: secondary line, italic or lighter emphasis to resemble the reference.
- Company: smallest line, still readable on desktop.

## Markup Design

The council section markup will be simplified to a chart-like structure:

- One wrapper for the council chart.
- One row container per fixed row.
- One member item per person.
- One circular photo wrapper around the image.
- Separate text nodes for `name`, `role`, and `company`.

Representative structure:

```html
<div class="council-chart">
  <div class="council-row council-row-3">
    <article class="council-member member-gabriel-lam">
      <div class="member-photo-frame">
        <img src="images/members/gabriel_lam.jpg" alt="Gabriel Lam" class="member-photo">
      </div>
      <div class="member-name">Gabriel Lam</div>
      <div class="member-role">Chairman</div>
      <div class="member-company">Shalom International Movers Pte Ltd</div>
    </article>
  </div>
</div>
```

This keeps the layout explicit and easy to tune visually.

## Photo Framing Strategy

### Default Rule

Use a larger circular frame than the current 90 by 90 crop so faces have more room.
The image will still use `object-fit: cover`, but the visible framing will be
controlled with `object-position`.

### Per-Person Overrides

Each member can receive a custom class or inline style to tune horizontal and
vertical framing. Example:

```css
.member-gabriel-lam .member-photo { object-position: center 22%; }
.member-paul-teo .member-photo { object-position: center 18%; }
```

This provides low-risk manual correction without editing the source image files.

### Escalation Rule

If a specific portrait still cannot be framed correctly with CSS alone, that member
may get a dedicated cropped asset. This is a fallback only for outliers, not the
default workflow.

## Responsive Behavior

### Desktop

- Preserve the fixed visual row groupings to mirror the reference image closely.
- Maintain centered alignment and balanced horizontal spacing across each row.

### Tablet

- Allow rows to wrap more naturally if the viewport becomes too narrow.
- Keep the original ordering of members unchanged.

### Mobile

- Convert to a simpler stacked or two-column layout as needed for readability.
- Prioritize legibility and photo clarity over pixel-perfect replication of the
  desktop chart.

## Content Rules

- Keep all current council member names, roles, and companies in HTML text.
- Replace the placeholder honorary executive entry with the correct text content if
  the current source already contains confirmed final details.
- If the second honorary executive name is still not confirmed in the source, keep
  the existing content unchanged for this pass.

## Error Handling And Edge Cases

- If one portrait is too zoomed or vertically biased, adjust that person's
  `object-position` before considering asset edits.
- If long company names wrap awkwardly, tune width and line-height without changing
  member order.
- If the fixed row layout produces uneven spacing on smaller desktop widths, use
  row-specific gaps or max widths before changing the row structure.

## Testing Plan

Manual verification is sufficient for this change.

Checks:

1. Desktop council chart visually matches the supplied reference in row grouping and
   overall spacing.
2. Every member photo shows the person's face clearly inside the circular frame.
3. Text remains readable and centered under each member.
4. Tablet and mobile layouts do not overflow horizontally.
5. `Secretariat` and other unrelated sections remain visually unchanged.

## Risks And Mitigations

- Risk: portrait sources have inconsistent framing.
  Mitigation: use per-member `object-position` overrides.

- Risk: exact reference spacing may need iterative tuning.
  Mitigation: keep rows explicit so spacing can be adjusted without changing data
  order.

- Risk: responsive layout may diverge from the reference.
  Mitigation: prioritize desktop fidelity and mobile readability separately.

## Implementation Notes

- Prefer editing only `organization.html` unless dedicated portrait crops become
  necessary.
- Keep changes localized to the council section styles and markup.
- Preserve existing asset paths wherever possible.

## Acceptance Criteria

- The `Council Organisation Chart` section no longer appears as bordered cards.
- The council member layout follows the same row grouping as the provided reference.
- Portrait framing shows faces correctly for all visible members.
- The section remains readable and stable across desktop, tablet, and mobile widths.
- No unrelated section receives visual or structural regressions.
