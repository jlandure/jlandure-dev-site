#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AUTHOR_NAME,
  SLIDES_ROOT,
  absoluteUrl,
  coverHref,
  descriptionHtml,
  descriptionPlain,
  escapeHtml,
  formatDateLabel,
  galleryCardHtml,
  linkedinHtml,
  listDecks,
  loadDeck,
  moreDecksHtml,
  pdfHref,
} from "./decks.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(
  path.join(SLIDES_ROOT, "assets", "deck.template.html"),
  "utf8",
);

function fill(templateHtml, vars) {
  return templateHtml.replaceAll(/\{\{([a-z_]+)\}\}/g, (_, key) =>
    Object.hasOwn(vars, key) ? vars[key] : "",
  );
}

export function renderDeckPage(deck, decks = listDecks()) {
  const coverFile = coverHref(deck).replace(/^\.\//, "");
  const pdfFile = pdfHref(deck);
  const pdfLocal = /^https?:\/\//.test(pdfFile) ? pdfFile : `./${pdfFile.replace(/^\.\//, "")}`;
  const categoryHtml = deck.category
    ? `<span>${escapeHtml(deck.category)}</span>`
    : "";
  return fill(template, {
    language: deck.language || "en",
    title: escapeHtml(deck.title),
    title_attr: escapeHtml(deck.title),
    description_plain: escapeHtml(descriptionPlain(deck.body)).slice(0, 240),
    canonical: absoluteUrl(`/slides/${deck.slug}/`),
    og_image: absoluteUrl(`/slides/${deck.slug}/${coverFile}`),
    pdf_href: escapeHtml(pdfLocal),
    date_iso: escapeHtml(deck.date),
    date_label: escapeHtml(formatDateLabel(deck.date)),
    category_html: categoryHtml,
    linkedin_html: linkedinHtml(deck.linkedin),
    description_html: descriptionHtml(deck.body),
    more_decks_html: moreDecksHtml(deck.slug, decks),
  });
}

export function renderGalleryPage(decks = listDecks()) {
  const cards = decks.map((deck, index) => galleryCardHtml(deck, { eager: index === 0 })).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Slides — Julien Landuré</title>
  <meta name="description" content="Slide decks by Julien Landuré.">
  <link rel="canonical" href="${absoluteUrl("/slides/")}">
  <meta property="og:title" content="Slides — Julien Landuré">
  <meta property="og:description" content="Slide decks by ${escapeHtml(AUTHOR_NAME)}.">
  <meta property="og:url" content="${absoluteUrl("/slides/")}">
  <meta property="og:image" content="${absoluteUrl("/jlandure-450x450.jpg")}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <link rel="stylesheet" href="/slides/assets/gallery.css">
</head>
<body class="gallery-page">
  <header class="profile">
    <img class="profile-avatar" src="/jlandure-450x450.jpg" alt="" width="96" height="96" fetchpriority="high">
    <div>
      <h1>${escapeHtml(AUTHOR_NAME)}</h1>
      <p class="profile-meta">jlandure · ${decks.length} Decks</p>
    </div>
    <p class="profile-details">Founder &amp; CTO · TechTown · France · <a href="/">jlandure.dev</a></p>
  </header>
  <main class="gallery">
    <div class="gallery-toolbar">
      <h2>Decks</h2>
    </div>
    <div class="deck-grid">
      ${cards}
    </div>
  </main>
  <footer class="site-footer">
    <a href="/">jlandure.dev</a>
  </footer>
  <script async src="https://eu.umami.is/script.js" data-website-id="2f1e79be-313e-4f52-891f-c186ab603162"></script>
</body>
</html>
`;
}

export function writeDeckPage(slug) {
  const decks = listDecks();
  const deck = decks.find((item) => item.slug === slug) || loadDeck(slug);
  const html = renderDeckPage(deck, decks);
  const out = path.join(deck.dir, "index.html");
  fs.writeFileSync(out, html);
  return out;
}

export function writeAllPages() {
  const decks = listDecks();
  for (const deck of decks) {
    fs.writeFileSync(path.join(deck.dir, "index.html"), renderDeckPage(deck, decks));
  }
  const gallery = path.join(SLIDES_ROOT, "index.html");
  fs.writeFileSync(gallery, renderGalleryPage(decks));
  return { decks: decks.length, gallery };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const only = process.argv[2];
  if (only && only !== "--all") {
    const out = writeDeckPage(only);
    const gallery = writeAllPages();
    console.log(`Wrote ${out} and gallery (${gallery.decks} decks)`);
  } else {
    const result = writeAllPages();
    console.log(`Wrote ${result.decks} deck pages and ${result.gallery}`);
  }
}
