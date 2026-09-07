const PDFJS_VERSION = "6.3.289";

const root = document.querySelector("[data-deck]");
if (!root) {
  throw new Error("Missing [data-deck] root");
}

const canvas = root.querySelector("[data-canvas]");
const statusEl = root.querySelector("[data-status]");
const prevBtn = root.querySelector("[data-prev]");
const nextBtn = root.querySelector("[data-next]");
const progressBar = root.querySelector("[data-progress]");
const shareBtn = root.querySelector("[data-share]");
const shareMenu = root.querySelector("[data-share-menu]");
const copyBtn = root.querySelector("[data-copy-link]");
const fullscreenBtn = root.querySelector("[data-fullscreen]");
const presentBtn = root.querySelector("[data-present]");

const pdfUrl = root.dataset.pdf;
const title = root.dataset.title || document.title;
let pdfDoc = null;
let pageNum = Number(new URL(location.href).searchParams.get("page")) || 1;
let rendering = false;
let pending = null;

function setStatus(message) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
}

function syncUrl() {
  const url = new URL(location.href);
  if (pageNum > 1) url.searchParams.set("page", String(pageNum));
  else url.searchParams.delete("page");
  history.replaceState(null, "", url);
}

function updateChrome() {
  const total = pdfDoc?.numPages || 1;
  if (prevBtn) prevBtn.disabled = pageNum <= 1;
  if (nextBtn) nextBtn.disabled = pageNum >= total;
  if (progressBar) progressBar.style.width = `${(pageNum / total) * 100}%`;
}

async function renderPage(num) {
  rendering = true;
  const page = await pdfDoc.getPage(num);
  const unscaled = page.getViewport({ scale: 1 });
  const maxWidth = Math.min(canvas.parentElement.clientWidth - 32, 1100);
  const maxHeight = document.body.classList.contains("is-present")
    ? Math.min(window.innerHeight * 0.82, 900)
    : Math.min(window.innerHeight * 0.56, 640);
  const scale = Math.min(maxWidth / unscaled.width, maxHeight / unscaled.height);
  const outputScale = window.devicePixelRatio || 1;
  const viewport = page.getViewport({ scale });
  const context = canvas.getContext("2d", { alpha: false });
  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;
  await page.render({
    canvasContext: context,
    viewport,
    transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
  }).promise;
  page.cleanup();
  rendering = false;
  if (pending) {
    const next = pending;
    pending = null;
    await renderPage(next);
  }
}

async function queuePage(num) {
  if (!pdfDoc) return;
  pageNum = Math.min(Math.max(num, 1), pdfDoc.numPages);
  updateChrome();
  syncUrl();
  if (rendering) {
    pending = pageNum;
    return;
  }
  await renderPage(pageNum);
}

function go(delta) {
  queuePage(pageNum + delta);
}

function shareUrl() {
  return location.href.split("#")[0];
}

async function nativeShare() {
  const url = shareUrl();
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  shareMenu?.classList.toggle("is-open");
}

async function copyLink() {
  const url = shareUrl();
  try {
    await navigator.clipboard.writeText(url);
    if (copyBtn) copyBtn.textContent = "Copied";
  } catch {
    window.prompt("Copy link", url);
  }
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await root.requestFullscreen?.();
  } else {
    await document.exitFullscreen?.();
  }
}

function setPresent(on) {
  document.body.classList.toggle("is-present", on);
  const url = new URL(location.href);
  if (on) url.searchParams.set("present", "1");
  else url.searchParams.delete("present");
  history.replaceState(null, "", url);
  if (pdfDoc) queuePage(pageNum);
}

prevBtn?.addEventListener("click", () => go(-1));
nextBtn?.addEventListener("click", () => go(1));
shareBtn?.addEventListener("click", nativeShare);
copyBtn?.addEventListener("click", copyLink);
fullscreenBtn?.addEventListener("click", toggleFullscreen);
presentBtn?.addEventListener("click", () => {
  setPresent(!document.body.classList.contains("is-present"));
});

document.addEventListener("click", (event) => {
  if (shareMenu && !shareMenu.contains(event.target)) {
    shareMenu.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.target.closest("input, textarea, [contenteditable]")) return;
  if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
    event.preventDefault();
    go(1);
  } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    go(-1);
  } else if (event.key === "f") {
    toggleFullscreen();
  } else if (event.key === "Escape" && document.body.classList.contains("is-present")) {
    setPresent(false);
  }
});

let touchX = null;
canvas?.addEventListener("touchstart", (event) => {
  touchX = event.changedTouches[0].clientX;
}, { passive: true });
canvas?.addEventListener("touchend", (event) => {
  if (touchX == null) return;
  const dx = event.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  touchX = null;
});

window.addEventListener("resize", () => {
  if (pdfDoc) queuePage(pageNum);
});

if (new URL(location.href).searchParams.get("present") === "1") {
  document.body.classList.add("is-present");
}

setStatus("Loading slides…");

const pdfjs = await import(
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.min.mjs`
);
pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

try {
  pdfDoc = await pdfjs.getDocument({
    url: pdfUrl,
    disableRange: true,
    disableStream: true,
  }).promise;
  pageNum = Math.min(Math.max(pageNum, 1), pdfDoc.numPages);
  setStatus("");
  await queuePage(pageNum);
} catch (error) {
  console.error(error);
  setStatus("Unable to load this PDF in the browser.");
}
