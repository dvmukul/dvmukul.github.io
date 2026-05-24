# AI Weekly Reports Section — Design Spec
**Date:** 2026-05-24

## Context

Mukul produces a weekly AI news report as a PDF and wants to publish it on the portfolio site. The goal is a dedicated page where visitors can browse all past issues and download any report with one click. The update workflow must be nearly zero-effort: drop in the PDF, run one command, done — no manual HTML editing.

---

## Architecture

Four components, no build step, no new dependencies:

| Component | Path | Purpose |
|---|---|---|
| PDF storage | `reports/` | All weekly PDF files live here |
| Metadata | `reports.json` | Array of report objects, newest-first |
| Page | `ai-reports.html` | Standalone page; fetches JSON, renders list |
| Slash command | `.claude/commands/add-report.md` | Claude command for weekly publishing |

---

## Data Model

`reports.json` — array of objects, prepended on each new issue:

```json
[
  {
    "title": "AI Weekly — Issue #2",
    "date": "2026-05-31",
    "summary": "One or two sentences describing what's covered in this issue.",
    "filename": "ai-weekly-2026-05-31.pdf"
  },
  {
    "title": "AI Weekly — Issue #1",
    "date": "2026-05-24",
    "summary": "OpenAI's new model, Google I/O highlights, and open-source models closing the gap.",
    "filename": "ai-weekly-2026-05-24.pdf"
  }
]
```

Fields:
- `title` — issue name/headline, extracted from PDF by Claude
- `date` — ISO 8601 publication date (`YYYY-MM-DD`), extracted from PDF
- `summary` — 1–2 sentence teaser written by Claude after reading the PDF
- `filename` — PDF filename (no path prefix; page constructs the full path as `reports/<filename>`)

---

## Page Design — `ai-reports.html`

Matches existing site aesthetics: Cormorant headlines, DM Sans body, warm sand background (`#F3EDE2`), teal accent (`#1C5E5E`), grain texture overlay.

**Structure:**
1. **Shared nav** — "AI Reports" link added alongside existing nav items
2. **Hero** — Page title + one-line description: *"A weekly briefing on what matters in AI — no hype, just signal."*
3. **Report list** — Full-width stacked cards, one per issue, newest at top. Each card contains:
   - Issue title (prominent, Cormorant)
   - Publication date (muted, right-aligned)
   - Summary paragraph
   - "Download PDF" button — `<a href="reports/<filename>" download>` for direct browser download
4. **Empty state** — If `reports.json` is empty or fails to load, show a friendly message

**Rendering:** Vanilla JS fetches `reports.json` and renders cards dynamically. No framework. Consistent with `main.js` pattern already in the codebase.

**Nav update:** All existing HTML pages (`index.html`, `case-study-*.html`, `teardowns.html`) get "AI Reports" added to their shared nav.

---

## Weekly Update Workflow

1. Copy the new PDF into `reports/`
2. Run `/add-report reports/<filename>.pdf` in Claude Code
3. Claude reads the PDF with the `Read` tool, extracts title and date, writes a 1–2 sentence summary
4. Claude prepends the new entry to `reports.json`
5. Commit and push — the page updates automatically

The `.claude/commands/add-report.md` command contains instructions that tell Claude:
- Read the specified PDF file path
- Extract: title (from cover/header), publication date (from cover or issue number)
- Write: a concise 1–2 sentence summary of the report's contents
- Prepend the new object to `reports.json`, preserving valid JSON

---

## Download Behaviour

Each report card has a direct download link:

```html
<a href="reports/ai-weekly-2026-05-24.pdf" download class="download-btn">
  Download PDF
</a>
```

The `download` attribute triggers a browser download rather than in-tab preview. No authentication, no gating — public access for all visitors.

---

## Files to Create / Modify

| Action | File |
|---|---|
| Create | `reports/` (directory) |
| Create | `reports.json` (empty array `[]` initially) |
| Create | `ai-reports.html` |
| Create | `.claude/commands/add-report.md` |
| Modify | `index.html` — add nav link |
| Modify | `teardowns.html` — add nav link |
| Modify | `case-study-01.html` through `case-study-04.html` — add nav link |
| Modify | `shared.css` — add report card styles |

---

## Verification

1. Open `ai-reports.html` in a browser — page loads with empty state message
2. Add a test entry to `reports.json` with a dummy PDF in `reports/` — card renders correctly with title, date, summary, and download button
3. Click "Download PDF" — file downloads (not opens in tab)
4. Check nav link appears on homepage, teardowns page, and a case study page
5. Run `/add-report` with a real PDF — confirm Claude reads it and updates `reports.json` correctly
6. Check `prefers-reduced-motion` respected in any card entrance animations
