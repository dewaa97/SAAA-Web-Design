# Council Organisation Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `Council Organisation Chart` section in `organization.html` so the council layout matches the reference image and each portrait shows the member's face clearly inside the circular frame.

**Architecture:** Keep the change localized to `organization.html` by replacing the existing council card layout with a manually grouped chart layout, then tune portrait framing with per-member CSS overrides. Leave `Secretariat` and the rest of the page unchanged, using responsive CSS fallbacks instead of adding JavaScript or replacing the chart with a single flattened image.

**Tech Stack:** Static HTML, inline CSS, existing JPG portrait assets, optional local HTTP preview via Python

---

## File Map

- Modify: `organization.html`
  - Replace the council layout CSS that currently styles `.org-grid`, `.org-row`, `.org-card`, and `.photo`
  - Replace the council section markup under `<section id="council" class="section">`
  - Add per-member portrait framing overrides and responsive rules
- Reference only: `SAAA Organization Chart.jpg`
  - Use as the visual source for row grouping, text hierarchy, and spacing
- No other files should be modified unless one portrait proves impossible to frame with CSS alone

### Task 1: Rebuild The Council Markup

**Files:**
- Modify: `organization.html`

- [ ] **Step 1: Replace the existing council member markup with a fixed-row chart structure**

Replace the content inside the existing council section with the following council chart markup. Keep the section header text that already exists above this block.

