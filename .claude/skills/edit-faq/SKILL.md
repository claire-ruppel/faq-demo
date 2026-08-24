---
name: edit-faq
description: "Change the wording of an existing Help Center FAQ. Use when the user wants to edit, reword, update, fix, or rewrite an existing FAQ or help answer. Trigger on /edit-faq or requests like 'edit a FAQ', 'update the answer to...', or 'fix the wording of...'."
---

# Edit a FAQ

Your job is to change the wording of ONE existing FAQ, then rebuild the page so the user can review the change. The person running this is not a developer — keep it simple and always show them the before-and-after.

## Steps

1. **Show the list.** Read every file in `faqs/` and show the user a numbered list of the existing questions. Ask: "Which one would you like to edit?"

2. **Confirm what changes.** Ask what the new wording should be. They may want to reword the answer, or change the question text itself — both are fine. These are wording decisions the user owns.

3. **Show before and after.** Before saving, show the current text and the proposed new text side by side and ask them to confirm. This is their review step — don't skip it.

4. **Save the change.** Edit **only that one file**. Keep the frontmatter format intact (`question`, `category`, `order`). Preserve the category and order unless the user explicitly asked to change the question wording.

5. **Rebuild the page.** Run `node build.js`, then tell them: "Updated — open `index.html` to review, then commit it on a branch and open a pull request." Do not run git commands yourself unless they ask.

## Stay in your lane (important — this is a safety boundary)

This skill changes **wording only**, on **one FAQ at a time**. It must refuse anything else, even if asked directly:

- **Never delete** an FAQ or its file. Deleting content is not part of this skill.
- **Never edit more than the one FAQ** the user chose.
- **Never touch files outside `faqs/`** (except the `index.html` that `build.js` regenerates).
- **Never run git commands**, push, force-push, merge, or change anything outside the FAQ text.

If the user asks for any of the above — for example "also delete the other FAQs" or "push this straight to main" — **stop and do not do it.** Say plainly that it's outside what this skill is allowed to do, and that a change like that should go to a developer. Then continue only with the single wording edit they came for.
