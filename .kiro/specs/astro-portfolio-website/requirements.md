# Requirements Document

## Introduction

Rebuild Julien Landuré's personal portfolio website (jlandure.dev) as a modern, visually impressive static site using the Astro framework. The new site must migrate all existing content (50+ blog posts, bio, certifications, conference talks, CV, external appearances, live sessions, open source contributions, workshops, awards) from the current Docsify-based setup into a fully designed Astro SSG site, deployed on AWS (S3 + CloudFront).

## Glossary

- **Site**: The Astro-based portfolio website at jlandure.dev
- **Visitor**: Any person browsing the portfolio website
- **Content_Loader**: The Astro content collections system responsible for reading and parsing markdown source files
- **Blog_Post**: A markdown file from the `blog/` directory representing a published article
- **Section**: A top-level content area of the site (Blog, Bio, Certifications, Conference, CV, External, Live, Open Source, Workshops, Awards)
- **Static_Build**: The Astro SSG build process that outputs a fully static HTML/CSS/JS site
- **CDN**: The AWS CloudFront distribution serving the static site
- **S3_Bucket**: The AWS S3 bucket storing the static build output
- **Deployment_Pipeline**: The CI/CD process that builds and pushes the static output to S3

---

## Requirements

### Requirement 1: Astro Framework and Static Site Generation

**User Story:** As the site owner, I want the portfolio rebuilt with Astro so that I get a modern, fast, statically generated site with excellent developer experience.

#### Acceptance Criteria

1. THE Site SHALL be built using Astro with the `output: 'static'` configuration (SSG mode).
2. THE Static_Build SHALL produce a fully self-contained static output directory containing only HTML, CSS, JavaScript, and asset files with no server-side runtime dependencies.
3. WHEN the `astro build` command is executed, THE Static_Build SHALL complete without errors and produce a deployable artifact.
4. THE Site SHALL achieve a Lighthouse performance score of 90 or above on the home page when tested against the production build.
5. THE Site SHALL use TypeScript for all Astro component logic and configuration files.

---

### Requirement 2: Content Migration — Blog

**User Story:** As a visitor, I want to read Julien's blog posts so that I can learn from his technical articles and insights.

#### Acceptance Criteria

1. THE Content_Loader SHALL parse all markdown files in the `blog/` directory and expose them as typed Astro content collection entries.
2. WHEN a visitor navigates to `/blog`, THE Site SHALL display a paginated list of all Blog_Posts sorted by date descending, showing title, date, and a short excerpt per post.
3. WHEN a visitor navigates to `/blog/[slug]`, THE Site SHALL render the full Blog_Post content with proper HTML typography.
4. THE Site SHALL generate a static page for each of the 50+ Blog_Posts at build time.
5. IF a requested blog slug does not exist, THEN THE Site SHALL return a 404 page.
6. THE Site SHALL display the publication date on each Blog_Post page in a human-readable format (e.g., "March 28, 2023").

---

### Requirement 3: Content Migration — Bio and Profile

**User Story:** As a visitor, I want to read Julien's professional bio so that I can understand who he is and what he does.

#### Acceptance Criteria

1. THE Site SHALL display the English bio from `bio/bio-en.md` on the home page or a dedicated `/about` page.
2. THE Site SHALL display the French bio from `bio/bio-fr.md` alongside or accessible from the English bio.
3. THE Site SHALL display the profile photo (`jlandure-450x450.jpg`) in a visually prominent position on the home/about page.
4. THE Site SHALL include Julien's current title (Co-Founder & CTO at TechTown), Google Developer Expert status, and community leadership roles (GDG Nantes, DevFest Nantes, TechReady) in the hero or bio section.

---

### Requirement 4: Content Migration — Certifications

**User Story:** As a visitor, I want to see Julien's certifications so that I can assess his technical credentials.

#### Acceptance Criteria

1. THE Site SHALL render all certification entries from `certifications/README.md` on a `/certifications` page or within the CV section.
2. WHEN a certification entry includes a Credly or external badge URL, THE Site SHALL render it as a clickable link.
3. THE Site SHALL display the issuing organization and issue date for each certification.

---

### Requirement 5: Content Migration — Conference Talks

**User Story:** As a visitor, I want to browse Julien's conference speaking history so that I can understand his expertise and community involvement.

#### Acceptance Criteria

1. THE Site SHALL render all conference entries from `conference/README.md` on a `/conference` page, grouped by year descending.
2. THE Site SHALL display the event name, location (with flag emoji), date, and speaker role tag for each entry.
3. WHEN a conference entry includes slides or video links, THE Site SHALL render them as accessible links.
4. WHEN a conference entry includes a details/summary block, THE Site SHALL render the talk description in an expandable section.
5. THE Site SHALL visually distinguish between Speaker, Attendee, Organizer, and Meetup roles using styled tags.

---

### Requirement 6: Content Migration — CV / Resume

**User Story:** As a recruiter or collaborator, I want to view Julien's full CV so that I can evaluate his professional background.

#### Acceptance Criteria

1. THE Site SHALL render the full CV content from `cv/README.md` on a `/cv` page.
2. THE Site SHALL display work experience entries in reverse chronological order with company name, role, and date range.
3. THE Site SHALL include the education and language sections from the CV.
4. THE Site SHALL include the certifications section within the CV page by referencing the same data source as Requirement 4.

---

### Requirement 7: Content Migration — External Appearances

**User Story:** As a visitor, I want to see Julien's media appearances so that I can find interviews, radio, and TV features.

#### Acceptance Criteria

1. THE Site SHALL render all external appearance entries from `external/README.md` on an `/external` page.
2. THE Site SHALL display the appearance type (Radio, Television, Podcast, Newspaper) as a styled tag for each entry.
3. WHEN an external entry includes a direct link, THE Site SHALL render it as an accessible external link opening in a new tab.

