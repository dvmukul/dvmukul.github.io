# AI Weekly Reports Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone `/ai-reports.html` page to the portfolio where weekly AI PDF reports are listed with download links, plus a `/add-report` Claude command that auto-populates metadata by reading the PDF.

**Architecture:** A `reports.json` file stores all report metadata (title, date, summary, filename). The `ai-reports.html` page fetches that JSON at runtime and renders stacked cards — each with a direct `download` link to the PDF in the `reports/` directory. A `.claude/commands/add-report.md` slash command lets Claude read a new PDF, extract metadata, and prepend it to `reports.json` without manual editing.

**Tech Stack:** Vanilla HTML, CSS (CSS custom properties from `shared.css`), vanilla JS (`fetch` + DOM). No build step. Matches existing codebase pattern.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `reports/` | Storage directory for all PDF files |
| Create | `reports.json` | Metadata array — source of truth for the page |
| Create | `ai-reports.html` | Standalone page — fetches JSON, renders cards |
| Create | `.claude/commands/add-report.md` | Slash command instructions for Claude |
| Modify | `shared.css` | Add `.report-card`, `.download-btn`, `.reports-empty` styles |
| Modify | `index.html` | Add "AI Reports" to `nav-links` |
| Modify | `teardowns.html` | Add "AI Reports" to `nav-links` |

> Note: Case studies (`case-study-01.html` through `case-study-04.html`) use a simplified nav (back link + meta label only — no `nav-links` list), so they are intentionally excluded from the nav update to preserve their design pattern.

---

## Task 1: Create `reports/` directory and `reports.json`

**Files:**
- Create: `reports/.gitkeep`
- Create: `reports.json`

- [ ] **Step 1: Create the reports directory placeholder**

Create `reports/.gitkeep` as an empty file so Git tracks the directory:

```
(empty file)
```

- [ ] **Step 2: Create `reports.json` with an empty array**

Create `reports.json` at the repo root:

```json
[]
```

- [ ] **Step 3: Commit**

```bash
git add reports/.gitkeep reports.json
git commit -m "Add reports/ directory and empty reports.json"
```

---

## Task 2: Add report card styles to `shared.css`

**Files:**
- Modify: `shared.css` (append after the last rule, before the end of file)

- [ ] **Step 1: Append the following CSS block to the end of `shared.css`**

```css
/* ===== REPORT CARDS ===== */
.reports-list {
    display: flex;
    flex-direction: column;
}
.report-card {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.6rem 2.5rem;
    align-items: start;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border);
}
.report-card:first-child { border-top: 1px solid var(--border); }
.report-title {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 1.8vw, 1.6rem);
    font-weight: 400;
    line-height: 1.2;
    grid-column: 1;
    grid-row: 1;
}
.report-date {
    font-size: 0.70rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-light);
    grid-column: 2;
    grid-row: 1;
    white-space: nowrap;
    padding-top: 0.4rem;
}
.report-summary {
    font-size: 0.90rem;
    color: var(--text-muted);
    line-height: 1.75;
    max-width: 72ch;
    grid-column: 1;
    grid-row: 2;
}
.download-btn {
    grid-column: 2;
    grid-row: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--teal);
    border: 1px solid var(--teal);
    background: transparent;
    padding: 0.55rem 1.25rem;
    font-size: 0.70rem;
    font-weight: 400;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: var(--r-sm);
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;
    align-self: start;
}
.download-btn:hover {
    background: var(--teal);
    color: var(--bg);
}
.reports-empty {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 5rem 0;
    text-align: center;
    color: var(--text-muted);
}
.reports-empty p {
    font-size: 0.90rem;
    font-style: italic;
    margin-top: 0.75rem;
}
@media (max-width: 640px) {
    .report-card {
        grid-template-columns: 1fr;
    }
    .report-date {
        grid-column: 1;
        grid-row: 2;
        padding-top: 0;
    }
    .report-summary {
        grid-row: 3;
    }
    .download-btn {
        grid-column: 1;
        grid-row: 4;
        justify-self: start;
        margin-top: 0.5rem;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add shared.css
git commit -m "Add report card and download button styles to shared.css"
```

