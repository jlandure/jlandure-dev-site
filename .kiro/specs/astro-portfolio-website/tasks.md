# Implementation Plan: astro-portfolio-website

## Overview

Incrementally build the Astro portfolio site from project scaffold through content migration, design system, SEO, analytics, and deployment pipeline. Each task builds on the previous and ends with all code wired together.

## Tasks

- [ ] 1. Scaffold Astro project and configure TypeScript
  - Initialize Astro project with `output: 'static'` in `astro.config.mjs`
  - Configure `tsconfig.json` for strict TypeScript
  - Install dependencies: `astro`, `@astrojs/sitemap`, `fast-check`, `vitest`
  - Create `src/` directory structure: `layouts/`, `components/`, `pages/`, `content/`, `styles/`
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 2. Implement design system and base layout
  - [ ] 2.1 Create `src/styles/global.css` with CSS custom properties for colors, typography, spacing, and `[data-theme="dark"]` overrides
    - Include `font-display: swap` for web font loading
    - _Requirements: 13.1, 13.5, 13.6_

  - [ ] 2.2 Create `src/components/SEO.astro` with `<title>`, `<meta name="description">`, and Open Graph tags
    - _Requirements: 14.1, 14.2_

  - [ ] 2.3 Create `src/components/Header.astro` with nav links to all 9 sections and active state logic via `Astro.url.pathname`
    - _Requirements: 12.1, 12.3, 12.4_

  - [ ] 2.4 Create `src/components/Footer.astro` with LinkedIn, GitHub, SpeakerDeck links and site domain
    - _Requirements: 12.2_

  - [ ] 2.5 Create `src/components/ThemeToggle.astro` as a client island that reads/writes `data-theme` on `<html>` and respects `prefers-color-scheme`
    - _Requirements: 13.5_

  - [ ] 2.6 Create `src/layouts/BaseLayout.astro` composing SEO, Header, ThemeToggle, Footer, and global CSS import
    - _Requirements: 12.1, 12.2, 14.1, 14.2_

  - [ ]* 2.7 Write property test for Property 3: every page has all required meta tags
    - **Property 3: Every page has all required meta tags**
    - **Validates: Requirements 14.1, 14.2**

  - [ ]* 2.8 Write property test for Property 6: every page has persistent nav and footer
    - **Property 6: Every page has persistent nav and footer**
    - **Validates: Requirements 12.1, 12.2**

  - [ ]* 2.9 Write property test for Property 7: active nav state is set correctly per section page
    - **Property 7: Active nav state is set correctly per section**
    - **Validates: Requirements 12.3**

- [ ] 3. Implement blog content collection and pages
  - [ ] 3.1 Create `src/content/config.ts` with the blog collection schema (title, date, excerpt, published_in, read_time)
    - _Requirements: 2.1_

  - [ ] 3.2 Create a remark plugin (`src/lib/remarkBlogMeta.ts`) that extracts title from the first `# Heading` and date from the filename; configure it in `astro.config.mjs`
    - _Requirements: 2.1, 2.6_

  - [ ] 3.3 Symlink or copy `blog/*.md` into `src/content/blog/` so the content collection picks them up
    - _Requirements: 2.1, 2.4_

  - [ ] 3.4 Create `src/components/BlogCard.astro` rendering title, date, and excerpt
    - _Requirements: 2.2_

  - [ ] 3.5 Create `src/pages/blog/index.astro` with paginated list of posts sorted by date descending using `BlogCard`
    - _Requirements: 2.2_

  - [ ] 3.6 Create `src/pages/blog/[slug].astro` rendering full post content with human-readable date and per-post SEO metadata
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 14.5_

  - [ ]* 3.7 Write property test for Property 1: blog posts sorted by date descending
    - **Property 1: Blog posts sorted by date descending**
    - **Validates: Requirements 2.2**

  - [ ]* 3.8 Write property test for Property 2: every blog post has a rendered page with content and human-readable date
    - **Property 2: Every blog post has a rendered page with content and human-readable date**
    - **Validates: Requirements 2.3, 2.6**

  - [ ]* 3.9 Write property test for Property 13: content collection entries exist for every blog markdown file
    - **Property 13: Content collection covers all blog files**
    - **Validates: Requirements 2.1**

