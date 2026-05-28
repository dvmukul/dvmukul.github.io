# Strategy Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Strategy" section to the portfolio — a hub page (`strategy.html`) listing product strategy analyses, plus a full redesign of the existing `TravelAI_Analysis.html` to match the site's design system (Cormorant font, site color tokens, shared nav/footer).

**Architecture:** `strategy.html` is a new index page mirroring the teardowns/ai-reports hub pattern. `TravelAI_Analysis.html` gets its entire `<style>` block replaced with site-token-aligned CSS, gains shared.css, a site nav, and a site footer. All existing pages get the "Strategy" nav link added.

**Tech Stack:** HTML5, CSS custom properties, Google Fonts (Cormorant + DM Sans + DM Mono), shared.css

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `strategy.html` | **Create** | Hub/index page for all strategy analyses |
| `TravelAI_Analysis.html` | **Modify** | Full design system integration |
| `index.html` | **Modify** | Add "Strategy" nav link |
| `teardowns.html` | **Modify** | Add "Strategy" nav link |
| `ai-reports.html` | **Modify** | Add "Strategy" nav link |

---

## Task 1: Add "Strategy" nav link to existing pages

**Files:**
- Modify: `index.html`
- Modify: `teardowns.html`
- Modify: `ai-reports.html`

- [ ] **Step 1: Update index.html nav**

Find the `<ul class="nav-links">` block in `index.html` (around line 544). Add the Strategy link after AI Reports:

```html
<ul class="nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="teardowns.html">Teardowns</a></li>
    <li><a href="ai-reports.html">AI Reports</a></li>
    <li><a href="strategy.html">Strategy</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#resume">Resume</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>
```

- [ ] **Step 2: Update teardowns.html nav**

Find the `<ul class="nav-links">` block in `teardowns.html`. Add the same Strategy link in the same position (after AI Reports, before About). The exact surrounding HTML will look like:

```html
<li><a href="ai-reports.html">AI Reports</a></li>
<li><a href="strategy.html">Strategy</a></li>
<li><a href="index.html#about">About</a></li>
```

- [ ] **Step 3: Update ai-reports.html nav**

Same change in `ai-reports.html`. Add after AI Reports (which may be marked `.active` on this page):

```html
<li><a href="ai-reports.html" class="active">AI Reports</a></li>
<li><a href="strategy.html">Strategy</a></li>
<li><a href="index.html#about">About</a></li>
```

- [ ] **Step 4: Open index.html in browser and confirm**

