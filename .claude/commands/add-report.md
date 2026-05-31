# Add Weekly AI Report

You are adding a new issue to the AI Weekly Reports section of this portfolio site.

The argument to this command is the path to the HTML file for the new issue, e.g. `ai-brief-vol-02-issue-24.html`.

## Your task

1. **Read the HTML file** at the path provided using the Read tool.

2. **Extract the following fields from the HTML content:**
   - `title` — The issue name or headline (e.g. "The AI Brief — Vol. 02, Issue 24"). Look in the `<title>` tag, a prominent heading, or any cover/header text.
   - `date` — The publication date in ISO 8601 format (`YYYY-MM-DD`). Look for it in a date header, footer, or derive it from the filename.
   - `summary` — A concise 1–2 sentence summary of the issue's key topics. Be specific: name the actual models, companies, research, or developments covered. Do not write generic filler like "covers recent AI news."
   - `filename` — The bare filename only (e.g. `ai-brief-vol-02-issue-24.html`). No path prefix.

3. **Read `reports.json`** (at the repo root).

4. **Prepend** the new entry as the first element of the JSON array. The array must remain ordered newest-first.

5. **Write the updated array back to `reports.json`** as valid, properly-formatted JSON (2-space indent).

6. **Print a confirmation** showing the entry you added, so the user can verify before committing.

## Rules

- Always prepend, never append.
- `filename` is the bare filename only — no directory prefix.
- `date` must be `YYYY-MM-DD`.
- `summary` must be specific and informative. Read the HTML thoroughly before writing it.
- Preserve all existing entries in `reports.json` — only add to the front of the array.
- After writing, remind the user to `git add reports.json <filename> && git commit -m "Add [issue title]"`.
