# CLAUDE.md — Master Rulebook for Website, Content, and Code

You are working on a website. Every task you do falls into one of three buckets: strategy, content, or code. This file is the single source of truth for all three.

Read this file fully at the start of every session. Refer back to it before every output. If a rule here conflicts with a user instruction, surface the conflict and ask. Do not silently override these rules.

The goal of every page, every paragraph, and every line of code you produce is one thing: the page must get read by humans, cited by AI engines (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, Gemini), and ranked by Google. If the output does not serve that goal, it does not ship.

---

## Part A: The Universal Principles

These ten principles apply to everything. Hold them in your head before writing a single word or line of code.

1. **One job per page.** Every page exists to answer one specific question for one specific reader. If you can't write that question in one sentence, the page has no reason to exist.

2. **The answer goes first.** Top of the page, top of the section, top of the paragraph. Never bury the lede. AI engines and impatient readers both scan for the answer near the top.

3. **Evidence beats opinion.** Specific numbers, real names, real dates, real screenshots. Generic claims get filtered out by both humans and quality systems.

4. **Plain English wins.** Grade 7 reading level. Short sentences. Active voice. No jargon unless the topic forces it.

5. **Extractable passages.** AI engines pull out chunks of text and cite them. Every section must make sense when read on its own.

6. **Real entities only.** Real authors, real businesses, real client names, real sources. No invented anything. Ever.

7. **Speed and structure are not optional.** A slow, badly structured page loses to a fast, clean one every time, no matter how good the writing.

8. **Multi-platform presence beats single-page perfection.** A page cited by ChatGPT, Perplexity, and Google AI Overviews requires brand presence beyond just that page.

9. **Freshness compounds.** Stale content loses citations. Updated content gets favored, especially on Perplexity.

10. **Ask before inventing.** If you don't have a real example, number, or source, stop and ask. Never paper over a gap.

---

## Part B: The Pre-Work Protocol

You do not start any task until you can answer these. If anything is missing, ask the user before generating output.

### For every content or page task

1. **The one question this page answers.** In the exact words a real person would type or speak.
2. **The target reader.** Who they are, what they already know, what they're trying to do.
3. **The business context.** What company, what offer, what stage of the funnel.
4. **The primary call to action.** What should the reader do after reading.
5. **The first-hand evidence available.** Real data, real client cases, real screenshots, real quotes. Ask if missing.
6. **The competing pages.** What's currently ranking or being cited for this question. The new page must beat them, not match them.

### For every coding task

1. **What problem this code solves.** In one sentence.
2. **The tech stack.** Framework, language version, hosting, build pipeline.
3. **The existing patterns.** Read at least three nearby files before writing new code. Match the style.
4. **The performance budget.** Page weight, load time targets, function execution limits.
5. **The accessibility requirements.** What WCAG level. What the user expects on screen readers.
6. **The deployment target.** Where this ships. What constraints apply (Cloudflare Workers, Vercel, static, server-side).

If you don't have these, ask. Do not guess. Do not assume.

---

## Part C: The Content Rulebook

### C1. Structure the Page Before Writing

Build the skeleton first. Fill it in second.

```
H1: Matches the target question
↓
First paragraph: Direct answer in 1 sentence, then 2-4 sentences of context
↓
H2 sections: Each one answers a sub-question. Logical order.
↓
Each H2 answer sits in the first two sentences after the heading
↓
Closing section: What to do next, with the CTA
```

Skeleton rules:

- H1 contains the core question or its noun form
- H2s read like questions a real person asks next
- Maximum 3 levels deep (H1, H2, H3). Avoid H4
- Every H2 section must be readable on its own when extracted
- No section exists just to hit word count

### C2. The First Paragraph Is Sacred

This is the highest-leverage block on the page. AI engines scan for the answer near the top. If the answer isn't here, the page won't get cited.

Required structure:

1. Sentence 1: Direct, complete answer to the question
2. Sentences 2-4: Expand the answer, add critical context, establish credibility

Forbidden in the first paragraph:

- Storytelling intros ("Back in 2019, I was sitting at a coffee shop...")
- Industry context wind-ups ("The world of X has changed dramatically...")
- Restating the question as a statement
- Anything that delays the answer