- [ ] 4. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement content parsers for non-blog sections
  - [ ] 5.1 Create `src/lib/parseConference.ts` that reads `conference/README.md` and returns `ConferenceEntry[]`
    - Handle optional fields (slidesUrl, videoUrl, description, attendees, imageUrl) gracefully
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 5.2 Create `src/lib/parseWorkshop.ts` that reads `workshop/README.md` and returns `WorkshopEntry[]`
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ] 5.3 Create `src/lib/parseLive.ts` that reads `live/README.md` and returns `LiveEntry[]`
    - _Requirements: 8.1, 8.2_

  - [ ] 5.4 Create `src/lib/parseExternal.ts` that reads `external/README.md` and returns `ExternalEntry[]`
    - Validate all external URLs as absolute before rendering
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 5.5 Create `src/lib/parseCertifications.ts` that reads `certifications/README.md` and returns `CertificationEntry[]`
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 5.6 Create `src/lib/parseAwards.ts` that reads `awards/README.md` and returns `AwardEntry[]`
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ] 5.7 Create `src/lib/parseOpenSource.ts` that reads `opensource/README.md` and returns `OpenSourceEntry[]`
    - _Requirements: 9.1, 9.2_

  - [ ]* 5.8 Write unit tests for all parsers using representative fixture inputs
    - Test `parseConference`, `parseWorkshop`, `parseLive`, `parseExternal`, `parseCertifications`, `parseAwards`, `parseOpenSource` with known inputs
    - _Requirements: 4.1, 5.1, 7.1, 8.1, 9.1, 10.1, 11.1_

- [ ] 6. Implement section pages and shared components
  - [ ] 6.1 Create `src/components/TagBadge.astro` with variant-based CSS classes for all role/type tags
    - _Requirements: 5.5, 7.2, 8.2, 10.3_

  - [ ] 6.2 Create `src/components/ExpandableDetail.astro` rendering `<details>/<summary>` for talk descriptions
    - _Requirements: 5.4_

  - [ ] 6.3 Create `src/pages/conference.astro` using `parseConference`, grouped by year descending, with `TagBadge` and `ExpandableDetail`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 6.4 Create `src/pages/workshops.astro` using `parseWorkshop`, grouped by year descending, with Official Trainer `TagBadge`
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ] 6.5 Create `src/pages/live.astro` using `parseLive`, grouped by year descending, with Music/Sport `TagBadge`
    - _Requirements: 8.1, 8.2_

  - [ ] 6.6 Create `src/pages/external.astro` using `parseExternal`, with type `TagBadge` and external links (`target="_blank" rel="noopener noreferrer"`)
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 6.7 Create `src/pages/certifications.astro` using `parseCertifications` with badge links
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 6.8 Create `src/pages/awards.astro` using `parseAwards` with description rendering
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ] 6.9 Create `src/pages/opensource.astro` using `parseOpenSource` with GitHub links and stats
    - _Requirements: 9.1, 9.2_

  - [ ]* 6.10 Write property test for Property 8: conference entries render with all data fields, links, and role tags
    - **Property 8: Conference entries render completely**
    - **Validates: Requirements 5.1, 5.3, 5.4, 5.5**

  - [ ]* 6.11 Write property test for Property 9: workshop entries render with Official Trainer distinction
    - **Property 9: Workshop Official Trainer entries are distinguished**
    - **Validates: Requirements 10.1, 10.3**

  - [ ]* 6.12 Write property test for Property 10: certification entries render with badge links
    - **Property 10: Certification entries render with badge links**
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 6.13 Write property test for Property 11: external entries render with correct external link attributes
    - **Property 11: External links have correct attributes**
    - **Validates: Requirements 7.1, 7.3**

