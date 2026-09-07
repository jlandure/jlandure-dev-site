#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { SLIDES_ROOT } from "./decks.mjs";
import { writeAllPages } from "./build-pages.mjs";
import { gcsObjectUrl } from "./gcs.mjs";
import { uploadDeckPdf } from "./upload-pdf.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return "";
  return process.argv[index + 1] || "";
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

function run(script, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: here,
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(script)} exited ${code}`));
    });
  });
}

const DATED_SLUG_RE = /^\d{4}-\d{2}-\d{2}-/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const pdf = arg("pdf");
const title = arg("title");
const date = arg("date");
if (!pdf || !title || !date) {
  console.error(
    "Usage: node slides/scripts/add-deck.mjs --pdf file.pdf --title \"Talk\" --date YYYY-MM-DD [--slug talk-at-event] [--event Event] [--category Programming] [--language fr]",
  );
  process.exit(1);
}
if (!DATE_RE.test(date)) {
  console.error("date must be YYYY-MM-DD");
  process.exit(1);
}

const rawSlug = arg("slug") || slugify(title);
const slug = DATED_SLUG_RE.test(rawSlug) ? rawSlug : `${date}-${rawSlug.replace(DATED_SLUG_RE, "")}`;
if (!DATED_SLUG_RE.test(slug)) {
  console.error("slug must start with YYYY-MM-DD-");
  process.exit(1);
}
const destDir = path.join(SLIDES_ROOT, slug);
const destPdf = path.join(destDir, "deck.pdf");
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(path.resolve(pdf), destPdf);

const header = Buffer.alloc(5);
const fd = fs.openSync(destPdf, "r");
fs.readSync(fd, header, 0, 5, 0);
fs.closeSync(fd);
if (header.toString("utf8") !== "%PDF-") {
  console.error("Source is not a PDF");
  process.exit(1);
}

await run(path.join(here, "make-cover.mjs"), [destPdf, path.join(destDir, "cover.webp")]);

if (!fs.existsSync(path.join(destDir, "cover.webp"))) {
  console.error("Cover generation failed");
  process.exit(1);
}

const event = arg("event");
const category = arg("category") || "Programming";
const language = arg("language") || "fr";
const body = arg("body") || title;
const speakerdeck = arg("speakerdeck");

const lines = [
  "---",
  `title: "${title.replaceAll('"', '\\"')}"`,
  event ? `event: "${event.replaceAll('"', '\\"')}"` : null,
  date ? `date: ${date}` : null,
  `category: ${category}`,
  `language: ${language}`,
  `pdf: ${gcsObjectUrl(slug)}`,
  "cover: ./cover.webp",
  speakerdeck ? `speakerdeck: ${speakerdeck}` : null,
  "---",
  "",
  body,
  "",
].filter((line) => line !== null);

fs.writeFileSync(path.join(destDir, "deck.md"), lines.join("\n"));
await uploadDeckPdf(slug, destPdf);
writeAllPages();
console.log(`Deck ready: /slides/${slug}/`);
console.log(`PDF: ${gcsObjectUrl(slug)}`);