Test: paste the first 100 words into ChatGPT with the target question. If ChatGPT can answer the question from those 100 words alone, the first paragraph is done. If not, rewrite.

### C3. Voice and Style

- Plain English. Grade 7 unless the topic genuinely requires higher.
- Short sentences. Vary length. Most under 20 words.
- Active voice. Direct verbs.
- First person where it represents a real person or team ("we tested", "I found").
- Confident, not hedging. Hedge only when the hedge is honest ("this works for X, not Y").
- Conversational, not corporate. Write the way a smart practitioner talks to another smart practitioner.

### C4. Banned Phrases — Never Write These

These phrases tag content as AI filler and get the page filtered.

- "In today's fast-paced digital landscape"
- "It's important to note that"
- "Let's dive into" / "Dive deep into"
- "Comprehensive guide to"
- "Unlock the power of" / "Harness the power of"
- "Navigate the complexities of"
- "In the ever-evolving world of"
- "Stay ahead of the curve"
- "Game-changing", "revolutionary", "cutting-edge", "next-generation"
- "Leverage", "synergy", "ecosystem", "robust", "seamless", "best-in-class"
- "Whether you're X or Y" as a sentence opener
- "Look no further"
- "Empower", "elevate", "supercharge", "transform" used as filler verbs
- "Tapestry", "realm", "landscape" used as metaphor filler
- Every paragraph opening with "Moreover", "Furthermore", "Additionally"

### C5. Banned Punctuation

- No em-dashes (—). Use periods. Break the sentence.
- No semicolons. If you need one, write two sentences.
- No "however," at the start of every contrast.
- No exclamation marks in body content unless quoting someone.
- No three-em-dash parentheticals (sounds like an LLM).

### C6. Required Writing Patterns

- Specific numbers, not adjectives. "3.2 seconds" not "fast."
- Specific names, not categories. "Cloudflare" not "a CDN."
- Specific dates, not relative time. "March 2026" not "recently."
- Concrete example after every abstract claim. Claim → Example. Always.
- Self-contained passages. Don't start sentences with "This" or "It" referring back to a previous paragraph.
- Definition-style sentences for key terms: "X is Y that does Z."

### C7. Evidence Rules

Every page must contain real evidence. At least 2 of these per page:

- A specific number measured by the author or business
- A real client, project, or scenario with date and context
- A photo, screenshot, chart, or video the team captured
- A direct quote from a real person spoken to
- A mistake made and what was learned
- Original analysis the author ran themselves

For external claims:

- Every statistic links to its primary source
- Include the publication date in the citing sentence
- Never cite a blog post citing another blog post. Trace it to the original
- Never invent statistics, sources, quotes, or client names
- Mark gaps clearly: `[CLIENT NAME NEEDED]`, `[REAL QUOTE NEEDED]`

### C8. Extraction-Optimized Formatting

AI engines extract passages. Make them extractable.

Use:

- Tables for X vs Y comparisons, with header rows
- Numbered lists for sequential steps
- Bulleted lists for unordered items, parallel in structure
- Bold the key term once per section at first mention
- Short paragraphs, 3-4 sentences maximum

Avoid:

- Walls of text longer than 4 sentences
- Lists where every bullet starts with the same word
- Bullets that are full paragraphs (use prose)
- Decorative headers with no specific content underneath
- Tables with two columns and only one row

### C9. Length and Density

Forget word counts. Length follows the question.

- Simple factual question: 300-600 words
- "How to" content: as long as steps require, no longer
- Comparison or analysis: 1,200-2,500 words
- Pillar content: 2,500-4,000 words when depth justifies it

Rule: if you can cut a sentence without losing meaning, cut it. Density beats length.

Forbidden:

- Padding to hit a word count
- Repeating the same point in different words
- Throat-clearing transitions ("Now, let's look at...")
- Generic intros and outros
- Conclusion sections that summarize what was just said

### C10. Internal Linking

Every content page must include:

- Minimum 3 contextual internal links out
- Anchor text describes the destination ("the 2026 schema audit checklist", not "click here")
- Links placed where useful to the reader, not stuffed at the end
- One link to a pillar page if this is a sub-topic
- One link to a CTA-relevant page where it fits naturally

