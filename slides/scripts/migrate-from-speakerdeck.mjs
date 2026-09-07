#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { REPO_ROOT, SLIDES_ROOT } from "./decks.mjs";
import { writeAllPages } from "./build-pages.mjs";

const USER = "jlandure";
const PROFILE = `https://speakerdeck.com/${USER}`;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
const DELAY_MS = 400;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function slugsFromConference() {
  const readme = fs.readFileSync(path.join(REPO_ROOT, "conference", "README.md"), "utf8");
  const slugs = new Set();
  const re = /https:\/\/speakerdeck\.com\/jlandure\/([a-z0-9-]+)/g;
  let match;
  while ((match = re.exec(readme))) {
    slugs.add(match[1]);
  }
  return slugs;
}

async function slugsFromProfile() {
  const slugs = new Set();
  for (let page = 1; page <= 20; page += 1) {
    const url = page === 1 ? PROFILE : `${PROFILE}?page=${page}`;
    const html = await fetchText(url);
    const found = [...html.matchAll(/href="\/jlandure\/([a-z0-9-]+)"/g)].map((m) => m[1]);
    const fresh = found.filter(
      (slug) =>
        !["following", "followers", "stars"].includes(slug) && !slugs.has(slug),
    );
    for (const slug of found) {
      if (!["following", "followers", "stars"].includes(slug)) slugs.add(slug);
    }
    if (!fresh.length && page > 1) break;
    await sleep(DELAY_MS);
  }
  return slugs;
}

function yamlQuote(value) {
  return `"${String(value).replaceAll('"', '\\"')}"`;
}

function stripTags(html) {
  return decodeHtml(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).trim();
}

function parseDeckPage(html, slug) {
  const title =
    decodeHtml(
      html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || slug,
    );
  const pdf = html.match(
    /title="Download PDF"[^>]*href="(https:\/\/files\.speakerdeck\.com\/presentations\/[^"]+\.pdf)"/,
  )?.[1];
  const descriptionHtml =
    html.match(/class="deck-description[^"]*"[\s\S]*?>([\s\S]*?)<div class="addendum"/)?.[1] ||
    "";
  const linkedin = [
    ...descriptionHtml.matchAll(/https:\/\/www\.linkedin\.com\/[^\s"'<]+/g),
  ].map((m) => decodeHtml(m[0]));
  const body = stripTags(
    descriptionHtml.replace(/<p>\s*Linkedin:[\s\S]*?<\/p>/i, ""),
  );
  const dateText =
    html.match(/datetime="(\d{4}-\d{2}-\d{2})"/)?.[1] ||
    html.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/)?.[1] ||
    "";
  let date = "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateText)) date = dateText;
  else if (dateText) {
    const parsed = new Date(dateText);
    if (!Number.isNaN(parsed.getTime())) {
      date = parsed.toISOString().slice(0, 10);
    }
  }
  const eventMatch = title.match(/@\s*(.+)$/);
  return {
    slug,
    title,
    pdf: pdf ? decodeHtml(pdf) : "",
    body,
    linkedin: [...new Set(linkedin)],
    date,
    event: eventMatch?.[1]?.trim() || "",
    speakerdeck: `https://speakerdeck.com/${USER}/${slug}`,
  };
}

function writeDeckMd(meta) {
  const lines = [
    "---",
    `title: ${yamlQuote(meta.title)}`,
    meta.event ? `event: ${yamlQuote(meta.event)}` : null,
    meta.date ? `date: ${meta.date}` : null,
    "category: Programming",
    "language: en",
    meta.pdf ? "pdf: ./deck.pdf" : `external: ${meta.speakerdeck}`,
    "cover: ./cover.webp",
    `speakerdeck: ${meta.speakerdeck}`,
  ].filter(Boolean);
  if (meta.linkedin.length) {
    lines.push("linkedin:");
    for (const url of meta.linkedin) lines.push(`  - ${url}`);
  }
  lines.push("---", "", meta.body || meta.title, "");
  const dir = path.join(SLIDES_ROOT, meta.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "deck.md"), lines.join("\n"));
}

async function downloadPdf(url, dest) {
  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) throw new Error(`${response.status} downloading ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.subarray(0, 5).toString() !== "%PDF-") {
    throw new Error(`Not a PDF: ${url}`);
  }
  fs.writeFileSync(dest, buffer);
  return buffer.length;
}

function runNode(script, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: path.dirname(script),
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited ${code}`));
    });
  });
}

function rewriteConferenceLinks(slugs) {
  const file = path.join(REPO_ROOT, "conference", "README.md");
  let text = fs.readFileSync(file, "utf8");
  for (const slug of slugs) {
    const from = `https://speakerdeck.com/jlandure/${slug}`;
    const to = `/slides/${slug}/ ':ignore'`;
    text = text.replaceAll(`/ [Slides](${from})`, `/ [Slides](${to})`);
    text = text.replaceAll(`Slides: ${from}`, `Slides: /slides/${slug}/`);
  }
  fs.writeFileSync(file, text);
}

const dryRun = process.argv.includes("--dry-run");
const skipDownload = process.argv.includes("--skip-existing");

const slugs = new Set([...slugsFromConference(), ...(await slugsFromProfile())]);
console.log(`Found ${slugs.size} unique Speaker Deck slugs`);

const ok = [];
const skipped = [];
const failed = [];

for (const slug of slugs) {
  const dir = path.join(SLIDES_ROOT, slug);
  const pdfPath = path.join(dir, "deck.pdf");
  try {
    const html = await fetchText(`https://speakerdeck.com/${USER}/${slug}`);
    const meta = parseDeckPage(html, slug);
    if (dryRun) {
      console.log(meta.pdf ? `OK  ${slug}` : `NO PDF  ${slug}`);
      continue;
    }
    writeDeckMd(meta);
    if (!meta.pdf) {
      skipped.push(slug);
      console.warn(`No download link: ${slug}`);
      await sleep(DELAY_MS);
      continue;
    }
    if (!(skipDownload && fs.existsSync(pdfPath))) {
      const bytes = await downloadPdf(meta.pdf, pdfPath);
      console.log(`PDF  ${slug} (${bytes} bytes)`);
    } else {
      console.log(`SKIP PDF  ${slug}`);
    }
    const coverPath = path.join(dir, "cover.webp");
    if (!fs.existsSync(coverPath)) {
      await runNode(path.join(path.dirname(fileURLToPath(import.meta.url)), "make-cover.mjs"), [
        pdfPath,
        coverPath,
      ]);
    }
    ok.push(slug);
  } catch (error) {
    failed.push(`${slug}: ${error.message}`);
    console.error(`FAIL ${slug}: ${error.message}`);
  }
  await sleep(DELAY_MS);
}

if (!dryRun) {
  writeAllPages();
  rewriteConferenceLinks(ok);
}

const pdfBytes = ok.reduce((sum, slug) => {
  const file = path.join(SLIDES_ROOT, slug, "deck.pdf");
  return sum + (fs.existsSync(file) ? fs.statSync(file).size : 0);
}, 0);
const budget = 300 * 1024 * 1024;
console.log(`Done. ok=${ok.length} skipped=${skipped.length} failed=${failed.length}`);
console.log(`PDF total: ${(pdfBytes / 1024 / 1024).toFixed(1)} MiB (budget 300 MiB)`);
if (pdfBytes > budget) {
  console.warn("Over budget: host PDFs on GCS and set pdf: to the public URL.");
}
if (failed.length) console.warn(failed.join("\n"));
