# Content collections — scoped Codex rules

This file is deliberately in `src/content/` **outside** the Astro `glob()` loader bases `src/content/blog/` and `src/content/cases/`. Never place an `AGENTS.md` in either collection's own folder: Astro would attempt to parse it as a Blog/Case Markdown entry and reject missing frontmatter.

# Blog collection — scoped Codex instructions

Read the root `AGENTS.md`, Owner Policy and `docs/CODEX_CONTENT_OPERATIONS.md` before editing. Work only in Blog RU or Blog EN role declared in the task. RU master and EN meaning-based adaptation are separately Owner-approved; EN does not silently inherit RU approval.

- Verify `src/content.config.ts`, blog route generators `src/pages/blog/[id].astro`, `src/pages/en/blog/[id].astro`, listing routes and `src/components/BaseHead.astro` **from current main**, never from old chat snapshots.
- Determine path from actual file ID, not legacy `slug` frontmatter; select a free ID by listing existing paths (including EN and backup files), never by counting files.
- Required current fields: `title`, `publishDate`; use `excerpt`, `tags`, `seo.title`, `seo.description`, `seo.image.src/alt` when applicable and supported. Date, facts, image, links, permit and CTA must be approved.
- Different RU/EN IDs require explicit approved mapping in `BaseHead.astro`; do not invent a translation pair or modify technical mapping without Claude review.
- Keep existing Blog entries unchanged. New article copy must be Owner-approved before writing the final Markdown. No duplicate embedded JSON-LD.
- Check routes, homepage/list and RSS/sitemap outputs, image and SEO, and preserve Yandex/Metricool/Forms. Branch/PR only — never push main.

---

# Cases collection — scoped Codex instructions

Read root `AGENTS.md`, Owner Policy, and `docs/CODEX_CONTENT_OPERATIONS.md`. The Owner confirms existing published case information; never challenge or rewrite previous cases.

- Use current `src/content.config.ts`, RU/EN cases route generators and `CasePreview.astro`. Never copy outdated Blog frontmatter or rely on old Codex thread instructions.
- RU path `src/content/cases/<id>.md` → `/cases/<id>/`; EN path `src/content/cases/en/<id>.md` → `/en/cases/<id>/`. Match IDs for genuine translation pairs where appropriate. Check collisions and generated listings.
- Required current metadata: `title` and `publishDate`. Optional according to current schema: `description`, `clientName`, `projectType`, `budget`, `timeline`, `isFeatured`, `seo`. Include only exact Owner-approved facts; client confidentiality is mandatory.
- Prepare owner-supplied narrative and RU/EN editorial adaptation for approval. **No invented client quotes, performance numbers, outcome, schedule or identity**. Never publish confidential documents as source evidence.
- Update only the specific approved new case and assets, never the existing published Case-1. Branch, clean UTC build/output diff, route/image/JSON-LD/link tests, Claude technical review and postrelease acceptance.