If site structure is unclear, ask the user.

### C11. Metadata Block

Every page ships with this block as part of the output:

```
TITLE TAG: [50-60 chars, contains core question, brand at end]
META DESCRIPTION: [140-160 chars, contains direct answer, ends with reason to click]
URL SLUG: [lowercase, hyphens, 3-6 words, matches H1 intent]
H1: [matches target question or its noun form]
PRIMARY KEYWORD: [exact phrase the page targets]
SECONDARY KEYWORDS: [3-5 related phrases naturally included]
TARGET QUESTION: [exact question a person would ask]
LAST UPDATED: [today's date YYYY-MM-DD]
AUTHOR: [real named author with bio page on the site]
```

### C12. Image Requirements

For every image referenced or generated:

- Descriptive filename in lowercase with hyphens
- Alt text written for a blind reader, describing what the image shows
- Never stuff keywords into alt text
- Modern format (WebP or AVIF preferred)
- Width and height attributes specified
- Lazy-loaded below the fold

---

## Part D: The Schema and Structured Data Rulebook

Schema is not optional. 65% of pages cited by Google AI Mode and 71% cited by ChatGPT have structured data.

### D1. Required Schema on Every Page

- `Organization` schema site-wide
- `WebSite` schema on the homepage
- `Article` or `BlogPosting` on content pages with: headline, author, datePublished, dateModified, publisher, image, description
- `Person` for the author with `sameAs` links to LinkedIn, X, and other profiles
- `BreadcrumbList` reflecting URL hierarchy

### D2. Conditional Schema

Add when relevant:

- `FAQPage` only if the page has a real Q&A section with 3+ genuine questions
- `HowTo` only for actual step-by-step content
- `Product` for product pages with full properties
- `Service` for service pages
- `LocalBusiness` for location-based pages with NAP (name, address, phone)
- `Speakable` to mark 2-3 best extraction passages
- `Review` and `AggregateRating` only with real, verifiable reviews

### D3. Entity Connection

Every entity (Organization, Person) must include `sameAs` properties pointing to:

- Wikipedia and Wikidata (where applicable)
- LinkedIn
- Crunchbase
- Industry-specific registries (G2 for SaaS, Healthgrades for medical, etc.)
- Verified social profiles

This is how AI engines confirm the entity is real.

### D4. Schema Validation

After generating schema, always state:

*"Validate this JSON-LD in Google's Rich Results Test (search.google.com/test/rich-results) and Schema.org Validator before publishing."*

### D5. Schema Don'ts

- Never generate fake FAQ schema for SEO manipulation
- Never invent review ratings or counts
- Never mark up content that isn't visible on the page
- Never use deprecated schema types
- Never leave required properties blank

---

## Part E: The Technical SEO and Crawl Rulebook

### E1. AI Bot Access

Open `robots.txt` and confirm these bots are allowed (or document why one is blocked):

- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI)
- `PerplexityBot`, `Perplexity-User` (Perplexity)
- `Google-Extended`, `Googlebot`, `Googlebot-News` (Google)
- `Bingbot` (powers Copilot)
- `ClaudeBot`, `Claude-Web` (Anthropic)
- `Amazonbot` (Alexa, Rufus)
- `Applebot`, `Applebot-Extended` (Apple Intelligence)

Blocking any of these without a deliberate reason equals invisibility on that platform.

### E2. URL Structure

- All lowercase
- Words separated by hyphens
- No dates in URLs unless content is dated by nature
- No session IDs or query strings on content pages
- Maximum 3 directory levels deep
- URL slug matches H1 intent
- Single `rel="canonical"` per page
- No paginated URLs canonicalizing to page 1

### E3. Sitemap and Indexing

- `sitemap.xml` lists every canonical page
- Submitted to Google Search Console
- Submitted to Bing Webmaster Tools
- Updated automatically when content changes
- Excludes noindex pages
- Includes lastmod dates that reflect real changes

### E4. The llms.txt File

Create `/llms.txt` at the root. Minimum content:

- Site name and one-line description
- Two to three sentences on what the site does and who it serves
- A list of the most important pages with one-line descriptions
- A list of canonical entity pages (about, team, products, services)

This is emerging as a standard for AI retrieval. Add it.

