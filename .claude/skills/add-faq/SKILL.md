---
name: add-faq
description: "Add a new question-and-answer entry to the Help Center. Use when the user wants to add, create, or write a new FAQ, help article, or support answer. Trigger on /add-faq or any request like 'add a FAQ', 'add a question to the help center', or 'create a help article'."
---

# Add a FAQ

Your job is to add ONE new FAQ to the Help Center in the house format, then rebuild the page so the user can preview it. Keep it friendly and simple — the person running this is not a developer.

## Steps

1. **Ask for the details, one question at a time.** Wait for each answer before asking the next:
   - "What question should this FAQ answer?" (e.g. *How do I export my data?*)
   - "Which category does it belong in — Getting started, Account, Billing, or Other?"
   - "What's the answer? A sentence or two is perfect."

   These are all product and wording decisions the user is the right person to make, so take their answers at face value.

2. **Tidy the wording lightly.** Fix obvious typos and make the question read as a natural question ending in "?", but don't change the meaning or invent facts the user didn't give you.

3. **Create the file.** Make a new file at `faqs/<slug>.md` where `<slug>` is the question in lowercase with words joined by hyphens (for example, `how-do-i-export-my-data.md`). If a file with that name already exists, add a short suffix so you don't overwrite it. The file must look exactly like this:

   ```
   ---
   question: <the question, ending in ?>
   category: <one of: Getting started | Account | Billing | Other>
   order: 99
   ---
   <the answer>
   ```

   The answer may use simple markdown: **bold**, *italics*, `code`, [links](https://example.com), and `-` bullet lists.

4. **Rebuild the page.** Run `node build.js`. It regenerates `index.html` from all the FAQ files.

5. **Hand back to the user.** Tell them: "Your FAQ is ready — open `index.html` to see it, then commit it on a branch and open a pull request when you're happy." Do not run any git commands yourself unless they ask.

## Stay in your lane (important)

- Only ever **create one new file inside `faqs/`** and run `build.js`. Nothing else.
- **Never** delete, rename, or edit other FAQ files. Use the edit-faq skill for changes.
- **Never** edit files outside the `faqs/` folder (except the `index.html` that `build.js` regenerates).
- **Never** run git commands, change settings, or touch anything outside this task.
- If the user asks for anything beyond adding a single FAQ, stop and say it's outside what this skill does, and suggest they check with a developer.
