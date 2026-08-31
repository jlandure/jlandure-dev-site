---
name: add-conference-talk
description: >-
  Adds or updates a talk, conference, meetup or speaking entry in
  conference/README.md using the existing HTML+markdown list format (tags,
  details, Speaker Deck slides, YouTube playlist videos, LinkedIn, attendees,
  image). Use when the user adds a talk, conference, meetup, speaker session,
  slides, Speakerdeck, video YouTube, or an entry under conference/.
metadata:
  author: jlandure
  version: "1.0"
---

# Add conference talk

Source of truth: `conference/README.md` only. Do not create `conference/YYYY-MM-DD Event.md` files.

Read the top of `conference/README.md` before editing. Copy the structure of a nearby entry of the same type (speaker talk, attendee, podcast, organizer).

## Workflow

1. Collect date, event name, event URL, role, talk title, location or remote, duration, attendees, slides, video, LinkedIn, GitHub, description, image.
2. Do not invent a location, attendee count, event URL, image, or duration. Omit unknown optional fields.
3. Insert the entry at the top of the matching `## YYYY` section (newest first). Create the year heading if missing.
4. Confirm the Speaker Deck URL is the deck for **this** event, not a reuse of another event's slug.

## Entry skeleton

```markdown
- _YYYY Mon_ [Event Name](https://event-url)
<span class="detail-tag">Speaker</span>
```

With an on-site location and duration:

```markdown
- _YYYY Mon_ [Event Name](https://event-url) - 🇫🇷 Nantes, France (1d)
```

Month is English 3-letter: `Jan` `Feb` `Mar` `Apr` `May` `Jun` `Jul` `Aug` `Sep` `Oct` `Nov` `Dec`.

Duration is `(1d)` `(2d)` `(3d)` only for on-site multi-day or full-day events, when known.

## Remote

If the event is remote / online:

- No location suffix. Do **not** write `- 🇧🇫 Ouagadougou, Burkina Faso` or any host-city location.
- No duration suffix unless the user asks for it.
- Add `<span class="detail-tag">Remote</span>`.

## Tags

One tag per line, immediately after the event line. Known values:

`Speaker` `Attendee` `Meetup` `Meetup Speaker` `Podcast` `Enterprise` `Remote` `DevFest Organizer` `TechReady Organizer`

"Public speaking" → `Speaker`. Meetup + talk → `Meetup` + `Speaker` (or `Meetup Speaker` if that is what nearby entries use).

## Speaker talk block

```markdown
- _2025 Oct_ [DevFest Afrique Francophone](https://gdg.community.dev/events/details/google-gdg-ouaga-presents-devfest-afrique-francophone-2025/)
<span class="detail-tag">Remote</span>
<span class="detail-tag">Speaker</span>
<br><details><summary>Talk title / [Slides](https://speakerdeck.com/jlandure/slug-at-event) / [Video](https://www.youtube.com/watch?v=VIDEO_ID&list=PLdVDu8iO6zrMurVwGrFR23uw5OtGh4vFx)
</summary>
<span><em>
Attendees: 40<br>
Github source code: https://github.com/jlandure/repo
Linkedin: https://www.linkedin.com/posts/jlandure_...
Talk description in the talk language, as provided.
</em>
<img src="https://storage.googleapis.com/advocu-app/images/...">
</span>
</details>
```

Keep the HTML exactly: `details` / `summary` / `<span><em>` / optional `<img>` / closing tags. Description lines sit inside `<em>` with no extra blank lines.

Co-speaker goes in the summary: `Talk title with [Name](https://linkedin.com/in/...) / [Slides](...)`.

## Slides (Speaker Deck)

- URL shape: `https://speakerdeck.com/jlandure/{talk-slug}-at-{event-slug}`
- Put the link in the summary as `/ [Slides](url)`, never only in the description body.
- Each event has its own deck. A talk given at GDG Cloud Nantes and at DevFest Afrique Francophone uses two different Speaker Deck URLs.

## Video (YouTube)

- Put the link in the summary as `/ [Video](url)`.
- Always attach Julien's talks playlist: `list=PLdVDu8iO6zrMurVwGrFR23uw5OtGh4vFx`
- Keep `&t=` if the user provides a start time. Keep `&index=` if already known.
- Canonical form: `https://www.youtube.com/watch?v=VIDEO_ID&list=PLdVDu8iO6zrMurVwGrFR23uw5OtGh4vFx`
- Podcast / simple video without a details block:

```markdown
<br>Title / [Video](https://www.youtube.com/watch?v=VIDEO_ID&list=PLdVDu8iO6zrMurVwGrFR23uw5OtGh4vFx)
```

## Details body

Order when present:

1. `Attendees: N<br>`
2. `Github source code: url`
3. `Linkedin: url` (repeat the line for each post)
4. Optional extra context (one short sentence about the event)
5. Talk abstract, unchanged

Other optional prefixes already used: `Twitter:`, `Blog "…"` as a sibling line after tags (no details block required).

## Image

- Prefer a stable Advocu URL: `https://storage.googleapis.com/advocu-app/images/...`
- LinkedIn CDN (`media.licdn.com/...`) expires — use only if that is what the user gives and no Advocu URL exists.
- Omit `<img>` if there is no image. Never invent a URL.

## Attendee-only

No `details` block unless there is a blog, photo, or extra note:

```markdown
- _2025 May_ [Google Cloud Summit](https://cloudonair.withgoogle.com/events/summit-france-2025) - 🇫🇷 Paris, France (1d)
<span class="detail-tag">Attendee</span>
```

## Checklist

- [ ] Entry is in `conference/README.md`, newest-first under the right year
- [ ] Remote entries have no location string
- [ ] Speaker Deck URL is event-specific
- [ ] YouTube URL includes the talks playlist
- [ ] Tags match an existing `detail-tag` value
- [ ] HTML `details` / `summary` / `em` / `img` structure matches neighbors
