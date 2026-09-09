# Agent notes

## Start the app

```bash
live-server .
```

Serves the Docsify site at http://127.0.0.1:8080.

## Skills

Two project skills live in `.agents/skills/`. Read and follow the matching skill before editing those files.

- **add-conference-talk** — add or update a talk in `conference/README.md` (tags, location, details, slides, video).
- **add-slide-deck** — add or update a PDF under `slides/` (`deck.md`, cover, GCS upload, generated HTML).

A talk with both an entry and a PDF needs **both** skills. Co-speakers live only in the conference `summary` as `with [Name](url)` on the same line as `[Slides]`. Then run `node slides/scripts/build-pages.mjs`. Do not put speakers in `deck.md`. Do not commit `deck.pdf`.

## Location

Every conference and workshop line needs a place: `- 🇫🇷 Nantes, France` (or another city) or `- 💻 Remote`. No `Remote` detail-tag.
