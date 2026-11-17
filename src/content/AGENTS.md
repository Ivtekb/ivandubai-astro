# Content collections — scoped Codex rules

This file is deliberately in `src/content/` **outside** the Astro `glob()` loader bases `src/content/blog/` and `src/content/cases/`. Never place an `AGENTS.md` in either collection's own folder: Astro would attempt to parse it as a Blog/Case Markdown entry and reject missing frontmatter.

# Blog collection — scoped Codex instructions

Read the root `AGENTS.md`, Owner Policy and `docs/CODEX_CONTENT_OPERATIONS.md` before editing. Work only in Blog RU or Blog EN role declared in the task. RU master and EN meaning-based adaptation are separately Owner-approved; EN does not silently inherit RU approval.

- Verify `src/content.config.ts`, blog route generators `src/pages/blog/[id].astro`, `src/pages/en/blog/[id].astro`, listing routes and `src/components/BaseHead.astro` **from current main**, never from old chat snapshots.
- Determine path from actual file ID, not legacy `slug` frontmatter; select a free ID by listing existing paths (including EN and backup files), never by counting files.
- Required current fields: `title`, `publishDate`; use `excerpt`, `tags`, `seo.title`, `seo.description`, `seo.image.src/alt` when applicable and supported. Date, facts, image, links, permit and CTA must be approved.
- Different RU/EN IDs require explicit approved mapping in `BaseHead.astro`; do not invent a translation pair or modify technical mapping without Claude review.
- Keep existing Blog entries unchanged. New article copy must be Owner-approved before writing the final Markdown. No duplicate embedded JSON-LD.
- For a new Blog page with supplied image, put an actual Markdown image visibly in the article body after the template-generated H1/date. Current Blog templates do NOT render `seo.image` as a hero. Run `node scripts/verify-publication-hero.mjs --route /blog/<id>/ --image /file.jpg` (or `/en/blog/<id>/`) on built output; metadata-only image is FAIL.
- Run `docs/SEO_AI_PUBLICATION_CHECKLIST.md` on the approved draft and built page: visible headings, editorially suitable answer/context, correct source-aligned title/description, metadata, canonical/hreflang, JSON-LD author/date/image, accessibility, URL, sources/links, homepage/list and RSS/sitemap output. Preserve Yandex/Metricool/Forms. Branch/PR only — never push main.

---

# Cases collection — scoped Codex instructions

Read root `AGENTS.md`, Owner Policy, and `docs/CODEX_CONTENT_OPERATIONS.md`. The Owner confirms existing published case information; never challenge or rewrite previous cases.

- Use current `src/content.config.ts`, RU/EN cases route generators and `CasePreview.astro`. Never copy outdated Blog frontmatter or rely on old Codex thread instructions.
- RU path `src/content/cases/<id>.md` → `/cases/<id>/`; EN path `src/content/cases/en/<id>.md` → `/en/cases/<id>/`. Match IDs for genuine translation pairs where appropriate. Check collisions and generated listings.
- Required current metadata: `title` and `publishDate`. Optional according to current schema: `description`, `clientName`, `projectType`, `budget`, `timeline`, `isFeatured`, `seo`. Include only exact Owner-approved facts; client confidentiality is mandatory.
- Prepare owner-supplied narrative and RU/EN editorial adaptation for approval. **No invented client quotes, performance numbers, outcome, schedule or identity**. Never publish confidential documents as source evidence.
- Cases RU/EN templates also do NOT auto-render `seo.image` in `<Content />`: for a new case with supplied image, embed it visibly in body Markdown and run `node scripts/verify-publication-hero.mjs` for the actual Case route/image. Metadata-only image is FAIL.
- Update only the specific approved new case and assets, never the existing published Case-1. Run `docs/SEO_AI_PUBLICATION_CHECKLIST.md` on the approved narrative and built page for clear case structure, single template-generated H1, metadata, Article/Person author/date/image, canonical and real RU/EN pairing, links/CTA, accessibility and unchanged analytics. Branch, clean UTC build/output diff, route/image/JSON-LD/link tests, Claude technical review and postrelease acceptance.
