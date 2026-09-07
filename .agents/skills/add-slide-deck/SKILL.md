---
name: add-slide-deck
description: >-
  Adds or updates a PDF slide deck on jlandure.dev/slides using deck.md,
  make-cover.mjs and generated HTML (Speaker Deck clone). Use when the user
  adds a talk PDF, slides, Speaker Deck deck, cover, or an entry under slides/.
metadata:
  author: jlandure
  version: "1.0"
---

# Add slide deck

Source of truth: `slides/<slug>/deck.md` plus a local `deck.pdf` used only to generate the cover, then uploaded to GCS. Generated files (`index.html`, `slides/index.html`, `cover.webp`) are produced by scripts — do not hand-edit them.

## GCP / GCS

- Project: `jlandure-dev-slides`
- Bucket: `gs://jlandure-dev-slides` (europe-west1, uniform bucket-level access)
- Object path: `gs://jlandure-dev-slides/slides/<YYYY-MM-DD-slug>/deck.pdf`
- Public URL: `https://storage.googleapis.com/jlandure-dev-slides/slides/<YYYY-MM-DD-slug>/deck.pdf`
- Public IAM: `allUsers` → `roles/storage.legacyObjectReader` only (GET object, no list, no write)
- CORS: `GET`/`HEAD` from any origin
- Auth for upload: `gcloud auth login` (already done). Use `--project=jlandure-dev-slides`.

```bash
gcloud storage cp slides/<YYYY-MM-DD-slug>/deck.pdf \
  gs://jlandure-dev-slides/slides/<YYYY-MM-DD-slug>/deck.pdf \
  --project=jlandure-dev-slides \
  --content-type=application/pdf \
  --cache-control=public,max-age=86400
```

Do not commit `deck.pdf`. Keep `cover.webp` in git.

Do not invent a title, date, event, LinkedIn URL, or description. Omit unknown optional fields.

## Workflow

1. Collect the PDF path, title, **date (`YYYY-MM-DD` obligatoire)**, event, category, language, LinkedIn URLs, description, optional Speaker Deck URL.
2. Slug final : `YYYY-MM-DD-` + Speaker Deck slug (ou `talk-title-at-event`). Example: `2026-06-11-kiro-ne-codez-plus-seul-pilotez-vos-agents-de-code-at-aws-nantes`. Refuse any folder that does not match `^\d{4}-\d{2}-\d{2}-`.
3. Copy the PDF to `slides/<YYYY-MM-DD-slug>/deck.pdf`. Confirm the file starts with `%PDF-`.
4. Prefer `add-deck.mjs` (`--date` required; prefixes the slug):

```bash
node slides/scripts/add-deck.mjs --pdf /path/to/file.pdf --title "Talk title" --date 2026-06-11 --slug kiro-ne-codez-plus-seul-pilotez-vos-agents-de-code-at-aws-nantes --event "AWS Nantes" --category Programming --language fr
```

Manual equivalent: `node slides/scripts/make-cover.mjs …` then `node slides/scripts/upload-pdf.mjs <YYYY-MM-DD-slug>`.
5. If you used `add-deck.mjs`, edit `deck.md` to add LinkedIn links and the real description (the script only writes a stub body).
6. Refuse to continue if `cover.webp` is missing.
7. Confirm `pdf:` is the GCS URL in the schema below.
8. Rebuild pages if you edited `deck.md` by hand:

```bash
node slides/scripts/build-pages.mjs
```

9. If this deck belongs to a conference talk, change only the Slides link in `conference/README.md`:

```markdown
/ [Slides](/slides/YYYY-MM-DD-talk-at-event/ ':ignore')
```

Keep the Speaker Deck URL in `speakerdeck:` frontmatter as a mirror. Do not rewrite event-name links that happen to point at Speaker Deck.

## deck.md schema

```markdown
---
title: "Talk title @Event"
event: Event Name
date: YYYY-MM-DD
category: Programming
language: fr
pdf: https://storage.googleapis.com/jlandure-dev-slides/slides/YYYY-MM-DD-talk-at-event/deck.pdf
cover: ./cover.webp
speakerdeck: https://speakerdeck.com/jlandure/the-slug
linkedin:
  - https://www.linkedin.com/posts/...
---

Description in the talk language, as provided.
```

`pdf:` is always the GCS URL. Optional: `cover: ./custom.webp` if Julien supplies an image. `external:` if there is no downloadable PDF.

## Checklist

- [ ] Slug is `YYYY-MM-DD-…`
- [ ] Local `deck.pdf` is a real PDF, uploaded to `gs://jlandure-dev-slides/slides/<YYYY-MM-DD-slug>/deck.pdf`
- [ ] `pdf:` in `deck.md` is the `storage.googleapis.com` URL
- [ ] `cover.webp` exists and was generated from page 1
- [ ] `deck.pdf` is not committed
- [ ] `deck.md` has title + date; no invented fields
- [ ] `node slides/scripts/build-pages.mjs` regenerated the deck page and gallery
- [ ] Conference `[Slides]` link uses `/slides/<slug>/ ':ignore'` so Docsify does not hash-route it
