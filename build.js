/*
 * build.js — turns every faqs/*.md file into a single, self-contained index.html.
 *
 * No dependencies. Run it with:  node build.js
 * The skills run this for you, so you normally never call it by hand.
 */

const fs = require("fs");
const path = require("path");

const FAQ_DIR = path.join(__dirname, "faqs");
const OUT = path.join(__dirname, "index.html");
const CSS = path.join(__dirname, "styles.css");

// The order categories appear on the page. Unknown categories go last, alphabetically.
const CATEGORY_ORDER = ["Getting started", "Account", "Billing", "Other"];

// --- tiny helpers -----------------------------------------------------------

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Split "---\nkey: value\n---\nbody" into { data, body }.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw.trim() };
  const data = {};
  m[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    val = val.replace(/^["']|["']$/g, "");
    data[key] = val;
  });
  return { data, body: m[2].trim() };
}

// Minimal, safe markdown: paragraphs, bullet lists, bold, italic, code, links.
function renderMarkdown(md) {
  const inline = (t) =>
    escapeHtml(t)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

  const blocks = md.split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines
          .map((l) => `      <li>${inline(l.replace(/^\s*-\s+/, ""))}</li>`)
          .join("\n");
        return `    <ul>\n${items}\n    </ul>`;
      }
      return `    <p>${inline(block.replace(/\n/g, " "))}</p>`;
    })
    .join("\n");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- read + sort the FAQs ---------------------------------------------------

const files = fs
  .readdirSync(FAQ_DIR)
  .filter((f) => f.endsWith(".md"));

const faqs = files.map((file) => {
  const { data, body } = parseFrontmatter(
    fs.readFileSync(path.join(FAQ_DIR, file), "utf8")
  );
  return {
    file,
    question: data.question || "(untitled)",
    category: data.category || "Other",
    order: Number(data.order || 99),
    answerHtml: renderMarkdown(body),
  };
});

const categories = [...new Set(faqs.map((f) => f.category))].sort((a, b) => {
  const ia = CATEGORY_ORDER.indexOf(a);
  const ib = CATEGORY_ORDER.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
});

// --- render the page --------------------------------------------------------

const sections = categories
  .map((cat) => {
    const items = faqs
      .filter((f) => f.category === cat)
      .sort((a, b) => a.order - b.order || a.question.localeCompare(b.question))
      .map(
        (f) => `        <details class="faq" id="${slugify(f.question)}">
          <summary>${escapeHtml(f.question)}</summary>
          <div class="answer">
${f.answerHtml}
          </div>
        </details>`
      )
      .join("\n");
    return `      <section class="category">
        <p class="eyebrow">${escapeHtml(cat)}</p>
${items}
      </section>`;
  })
  .join("\n\n");

const css = fs.existsSync(CSS) ? fs.readFileSync(CSS, "utf8") : "";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Help Center</title>
  <style>
${css}
  </style>
</head>
<body>
  <main>
    <header class="masthead">
      <p class="kicker">Help Center</p>
      <h1>How can we help?</h1>
      <p class="lede">Answers to the questions we hear most. Click any question to expand it.</p>
    </header>

${sections}

    <footer class="page-foot">
      <p>Can't find what you need? See <a href="#how-do-i-contact-support">how to contact support</a>.</p>
    </footer>
  </main>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(
  `Built index.html from ${faqs.length} FAQ${faqs.length === 1 ? "" : "s"} across ${categories.length} categor${categories.length === 1 ? "y" : "ies"}.`
);
