#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, SLIDES_ROOT, parseFrontmatter } from "./decks.mjs";
import { writeAllPages } from "./build-pages.mjs";
import { GCS_PROJECT, gcsObjectUri, gcsObjectUrl } from "./gcs.mjs";
import { runGcloud, setPdfUrl } from "./upload-pdf.mjs";

export const DATED_SLUG_RE = /^\d{4}-\d{2}-\d{2}-/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const MONTHS = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function inferDateFromConference(oldSlug) {
  const readme = fs.readFileSync(path.join(REPO_ROOT, "conference", "README.md"), "utf8");
  const escaped = oldSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const around = new RegExp(
    `_(\\d{4}) (${Object.keys(MONTHS).join("|")})_([\\s\\S]{0,800})${escaped}`,
  );
  const match = readme.match(around);
  if (!match) return "";
  return `${match[1]}-${MONTHS[match[2]]}-01`;
}

function deckDirs() {
  return fs
    .readdirSync(SLIDES_ROOT, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        !["assets", "scripts"].includes(dirent.name) &&
        fs.existsSync(path.join(SLIDES_ROOT, dirent.name, "deck.md")),
    )
    .map((dirent) => dirent.name);
}

function rewriteConference(oldSlug, newSlug) {
  const file = path.join(REPO_ROOT, "conference", "README.md");
  let text = fs.readFileSync(file, "utf8");
  const from = `/slides/${oldSlug}/`;
  const to = `/slides/${newSlug}/`;
  if (!text.includes(from)) return false;
  fs.writeFileSync(file, text.replaceAll(from, to));
  return true;
}

const dryRun = process.argv.includes("--dry-run");
const mappings = [];

for (const oldSlug of deckDirs()) {
  if (DATED_SLUG_RE.test(oldSlug)) {
    console.log(`SKIP already dated ${oldSlug}`);
    continue;
  }
  const mdPath = path.join(SLIDES_ROOT, oldSlug, "deck.md");
  const { data } = parseFrontmatter(fs.readFileSync(mdPath, "utf8"));
  let date = DATE_RE.test(data.date) ? data.date : inferDateFromConference(oldSlug);
  if (!DATE_RE.test(date)) {
    throw new Error(`No date for ${oldSlug}`);
  }
  const newSlug = `${date}-${oldSlug}`;
  if (fs.existsSync(path.join(SLIDES_ROOT, newSlug))) {
    throw new Error(`Target exists: ${newSlug}`);
  }
  mappings.push({ oldSlug, newSlug, date });
}

console.log(`${mappings.length} decks to rename`);

for (const { oldSlug, newSlug } of mappings) {
  if (dryRun) {
    console.log(`DRY ${oldSlug} -> ${newSlug}`);
    continue;
  }
  fs.renameSync(path.join(SLIDES_ROOT, oldSlug), path.join(SLIDES_ROOT, newSlug));
  await runGcloud([
    "storage",
    "mv",
    gcsObjectUri(oldSlug),
    gcsObjectUri(newSlug),
    `--project=${GCS_PROJECT}`,
  ]);
  setPdfUrl(path.join(SLIDES_ROOT, newSlug, "deck.md"), gcsObjectUrl(newSlug));
  rewriteConference(oldSlug, newSlug);
  console.log(`OK  ${oldSlug} -> ${newSlug}`);
}

if (!dryRun && mappings.length) {
  writeAllPages();
  console.log("Rebuilt gallery and deck pages");
}