Open `index.html` in a browser. The nav should now show: Work · Teardowns · AI Reports · Strategy · About · Resume · Contact. "Strategy" should be a working link (it 404s until Task 2 — that's expected).

- [ ] **Step 5: Commit**

```bash
git add index.html teardowns.html ai-reports.html
git commit -m "Add Strategy nav link to existing pages"
```

---

## Task 2: Create strategy.html

**Files:**
- Create: `strategy.html`

- [ ] **Step 1: Create the file with the complete HTML**

Create `strategy.html` with this complete content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Product strategy analyses by Mukul Dewangan — deep competitive intelligence, PM critique, and mock strategy documents for AI and travel tech companies.">
    <title>Product Strategy Analyses — Mukul Dewangan</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="shared.css">

    <style>
        body { background: var(--bg); color: var(--text); }

        /* HERO */
        .hero {
            min-height: 60dvh;
            padding: 10rem 3rem 5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: end;
            border-bottom: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }
        .hero-bg-word {
            position: absolute;
            right: -2rem;
            top: 50%;
            transform: translateY(-50%);
            font-family: var(--font-display);
            font-size: clamp(7rem, 14vw, 14rem);
            font-weight: 300;
            font-style: italic;
            color: transparent;
            -webkit-text-stroke: 1px rgba(13,12,9,0.05);
            user-select: none;
            line-height: 1;
            white-space: nowrap;
            pointer-events: none;
        }
        .hero-eyebrow {
            font-size: 0.68rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--teal);
            font-weight: 500;
            margin-bottom: 1.5rem;
        }
        .hero-title {
            font-family: var(--font-display);
            font-size: clamp(3rem, 6vw, 5.5rem);
            font-weight: 300;
            line-height: 1.0;
            letter-spacing: -0.02em;
        }
        .hero-title em { font-style: italic; color: var(--text-muted); }
        .hero-desc {
            font-size: 1rem;
            color: var(--text-muted);
            line-height: 1.75;
            max-width: 40ch;
            border-left: 2px solid var(--teal);
            padding-left: 1.5rem;
        }
        .hero-stat-block { margin-top: 3rem; }
        .hero-count {
            font-family: var(--font-display);
            font-size: clamp(4rem, 7vw, 6rem);
            font-weight: 300;
            font-style: italic;
            line-height: 1;
            color: var(--text);
        }
        .hero-count-label {
            font-size: 0.70rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--text-light);
            margin-top: 0.35rem;
        }

        /* ANALYSES LIST */
        .analyses-section { padding: 0 3rem; }
        .analyses-list { display: flex; flex-direction: column; }

        .analysis-row {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 2rem;
            padding: 3.5rem 0;
            border-bottom: 1px solid var(--border);
            text-decoration: none;
            color: inherit;
            transition: background 0.2s;
            position: relative;
        }
        .analysis-row:first-child { border-top: 1px solid var(--border); }
        .analysis-row:hover { background: rgba(13,12,9,0.015); }
        .analysis-row:hover .analysis-arrow { transform: translateX(5px); }

        .analysis-left {}
        .analysis-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 0.85rem;
        }
        .analysis-tag {
            font-size: 0.62rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--teal);
            font-weight: 500;
        }
        .analysis-tag + .analysis-tag::before {
            content: '·';
            margin-right: 0.5rem;
            color: var(--text-light);
        }
        .analysis-title {
            font-family: var(--font-display);
            font-size: clamp(1.6rem, 2.5vw, 2.2rem);
            font-weight: 300;
            line-height: 1.15;
            margin-bottom: 0.85rem;
        }
        .analysis-title em { font-style: italic; color: var(--text-muted); }
        .analysis-thesis {
            font-size: 0.88rem;
            color: var(--text-muted);
            line-height: 1.65;
            max-width: 56ch;
            font-style: italic;
            margin-bottom: 1.25rem;
        }
        .analysis-read {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--teal);
            transition: gap 0.2s;
        }
        .analysis-row:hover .analysis-read { gap: 1rem; }

        .analysis-right {
            text-align: right;
            padding-top: 0.25rem;
            min-width: 120px;
        }
        .analysis-date {
            font-size: 0.70rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--text-light);
            margin-bottom: 0.75rem;
        }
        .analysis-meta {
            font-size: 0.72rem;
            color: var(--text-light);
            line-height: 1.7;
        }
        .analysis-arrow {
            display: block;
            font-size: 1.1rem;
            color: var(--text-light);
            margin-top: 1rem;
            transition: transform 0.2s;
        }

        /* FOOTER */
        footer {
            background: var(--bg-dark);
            color: rgba(243,237,226,0.28);
            padding: 2rem 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6rem;
        }
        footer span { font-size: 0.72rem; letter-spacing: 0.05em; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
            .hero { grid-template-columns: 1fr; gap: 3rem; padding: 8rem 2rem 4rem; }
            .hero-bg-word { display: none; }
            .analyses-section { padding: 0 2rem; }
        }
        @media (max-width: 640px) {
            .hero { padding: 7rem 1.5rem 3rem; }
            .analysis-row { grid-template-columns: 1fr; }
            .analysis-right { text-align: left; }
            .analyses-section { padding: 0 1.5rem; }
            footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
    </style>
</head>
<body>

<!-- NAV -->
<nav class="nav-light">
    <a href="index.html" class="nav-logo">Mukul Dewangan</a>
    <ul class="nav-links">
        <li><a href="index.html#work">Work</a></li>
        <li><a href="teardowns.html">Teardowns</a></li>
        <li><a href="ai-reports.html">AI Reports</a></li>
        <li><a href="strategy.html" class="active">Strategy</a></li>
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#resume">Resume</a></li>
        <li><a href="index.html#contact">Contact</a></li>
    </ul>
</nav>

<!-- HERO -->
<section class="hero">
    <div class="hero-left reveal">
        <p class="hero-eyebrow">Product Strategy</p>
        <h1 class="hero-title">Strategy <em>Analyses.</em></h1>
    </div>
    <div class="hero-right reveal reveal-d1">
        <p class="hero-desc">
            Long-form competitive intelligence and product strategy documents. Each analysis covers market landscape, product critique, technology architecture, and a mock strategy recommendation from a Senior PM perspective.
        </p>
        <div class="hero-stat-block">
            <div class="hero-count">1</div>
            <p class="hero-count-label">Analysis Published</p>
        </div>
    </div>
    <div class="hero-bg-word" aria-hidden="true">Analysis</div>
</section>

<!-- ANALYSES LIST -->
<div class="analyses-section">
    <div class="analyses-list">

        <a href="TravelAI_Analysis.html" class="analysis-row reveal">
            <div class="analysis-left">
                <div class="analysis-tags">
                    <span class="analysis-tag">Travel</span>
                    <span class="analysis-tag">AI</span>
                    <span class="analysis-tag">Product Strategy</span>
                </div>
                <h2 class="analysis-title">TravelAI: The <em>Agentic</em> Bet</h2>
                <p class="analysis-thesis">Profitable, fast-growing, and sitting on an underutilized data asset. The question is whether its agentic vision ships before Google's does.</p>
                <span class="analysis-read">Read Analysis <span class="analysis-arrow">→</span></span>
            </div>
            <div class="analysis-right">
                <p class="analysis-date">May 2026</p>
                <p class="analysis-meta">
                    TravelAI Solutions Inc.<br>
                    Vancouver, BC<br>
                    UpNext Group
                </p>
            </div>
        </a>

    </div>
</div>

<!-- FOOTER -->
<footer>
    <span>© 2026 Mukul Dewangan</span>
    <span>Product & AI Leadership</span>
</footer>

<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open strategy.html in browser and verify**

Open `strategy.html` locally. Check:
- Nav shows all 7 links, "Strategy" is highlighted active
- Hero two-column layout renders correctly with ghost "Analysis" word
- TravelAI analysis row shows with tags, title, thesis, date
- "Read Analysis →" arrow animates on hover
- Footer is dark with correct text

- [ ] **Step 3: Commit**

```bash
git add strategy.html
git commit -m "Add Strategy hub page with TravelAI analysis entry"
```

---

## Task 3: TravelAI_Analysis.html — Head, nav, and footer

**Files:**
- Modify: `TravelAI_Analysis.html`

- [ ] **Step 1: Update the `<head>` block**

Replace the entire `<head>` block (lines 1–8) with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="TravelAI product strategy analysis — competitive intelligence, PM critique, technology deep-dive, and mock strategy document by Mukul Dewangan.">
<title>TravelAI: The Agentic Bet — Product Strategy Analysis · Mukul Dewangan</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="shared.css">
<style>
```

The `<style>` tag remains open — Task 4 replaces the CSS content inside it.

- [ ] **Step 2: Add nav HTML after `<body>` opening tag**

Find the line `<body>` (currently followed immediately by `<!-- COVER -->`). Insert the nav between them:

```html
<body>

<!-- NAV -->
<nav class="nav-light">
    <a href="strategy.html" class="nav-back"><span class="arrow">←</span> Strategy</a>
    <ul class="nav-links">
        <li><a href="index.html#work">Work</a></li>
        <li><a href="teardowns.html">Teardowns</a></li>
        <li><a href="ai-reports.html">AI Reports</a></li>
        <li><a href="strategy.html" class="active">Strategy</a></li>
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#resume">Resume</a></li>
        <li><a href="index.html#contact">Contact</a></li>
    </ul>
</nav>

<!-- COVER -->
```

- [ ] **Step 3: Add footer before `</body>`**

Find the closing `</body>` tag. Insert before it:

```html
<!-- FOOTER -->
<footer>
    <span>© 2026 Mukul Dewangan</span>
    <span>Product & AI Leadership</span>
</footer>

</body>
```

- [ ] **Step 4: Open TravelAI_Analysis.html in browser and confirm nav appears**

The nav should appear at the top (may look unstyled for cover/body until Task 4 — the nav itself will render correctly from shared.css). Footer should appear at the bottom.

- [ ] **Step 5: Commit**

```bash
git add TravelAI_Analysis.html
git commit -m "Add site nav and footer to TravelAI analysis"
```

---

## Task 4: TravelAI_Analysis.html — Replace CSS with site-token-aligned styles

**Files:**
- Modify: `TravelAI_Analysis.html`

This task replaces the entire content of the `<style>` block (everything between `<style>` and `</style>` in the head) with the redesigned CSS below.

- [ ] **Step 1: Replace the full `<style>` block content**

The existing `<style>` block starts after the new `<link rel="stylesheet" href="shared.css">` line added in Task 3 and ends at `</style>`. Replace everything between those tags with:

```css
/* Page-specific styles — base tokens, reset, nav, grain from shared.css */
:root { --gold: #c9962e; }

body { background: var(--bg); color: var(--text); line-height: 1.7; font-size: 15px; }

/* Override shared .section-label for §-style document markers */
.section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
    font-weight: 400;
}

/* COVER */
.cover {
    background: var(--bg-dark);
    color: #F3EDE2;
    padding: 80px 60px 60px;
    padding-top: calc(80px + 4.5rem); /* offset for fixed nav */
    position: relative;
    overflow: hidden;
}
.cover::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 420px; height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,90,26,0.13) 0%, transparent 70%);
}
.cover-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 28px;
}
.cover h1 {
    font-family: var(--font-display);
    font-size: clamp(38px, 6vw, 64px);
    font-weight: 400;
    line-height: 1.05;
    margin-bottom: 20px;
    max-width: 720px;
}
.cover h1 em { color: var(--accent); font-style: italic; }
.cover-sub {
    font-size: 17px;
    color: rgba(243,237,226,0.62);
    max-width: 580px;
    margin-bottom: 44px;
    font-weight: 300;
}
.cover-meta {
    display: flex; gap: 36px; flex-wrap: wrap;
    border-top: 1px solid rgba(243,237,226,0.10);
    padding-top: 28px;
}
.cover-meta div { font-size: 12px; color: rgba(243,237,226,0.45); font-family: 'DM Mono', monospace; }
.cover-meta div span { display: block; color: #F3EDE2; font-size: 14px; margin-top: 3px; }

/* STATS ROW */
.stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0;
    border-bottom: 1px solid var(--border);
}
.stat-box {
    padding: 28px 24px;
    border-right: 1px solid var(--border);
    text-align: center;
}
.stat-box:last-child { border-right: none; }
.stat-num {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 400;
    font-style: italic;
    color: var(--text);
    line-height: 1;
}
.stat-num.accent { color: var(--accent); }
.stat-num.blue { color: var(--teal); }
.stat-label { font-size: 11px; color: var(--text-muted); margin-top: 6px; text-transform: uppercase; letter-spacing: 1px; font-family: 'DM Mono', monospace; }

