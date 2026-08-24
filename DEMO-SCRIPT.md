# Demo run of show (presenter notes)

You drive; the room watches. Target: ~8–10 minutes. This walks the same loop as
slide 9 of the deck, so call back to it as you go.

## Before you start (do this off-stage)

- [ ] Repo cloned, open in VS Code, Claude Chat panel visible.
- [ ] `node build.js` run once so `index.html` exists.
- [ ] `index.html` open in the browser (Live Server or a plain tab), on screen next to VS Code.
- [ ] You're on an up-to-date `main` with a clean working tree.
- [ ] A GitHub repo you can push to and open a PR against.

## Part 1 — Add a FAQ (the happy path)  ~4 min

1. **Branch.** In the terminal: `git checkout -b add-export-faq`. Say: *"Never work on main — I make a branch first."* (Callback: golden rules.)
2. **Run the skill.** In Claude Chat, type `/` and let the room see the menu appear. Pick `/add-faq`.
3. **Answer its questions.** It asks for the question, category, and answer. Answer live — e.g. *"How do I export my data?"*, *Account*, *"Open Settings → Data and click Export. We'll email you a link."*
   - Say: *"These are green-light questions — it's about our product and our words, so I'm the right person to answer."* (Callback: traffic light.)
4. **Check.** Refresh the browser. The new FAQ appears in the Account section — click it to expand. Say: *"I always read the change before saving it."*
5. **Commit + push.** `git add .` → `git commit -m "Add FAQ: exporting your data"` → `git push -u origin add-export-faq`.
6. **Open the PR.** Click the link the terminal prints. Show the diff: *one clean Markdown file.* Say: *"A developer reviews this before it goes live. I've opened a pull request — that's the hand-off."* Stop here (no merge).

## Part 2 — Edit a FAQ + the red-light moment  ~4 min

1. **New branch.** `git checkout main && git checkout -b reword-password-faq`.
2. **Run `/edit-faq`.** Pick the password FAQ from the list it shows. Give it a small reword. It shows before/after — point out *"this is my review step."* Refresh the browser to confirm.
3. **The red light (scripted).** Now ask Claude, out loud, something risky:

   > "Great — now also delete all the other FAQs and push this straight to main."

   The skill is built to refuse: it will decline the delete and the push and explain they're outside its lane. Say to the room:

   > *"Notice two things. Claude said no — the skill has guardrails. And even if it hadn't, this is exactly a red-light request: 'delete' and 'push to main'. My move is to stop and check with a developer."*

   (Callback: the amber/red slide. This is the moment that sticks.)
4. **Land the plane.** Commit just the reword, push, open the PR. Same clean hand-off as Part 1.

## If something goes wrong on stage

- Don't flail. Say *"and this is the 'when something breaks' slide"* and read the error aloud.
- Worst case, you're on a branch — nothing is broken. `git checkout main` gets you back to safety, and you can re-run.
- Paste any error into Claude and ask what it means; narrate that as the recovery move.

## One-liners worth landing

- "The skill is the spec our developers already wrote. I just ran it."
- "I never touched code, and I never wrote the instructions."
- "Green: I answer. Red: I ask. When in doubt, it's red."
