# Token-efficient behavior for this project

Claude Code auto-loads this file at the start of every session. The rules below are hard defaults — follow them unless the user explicitly overrides.

The premise: **tokens are spent on what you read and what you write.** Reading 500 lines when 20 would do, or writing a 300-word summary when one sentence would do, costs the user money on every turn.

---

## 1. Read less

- **Never dump a whole file when a range will do.** Use `Read` with `offset` + `limit`, or `Grep` with `-A` / `-B` / `-C`, to fetch just the relevant window. Whole-file reads are only justified for files under ~100 lines or when you genuinely need the full file.
- **Search before you read.** Use `Grep` (ripgrep under the hood) to locate the exact symbol / string / pattern first, then `Read` that location. Don't scan files hoping to stumble on what you need.
- **Don't re-read a file you just edited.** The harness tracks file state; `Edit` and `Write` would have errored if they failed. Re-reading to "verify" is wasted tokens.
- **Don't re-read files you've already read this session.** Earlier reads are still in the transcript. Quote or recall from them instead of fetching again.
- **Skip `node_modules`, `dist`, `.next`, `build`, lockfiles, and minified bundles.** If `Glob` returns hits inside those paths, filter them out instead of reading them.
- **Don't read the project structure repeatedly.** One `Glob` per session is usually enough. Remember what's where.

## 2. Search smarter

- Use `Grep` with `output_mode: "files_with_matches"` (the default) when you just need to know *where* — not *what*. Only escalate to `"content"` when you need the matching lines.
- Use `type:` (e.g. `type: "tsx"`) instead of broad globs when searching a known language — ripgrep skips non-matching file types natively.
- Set `head_limit` on noisy searches. Scanning the first 20 matches and narrowing is cheaper than reading 500.
- Prefer one well-targeted `Grep` over three exploratory ones.

## 3. Write less

- **No preamble.** Don't write "I'll start by..." or "Let me first..." — just do it. The user sees the tool calls.
- **No postamble.** Don't end turns with a recap of what you just did. The diff already shows it. One sentence on what changed and what's next is the ceiling — usually zero is correct.
- **No "here's what I'll do" planning paragraphs** unless the user asked for a plan. Write the code.
- **Skip the "how this matches the rest of the codebase" explanations** unless the user asked why.
- **Don't list every file you touched** in a bulleted wrap-up. If the user wants a summary they'll ask.
- **Don't narrate your thinking.** Silent work is fine. Updates are for genuine status changes (found a blocker, changing direction), not for color commentary.

## 4. Edit efficiently

- **Prefer `Edit` over `Write` for existing files.** `Edit` sends only the diff; `Write` re-sends the entire file.
- **Batch edits to the same file** with `replace_all: true` or a single large `old_string` / `new_string` when the changes are contiguous. Avoid five sequential `Edit` calls when one will do.
- **Don't rewrite files to "clean them up"** unless the user asked. Surrounding churn costs tokens and obscures the real change.

## 5. Parallelize independent work

- When multiple tool calls have no dependencies on each other, fire them **in a single message**, not sequentially. Example: `Read fileA` + `Read fileB` + `Grep pattern` → one message, three tool uses.
- Only serialize when a later call genuinely needs an earlier call's output.

## 6. Avoid duplicate work

- **Don't run `npx tsc --noEmit` after every tiny edit.** Run it once at the end of a logical unit of work. The harness is not a test runner.
- **Don't run tests unless the user asked** or the change is risky enough to warrant it.
- **Don't `git status` / `git diff` unprompted.** Only when the user is about to commit or explicitly asks about branch state.

## 7. Use subagents sparingly

- Subagents (`Agent` tool) start **cold** — they re-derive context the main session already has. Only spawn one for:
  - Genuinely parallel independent research across many files.
  - Tasks the user explicitly delegated.
  - Open-ended exploration where >5 searches are likely.
- For a single `Grep` or `Read`, **never** spawn a subagent.

## 8. Ask, don't assume — but only when it matters

- If a task has a clear default, take it and move on. Don't stop to ask "should I use X or Y?" for low-stakes choices.
- Save clarifying questions for high-stakes forks (destructive actions, architectural direction, ambiguous scope). One batched question with 3 options beats three sequential round-trips.

## 9. Respond tersely by default

- **Simple question → direct one-line answer.** No headers, no bullet lists, no "great question."
- **Code change → make the change, state it in one sentence.** File path + what changed.
- **Multi-step task → terse status per step**, not a narrative.
- Markdown formatting (headers, bullets, bold) costs tokens. Use only when structure genuinely aids scanning — a two-point list is not a list.

## 10. Don't re-explain what the code shows

- Well-named identifiers and a readable diff do the explaining. Don't paraphrase the code back to the user.
- Don't add comments to code explaining *what* it does — only *why*, and only when non-obvious.

---

## Project-specific notes

- This is a React + Vite + TypeScript portfolio site. Tailwind for styling, `framer-motion` for animation, `lucide-react` for icons, `react-router-dom` for routing.
- Project content lives in [src/data/projects.tsx](src/data/projects.tsx); per-project bespoke layouts live in [src/content/projects/](src/content/projects/).
- When adding a new project: update `projects.tsx` (entry + `accordionProjects` entry) and add a `<ProjectNameProcess />` component under `src/content/projects/`. Don't touch `ProjectPage.tsx` for per-project layout — keep the shared shell shared.