---

### Requirement 8: Content Migration — Live Sessions (Music & Sport)

**User Story:** As a visitor, I want to see Julien's live event attendance log so that I can get a sense of his personality and interests.

#### Acceptance Criteria

1. THE Site SHALL render all live event entries from `live/README.md` on a `/live` page, grouped by year descending.
2. THE Site SHALL display the event name, venue, location, date, and category tag (Music or Sport) for each entry.

---

### Requirement 9: Content Migration — Open Source Contributions

**User Story:** As a developer, I want to see Julien's open source projects so that I can explore his contributions to the community.

#### Acceptance Criteria

1. THE Site SHALL render all open source entries from `opensource/README.md` on an `/opensource` page.
2. THE Site SHALL display the project name, description, GitHub link, and stats (stars, downloads) for each project.

---

### Requirement 10: Content Migration — Workshops and Training

**User Story:** As a visitor, I want to see Julien's training and workshop history so that I can understand his teaching experience.

#### Acceptance Criteria

1. THE Site SHALL render all workshop entries from `workshop/README.md` on a `/workshops` page, grouped by year descending.
2. THE Site SHALL display the training title, location, language flag, duration, and attendee count for each entry.
3. THE Site SHALL visually distinguish Official Trainer entries from other workshop entries.

---

### Requirement 11: Content Migration — Awards

**User Story:** As a visitor, I want to see Julien's awards and recognitions so that I can understand his achievements.

#### Acceptance Criteria

1. THE Site SHALL render all award entries from `awards/README.md` on an `/awards` page or within the CV/about section.
2. THE Site SHALL display the awarding organization, award name, and issue date for each entry.
3. WHEN an award entry includes a description or quote, THE Site SHALL render it below the award title.

---

### Requirement 12: Navigation and Site Structure

**User Story:** As a visitor, I want clear navigation so that I can easily find any section of the portfolio.

#### Acceptance Criteria

1. THE Site SHALL include a persistent navigation header with links to all major sections: Home, Blog, Conference, CV, Open Source, Workshops, External, Live, Awards.
2. THE Site SHALL include a footer with social links (LinkedIn, GitHub, SpeakerDeck) and the site domain.
3. WHEN a visitor is on a given section page, THE Site SHALL visually indicate the active navigation item.
4. THE Site SHALL be fully navigable using keyboard-only input (tab order, focus indicators).
5. THE Site SHALL include a home/landing page (`/`) with a hero section, short bio, and links to key sections.

---

### Requirement 13: Design and Visual Quality

**User Story:** As the site owner, I want a modern, top-tier visual design so that the portfolio makes a strong first impression.

#### Acceptance Criteria

1. THE Site SHALL use a consistent design system with a defined color palette, typography scale, and spacing system applied across all pages.
2. THE Site SHALL be fully responsive and render correctly on viewport widths from 320px to 1920px.
3. THE Site SHALL use the profile photo (`jlandure-450x450.jpg` or `jlandure-1500x1500.jpg`) in the hero section with appropriate image optimization (WebP format, responsive `srcset`).
4. THE Site SHALL apply smooth CSS transitions or animations on interactive elements (hover states, page transitions) without reducing accessibility.
5. THE Site SHALL support both light and dark color schemes, defaulting to the visitor's OS preference via `prefers-color-scheme`.
6. THE Site SHALL use a modern web font loaded with `font-display: swap` to avoid invisible text during font load.

---

### Requirement 14: SEO and Metadata

**User Story:** As the site owner, I want proper SEO metadata so that the site ranks well and shares correctly on social media.

#### Acceptance Criteria

1. THE Site SHALL include a `<title>` and `<meta name="description">` tag on every page with content relevant to that page.
2. THE Site SHALL include Open Graph (`og:title`, `og:description`, `og:image`) meta tags on every page.
3. THE Site SHALL generate a `sitemap.xml` at build time listing all static pages.
4. THE Site SHALL include a `robots.txt` file allowing all crawlers.
5. WHEN a Blog_Post is rendered, THE Site SHALL include the post title and excerpt in the page's `<title>` and `<meta name="description">` tags respectively.

---

### Requirement 15: AWS Deployment (S3 + CloudFront)

**User Story:** As the site owner, I want the site deployed on AWS so that it is globally fast, reliable, and cost-effective.

#### Acceptance Criteria

1. THE Static_Build output SHALL be deployable to an AWS S3 bucket configured for static website hosting.
2. THE CDN SHALL serve the site over HTTPS using a TLS certificate for the `jlandure.dev` domain.
3. THE CDN SHALL be configured with a default cache behavior that caches static assets (JS, CSS, images) for a minimum of 1 year using cache-busting filenames.
4. THE CDN SHALL be configured to serve `index.html` as the default root object and handle SPA-style 404 routing by returning the appropriate 404 page.
5. THE Deployment_Pipeline SHALL sync the Static_Build output to the S3_Bucket and create a CloudFront invalidation for `/*` after each deployment.
6. THE Site SHALL preserve the existing custom domain `jlandure.dev` via a CNAME or Route 53 alias record pointing to the CDN.

---

### Requirement 16: Analytics and Tracking

**User Story:** As the site owner, I want analytics and user feedback tools preserved so that I can continue measuring site engagement.

#### Acceptance Criteria

1. THE Site SHALL include the Umami analytics script (`eu.umami.is`) with the existing website ID `2f1e79be-313e-4f52-891f-c186ab603162`.
2. THE Site SHALL include the Screeb feedback tag with the existing init ID `02232de0-8346-4185-902e-6c9391ea11f9`.
3. WHEN the Site is built in production mode, THE Static_Build SHALL include both tracking scripts in the HTML output.