- [ ] 7. Implement CV page and home page
  - [ ] 7.1 Create `src/pages/cv.astro` rendering `cv/README.md` content with work experience in reverse chronological order, education, languages, and certifications from `parseCertifications` (same data source as `/certifications`)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 7.2 Create `src/pages/index.astro` with hero section (profile photo with WebP `<picture>`, name, title, GDE status), short bio from `bio/bio-en.md`, and links to key sections
    - Use `<Image>` from `astro:assets` for WebP optimization and responsive `
srcset`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 12.5, 13.3_

  - [ ]* 7.3 Write property test for Property 12: CV and certifications page share the same certification data
    - **Property 12: CV and certifications share data**
    - **Validates: Requirements 6.4**

  - [ ]* 7.4 Write unit tests for home page and CV page
    - Assert hero section, bio text, profile photo `<img>`, and section links in `dist/index.html`
    - Assert CV page contains work experience, education, and certifications sections
    - _Requirements: 3.1, 3.2, 6.1, 6.2, 6.3, 6.4_

- [ ] 8. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Add SEO, sitemap, robots.txt, and analytics
  - [ ] 9.1 Configure `@astrojs/sitemap` in `astro.config.mjs` with `site` set to `https://jlandure.dev`
    - _Requirements: 14.3_

  - [ ] 9.2 Create `public/robots.txt` with `Allow: /` and `Sitemap:` directive
    - _Requirements: 14.4_

  - [ ] 9.3 Add Umami analytics script (`eu.umami.is`, `data-website-id="2f1e79be-313e-4f52-891f-c186ab603162"`) and Screeb feedback script (init ID `02232de0-8346-4185-902e-6c9391ea11f9`) to `BaseLayout.astro`
    - _Requirements: 16.1, 16.2, 16.3_

  - [ ] 9.4 Create `src/pages/404.astro` with a friendly not-found page using `BaseLayout`
    - _Requirements: 2.5_

  - [ ]* 9.5 Write property test for Property 4: sitemap.xml contains a URL for every generated page
    - **Property 4: sitemap.xml contains all page URLs**
    - **Validates: Requirements 14.3**

  - [ ]* 9.6 Write property test for Property 5: every page includes both tracking scripts with correct IDs
    - **Property 5: Every page includes both tracking scripts**
    - **Validates: Requirements 16.1, 16.2**

  - [ ]* 9.7 Write unit tests for robots.txt and 404 page
    - Assert `dist/robots.txt` contains `Allow: /`
    - Assert `dist/404.html` exists
    - _Requirements: 2.5, 14.4_

- [ ] 10. Implement responsive design and accessibility
  - [ ] 10.1 Add responsive CSS to `global.css` and all page/component styles ensuring correct rendering from 320px to 1920px
    - _Requirements: 13.2_

  - [ ] 10.2 Add mobile nav toggle logic to `Header.astro` (hamburger menu for small viewports) as a client island
    - _Requirements: 12.1, 13.2_

  - [ ] 10.3 Add CSS transitions/animations for hover states on interactive elements; ensure `prefers-reduced-motion` is respected
    - _Requirements: 13.4_

  - [ ] 10.4 Audit all interactive elements for keyboard focus indicators and correct tab order
    - _Requirements: 12.4_

  - [ ]* 10.5 Write unit tests for dark mode and font loading
    - Assert `global.css` contains `[data-theme="dark"]` block
    - Assert CSS contains `font-display: swap`
    - Assert home page `<picture>` contains a `.webp` source
    - _Requirements: 13.3, 13.5, 13.6_

- [ ]* 11. Set up GitHub Actions deployment pipeline — SKIPPED (manual deployment, not automated)
  - [ ]* 11.1 Create `.github/workflows/deploy.yml` that runs `npm run build`, syncs `dist/` to the S3 bucket with `--delete`, and creates a CloudFront invalidation for `/*`
    - Use GitHub Actions secrets for `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`
    - _Requirements: 15.1, 15.5_

  - [ ]* 11.2 Add a build smoke test step in the workflow that asserts `dist/` is non-empty and `dist/index.html` exists
    - _Requirements: 1.3_

  - [ ]* 11.3 Write unit test for build smoke: run `astro build` and assert exit code 0 and non-empty `dist/`
    - _Requirements: 1.3_

- [ ] 12. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations and run against the built `dist/` output
- Unit tests use `vitest`
- Checkpoints ensure incremental validation before moving to the next phase