/* LAYOUT */
.container { max-width: 960px; margin: 0 auto; padding: 0 40px; }

/* SECTIONS */
.section { padding: 60px 0; border-bottom: 1px solid var(--border); }
.section:last-child { border-bottom: none; }
.section-num {
    font-family: var(--font-display);
    font-size: 11px;
    color: var(--border);
    font-weight: 400;
    float: right;
    margin-top: 2px;
}

h2 { font-family: var(--font-display); font-size: 30px; font-weight: 400; margin-bottom: 28px; line-height: 1.2; }
h3 { font-family: var(--font-display); font-size: 20px; font-weight: 400; margin-bottom: 12px; margin-top: 32px; }
h4 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 8px; margin-top: 24px; }
p { margin-bottom: 14px; color: var(--text); }
p:last-child { margin-bottom: 0; }

/* CALLOUT BOXES */
.callout {
    border-left: 3px solid var(--accent);
    background: var(--surface);
    padding: 18px 22px;
    margin: 24px 0;
    border-radius: 0 var(--r-md) var(--r-md) 0;
}
.callout.blue { border-color: var(--teal); }
.callout.gold { border-color: var(--gold); }
.callout.green { border-color: var(--teal-light); }
.callout strong { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; color: var(--accent); }
.callout.blue strong { color: var(--teal); }
.callout.gold strong { color: var(--gold); }
.callout.green strong { color: var(--teal-light); }