```html
<div class="council-chart">
    <div class="council-row council-row-top">
        <article class="council-member member-gabriel-lam">
            <div class="member-photo-frame">
                <img src="images/members/gabriel_lam.jpg" alt="Gabriel Lam" class="member-photo">
            </div>
            <div class="member-name">Gabriel Lam</div>
            <div class="member-role">Chairman</div>
            <div class="member-company">Shalom International Movers Pte Ltd</div>
        </article>
        <article class="council-member member-paul-teo">
            <div class="member-photo-frame">
                <img src="images/members/paul_teo.jpg" alt="Paul Teo" class="member-photo">
            </div>
            <div class="member-name">Paul Teo</div>
            <div class="member-role">First Deputy Chairman</div>
            <div class="member-company">Speedmark Transportation Pte Ltd</div>
        </article>
        <article class="council-member member-benjamin-ong">
            <div class="member-photo-frame">
                <img src="images/members/benjamin_ong.jpg" alt="Benjamin Ong" class="member-photo">
            </div>
            <div class="member-name">Benjamin Ong</div>
            <div class="member-role">Second Deputy Chairman</div>
            <div class="member-company">Alliance 21 Pte Ltd</div>
        </article>
    </div>

    <div class="council-row">
        <article class="council-member member-steven-lee">
            <div class="member-photo-frame">
                <img src="images/members/steven_lee.jpg" alt="Steven Lee" class="member-photo">
            </div>
            <div class="member-name">Steven Lee</div>
            <div class="member-role">Immediate Past Chairman</div>
            <div class="member-company">Cargo Community Network Pte Ltd</div>
        </article>
        <article class="council-member member-ken-chua">
            <div class="member-photo-frame">
                <img src="images/members/ken_chua.jpg" alt="Ken Chua" class="member-photo">
            </div>
            <div class="member-name">Ken Chua</div>
            <div class="member-role">Honorary Treasurer</div>
            <div class="member-company">UT-WAYS Freight Services Pte Ltd</div>
        </article>
        <article class="council-member member-jimmy-ler">
            <div class="member-photo-frame">
                <img src="images/members/jimmy_ler.jpg" alt="Jimmy Ler" class="member-photo">
            </div>
            <div class="member-name">Jimmy Ler</div>
            <div class="member-role">Honorary Secretary</div>
            <div class="member-company">Logwin Air + Ocean Transportation Pte Ltd</div>
        </article>
    </div>

    <div class="council-row council-row-four">
        <article class="council-member member-ramadas-naidu">
            <div class="member-photo-frame">
                <img src="images/members/ramadas_naidu.jpg" alt="Ramadas Naidu" class="member-photo">
            </div>
            <div class="member-name">Ramadas Naidu</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Raffles Fulfillment Pte Ltd</div>
        </article>
        <article class="council-member member-daniel-chng">
            <div class="member-photo-frame">
                <img src="images/members/daniel_chng.jpg" alt="Daniel Chng" class="member-photo">
            </div>
            <div class="member-name">Daniel Chng</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Airtropolis Express (S) Pte Ltd</div>
        </article>
        <article class="council-member member-chorina-khoo">
            <div class="member-photo-frame">
                <img src="images/members/chorina_khoo.jpg" alt="Chorina Khoo" class="member-photo">
            </div>
            <div class="member-name">Chorina Khoo</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Rohlig Singapore Pte Ltd</div>
        </article>
        <article class="council-member member-tan-liang-jian">
            <div class="member-photo-frame">
                <img src="images/members/tan_liang_jian.jpg" alt="Tan Liang Jian" class="member-photo">
            </div>
            <div class="member-name">Tan Liang Jian</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Union Air Freight (Singapore) Pte Ltd</div>
        </article>
    </div>

    <div class="council-row council-row-five">
        <article class="council-member member-roger-chew">
            <div class="member-photo-frame">
                <img src="images/members/roger_chew.jpg" alt="Roger Chew" class="member-photo">
            </div>
            <div class="member-name">Roger Chew</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">SFS Global Logistics Pte Ltd</div>
        </article>
        <article class="council-member member-andrea-bettoni">
            <div class="member-photo-frame">
                <img src="images/members/andrea_bettoni.jpg" alt="Andrea Bettoni" class="member-photo">
            </div>
            <div class="member-name">Andrea Bettoni</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Skyquick International Pte Ltd</div>
        </article>
        <article class="council-member member-lim-zhiwei">
            <div class="member-photo-frame">
                <img src="images/members/lim_zhiwei.jpg" alt="Lim Zhiwei" class="member-photo">
            </div>
            <div class="member-name">Lim Zhiwei</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Apex Logistics International (S) Pte Ltd</div>
        </article>
        <article class="council-member member-kitty-teo">
            <div class="member-photo-frame">
                <img src="images/members/kitty_teo.jpg" alt="Ms Kitty Teo" class="member-photo">
            </div>
            <div class="member-name">Ms Kitty Teo</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Dachser (Singapore) Pte Ltd</div>
        </article>
        <article class="council-member member-eric-tan">
            <div class="member-photo-frame">
                <img src="images/members/eric_tan.jpg" alt="Eric Tan" class="member-photo">
            </div>
            <div class="member-name">Eric Tan</div>
            <div class="member-role">Council Member</div>
            <div class="member-company">Federal Express (S) Pte Ltd</div>
        </article>
    </div>

    <div class="council-row council-row-bottom">
        <article class="council-member member-richard-chua">
            <div class="member-photo-frame">
                <img src="images/members/richard_chua.jpg" alt="Richard Chua" class="member-photo">
            </div>
            <div class="member-name">Richard Chua</div>
            <div class="member-role">Honorary Executive</div>
            <div class="member-company">SAAA@Singapore</div>
        </article>
        <article class="council-member member-michael-yew">
            <div class="member-photo-frame">
                <img src="images/members/honorary_executive2.jpg" alt="Michael Yew" class="member-photo">
            </div>
            <div class="member-name">Michael Yew</div>
            <div class="member-role">Honorary Executive</div>
            <div class="member-company">SAAA@Singapore</div>
        </article>
    </div>
</div>
```

- [ ] **Step 2: Remove the old council card-only elements from the section**

Delete the old council-only fragments below because they no longer fit the reference layout:

```html
<div class="org-grid">
    <div class="org-row">
        <div class="org-card">
            ...
        </div>
    </div>
</div>
```

Expected result: the council section keeps its heading and description, but its member content now uses `.council-chart`, `.council-row`, and `.council-member`.

- [ ] **Step 3: Preview the page after the markup swap**

Run:

```bash
python3 -m http.server 4173
```

Expected: a local server starts without errors and serves `http://localhost:4173/organization.html`.

