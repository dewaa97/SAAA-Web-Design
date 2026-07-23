# Members Point 4 Design

## Summary

This spec covers `Point 4` from `SAAA Website Update.pdf` for the `Members`
section on the main page.

The requested change is to replace the parked `Register Now` intent in the
`Members` segment with two visible calls-to-action:

- `Membership Sign-up`
- `SAAA Members Listing`

These buttons should be added to the existing `Members` section in `index.html`
without changing the overall section structure or creating the future target
pages yet.

## Goals

- Add two clear CTA buttons to the existing `Members` section.
- Match the labels requested in the PDF feedback.
- Reuse the current project's button styling system.
- Keep the implementation low-risk and easy to update later when the real target
  pages exist.

## Non-Goals

- Building the future `Membership Sign-up` page.
- Building the future `SAAA Members Listing` page.
- Redesigning the statistics cards or member marquee.
- Implementing `Point 5` or later points in this pass.

## Current State

The current `Members` section in `index.html` contains:

- a section tag,
- a title and description,
- three member statistics cards,
- no direct CTA buttons inside the section body.

This means the current section does not yet reflect the PDF request to expose
two membership-related actions in the `Members` segment.

## Chosen Approach

Add a small CTA row directly beneath the member statistics cards.

Why this approach:

- It is the lowest-risk way to satisfy the request.
- It keeps the actions visually tied to the `Members` section.
- It avoids disturbing the member statistics and the logo marquee below.
- It makes the later URL swap trivial because only the `href` values need to be
  updated.

## Layout Design

### Desktop

- Render the two buttons side by side.
- Keep them centered beneath the member stats.
- Use a small gap between the buttons.

### Mobile

- Stack the buttons vertically.
- Keep both buttons full-width or near full-width inside a centered wrapper.

## Visual Design Rules

Use the existing button language already present in the project:

- `Membership Sign-up` uses the primary button treatment.
- `SAAA Members Listing` uses the secondary button treatment.
- No new button component or styling system should be introduced.

Spacing should feel native to the page and should not push the member marquee
too far down.

## Link Behavior

The final destination pages do not exist yet.

For this pass:

- both buttons should be rendered with temporary placeholder links,
- the markup should make it easy to replace the placeholders later,
- there should be no attempt to build or route to unfinished pages.

Preferred placeholder behavior:

```html
href="#"
```

This preserves the visible CTA design while waiting for final URLs.

## Markup Strategy

Add a dedicated wrapper under the current `members-grid`.

Representative structure:

```html
<div class="members-grid">
  ...
</div>

<div class="members-cta">
  <a href="#" class="btn btn-primary">Membership Sign-up</a>
  <a href="#" class="btn btn-secondary">SAAA Members Listing</a>
</div>
```

## Responsive Rules

- On desktop, keep the CTA row horizontal and centered.
- On smaller screens, allow the CTA wrapper to stack.
- Maintain comfortable spacing from the stats above and the marquee section
  below.

## Testing Plan

Manual verification is sufficient.

Checks:

1. The `Members` section shows two buttons with the requested labels.
2. The buttons appear below the member statistics.
3. The primary and secondary button styles match the existing project style.
4. The layout remains clean on desktop and mobile widths.
5. No other sections are visually affected.

## Risks And Mitigations

- Risk: the CTA row could crowd the section.
  Mitigation: keep spacing modest and centered.

- Risk: placeholder links could be mistaken for final routing.
  Mitigation: keep implementation isolated and easy to update later.

- Risk: button width could look awkward on mobile.
  Mitigation: stack buttons vertically below the tablet breakpoint.

## Implementation Notes

- Keep changes localized to `index.html`.
- Reuse existing `.btn`, `.btn-primary`, and `.btn-secondary` classes.
- Add only minimal section-specific CSS if spacing or responsive stacking is
  needed.

## Acceptance Criteria

- The `Members` section includes:
  - `Membership Sign-up`
  - `SAAA Members Listing`
- The buttons appear visually as part of the `Members` segment.
- The implementation uses existing button styles.
- Both links are temporary placeholders for now.
