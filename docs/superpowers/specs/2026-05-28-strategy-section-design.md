# Design Spec: Strategy Section + TravelAI Analysis Redesign

**Date:** 2026-05-28  
**Status:** Approved  
**Approach:** A — Newspaper/Document Style (full site design system integration)

---

## Overview

Add a "Strategy" section to Mukul Dewangan's portfolio website. This section houses long-form product strategy analysis reports — deep competitive intelligence and PM critique documents. The first published analysis is `TravelAI_Analysis.html` (TravelAI Solutions Inc.).

Two parallel workstreams:
1. Create `strategy.html` — the hub/index page listing all strategy analyses
2. Redesign `TravelAI_Analysis.html` — translate the existing standalone document into the site's design system
3. Add "Strategy" nav link to all existing pages

---

## File Changes

| File | Action |
|---|---|
| `strategy.html` | Create new |
| `TravelAI_Analysis.html` | Full redesign (content unchanged) |
| `index.html` | Add "Strategy" to nav |
| `teardowns.html` | Add "Strategy" to nav |
| `ai-reports.html` | Add "Strategy" to nav |

---

## Nav

**Link text:** Strategy  
**Placement:** Work · Teardowns · AI Reports · **Strategy** · About · Resume · Contact  
**Active state:** `.active` class on the Strategy link when on `strategy.html`  
**All existing pages:** add `<li><a href="strategy.html">Strategy</a></li>` in correct position

---

## `strategy.html` — Hub Page

### Structure
Mirrors the pattern of `teardowns.html` and `ai-reports.html`.

### Head
- `<title>Product Strategy Analyses — Mukul Dewangan</title>`
- Meta description: "Product strategy analyses by Mukul Dewangan — deep competitive intelligence, PM critique, and mock strategy documents for AI and travel tech companies."
- Font imports: Cormorant + DM Sans (same as shared pages)
- `<link rel="stylesheet" href="shared.css">`

### Nav
`nav.nav-light` — same as index.html. "Strategy" link gets `.active` class.

### Hero
Two-column grid (`1fr 1fr`), `min-height: 60dvh`, `padding: 10rem 3rem 5rem`, `align-items: end`, `border-bottom: 1px solid var(--border)`.

**Left column:**
- Eyebrow: "Product Strategy" in `var(--teal)`, `0.68rem`, tracked uppercase
- Title: Cormorant, `clamp(3rem, 6vw, 5.5rem)`, weight 300. Text: "Strategy *Analyses.*" (em tag for italic "Analyses.")
- Ghost bg word: "ANALYSIS" — absolute positioned, right edge, large Cormorant italic, `color: transparent`, `-webkit-text-stroke: 1px rgba(13,12,9,0.05)`

**Right column:**
- Description paragraph: what the section is ("Long-form competitive intelligence and product strategy documents. Each analysis covers market landscape, product critique, technology stack, and a mock strategy recommendation.")
- Count stat block: italic Cormorant number (e.g., `1`) + small uppercase label "Analysis Published"
- Teal left-border accent on description (matches ai-reports.html pattern)

### Analyses List
Below hero, full-width, each analysis gets a `.analysis-row` entry.

**`.analysis-row` layout:** `display: grid; grid-template-columns: 3fr 1fr; gap: 0; border-bottom: 1px solid var(--border); padding: 3rem 3rem;`

**Left side:**
- Tags: small pill tags (industry · type) in `var(--teal)` color
- Title: Cormorant `clamp(1.6rem, 2.5vw, 2.2rem)` weight 300, company name italicised in muted
- Thesis excerpt: `0.88rem`, `var(--text-muted)`, italic, max 2 lines
- "Read Analysis →" link: `var(--teal)`, uppercase tracked, hover gap animation

**Right side:**
- Date: `0.70rem`, uppercase, `var(--text-light)`
- Company meta: HQ, status (small mono-style labels)

**TravelAI entry values:**
- Tags: Travel · AI · Product Strategy
- Title: "TravelAI: The *Agentic* Bet"
- Thesis: "Profitable, fast-growing, and sitting on an underutilized data asset. The question is whether its agentic vision ships before Google's does."
- Date: May 2026
- Link: `TravelAI_Analysis.html`

### Footer
Same as index.html: `© 2026 Mukul Dewangan` + `Product & AI Leadership`

---

## `TravelAI_Analysis.html` — Full Redesign

### Head Changes
- Add `<link rel="stylesheet" href="shared.css">` (before page-specific styles)
- Add Cormorant to the Google Fonts import: `family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400`
- Keep DM Sans and DM Mono imports
- Update `<title>` to: "TravelAI: The Agentic Bet — Product Strategy Analysis · Mukul Dewangan"

### Nav
`nav.nav-light` with:
- Left: `.nav-back` link → `← Strategy` pointing to `strategy.html`
- Right: `.nav-links` with full nav (Strategy active)

### Color Token Remapping

All `:root` custom properties replaced with site tokens:

| Old | New |
|---|---|
| `--paper: #f7f4ef` | `--bg: var(--bg)` — use `var(--bg)` throughout |
| `--ink: #0f0e0c` | Use `var(--text)` |
| `--muted: #6b6560` | Use `var(--text-muted)` |
| `--light: #e8e3da` | Use `var(--surface)` |
| `--border: #d4cfc6` | Use `var(--border)` |
| `--accent: #c84b2f` | Use `var(--accent)` (#C05A1A terracotta) |
| `--accent2: #2563a8` (blue) | Use `var(--teal)` (#1C5E5E) |
| `--green: #2a7a4b` | Use `var(--teal-light)` (#2A7A7A) |
| `--gold: #c9962e` | Keep as local `--gold: #c9962e` (no site equivalent) |
| `--red: #c84b2f` | Use `var(--accent)` |

The existing `:root` block in TravelAI_Analysis.html is replaced with a minimal one containing only `--gold: #c9962e` (no site-token equivalent). All other variables are removed; their usages are replaced with the corresponding site tokens directly.

### Typography

All `font-family: 'Playfair Display', serif` → `font-family: var(--font-display)` (Cormorant).

Cormorant weight/style equivalencies:
- Playfair 900 bold → Cormorant weight 500 (Cormorant's heaviest available)
- Playfair 700 → Cormorant weight 400
- Playfair 400 → Cormorant weight 300 italic for editorial feel

Body text: DM Sans unchanged. Monospace labels: DM Mono unchanged.

### Component-by-Component Changes

**Cover `.cover`:**
- `background: var(--bg-dark)` (already `--ink` which maps to near-black — no visual change needed, just token swap)
- `color: #F3EDE2` (unchanged — site's light text on dark)
- Cover tag: `color: var(--accent)`
- `h1 em`: `color: var(--accent)`
- `.cover::before` radial glow: update color to `var(--accent)` at 13% opacity

**Stats row `.stats-row`:**
- `border-bottom: 1px solid var(--border)`
- `.stat-box`: `border-right: 1px solid var(--border)`
- `.stat-num.accent`: `color: var(--accent)`
- `.stat-num.blue`: `color: var(--teal)`

**Section headers:**
- `.section-label` (the `§ 01` labels): `color: var(--accent)` (terracotta — keeps document character)
- `h2`, `h3`: `font-family: var(--font-display)`
- `h4`: `color: var(--text-muted)` (was `--muted`)

**Callout boxes `.callout`:**
- `background: var(--surface)` (warm off-white, not pure white)
- `border-left: 3px solid var(--accent)` (default)
- `.callout.blue`: `border-color: var(--teal)` + `strong { color: var(--teal) }`
- `.callout.gold`: `border-color: var(--gold)` + `strong { color: var(--gold) }`
- `.callout.green`: `border-color: var(--teal-light)` + `strong { color: var(--teal-light) }`

**Cards `.card`:**
- `background: var(--surface)`
- `border: 1px solid var(--border)`
- `border-radius: var(--r-md)` (8px)
- `h4`: `color: var(--text)`
- `p`: `color: var(--text-muted)`

**Competitor table `.comp-table`:**
- `th`: `background: var(--bg-dark)`, `color: #F3EDE2`
- `td`: `border-bottom: 1px solid var(--border)`
- `tr:hover td`: `background: var(--bg-alt)` (#EDE6D8)
- Tags: `.tag.red` → accent colors, `.tag.blue` → teal colors, `.tag.green` → teal-light colors

**SWOT `.swot`:**
- Outer border: `var(--border)`, `border-radius: var(--r-md)`
- Strengths box: `background: color-mix(in oklch, var(--teal) 8%, var(--bg))` or `#e8efef`
- Weaknesses box: `background: color-mix(in oklch, var(--accent) 8%, var(--bg))` or `#f5ece7`
- Opportunities box: `background: color-mix(in oklch, var(--teal) 5%, var(--bg-alt))` or `#e8eeed`
- Threats box: `background: color-mix(in oklch, var(--gold) 10%, var(--bg))` or `#f2ede0`
- SWOT labels: match respective box accent colors

**Timeline `.timeline`:**
- Vertical line: `background: var(--border)`
- `.tl-dot`: `background: var(--accent)`, `border-color: var(--bg)`
- `.tl-year`: `color: var(--accent)`

**Tech stack `.tech-layer`:**
- `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--r-md)`
- `.tech-layer-label`: `color: var(--text-muted)`

**PM critique `.critique-item`:**
- `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--r-md)`
- `.critique-badge.risk`: `color: var(--accent)`
- `.critique-badge.opp`: `color: var(--teal-light)`
- `.critique-badge.gap`: `color: var(--gold)`

**Strategy doc `.strat-section`:**
- `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--r-md)` (10px)
- `.strat-header .num`: `color: var(--border)` (ghost large Cormorant number)

**Initiative table headers:**
- `font-family: 'DM Mono', monospace` — unchanged

**OKR items `.okr-item`:**
- `border-bottom: 1px solid var(--surface)` → `var(--border)`

**Brand pills `.brand-pill`:**
- `background: var(--surface)`, `border: 1px solid var(--border)`
- `.brand-pill.flagship`: `border-color: var(--accent)`, `color: var(--accent)`, `background: color-mix(in oklch, var(--accent) 8%, var(--bg))`

**HR `.fancy`:**
- `background: linear-gradient(90deg, var(--accent), var(--border), transparent)`

**Body background:**
- `body { background: var(--bg); color: var(--text); }`

### Container
`.container { max-width: 960px; margin: 0 auto; padding: 0 40px; }` — unchanged, appropriate for long-form reading.

### Footer
Add site footer before `</body>`:
```html
<footer>
  <span>© 2026 Mukul Dewangan</span>
  <span>Product & AI Leadership</span>
</footer>
```
With matching footer styles from index.html.

---

## Scalability Notes

This design sets a repeatable template for future analyses:
- New analyses follow the same `TravelAI_Analysis.html` structure (cover → stats → sections → conclusion)
- Each new analysis gets an entry row added to `strategy.html`
- The `strategy.html` count stat updates manually with each new publish
- No JSON data file needed at this stage (can be added later if volume grows)