/* CARDS */
.card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
.card-grid.three { grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: 640px) { .card-grid, .card-grid.three { grid-template-columns: 1fr; } }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-md); padding: 20px; }
.card-icon { font-size: 20px; margin-bottom: 10px; }
.card h4 { margin-top: 0; color: var(--text); }
.card p { font-size: 13px; color: var(--text-muted); }

/* COMPETITOR TABLE */
.comp-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
.comp-table th {
    background: var(--bg-dark);
    color: #F3EDE2;
    padding: 10px 14px;
    text-align: left;
    font-weight: 400;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.5px;
}
.comp-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: top; }
.comp-table tr:hover td { background: var(--bg-alt); }
.tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'DM Mono', monospace;
}
.tag.red { background: rgba(192,90,26,0.10); color: var(--accent); }
.tag.blue { background: rgba(28,94,94,0.10); color: var(--teal); }
.tag.green { background: rgba(42,122,122,0.10); color: var(--teal-light); }
.tag.gold { background: rgba(201,150,46,0.10); color: var(--gold); }
.tag.grey { background: var(--surface); color: var(--text-muted); }

/* SWOT */
.swot { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--border); border-radius: var(--r-md); overflow: hidden; margin: 20px 0; }
.swot-box { padding: 24px; }
.swot-box:nth-child(1) { background: rgba(28,94,94,0.08); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.swot-box:nth-child(2) { background: rgba(192,90,26,0.08); border-bottom: 1px solid var(--border); }
.swot-box:nth-child(3) { background: rgba(42,122,122,0.06); border-right: 1px solid var(--border); }
.swot-box:nth-child(4) { background: rgba(201,150,46,0.10); }
.swot-label { font-size: 10px; letter-spacing: 2px; font-family: 'DM Mono', monospace; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; }
.swot-box:nth-child(1) .swot-label { color: var(--teal); }
.swot-box:nth-child(2) .swot-label { color: var(--accent); }
.swot-box:nth-child(3) .swot-label { color: var(--teal-light); }
.swot-box:nth-child(4) .swot-label { color: var(--gold); }
.swot-box ul { list-style: none; }
.swot-box li { font-size: 13px; padding: 4px 0; padding-left: 16px; position: relative; }
.swot-box li::before { content: '→'; position: absolute; left: 0; font-size: 11px; }

/* TIMELINE */
.timeline { position: relative; padding-left: 28px; margin: 20px 0; }
.timeline::before { content: ''; position: absolute; left: 7px; top: 8px; bottom: 0; width: 2px; background: var(--border); }
.tl-item { position: relative; margin-bottom: 24px; }
.tl-dot { position: absolute; left: -24px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg); }
.tl-year { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--accent); font-weight: 600; margin-bottom: 4px; }
.tl-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
.tl-desc { font-size: 13px; color: var(--text-muted); }