- [ ] **Step 4: Verify the council row grouping before styling**

Open `http://localhost:4173/organization.html` and confirm:

- the council section now renders 5 distinct rows
- the grouping is `3-3-4-5-2`
- all 17 members appear in the correct order
- the last honorary executive is labeled `Michael Yew`

- [ ] **Step 5: Commit the markup rewrite**

Run:

```bash
git add organization.html
git commit -m "refactor: rebuild council organisation chart markup"
```

### Task 2: Replace Card Styling With Chart Styling

**Files:**
- Modify: `organization.html`

- [ ] **Step 1: Replace the council card CSS with chart-oriented selectors**

Remove or stop using the current council-only selectors:

```css
.org-grid { display: flex; flex-direction: column; align-items: center; gap: 32px; }
.org-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
.org-card { background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 24px; text-align: center; transition: all 0.3s; flex: 0 1 260px; min-width: 200px; }
.org-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.06); border-color: var(--red-200); transform: translateY(-4px); }
.org-card .photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; margin: 0 auto 12px; display: block; border: 3px solid var(--slate-100); }
.org-card .role-badge { display: inline-block; padding: 4px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 100px; margin-bottom: 12px; }
.org-card .name { font-family: Space Grotesk, sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--slate-900); margin-bottom: 4px; }
.org-card .org { font-size: 13px; color: var(--slate-500); line-height: 1.4; }
```

Add this replacement block near the council section styles:

```css
.council-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
}

.council-row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
}

.council-row-top,
.council-row-bottom {
    max-width: 760px;
}

.council-row-four {
    max-width: 920px;
}

.council-row-five {
    max-width: 1120px;
}

.council-member {
    width: 170px;
    text-align: center;
}

.member-photo-frame {
    width: 124px;
    height: 124px;
    margin: 0 auto 10px;
    border-radius: 50%;
    background: #d9d9d9;
    overflow: hidden;
}

.member-photo {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center 22%;
}

.member-name {
    font-family: Inter, system-ui, sans-serif;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.05;
    color: #1f1f1f;
    margin-bottom: 2px;
}

.member-role {
    font-size: 17px;
    font-style: italic;
    font-weight: 500;
    line-height: 1.1;
    color: #2f2f2f;
    margin-bottom: 2px;
}

.member-company {
    font-size: 15px;
    line-height: 1.15;
    color: #232323;
}
```

- [ ] **Step 2: Add row-specific spacing adjustments so the chart reads like the reference**

Append these spacing refinements under the same council CSS block:

```css
.council-row-top { gap: 54px; }
.council-row { gap: 44px; }
.council-row-four { gap: 34px; }
.council-row-five { gap: 24px; }
.council-row-bottom { gap: 72px; }

.council-row-top .council-member,
.council-row-bottom .council-member {
    width: 180px;
}
```

Expected result: the chart looks visually flatter, loses borders and badges, and uses a portrait-and-text stack closer to `SAAA Organization Chart.jpg`.

- [ ] **Step 3: Refresh the preview and compare against the reference image**

With the local server still running, reload `http://localhost:4173/organization.html` and compare it side-by-side with `SAAA Organization Chart.jpg`.

Confirm:

- no council item uses bordered cards, shadows, or hover movement
- the council rows visually read as a chart instead of cards
- the top and bottom rows stay narrower than the middle rows

- [ ] **Step 4: Commit the council styling pass**

Run:

```bash
git add organization.html
git commit -m "style: match council organisation chart layout"
```

### Task 3: Tune Portrait Framing Per Member

**Files:**
- Modify: `organization.html`

- [ ] **Step 1: Add explicit `object-position` overrides for each member portrait**

Append this block under `.member-photo` so portrait framing is tuned member by member:

