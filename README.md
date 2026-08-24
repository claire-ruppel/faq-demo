# Help Center — demo project

A tiny help-center website used to demonstrate the everyday workflow: run a
skill, review the change, then branch, commit, push, and open a pull request.

Each FAQ is a small file in the `faqs/` folder. A build step turns those files
into `index.html`, the page you preview in your browser. **You never edit the
page or the files by hand** — you run a skill and it does it for you.

## Your skills

Type `/` in Claude Chat to see them.

| Skill | What it does | What to say |
|-------|--------------|-------------|
| `/add-faq` | Adds a new question and answer | "Add a FAQ about how to export data" |
| `/edit-faq` | Reword an existing answer | "Edit the FAQ about resetting a password" |

Each skill will ask you a couple of plain questions (the question text, the
category, the answer). Those are yours to answer. When it finishes, it rebuilds
the page and tells you to preview it.

## The loop (what you do around a skill)

1. **Update** — `git checkout main && git pull`
2. **Branch** — `git checkout -b my-change`
3. **Run a skill** — `/add-faq` or `/edit-faq`, and answer its questions
4. **Check** — open `index.html` and read your change
5. **Commit** — `git add . && git commit -m "Add FAQ: exporting your data"`
6. **Push + PR** — `git push -u origin my-change`, then open the link it prints

## Previewing the page

Open `index.html` in your browser (in VS Code, right-click it → *Open with Live
Server*, or just double-click the file). If the page ever looks out of date, run
`node build.js` to rebuild it — though the skills already do this for you.

## For developers setting this up

- No dependencies. `build.js` is plain Node and reads `faqs/*.md`.
- `index.html` is generated and git-ignored, so pull requests show only the
  clean Markdown change. Run `node build.js` once after cloning to create it.
  (If you'd rather commit the built page, remove `index.html` from
  `.gitignore`.)
- The two skills live in `.claude/skills/`. Each has guardrails so it stays in
  its lane — `edit-faq` in particular refuses to delete FAQs or push to main,
  which is used on purpose during the talk to demonstrate a "red-light" moment.