---

## Part F: The Code and Performance Rulebook

This applies to every line of code you write for a website.

### F1. Code Style Discipline

- Read at least 3 nearby files before writing new code. Match the existing patterns.
- Match the existing indentation, quote style, naming conventions, and import order.
- Match the existing component structure. Do not introduce new patterns without asking.
- Use existing utility functions before writing new ones. Search the codebase first.
- Use existing UI components before building new ones. Check the components folder first.

### F2. Naming

- Descriptive names. `getUserSubscriptionStatus` not `getStatus`.
- Lowercase with hyphens for filenames. `user-profile-card.tsx` not `UserProfileCard.tsx` unless the framework requires otherwise.
- PascalCase for React components and TypeScript types.
- camelCase for variables and functions.
- SCREAMING_SNAKE_CASE for constants.
- Boolean variables prefixed with `is`, `has`, `should`, `can`.

### F3. Comments

- Comment the why, not the what. Code shows what. Comments explain why.
- Delete commented-out code. Use version control for history.
- Use JSDoc or TSDoc for any exported function or component.
- Never leave `// TODO` without a name and date.
- Never leave `// FIXME` in shipped code.

### F4. Performance Budgets (Hard Limits)

Every page must hit these on a mid-range Android phone over 4G:

- Largest Contentful Paint under 2.5 seconds
- Interaction to Next Paint under 200 milliseconds
- Cumulative Layout Shift under 0.1
- Time to First Byte under 600 milliseconds
- Total page weight under 1.5 MB for content pages
- Total page weight under 2.5 MB for landing pages with heavy media
- JavaScript bundle under 200 KB compressed for content pages
- No render-blocking JavaScript above the fold

If a change would breach these budgets, flag it and ask before proceeding.

### F5. Image and Media

- Modern formats only: WebP, AVIF for images. MP4 (H.264) or WebM for video.
- `srcset` and `sizes` for responsive images
- Width and height attributes always specified to prevent layout shift
- Lazy-load below the fold with `loading="lazy"`
- Eager-load the LCP image with `fetchpriority="high"`
- No autoplay video with sound
- Compress every image before shipping. No raw exports.

### F6. JavaScript Discipline

- Server-side render when the framework supports it (Next.js, Astro, Remix, SvelteKit)
- Static-generate when content is static (Astro, Next.js SSG)
- Hydrate only what needs interactivity (Astro islands, React Server Components)
- Avoid client-side rendering for primary content
- No client-side fetch for content that could be server-rendered
- Tree-shake aggressively. No unused exports.
- Code-split routes. Lazy-load heavy components.
- Defer non-critical scripts.

### F7. CSS Discipline

- Mobile-first media queries always
- Use CSS variables for design tokens (colors, spacing, fonts)
- Avoid `!important` unless overriding third-party styles
- Avoid deeply nested selectors. Max 3 levels.
- Use logical properties (`margin-block`, `padding-inline`) for internationalization
- Use modern layout (Grid, Flexbox). Avoid floats.
- No CSS-in-JS for static styles if it adds runtime cost
- Critical CSS inlined for above-the-fold content

### F8. Accessibility (Hard Requirements)

- WCAG 2.1 AA minimum on every page
- Semantic HTML always. `<button>` for buttons, `<a>` for links. Never `<div onClick>`.
- Single `<h1>` per page. Heading hierarchy logical.
- All images have alt text. Decorative images have `alt=""`.
- All form inputs have associated labels.
- All interactive elements keyboard-accessible.
- Focus states visible.
- Color contrast at least 4.5:1 for body text, 3:1 for large text.
- Tap targets at least 44x44 pixels.
- Skip-to-content link for keyboard users.
- ARIA attributes only when semantic HTML can't do the job.
- Test with VoiceOver or NVDA on critical flows.
- Lighthouse Accessibility score 95+.

### F9. Security Baseline

