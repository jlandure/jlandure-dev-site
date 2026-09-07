#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { SLIDES_ROOT } from "./decks.mjs";
import { GCS_PROJECT, gcsObjectUri, gcsObjectUrl } from "./gcs.mjs";

export function runGcloud(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("gcloud", args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`gcloud exited ${code}`));
    });
  });
}

export function setPdfUrl(deckMdPath, url) {
  let text = fs.readFileSync(deckMdPath, "utf8");
  if (/^pdf:/m.test(text)) {
    text = text.replace(/^pdf:.*$/m, `pdf: ${url}`);
  } else {
    text = text.replace(/^(---\n)/, `$1pdf: ${url}\n`);
  }
  fs.writeFileSync(deckMdPath, text);
}

export async function uploadDeckPdf(slug, pdfPath = path.join(SLIDES_ROOT, slug, "deck.pdf")) {
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`PDF not found: ${pdfPath}`);
  }
  await runGcloud([
    "storage",
    "cp",
    pdfPath,
    gcsObjectUri(slug),
    `--project=${GCS_PROJECT}`,
    "--content-type=application/pdf",
    "--cache-control=public,max-age=86400",
  ]);
  const url = gcsObjectUrl(slug);
  const mdPath = path.join(SLIDES_ROOT, slug, "deck.md");
  if (fs.existsSync(mdPath)) setPdfUrl(mdPath, url);
  return url;
}

function listSlugs(only) {
  if (only) return [only];
  return fs
    .readdirSync(SLIDES_ROOT, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && fs.existsSync(path.join(SLIDES_ROOT, dirent.name, "deck.pdf")))
    .map((dirent) => dirent.name);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const only = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : "";
  const slugs = listSlugs(only);
  if (!slugs.length) {
    console.error("No deck.pdf found");
    process.exit(1);
  }
  for (const slug of slugs) {
    const url = await uploadDeckPdf(slug);
    console.log(`OK  ${slug} -> ${url}`);
  }
}
