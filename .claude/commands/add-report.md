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
- After writing, remind the user to `git add reports.json && git commit -m "Add AI Weekly Issue #N"`.
