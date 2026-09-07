import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://jlandure.dev";
export const AUTHOR_NAME = "Julien Landuré";

const here = path.dirname(fileURLToPath(import.meta.url));
export const SLIDES_ROOT = path.resolve(here, "..");
export const REPO_ROOT = path.resolve(SLIDES_ROOT, "..");

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let currentList = null;

  for (const line of lines) {
    if (currentList && /^\s+-\s+/.test(line)) {
      data[currentList].push(line.replace(/^\s+-\s+/, "").trim());
      continue;
    }
    currentList = null;
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2];
    if (value === "" || value === "|" || value === ">") {
      data[key] = [];
      currentList = key;
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: match[2].trim() };
}

export function formatDateLabel(iso) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function descriptionPlain(body) {
  return body
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[#*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function descriptionHtml(body) {
  if (!body) return "";
  const blocks = body.split(/\n{2,}/);
  return blocks
    .map((block) => {
      const html = escapeHtml(block).replaceAll("\n", "<br>\n");
      return `<p>${html}</p>`;
    })
    .join("\n");
}

export function linkedinHtml(links) {
  const items = Array.isArray(links) ? links : links ? [links] : [];
  if (!items.length) return "";
  const anchors = items
    .map(
      (url) =>
        `<a href="${escapeHtml(url)}" rel="noopener noreferrer">${escapeHtml(url)}</a>`,
    )
    .join("<br>\n");
  return `<section class="deck-links"><h2>Linkedin</h2>\n<p>${anchors}</p></section>`;
}

function isDeckDir(dirent) {
  if (!dirent.isDirectory()) return false;
  if (dirent.name.startsWith(".") || dirent.name === "assets" || dirent.name === "scripts") {
    return false;
  }
  return fs.existsSync(path.join(SLIDES_ROOT, dirent.name, "deck.md"));
}

export function listDecks() {
  if (!fs.existsSync(SLIDES_ROOT)) return [];
  return fs
    .readdirSync(SLIDES_ROOT, { withFileTypes: true })
    .filter(isDeckDir)
    .map((dirent) => loadDeck(dirent.name))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.slug.localeCompare(b.slug));
}

export function loadDeck(slug) {
  const dir = path.join(SLIDES_ROOT, slug);
  const raw = fs.readFileSync(path.join(dir, "deck.md"), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const pdf = data.pdf || "./deck.pdf";
  const cover = data.cover || "./cover.webp";
  return {
    slug,
    dir,
    title: data.title || slug,
    event: data.event || "",
    date: data.date || "",
    category: data.category || "",
    language: data.language || "",
    pdf,
    cover,
    external: data.external || "",
    speakerdeck: data.speakerdeck || "",
    linkedin: Array.isArray(data.linkedin) ? data.linkedin : [],
    body,
    description: descriptionPlain(body),
  };
}

export function pdfHref(deck) {
  if (/^https?:\/\//.test(deck.pdf)) return deck.pdf;
  return deck.pdf;
}

export function coverHref(deck) {
  if (/^https?:\/\//.test(deck.cover)) return deck.cover;
  return deck.cover;
}

export function absoluteUrl(pathname) {
  return `${SITE_ORIGIN}${pathname}`;
}

export function moreDecksHtml(currentSlug, decks = listDecks()) {
  const others = decks.filter((deck) => deck.slug !== currentSlug).slice(0, 3);
  if (!others.length) return "";
  const cards = others.map((deck, index) => galleryCardHtml(deck, { eager: index === 0 })).join("\n");
  return `<section class="more-decks">
  <div class="more-decks-head">
    <h2>More Decks by ${escapeHtml(AUTHOR_NAME)}</h2>
    <a class="see-all" href="/slides/">See All by ${escapeHtml(AUTHOR_NAME)}</a>
  </div>
  <div class="deck-grid">${cards}</div>
</section>`;
}

export function galleryCardHtml(deck, options = {}) {
  const href = `/slides/${deck.slug}/`;
  const cover = `/slides/${deck.slug}/${coverHref(deck).replace(/^\.\//, "")}`;
  const eager = options.eager
    ? ' fetchpriority="high" loading="eager"'
    : ' loading="lazy"';
  return `<a class="deck-card" href="${escapeHtml(href)}">
  <img class="deck-card-cover" src="${escapeHtml(cover)}" alt="" width="1280" height="720"${eager} decoding="async">
  <h3 class="deck-card-title">${escapeHtml(deck.title)}</h3>
  <p class="deck-card-meta">${escapeHtml(formatDateLabel(deck.date))}${deck.event ? ` · ${escapeHtml(deck.event)}` : ""}</p>
</a>`;
}