/* TECH STACK */
.tech-layer {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 16px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
}
.tech-layer-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--text-muted);
    text-transform: uppercase;
    min-width: 100px;
    margin-top: 2px;
}
.tech-layer-content { flex: 1; }
.tech-layer-content strong { font-size: 13px; font-weight: 600; }
.tech-layer-content p { font-size: 12px; color: var(--text-muted); margin-top: 4px; margin-bottom: 0; }

/* PM CRITIQUE */
.critique-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 22px;
    margin-bottom: 16px;
}
.critique-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
    font-weight: 600;
    margin-bottom: 10px;
}
.critique-badge.risk { color: var(--accent); }
.critique-badge.opp { color: var(--teal-light); }
.critique-badge.gap { color: var(--gold); }
.critique-title { font-weight: 600; font-size: 16px; margin-bottom: 8px; font-family: var(--font-display); }
.critique-body { font-size: 13px; color: var(--text-muted); line-height: 1.65; }

/* STRATEGY DOC */
.strat-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 28px 32px;
    margin-bottom: 20px;
}
.strat-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
.strat-header h3 { margin: 0; font-size: 18px; }
.strat-header .num { font-family: var(--font-display); font-size: 36px; color: var(--border); line-height: 1; font-style: italic; }

.initiative-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 12px;
    align-items: start;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
}
.initiative-row:last-child { border-bottom: none; }
.initiative-name { font-weight: 600; }
.initiative-desc { color: var(--text-muted); font-size: 12px; margin-top: 2px; }

.okr-item { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.okr-item:last-child { border-bottom: none; }
.okr-o { font-weight: 700; color: var(--text); }
.okr-kr { color: var(--text-muted); padding-left: 16px; margin-top: 4px; font-size: 12px; }
.okr-kr li { list-style: disc; margin-left: 16px; margin-top: 2px; }

/* BRAND GRID */
.brand-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
.brand-pill {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    font-weight: 500;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
}
.brand-pill.flagship { border-color: var(--accent); color: var(--accent); background: rgba(192,90,26,0.08); }

/* MISC */
.footnote { font-size: 11px; color: var(--text-muted); margin-top: 8px; font-style: italic; }
hr.fancy {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, var(--accent), var(--border), transparent);
    margin: 32px 0;
}

