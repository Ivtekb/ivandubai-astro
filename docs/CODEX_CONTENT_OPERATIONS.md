# Codex publishing operations — ivandubai.xyz
Status: repository-local instructions, derived from live source at main `a9c949adee8120912202ea5000025e042b6c311a` (2026-11-17). **Dynamic reference, not a permanent pin.** Always check the *current* main before acting.

## Authority, sources, and roles

1. Highest priority: explicit latest Owner decisions and [Owner Policy](https://docs.google.com/document/d/191b_eRr0CHg7TlehV1qaJ88q9R-Aj09mwEKj835mnq8/edit) (existing published claims treated as Owner-confirmed, no re-verification).
2. Active technical state: current checked-out repository at `origin/main`, especially `src/content.config.ts`, route generators, `BaseHead.astro`, `astro.config.mjs`, `package.json` and validated examples. Do **not** use an old date, old chat or a static docs screenshot in place of live code.
3. Issue #16 [Owner execution register](https://github.com/Ivtekb/ivandubai-astro/issues/16) — prioritize recent Owner notes/comments over the initial frozen 15 Nov table. Previous quick-post guides and original Dante README are historical, **not** active deployment instructions.
4. `AGENTS.md` root + scoped `src/content/AGENTS.md` or `src/content/AGENTS.md`.
5. Each Codex chat must select one specific role. Four starters are in `docs/CODEX_CHAT_STARTERS.md`. Re-run preflight *for each new task*, not just at the start of a chat.

If Google Drive/owner policy is inaccessible: read the local Owner lock in `AGENTS.md`; **do not proceed with editorial publication** until policy/approval is available. If technical facts conflict, stop and raise the conflict.

## Exact current route and schema pattern

| Role | Source location | Route | Required frontmatter |
| --- | --- | --- | --- |
| Blog RU | `src/content/blog/<id>.md` | `/blog/<id>/` | `title`, `publishDate` |
| Blog EN | `src/content/blog/en/<id>.md` | `/en/blog/<id>/` | `title`, `publishDate` |
| Cases RU | `src/content/cases/<id>.md` | `/cases/<id>/` | `title`, `publishDate` |
| Cases EN | `src/content/cases/en/<id>.md` | `/en/cases/<id>/` | `title`, `publishDate` |

File IDs may be descriptive (e.g. `short-term-rentals-dubai-2025.md`) or `post-N.md` / `case-N.md`. Verify generated routes; *do not* make an ID by counting files. For Blog, English often uses `post-N` while Russian uses a descriptive ID. Use the approved pathname, not a generated guess.

As of 2026-11-17, `src/content.config.ts` uses Astro glob loaders and Zod: `title`, `publishDate` are required for Blog/Cases; `excerpt` in Blog and `description/clientName/projectType/budget/timeline` in Cases are optional. `seo` has `title` (5–120), `description` (15–160), `image` (`src` and optional `alt`), `pageType`. The editorial standard for meta-description remains **≤150 characters RU/EN**, where feasible. `lang`, `slug`, `canonical`, `hreflang`, `og` and `twitter` may appear in legacy Markdown, but are NOT declared fields in current collection schema; they do not supersede `BaseHead.astro` or route IDs. Do not remove them from existing posts as a cleanup.

**Important:** `BaseHead.astro` generates canonical from the actual URL. It emits paired hreflang only for actual generated RU+EN routes. Differing Blog IDs require an **explicit translation pair in the Map**; a new pair is a small *technical* code change needing Claude review, and must not be invented for one-sided material. Cases sharing the same ID in both languages use the current route pairing behavior; verify resulting HTML.

When adding content, keep approved `publishDate` exact; add `updatedDate` only when applicable. Use current image paths from `public/` and approved RU/EN alt. Never add fabricated source links, dates, prices, client results, official advertiser permit or author claims. Public business/developer marketing must follow applicable UAE requirements; record actual permit numbers only when supplied.

## Preflight — mandatory every request

- `git status --short` + `git fetch origin main` + `git rev-parse origin/main` + `git rev-parse HEAD`; create clean branch/worktree on latest `origin/main`. If absent network or outdated branch, STOP before writing.
- Confirm role, specific new material ID, language, paired/solo publication, exact Owner-approved text and assets, proposed `publishDate`, image, SEO metadata, existing file/route collisions.
- Read current relevant route/preview components, content schema and `BaseHead`; check 1–2 recent good articles/cases in same language, but do not blindly copy historical frontmatter or embedded scripts.
- Report PRE-FLIGHT (SHA, instructions loaded, file paths, generated URL, editorial GO/no GO, whether translation Map requires a reviewed code change, tests planned). Draft may continue without publish GO; file-writing/publishing must not.

## Two-stage publishing workflow

**Stage A — editorial (not in production):** draft/shape the Owner's supplied new material, sources, SEO/title/excerpt, hero/alt, linked Blog/Case/Project/Contacts, CTA and brief source/date notes. Use RU as master, EN adaptation by meaning. Treat each final RU and EN page as a separately approveable artifact. Existing published content remains untouched. Stop when awaiting Owner GO for the precise copy.

**Stage B — technical (after editorial GO):** create a separate branch from latest main and add only approved Markdown/media plus any separately approved small technical mapping. Do not use `git add .` blindly. Do not commit/push to main or change existing published copy. If route/translation mapping/frontmatter logic needs modification, send precise technical plan to Claude before implementing; perform one independent Claude technical preview review and a production check after merge. Owner's content approval is a distinct gate.

Run `npm ci`; `TZ=UTC npm run build` on CLEAN baseline and branch. Compare `dist/` exact expected/actual changes. For new articles, expect possible changes in list/pagination, RSS, sitemap, article output, local previews, assets, and hreflang; **do not use an assumed fixed count**. Investigate unexpected changed HTML, missing pages, 404s or non-deterministic sort before merge. Confirm 82+/current HTML, valid frontmatter, Meta description length, OG image, Article JSON-LD, canonical and genuine alternate/hreflang, Yandex/Metricool, Formspree CTA. Create PR with file list, SHA, preflight, tests, owner approval reference, rollback plan; Claude review according to Owner Protocol.

Post-release verify live exact route and metadata, proper language list, RSS/sitemap, analytics markers, link and media status; register accepted release in #16. No auto-deploy of unapproved content.

## Do not repeat old failure modes

- Never `git push origin main` from an old quick-start recipe.
- Never name next file by `ls ... | wc -l`; number gaps, duplicates and .bak files exist.
- Never assume `slug`, `canonical` or `hreflang` frontmatter controls site routing. Inspect the actual code.
- Never insert embedded BlogPosting JSON-LD as a 'SEO improvement'; global `BaseHead` already handles `Article`.
- Never treat a technical Claude ACCEPT as approval of author copy; never silently alter a published case or author metaphor.
- Never upload private client evidence to GitHub, open PR comments or publicly shared Drive.
- If docs/repo/policy disagree, do not pick the convenient one: identify the conflict and escalate as a *technical documentation mismatch*.

## Reference locations

Repo: https://github.com/Ivtekb/ivandubai-astro
Production: https://www.ivandubai.xyz/
Owner Policy: https://docs.google.com/document/d/191b_eRr0CHg7TlehV1qaJ88q9R-Aj09mwEKj835mnq8/edit
Execution register: https://github.com/Ivtekb/ivandubai-astro/issues/16
Review archive: https://drive.google.com/drive/folders/1TqzDkrpLSPZTNXOpbnub2h-PLESzXQSi