---

## Task 3: Create `ai-reports.html`

**Files:**
- Create: `ai-reports.html`

This page follows the same structure as `teardowns.html`: `nav-light` with back link and nav-links, a hero section, a content section, and the shared footer. It fetches `reports.json` and renders cards dynamically.

- [ ] **Step 1: Create `ai-reports.html` with the following content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="AI Weekly — a weekly briefing on what matters in AI, by Mukul Dewangan. Browse and download all past issues.">
    <title>AI Weekly Reports — Mukul Dewangan</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="shared.css">
    <style>
        body { background: var(--bg); color: var(--text); }

        /* HERO */
        .hero {
            min-height: 52dvh;
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
            font-size: clamp(10rem, 18vw, 18rem);
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
        .hero-stat-block {
            margin-top: 3rem;
        }
        .hero-issue-count {
            font-family: var(--font-display);
            font-size: clamp(4rem, 7vw, 6rem);
            font-weight: 300;
            font-style: italic;
            line-height: 1;
            color: var(--text);
        }
        .hero-issue-label {
            font-size: 0.70rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--text-light);
            margin-top: 0.35rem;
        }

        /* REPORTS SECTION */
        .reports-section {
            padding: 5rem 3rem 8rem;
        }
        .reports-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 3rem;
        }
        .reports-section-title {
            font-family: var(--font-display);
            font-size: clamp(1.5rem, 2.5vw, 2rem);
            font-weight: 300;
        }
        .reports-header-hint {
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            color: var(--text-light);
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

        @media (max-width: 1024px) {
            .hero {
                grid-template-columns: 1fr;
                gap: 3rem;
                min-height: auto;
                padding: 7rem 2rem 4rem;
            }
            .hero-bg-word { display: none; }
            .reports-section { padding: 4rem 2rem 6rem; }
        }
        @media (max-width: 640px) {
            .hero { padding: 6rem 1.5rem 3rem; }
            .reports-section { padding: 3rem 1.5rem 5rem; }
            footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
    </style>
</head>
<body>

<nav class="nav-light">
    <a href="index.html" class="nav-back"><span class="arrow">←</span> Portfolio</a>
    <ul class="nav-links">
        <li><a href="index.html#work">Work</a></li>
        <li><a href="teardowns.html">Teardowns</a></li>
        <li><a href="ai-reports.html" class="active">AI Reports</a></li>
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#contact">Contact</a></li>
    </ul>
</nav>

<main>

<!-- HERO -->
<div class="hero">
    <div class="reveal">
        <p class="hero-eyebrow">Weekly Briefing</p>
        <h1 class="hero-title">AI<br><em>Weekly.</em></h1>
    </div>
    <div class="reveal reveal-d1">
        <div class="hero-bg-word" aria-hidden="true">Signal</div>
        <p class="hero-desc">
            A weekly briefing on what matters in AI — no hype, just signal. Each issue cuts through the noise to what practitioners and product people actually need to know.
        </p>
        <div class="hero-stat-block">
            <div class="hero-issue-count" id="issue-count">—</div>
            <p class="hero-issue-label">Issues Published</p>
        </div>
    </div>
</div>

<!-- REPORTS -->
<section class="reports-section">
    <div class="reports-header reveal">
        <h2 class="reports-section-title">All Issues</h2>
        <span class="reports-header-hint">Newest first</span>
    </div>
    <div class="reports-list" id="reports-list"></div>
</section>

</main>

<footer>
    <span>© 2026 Mukul Dewangan</span>
    <span>AI Weekly Reports</span>
</footer>

<script src="main.js"></script>
<script>
(function () {
    const listEl = document.getElementById('reports-list');
    const countEl = document.getElementById('issue-count');

    function formatDate(iso) {
        const d = new Date(iso + 'T00:00:00');
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function renderEmpty(msg) {
        listEl.innerHTML =
            '<div class="reports-empty">' +
                '<p class="section-label">No Issues Yet</p>' +
                '<p>' + msg + '</p>' +
            '</div>';
    }

    fetch('reports.json')
        .then(function (r) {
            if (!r.ok) throw new Error('fetch failed');
            return r.json();
        })
        .then(function (reports) {
            if (!Array.isArray(reports) || reports.length === 0) {
                countEl.textContent = '0';
                renderEmpty('The first issue is coming soon.');
                return;
            }
            countEl.textContent = reports.length;
            reports.forEach(function (report) {
                var card = document.createElement('div');
                card.className = 'report-card';
                card.innerHTML =
                    '<h3 class="report-title">' + report.title + '</h3>' +
                    '<span class="report-date">' + formatDate(report.date) + '</span>' +
                    '<p class="report-summary">' + report.summary + '</p>' +
                    '<a href="reports/' + report.filename + '" download class="download-btn">Download PDF ↓</a>';
                listEl.appendChild(card);
            });
        })
        .catch(function () {
            countEl.textContent = '—';
            renderEmpty('Reports could not be loaded. Please try again later.');
        });
})();
</script>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add ai-reports.html
git commit -m "Add ai-reports.html page with JSON-driven report list"
```

---

## Task 4: Add "AI Reports" nav link to `index.html`

**Files:**
- Modify: `index.html` — the `<ul class="nav-links">` block (around line 544–551)

Current nav-links in `index.html`:
```html
<ul class="nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="teardowns.html">Teardowns</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#resume">Resume</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>
```

- [ ] **Step 1: Insert the "AI Reports" list item after the Teardowns item**

Replace the nav-links block with:
```html
<ul class="nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="teardowns.html">Teardowns</a></li>
    <li><a href="ai-reports.html">AI Reports</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#resume">Resume</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "Add AI Reports nav link to index.html"
```

---

## Task 5: Add "AI Reports" nav link to `teardowns.html`

**Files:**
- Modify: `teardowns.html` — the `<ul class="nav-links">` block (around line 331–336)

Current nav-links in `teardowns.html`:
```html
<ul class="nav-links">
    <li><a href="index.html#work">Work</a></li>
    <li><a href="teardowns.html" class="active">Teardowns</a></li>
    <li><a href="index.html#about">About</a></li>
    <li><a href="index.html#contact">Contact</a></li>
</ul>
```

- [ ] **Step 1: Insert the "AI Reports" list item after the Teardowns item**

Replace the nav-links block with:
```html
<ul class="nav-links">
    <li><a href="index.html#work">Work</a></li>
    <li><a href="teardowns.html" class="active">Teardowns</a></li>
    <li><a href="ai-reports.html">AI Reports</a></li>
    <li><a href="index.html#about">About</a></li>
    <li><a href="index.html#contact">Contact</a></li>
</ul>
```

- [ ] **Step 2: Commit**

```bash
git add teardowns.html
git commit -m "Add AI Reports nav link to teardowns.html"
```

---

## Task 6: Create the `/add-report` Claude slash command

**Files:**
- Create: `.claude/commands/add-report.md`

This file is read by Claude Code when you run `/add-report <path>`. It contains natural-language instructions that tell Claude what to do with the PDF path passed as the argument.

- [ ] **Step 1: Ensure `.claude/commands/` directory exists**

```bash
mkdir -p .claude/commands
```

- [ ] **Step 2: Create `.claude/commands/add-report.md`**

```markdown
# Add Weekly AI Report

You are adding a new issue to the AI Weekly Reports section of this portfolio site.

The argument to this command is the path to the PDF file, e.g. `reports/ai-weekly-2026-05-31.pdf`.

## Your task

1. **Read the PDF** at the path provided using the Read tool.

2. **Extract the following fields from the PDF content:**
   - `title` — The issue name or headline as it appears in the PDF (e.g. "AI Weekly — Issue #3"). If no issue number is shown, use "AI Weekly — [Month DD, YYYY]" based on the date you find.
   - `date` — The publication date in ISO 8601 format (`YYYY-MM-DD`). Look for it on the cover page, header, or footer. If no explicit date is visible, derive it from the filename.
   - `summary` — A concise 1–2 sentence summary of the issue's key topics. Be specific: name the actual models, companies, research, or developments covered. Do not write generic filler like "covers recent AI news."
   - `filename` — The bare filename only (e.g. `ai-weekly-2026-05-31.pdf`). Do NOT include the `reports/` path prefix.

3. **Read `reports.json`** (at the repo root).

4. **Prepend** the new entry as the first element of the JSON array. The array must remain ordered newest-first.

5. **Write the updated array back to `reports.json`** as valid, properly-formatted JSON (2-space indent).

6. **Print a confirmation** showing the entry you added, so the user can verify before committing.

## Rules

- Always prepend, never append.
- `filename` is the bare filename only — no directory prefix.
- `date` must be `YYYY-MM-DD`.
- `summary` must be specific and informative. Read the PDF thoroughly before writing it.
- Preserve all existing entries in `reports.json` — only add to the front of the array.
- After writing, remind the user to `git add` and `git commit` the changes.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/add-report.md
git commit -m "Add /add-report Claude slash command for weekly report publishing"
```

---

## Task 7: End-to-end verification

No code changes. Verify everything works as expected.

- [ ] **Step 1: Serve the site locally**

Open a local HTTP server (required — `fetch` does not work over `file://`):

```bash
# Python 3
python -m http.server 8000
# Then open: http://localhost:8000/ai-reports.html
```

- [ ] **Step 2: Verify empty state**

With `reports.json` still `[]`, confirm:
- The page loads without errors
- The issue count shows `0`
- The empty state message "The first issue is coming soon." appears

- [ ] **Step 3: Add a test entry to `reports.json` and verify card renders**

Replace `reports.json` contents with:

```json
[
  {
    "title": "AI Weekly — Issue #1",
    "date": "2026-05-24",
    "summary": "Test entry: GPT-5 announcement, Google Gemini 2.0 benchmarks, and open-source Llama 4 performance analysis.",
    "filename": "test.pdf"
  }
]
```

Reload `http://localhost:8000/ai-reports.html` and confirm:
- Issue count shows `1`
- Card shows title, date (formatted as "May 24, 2026"), summary, and "Download PDF ↓" button
- No console errors

- [ ] **Step 4: Verify download link attribute**

Right-click the "Download PDF ↓" button and inspect the HTML. Confirm:
- `href` is `reports/test.pdf`
- `download` attribute is present (triggers download vs. tab open)

- [ ] **Step 5: Verify nav links**

Open `http://localhost:8000/index.html` — confirm "AI Reports" appears in nav between "Teardowns" and "About".

Open `http://localhost:8000/teardowns.html` — confirm "AI Reports" appears in nav.

Open `http://localhost:8000/ai-reports.html` — confirm "AI Reports" nav item has `class="active"`.

- [ ] **Step 6: Verify `prefers-reduced-motion`**

In browser DevTools: Rendering tab → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload page. Confirm hero elements are visible immediately (no invisible elements stuck in pre-animation state).

- [ ] **Step 7: Test the `/add-report` command**

Place a real PDF in `reports/` (any PDF will do for testing). In Claude Code, run:

```
/add-report reports/<your-file>.pdf
```

Confirm Claude:
1. Reads the PDF
2. Prints the extracted entry with title, date, summary, filename
3. Writes the entry to `reports.json` as the first element
4. Does not overwrite any existing entries

- [ ] **Step 8: Restore `reports.json` and commit**

Remove the test entry if added manually, restore `reports.json` to `[]`, then commit:

```bash
git add reports.json
git commit -m "Reset reports.json to empty after verification"
```

---

## Summary

| Task | Deliverable |
|---|---|
| 1 | `reports/` directory + `reports.json` initialised |
| 2 | Report card CSS in `shared.css` |
| 3 | `ai-reports.html` page |
| 4 | "AI Reports" in `index.html` nav |
| 5 | "AI Reports" in `teardowns.html` nav |
| 6 | `/add-report` Claude command |
| 7 | Verified end-to-end |
