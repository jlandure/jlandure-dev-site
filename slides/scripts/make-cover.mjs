#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const TARGET_WIDTH = 1280;
const WEBP_QUALITY = 80;

const here = path.dirname(fileURLToPath(import.meta.url));
const pdfjsRoot = path.join(here, "node_modules", "pdfjs-dist");

function usage() {
  console.error("Usage: node slides/scripts/make-cover.mjs <deck.pdf> [cover.webp]");
  process.exit(1);
}

const pdfPath = process.argv[2];
if (!pdfPath) usage();

const resolvedPdf = path.resolve(pdfPath);
if (!fs.existsSync(resolvedPdf)) {
  console.error(`PDF not found: ${resolvedPdf}`);
  process.exit(1);
}

const header = Buffer.alloc(5);
const fd = fs.openSync(resolvedPdf, "r");
fs.readSync(fd, header, 0, 5, 0);
fs.closeSync(fd);
if (header.toString("utf8") !== "%PDF-") {
  console.error(`Not a PDF: ${resolvedPdf}`);
  process.exit(1);
}

const outPath = path.resolve(
  process.argv[3] || path.join(path.dirname(resolvedPdf), "cover.webp"),
);

const data = new Uint8Array(fs.readFileSync(resolvedPdf));
const loadingTask = getDocument({
  data,
  cMapUrl: pathToFileURL(path.join(pdfjsRoot, "cmaps") + path.sep).href,
  cMapPacked: true,
  standardFontDataUrl: pathToFileURL(
    path.join(pdfjsRoot, "standard_fonts") + path.sep,
  ).href,
});

const pdfDocument = await loadingTask.promise;
const page = await pdfDocument.getPage(1);
const baseViewport = page.getViewport({ scale: 1 });
const scale = TARGET_WIDTH / baseViewport.width;
const viewport = page.getViewport({ scale });
const canvasFactory = pdfDocument.canvasFactory;
const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

await page.render({
  canvasContext: canvasAndContext.context,
  viewport,
}).promise;

let buffer;
try {
  buffer = canvasAndContext.canvas.toBuffer("image/webp", WEBP_QUALITY);
} catch {
  buffer = canvasAndContext.canvas.toBuffer("image/jpeg", WEBP_QUALITY);
  if (outPath.endsWith(".webp")) {
    console.warn("WebP encode unavailable, writing JPEG bytes to", outPath);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, buffer);
page.cleanup();
await pdfDocument.cleanup?.();

console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
