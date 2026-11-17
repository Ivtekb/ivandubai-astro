# Blog collection — scoped Codex instructions

Read the root `AGENTS.md`, Owner Policy and `docs/CODEX_CONTENT_OPERATIONS.md` before editing. Work only in Blog RU or Blog EN role declared in the task. RU master and EN meaning-based adaptation are separately Owner-approved; EN does not silently inherit RU approval.

- Verify `src/content.config.ts`, blog route generators `src/pages/blog/[id].astro`, `src/pages/en/blog/[id].astro`, listing routes and `src/components/BaseHead.astro` **from current main**, never from old chat snapshots.
- Determine path from actual file ID, not legacy `slug` frontmatter; select a free ID by listing existing paths (including EN and backup files), never by counting files.
- Required current fields: `title`, `publishDate`; use `excerpt`, `tags`, `seo.title`, `seo.description`, `seo.image.src/alt` when applicable and supported. Date, facts, image, links, permit and CTA must be approved.
- Different RU/EN IDs require explicit approved mapping in `BaseHead.astro`; do not invent a translation pair or modify technical mapping without Claude review.
- Keep existing Blog entries unchanged. New article copy must be Owner-approved before writing the final Markdown. No duplicate inline JSON-LD.
- Check routes, homepage/list and RSS/sitemap outputs, image and SEO, and preserve Yandex/Metricool/Forms. Branch/PR only — never push main.