```css
.member-gabriel-lam .member-photo { object-position: center 18%; }
.member-paul-teo .member-photo { object-position: center 16%; }
.member-benjamin-ong .member-photo { object-position: center 17%; }
.member-steven-lee .member-photo { object-position: center 19%; }
.member-ken-chua .member-photo { object-position: center 18%; }
.member-jimmy-ler .member-photo { object-position: center 18%; }
.member-ramadas-naidu .member-photo { object-position: center 16%; }
.member-daniel-chng .member-photo { object-position: center 15%; }
.member-chorina-khoo .member-photo { object-position: center 14%; }
.member-tan-liang-jian .member-photo { object-position: center 16%; }
.member-roger-chew .member-photo { object-position: center 18%; }
.member-andrea-bettoni .member-photo { object-position: center 14%; }
.member-lim-zhiwei .member-photo { object-position: center 18%; }
.member-kitty-teo .member-photo { object-position: center 15%; }
.member-eric-tan .member-photo { object-position: center 18%; }
.member-richard-chua .member-photo { object-position: center 17%; }
.member-michael-yew .member-photo { object-position: center 16%; }
```

- [ ] **Step 2: Verify all faces are visible in the circular frame**

Reload the page and inspect each portrait against the reference. Adjust only the outliers after the first pass.

If one or more members still crop badly, use this exact pattern to fine-tune:

```css
.member-andrea-bettoni .member-photo { object-position: 52% 12%; }
.member-kitty-teo .member-photo { object-position: 48% 13%; }
```

Success condition: the face is the visual focal point for every portrait, not the arms, torso, or suit sleeve.

- [ ] **Step 3: Update accessibility text for the final honorary executive entry**

Confirm the second honorary executive image uses the matching alt text and name:

```html
<img src="images/members/honorary_executive2.jpg" alt="Michael Yew" class="member-photo">
<div class="member-name">Michael Yew</div>
```

Expected result: the bottom row matches the reference more closely and no longer contains an empty alt or placeholder name.

- [ ] **Step 4: Commit the portrait framing adjustments**

Run:

```bash
git add organization.html
git commit -m "fix: tune council portrait framing"
```

### Task 4: Add Responsive Fallbacks And Final Checks

**Files:**
- Modify: `organization.html`

- [ ] **Step 1: Add tablet and mobile rules for the new chart layout**

Inside the existing media queries, add these responsive overrides:

```css
@media (max-width: 1024px) {
    .council-row,
    .council-row-top,
    .council-row-four,
    .council-row-five,
    .council-row-bottom {
        max-width: 100%;
        flex-wrap: wrap;
        gap: 28px;
    }

    .council-member {
        width: 160px;
    }
}

@media (max-width: 768px) {
    .council-chart {
        gap: 20px;
    }

    .council-row,
    .council-row-top,
    .council-row-four,
    .council-row-five,
    .council-row-bottom {
        gap: 20px;
    }

    .council-member {
        width: calc(50% - 12px);
        max-width: 170px;
    }

    .member-photo-frame {
        width: 108px;
        height: 108px;
    }

    .member-name {
        font-size: 18px;
    }

    .member-role {
        font-size: 14px;
    }

    .member-company {
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .council-member {
        width: 100%;
        max-width: 220px;
    }
}
```

- [ ] **Step 2: Run diagnostics after the final HTML and CSS edits**

Use the IDE diagnostics check for:

```text
file:///Users/dewaa97/Documents/FlyingCape/Projects/SAAA/organization.html
```

Expected: no new syntax errors in the edited file.

- [ ] **Step 3: Perform final manual verification**

Check the page in three viewport states:

- desktop: row grouping matches `3-3-4-5-2`
- tablet: members wrap cleanly without horizontal overflow
- mobile: portraits and text stay readable with preserved order

Also confirm:

- `Secretariat` section is unchanged
- no council member disappeared
- no role badge or card border remains in the council chart

- [ ] **Step 4: Capture the final state in git**

Run:

```bash
git add organization.html
git commit -m "feat: finalize council organisation chart redesign"
```

## Self-Review Checklist

- Spec coverage: row grouping, flatter styling, per-member photo framing, responsive fallback, and unchanged `Secretariat` are all covered by Tasks 1 through 4.
- Placeholder scan: no `TODO`, `TBD`, or vague "handle appropriately" language remains in the execution steps.
- Consistency: all CSS class names, member names, and commit boundaries are consistent across tasks.