/* FOOTER */
footer {
    background: var(--bg-dark);
    color: rgba(243,237,226,0.28);
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
footer span { font-size: 0.72rem; letter-spacing: 0.05em; }

/* RESPONSIVE */
@media (max-width: 768px) {
    .cover { padding: 80px 24px 48px; padding-top: calc(80px + 4.5rem); }
    .container { padding: 0 24px; }
    .stats-row { grid-template-columns: repeat(3, 1fr); }
    .stat-box:nth-child(n+4) { border-top: 1px solid var(--border); }
    .card-grid { grid-template-columns: 1fr; }
    .card-grid.three { grid-template-columns: 1fr; }
    .swot { grid-template-columns: 1fr; }
    .swot-box:nth-child(1) { border-right: none; }
    .swot-box:nth-child(3) { border-right: none; border-bottom: 1px solid var(--border); }
    .initiative-row { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
}
```

- [ ] **Step 2: Open TravelAI_Analysis.html in browser and do a visual pass**

Scroll through the full document checking:
- Cover: dark background, warm off-white text, terracotta accent on tag and h1 em
- Stats row: warm background, italic Cormorant numbers, teal for secondary stats
- Section labels (`§ 01`, `§ 02`, etc.): terracotta/accent color, monospace
- h2/h3 headings: Cormorant serif (should look noticeably different from DM Sans body)
- Callout boxes: warm surface background with colored left borders
- Cards: warm surface, visible borders
- Competitor table: dark header row, warm hover state
- SWOT: four quadrants with tinted backgrounds matching site palette
- Timeline: terracotta dots, muted border line
- Tech layers: warm surface cards
- PM critique items: warm surface with colored badges
- Strategy doc sections: warm surface with ghost Cormorant numbers
- Brand pills: warm surface, flagship pills in terracotta
- Footer: dark background matching cover

- [ ] **Step 3: Commit**

```bash
git add TravelAI_Analysis.html
git commit -m "Redesign TravelAI analysis to use site design system — Cormorant font, site color tokens, shared nav"
```

---

## Task 5: Final cross-page QA

**Files:** None modified — verification only

- [ ] **Step 1: Check nav consistency across all pages**

Open each of these in a browser tab and confirm "Strategy" appears in the nav in the correct position:
- `index.html` — nav: Work · Teardowns · AI Reports · Strategy · About · Resume · Contact
- `teardowns.html` — same nav, Teardowns highlighted active
- `ai-reports.html` — same nav, AI Reports highlighted active
- `strategy.html` — same nav, Strategy highlighted active
- `TravelAI_Analysis.html` — back link "← Strategy" on left, full nav on right with Strategy active

- [ ] **Step 2: Check navigation flow**

1. From `index.html`, click "Strategy" → lands on `strategy.html` ✓
2. From `strategy.html`, click "Read Analysis →" on TravelAI row → opens `TravelAI_Analysis.html` ✓
3. From `TravelAI_Analysis.html`, click "← Strategy" in nav → returns to `strategy.html` ✓
4. From `TravelAI_Analysis.html`, click "Teardowns" in nav → opens `teardowns.html` ✓

- [ ] **Step 3: Check grain texture on TravelAI analysis**

`shared.css` adds a `body::before` grain texture. Confirm it appears on the TravelAI analysis page as a subtle noise overlay (compare with `index.html` — should look the same).

- [ ] **Step 4: Check reduced motion**

Open browser DevTools → Rendering → Enable "Prefers-reduced-motion: reduce". Refresh `strategy.html`. Confirm the `reveal` scroll animations do not play (elements visible immediately without fade-in). This is handled by shared.css automatically.

- [ ] **Step 5: Final commit if any fixes were made**

```bash
git add -p  # stage only intentional fixes
git commit -m "Fix nav and layout issues found in QA pass"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Nav updated on index.html, teardowns.html, ai-reports.html (Task 1)
- ✅ strategy.html created with hero, analysis list, TravelAI entry, footer (Task 2)
- ✅ TravelAI_Analysis.html gets shared.css, Cormorant, updated title (Task 3)
- ✅ TravelAI nav (back link + full nav) added (Task 3)
- ✅ TravelAI footer added (Task 3)
- ✅ Full CSS redesign with all token remappings from spec (Task 4)
- ✅ Cover, stats, sections, callouts, cards, tables, SWOT, timeline, tech-layers, critique, strategy-doc, brand-pills, footnote, hr — all components covered

**Cover padding note:** Added `padding-top: calc(80px + 4.5rem)` on `.cover` to account for the fixed nav bar height (shared.css `nav` is `position: fixed`). Without this, the cover content would sit behind the nav.

**Responsive breakpoints:** The original file had a `@media(max-width: 640px)` block. The new CSS keeps responsiveness with a `@media (max-width: 768px)` block that handles SWOT collapsing to 1-col, stats row reflow, and container padding reduction.