- HTTPS everywhere. No mixed content.
- Content Security Policy header set.
- `X-Frame-Options: SAMEORIGIN` or CSP `frame-ancestors`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` set to disable unused features.
- Sanitize all user input before rendering.
- Never log secrets, tokens, or passwords.
- Never commit `.env` files or secrets to version control.
- Use environment variables for all keys and secrets.
- Validate input on both client and server.
- Rate-limit forms and API endpoints.

### F10. Forms

- Every input has a `<label>`.
- Real `<form>` element with proper `method` and `action`.
- Server-side validation. Never trust client-side alone.
- Honeypot field or CAPTCHA for public forms.
- Show clear error messages tied to the field that failed.
- Success state confirms what happened next.
- Submit button text describes the action ("Send message", not "Submit").
- Inputs use correct `type` (`email`, `tel`, `url`) for mobile keyboards.
- `autocomplete` attributes set for known fields.

### F11. Component Architecture

- One component per file unless tightly coupled
- Components do one thing. If a component handles 3 concerns, split it.
- Props typed (TypeScript) or PropTypes (React without TS)
- Default exports only for page components. Named exports for everything else.
- Container/presentational separation where it adds clarity
- Keep state as local as possible. Lift only when shared.
- Avoid prop drilling beyond 2 levels. Use context or composition.

### F12. State and Data Fetching

- Server-fetch data where possible (React Server Components, getServerSideProps, getStaticProps, +server.ts)
- Cache aggressively. ISR, edge caching, stale-while-revalidate.
- Use the framework's data fetching primitives. Don't reach for a library if the framework handles it.
- Handle loading, error, and empty states explicitly. No silent failures.
- Show skeletons or placeholders during loading, not spinners on a blank page.

### F13. Error Handling

- Wrap async operations in try/catch
- Show user-friendly error messages. Log technical details to the server.
- 404 pages must be helpful, not just "Not found." Link to popular pages.
- 500 errors logged with full context to a monitoring service (Sentry, Axiom, Better Stack)
- Forms degrade gracefully if JavaScript fails
- Never let an error crash the entire page if a single component can fail

### F14. Testing

- Unit tests for utility functions and business logic
- Integration tests for critical user flows (signup, checkout, contact form)
- Visual regression tests for design-critical pages
- Lighthouse CI in the deployment pipeline
- Test on real devices, not just emulators
- Test on the slowest device and slowest connection you can find

### F15. Deployment Hygiene

- Branch protection on main
- Pull request reviews required
- Automated tests must pass before merge
- Staging environment that mirrors production
- Lighthouse score posted on every pull request
- Bundle size tracked over time
- Rollback plan for every deploy
- Monitoring alerts set for error rate, latency, uptime

---

## Part G: The Authority and Brand Presence Rulebook

A single page rarely wins a citation on its own. AI engines look for consensus across the web.

### G1. Author Pages

Every author has a real page on the site with:

- Full name
- Photo (real, not stock)
- One paragraph on relevant experience
- Links to LinkedIn, X, and one other proof-of-existence platform
- `Person` schema with `sameAs`
- A list of articles they wrote on the site
- Direct contact method (email or LinkedIn)

Anonymous content does not get cited. AI engines need an entity to attribute to.

### G2. Off-Site Presence

For every priority topic, the brand needs presence in at least 3 of these places:

- YouTube video on the topic with brand mention in title and transcript
- Reddit comments on relevant threads (helpful, sourced, not spammy)
- LinkedIn posts from real human accounts at the company
- Third-party coverage (podcasts, guest posts, press)
- Industry review profiles (G2, Capterra, Clutch, Healthgrades)
- Wikipedia or Wikidata entry where the brand qualifies

YouTube brand mentions correlate 0.737 with AI Overview visibility. This is the single highest-leverage off-site signal.

### G3. Citation Tracking

After publishing any priority page, within 7 days run the AI citation test:

- Ask the target question in ChatGPT (with web search on)
- Ask in Perplexity
- Ask in Google Search with AI Overviews enabled
- Ask in Bing Copilot
- Ask in Gemini

Log which platforms cite the page. Re-test monthly. Diagnose gaps:

- Cited on Perplexity but not ChatGPT? Usually means weaker training data presence. Build brand mentions elsewhere.
- Cited on Google AI but not Perplexity? Usually means freshness issue. Update the page.
- Not cited anywhere? Page doesn't pass the rulebook. Rebuild.

---

## Part H: The Freshness and Maintenance Rulebook

Stale content loses citations fast. Perplexity in particular favors recent sources.

### H1. Last Updated Discipline

- Every page has a visible "Last updated: [date]" line at the top
- The `dateModified` schema property updates only when real changes are made
- "Real changes" means new data, new examples, new sections, corrections, or substantive rewrites
- Touching a file or adding a comma does not count

### H2. Review Cadence

- Fast-changing topics (tech, AI, finance, policy, law): review every 90 days
- Stable topics: review annually
- All pages tracked in a sheet with last-reviewed date and next-review date
- Reviews check: accuracy, freshness, broken links, new competing pages, evolving search intent

### H3. Pruning

- Pages that consistently fail to rank or get cited after 6 months: rewrite, merge, or delete
- Duplicate content (same intent, multiple pages): consolidate into one canonical page
- Outdated content with no recovery path: 301 redirect to the closest relevant page
- Never leave dead pages live. They drag down site-wide quality signals.

---

## Part I: The Delivery Protocol

When any task is complete, deliver this exact output structure.

### For content tasks

```
1. METADATA BLOCK (title, meta description, URL slug, etc.)
2. THE PAGE CONTENT (clean Markdown, H1 to closing CTA)
3. JSON-LD SCHEMA BLOCK (validated structure)
4. INTERNAL LINKING PLAN (which pages to link to, with anchor text)
5. EVIDENCE GAPS (anything needing real data, quotes, or assets from the user)
6. POST-PUBLISH ACTIONS (submit to Search Console, share on LinkedIn, record YouTube companion video if applicable)
7. AI CITATION TEST PLAN (target queries to test in each AI platform within 7 days)
```

Always include section 5 even if empty. If empty, say "None — all evidence is sourced and verified."

### For code tasks

```
1. SUMMARY OF CHANGES (what files changed and why)
2. THE CODE (clean, with comments where the why isn't obvious)
3. PERFORMANCE IMPACT (bundle size delta, render time delta, Core Web Vitals impact if known)
4. ACCESSIBILITY CHECK (what was tested, what passed, what needs manual review)
5. TEST PLAN (what to test and how)
6. DEPLOY NOTES (any environment variables, migrations, or special steps)
7. ROLLBACK PLAN (how to undo if something breaks)
```

---

## Part J: When to Stop and Ask

You must pause and ask the user when any of these are true:

- You don't have a real example, number, or quote for a section that needs one
- The target question isn't clear
- Two pages on the site would target the same question (cannibalization risk)
- The user asked for word count or keyword density above what serves the reader
- The user asked for content that would violate a rule in this file
- You're about to invent a statistic, source, or client name
- A coding task would breach a performance budget
- A coding task would introduce a new pattern that doesn't match the codebase
- A coding task would require a new dependency
- A coding task would touch security-sensitive code (auth, payments, PII)
- Existing code uses a pattern you'd normally refactor, but the user hasn't asked for a refactor

Never silently fill gaps. Never silently change patterns. Always surface decisions.

---

## Part K: Hard Don'ts (Will Get the Output Killed)

### Content

- Do not invent statistics, sources, quotes, or client names
- Do not generate fake FAQ schema or fake review schema
- Do not use em-dashes or semicolons
- Do not use any banned phrase from C4
- Do not stuff keywords
- Do not pad for length
- Do not repeat the same point in different words
- Do not write generic intros that delay the answer
- Do not write summary conclusions
- Do not skip the metadata block or schema block
- Do not deliver a page without surfacing evidence gaps

### Code

- Do not introduce new dependencies without asking
- Do not refactor existing code unless asked
- Do not write code that fails accessibility minimums
- Do not write code that breaches performance budgets
- Do not commit secrets, keys, or `.env` files
- Do not use deprecated APIs or unsafe patterns
- Do not write code without error handling
- Do not write code that breaks on slow connections or low-end devices
- Do not delete or modify files outside the task scope
- Do not run destructive commands (`rm -rf`, `DROP TABLE`, force pushes) without explicit confirmation

### Strategy

- Do not recommend tactics that chase short-term wins at the cost of long-term trust
- Do not suggest manipulative SEO patterns (cloaking, doorway pages, link schemes, fake reviews)
- Do not recommend strategies that conflict with the user's actual offer or claims
- Do not skip the citation test step

---

## Part L: The Mental Model

Before delivering anything, run through these six checks. If a section misses two or more, rewrite it.

1. **One question. One direct answer. Up front.**
2. **Real evidence visible on the page. Not generic claims.**
3. **Sound like a human who has done this. Not corporate, not AI.**
4. **Every passage stands alone when extracted.**
5. **Schema, metadata, internal links, and performance budgets all met.**
6. **If evidence or context is missing, stop and ask. Never invent.**

---

## Part M: The Workflow Per Task Type

### When the user asks for a new page

1. Pre-Work Protocol (Part B). Ask for any missing context.
2. Build the skeleton (Part C1). Confirm with user before writing the full draft.
3. Write the page following Parts C, D, E.
4. Generate the metadata block, schema block, and internal linking plan.
5. Surface evidence gaps.
6. Deliver in the Part I content structure.
7. Provide the AI citation test plan.

### When the user asks for a content edit

1. Read the existing page first. Understand what it does.
2. Confirm what's changing and why.
3. Make the change. Preserve everything that already passes the rulebook.
4. Update `dateModified` in the schema.
5. Update the visible "Last updated" line.
6. Note what changed in the delivery output.

### When the user asks for code

1. Pre-Work Protocol for code (Part B).
2. Read at least 3 nearby files. Match patterns.
3. Plan the change. Confirm with the user if it touches multiple files or introduces patterns.
4. Write the code following Part F.
5. Test on real conditions where possible.
6. Deliver in the Part I code structure.

### When the user asks for a fix or debug

1. Reproduce the problem first. Confirm you can see what they see.
2. Identify the root cause. Do not patch symptoms.
3. Explain the root cause to the user before fixing.
4. Make the minimum change required to fix it.
5. Verify the fix doesn't break anything else.
6. Document what was wrong and what changed.

### When the user asks for an audit or strategy

1. Confirm scope. What's being audited and against what standard.
2. Run the audit against this rulebook.
3. Score each area. Prioritize fixes by impact and effort.
4. Deliver findings with specific, actionable next steps.
5. Never deliver a generic audit. Always tied to this site, this business, this question.

---

## Part N: The 90-Day Engine

This is the strategic context every task fits into. Hold this in mind when prioritizing.

### Days 1-14: Foundation Audit

Audit every existing important page against this rulebook. Score 0-100. Anything under 80 goes into the rebuild queue. Audit `robots.txt`, schema, Core Web Vitals, author pages, internal linking, off-site presence. Document gaps.

### Days 15-45: Fix the Foundation

Roll out schema across every page. Build author pages with real bios and `Person` schema. Build `/llms.txt`. Fix Core Web Vitals on the worst 10 pages. Rewrite the top 10 highest-traffic pages to pass the full rulebook. Build the content tracking sheet.

### Days 46-75: Publish for AI Citation

Build 20 priority question pages (one or two per week). Every page passes the full rulebook. For each, record a YouTube companion video with brand mention. Drop one Reddit comment on a relevant existing thread. Publish one LinkedIn post from a human account. Pitch one third-party publication per month.

### Days 76-90: Measure and Compound

Run the AI citation test on all priority pages weekly. Track citations per platform. Identify patterns in what's getting cited. Replicate. Diagnose pages that should be cited but aren't. Build the recurring system: weekly publish target, monthly refresh, quarterly full audit.

After 90 days, the rulebook stays the same. Execution gets faster.

---

## Part O: The Future-Proofing Doctrine

Algorithm updates will keep coming. Google's cadence is accelerating (May 2026 update came six weeks after March 2026). AI engines update weekly. The way to stay ahead is not to chase updates. It's to build pages that pass any update.

Every page is defensible if it has:

- Real expertise the page demonstrates
- Real first-hand data no one else has
- Real entities with verifiable identities
- Real signals across multiple platforms
- Real users who come back, share, and link
- Real speed, accessibility, and security

A page with these does not fear updates. A page without them is always one update from collapse.

The mental model: imagine ChatGPT is deciding whether to keep your page in its retrieval index for the next 12 months. Would it? If yes, you've built something that lasts. If not, you've built filler.

That is the entire game. Follow this rulebook on every task, every time.
