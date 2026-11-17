# SEO + AI discoverability: pre-publication verification contract

**Scope:** NEW, Owner-approved Blog RU / Blog EN / Cases RU / Cases EN pages only. Historical published material is Owner-certified and MUST remain unchanged. This checklist governs preparation and verification; it does not authorize edits or claim that search/AI exposure is guaranteed.

**Source of truth:** current `origin/main`, `src/content.config.ts`, real Blog/Case route components, `src/components/BaseHead.astro`, root `AGENTS.md`, Owner Policy. If the template changes, re-inspect the code and revise the proposed check before adding content. Do not transplant old static frontmatter recipes into the current project.

## A. Editorial draft — Owner approves exact output before repository edits

- A specific reader intent and clear topic, grounded in supplied/new material, with Dubai/UAE context and correct entities (districts, buildings, developers, legal names) **only where supported by the approved draft**.
- A distinctive, useful opening that expresses the substance of the article or case; direct answers and natural question-oriented subheadings **when appropriate to the author's rhythm**, never mechanical keyword stuffing or template-sounding prose.
- A single meaningful page heading is rendered by the existing Astro page template. Markdown article body therefore starts its subsections at level 2 and nests lower levels in order; do not add another level-1 heading in the body.
- Lead → relevant context → evidence, narrative, or process → interpretation → application/conclusion. For a Case: context → work performed → decision/result → learning. **These are editorial suggestions, not grounds to rewrite Owner-approved narrative.**
- Cite sources/attribution and observation dates for NEW factual claims as appropriate. Distinguish quoted source claims from the author's analysis in the approved text. Do not create dates, investment figures, client outcomes, AI effectiveness claims, testimonials or permit identifiers. The Owner determines publication readiness and approves final wording.
- Confirm natural, relevant cross-navigation to actual existing Blog, Case, Project and Contact pages; link labels should describe the destination, and link URLs must resolve. No invented Case/Project references or forced linking merely to meet a quota.
- Preserve required regulatory disclaimer and actual advertiser permit if applicable and supplied by Owner. No assumed ad-permit number, financial performance statement or legal guarantee.
- Approve RU master and EN adaptation **separately**; EN is natural English, not word-for-word translation, with every substantive claim, source and CTA preserved unless Owner approves a change.

## B. Source fields and page metadata — verify current content schema

- `title`, `publishDate`: required by the current Blog/Case collections; preserve Owner-approved date. For genuinely revised new articles, use `updatedDate` only when factually accurate. Existing date fields are locked unless Owner requests a change.
- Blog: `excerpt`, `tags`, `seo.title`, `seo.description`, `seo.image.src` / `alt`, optional as permitted by the current schema. Cases: `description` plus the approved Case metadata fields, with SEO fields if supported. Use **approved** title and summary; the editorial target for `seo.description` is ≤150 characters per language (current schema allows up to 160).
- Use the filename ID to determine the route, not legacy `slug` keys; check for duplicate paths in the collection. Search intent is reflected naturally in title/description/headings, not extra meta fields whose effect is unverified.
- The image must exist at its exact referenced path, render properly and match the article; use Owner-approved 16:9 hero when available, meaningful localized alt, and an appropriate source/licence. Do not assert that a new image is approved merely because it exists.
- Check the rendered document language and localized values for `title`, description, Open Graph and X/Twitter properties. Prefer central Astro rendering to manually duplicated metadata.

## C. Structured data, canonical and bilingual URLs — inspect built HTML

- The template already emits JSON-LD `Article` for post/case detail pages and a linked `Person` author identity (`https://www.ivandubai.xyz/#person`). Validate actual built graph: correct `@type`, `headline`, `name`, `url`, author reference, publish/modified dates and `image` if the approved image is present. Its values must match the real page. **Never add another Article/BlogPosting script in Markdown.**
- The centrally rendered canonical must point to the right absolute public URL. Verify it in the built file, not from a legacy `canonical` frontmatter property.
- On **actual** paired translations, inspect `hreflang` values for reciprocal RU/EN and `x-default`, correct unique URLs and no broken alternate. Differently named RU/EN Blog entries need an **explicit** approved `explicitTranslationPairs` mapping in `BaseHead.astro`. This is a technical code change: obtain independent Claude technical review before implementation.
- Check the rendered article's visible level-1 heading, nested subsection hierarchy, and factual agreement with the JSON-LD headline/date/hero. A visible `h1` is already produced by current Blog/Case templates; do not duplicate it in the Markdown.
- For Google Article structured data, supported recommended properties include `headline`, `author`, `datePublished`, `dateModified`, and `image`; the exact supported graph is determined by current code. Additional markup or different types must be justified and technically reviewed, never added just to target AI recommendations.
- Existing site-wide metadata and author identity are Owner-controlled. Do not replace `Person` with a fabricated corporate or broker identity, and do not alter existing `ai:*`, `llm.json` or site branding without separate approval.

## D. Crawling, retrieval and navigation

- Inspect the final page as generated HTML: content remains real textual content, visible on initial HTML response; no accidental robots exclusion; relevant routes, images, CTA, navigational paths and local links respond successfully. Do not conflate static site generation with automatic indexation.
- Confirm the new page is included where expected in the language-specific Blog/Case listing, pagination, sitemap, and Blog RSS where applicable. Adding a page can legitimately change several output files. Compare exact before/after output sets rather than asserting that only the new HTML will differ.
- Cross-check all Blog/Case-related links against actual target pages. Check accessibility basics: descriptive headings and link text, meaningful image alt, table context if a table is used, and readable content without requiring client-side behavior.
- Confirm Yandex Metrika, Metricool, Astro ClientRouter and existing Formspree integrations remain unchanged. A contact click or form-submit attempt must not be labeled a qualified lead without authenticated evidence.

## E. AI-search / LLM-readability principles

- Use ordinary standards-based web HTML and **clear passages** rather than artificial LLM instructions, hidden "model prompts", keyword stuffing, excessive boilerplate FAQs or unapproved duplicate schemas.
- When editorially natural, answer the primary reader question directly, identify the subject and location unambiguously, provide decision criteria, distinguish sourced data from editorial interpretation, and link to relevant deeper sections. This helps both readers and machines but is **not** a promise of inclusion in AI responses.
- Google states that the SEO fundamentals also govern AI Overviews/AI Mode; no special AI schema, extra machine-readable file, or separate AI optimization trick is required to qualify. Actual inclusion requires index eligibility and is never guaranteed.
- Cite and preserve the Owner-approved writer perspective and distinctive human voice. No automatic fact re-audit of already published content.
- Do not mistake a search-engine citation for an actual unbranded AI recommendation or an AI-attributed customer lead; B-10 measures these separately.

## F. Release acceptance record (for every approved new page)

Record and show: current main SHA; scope and Owner approval for exact RU/EN copy; content file IDs/paths; expected public routes; title/description/hero/date; heading and link check; canonical/hreflang reciprocity; Article/Person JSON-LD fields; source-grounded CTA; media status; listing, RSS and sitemap diffs; no unrelated changed output; retained analytics and forms; baseline-vs-patch `TZ=UTC npm run build`; PR review; Claude technical verdict if technical files changed; final production verification. Any factual, editorial, or code-change discrepancy is a **HOLD** until approved/resolved. Keep existing published words untouched.

## Official documentation, accessed 17 November 2026

- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google AI Search best practices: https://developers.google.com/search/docs/appearance/ai-features
- Google guidance on localized page variants: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google generative AI optimization overview: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
