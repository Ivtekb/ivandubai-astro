# Codex publishing operations — ivandubai.xyz

**Default owner workflow:** image already uploaded + **`ПУБЛИКУЙ` / `Картинка: 28` / `Текст: <готовый текст>`** in one of the four role-specific Codex chats. The article is already translated/edited by an external editorial chat: Codex's job is exclusively technical publishing, with no translation, copywriting or repeated editorial GO. Read [CODEX_ONE_MESSAGE_PUBLISHING.md](CODEX_ONE_MESSAGE_PUBLISHING.md); handle preflight, SEO packaging, PR, deployment and checks without requesting extra Owner steps. A draft request is different; it never authorizes publication.
Status: repository-local instructions, derived from live source at main `a9c949adee8120912202ea5000025e042b6c311a` (2026-11-17). **Dynamic reference, not a permanent pin.** Always check the *current* main before acting.

## Authority, sources, and roles

1. Highest priority: explicit latest Owner decisions and [Owner Policy](https://docs.google.com/document/d/191b_eRr0CHg7TlehV1qaJ88q9R-Aj09mwEKj835mnq8/edit) (existing published claims treated as Owner-confirmed, no re-verification).
2. Active technical state: current checked-out repository at `origin/main`, especially `src/content.config.ts`, route generators, `BaseHead.astro`, `astro.config.mjs`, `package.json` and validated examples. Do **not** use an old date, old chat or a static docs screenshot in place of live code.
3. Issue #16 [Owner execution register](https://github.com/Ivtekb/ivandubai-astro/issues/16) — prioritize recent Owner notes/comments over the initial frozen 15 Nov table. Previous quick-post guides and original Dante README are historical, **not** active deployment instructions.
4. Read `docs/SEO_AI_PUBLICATION_CHECKLIST.md` for all four Blog/Case roles. Root `AGENTS.md` is loaded by Codex when its working directory is inside this repository; separately read `src/content/AGENTS.md` for Blog/Case tasks, plus the applicable section of this operations guide. The nested file is intentionally outside Astro collection folders and is not automatically injected into repo-root chat context.
5. Each Codex chat must select one specific role. Four starters are in `docs/CODEX_CHAT_STARTERS.md`. Re-run preflight *for each new task*, not just at the start of a chat.

If Google Drive/Owner Policy is reachable, read it. If it is inaccessible, the repository-local rules in `AGENTS.md` and `docs/` remain binding for new content publication: an explicit **PUBLISH** message with final text and the named image suffices as Owner authorization for that exact copy plus fact-faithful technical fields. Do **not** halt solely due to a missing Drive connector. If accessible Owner Policy conflicts with local instructions, stop and raise the precise conflict. Neither path authorizes changes to already published copy.

## Exact current route and schema pattern

| Role | Source location | Route | Required frontmatter |
| --- | --- | --- | --- |
| Blog RU | `src/content/blog/<id>.md` | `/blog/<id>/` | `title`, `publishDate` |
| Blog EN | `src/content/blog/en/<id>.md` | `/en/blog/<id>/` | `title`, `publishDate` |
| Cases RU | `src/content/cases/<id>.md` | `/cases/<id>/` | `title`, `publishDate` |
| Cases EN | `src/content/cases/en/<id>.md` | `/en/cases/<id>/` | `title`, `publishDate` |

**NEW Blog/Case pages MUST have meaningful URL slugs** derived from the approved article's principal topic/search phrase (e.g. `dubai-branded-residences.md` → `/blog/dubai-branded-residences/`). Lowercase, short and hyphenated; avoid `post-N`, `case-N`, vague dates and image numbers. `Картинка: 29` names an image, never a URL ID. For new bilingual pairs, reuse the same descriptive filename ID in RU and EN so BaseHead generates reciprocal hreflang without new technical mapping. A local-language/transliterated RU slug with a distinct EN slug requires reviewed `explicitTranslationPairs` code until architecture changes. **Legacy published** `post-N` routes remain unchanged; add a translation with that exact ID only when its actual counterpart already exists in main. Never change the URL of an already published page without separate Owner approval and tested permanent (301/308) redirects, canonical, hreflang, sitemap, RSS and internal links. Run `scripts/verify-publication-slug.mjs` in pre-merge checks, with `--legacy-counterpart` only for the verified existing pair.

As of 2026-11-17, `src/content.config.ts` uses Astro glob loaders and Zod: `title`, `publishDate` are required for Blog/Cases; `excerpt` in Blog and `description/clientName/projectType/budget/timeline` in Cases are optional. `seo` has `title` (5–120), `description` (15–160), `image` (`src` and optional `alt`), `pageType`. The editorial standard for meta-description remains **≤150 characters RU/EN**, where feasible. `lang`, `slug`, `canonical`, `hreflang`, `og` and `twitter` may appear in legacy Markdown, but are NOT declared fields in current collection schema; they do not supersede `BaseHead.astro` or route IDs. Do not remove them from existing posts as a cleanup.

**Important:** `BaseHead.astro` generates canonical from the actual URL. It emits paired hreflang only for actual generated RU+EN routes. Differing Blog IDs require an **explicit translation pair in the Map**; a new pair is a small *technical* code change needing Claude review, and must not be invented for one-sided material. Cases sharing the same ID in both languages use the current route pairing behavior; verify resulting HTML.

When adding content, keep approved `publishDate` exact; add `updatedDate` only when applicable. Use current image paths from `public/` and approved RU/EN alt. **A supplied hero must be inside Markdown content visibly, not just `seo.image`: both Blog and Cases RU/EN templates render `<Content />` without auto-inserting the hero.** Put the image after the template H1/date, before the first body paragraph; run `node scripts/verify-publication-hero.mjs --route <actual-route> --image <public-image-URL>` after build. A page with OG/JSON-LD image but no body `<img>` is FAIL. Never add fabricated source links, dates, prices, client results, official advertiser permit or author claims. Public business/developer marketing must follow applicable UAE requirements; record actual permit numbers only when supplied.

## Preflight — mandatory every request

- **Pre-check image number / exact file and completed approved text immediately**, before expensive tests. For `Картинка: 28`, resolve the unique matching existing repository asset (typically `public/post-28.jpg`; search available extensions if needed). Do not ask for a full path when unambiguous. The number identifies an asset and is not sufficient evidence to pair unrelated translated pages. If the file appears in VCS but not the local checkout, inspect/fetch its actual accessible remote ref once; if missing, ask for one specific path, never poll it. Locate correct `Ivtekb/ivandubai-astro` checkout first. If Codex opened an unrelated empty working directory, find the real checkout or bootstrap a fresh isolated clone as described in `docs/CODEX_ONE_MESSAGE_PUBLISHING.md`; don't tell Owner to manage Git unless blocked by permissions. Then `git status --short` + `git fetch origin main` + `git rev-parse origin/main` + `git rev-parse HEAD`; create a clean branch/worktree on latest `origin/main`.
- Confirm chat role against any explicit `Раздел:` and text's dominant language; STOP on mismatch or requests for multiple sections/languages (one question, no file edits). Confirm new material ID, ISO `publishDate` (`YYYY-MM-DD`), exact repository-sourced image under `public/`, approved material and collision checks. The Owner's explicit PUBLISH request with final text + image is the approval for that exact copy and faithful SEO packaging; don't demand a second approval. If it says DRAFT, never publish.
- Read `docs/SEO_AI_PUBLICATION_CHECKLIST.md` and current relevant route/preview components, content schema and `BaseHead`; check 1–2 recent good articles/cases in same language, but do not blindly copy historical frontmatter or embedded scripts.
- Perform PRE-FLIGHT silently; document SHA, loaded instructions, files, URL, approved PUBLISH scope, mapping and tests in PR. Communicate only an actual blocker and final public link, avoiding unnecessary owner-facing technical reports.

## Two-stage publishing workflow

**Stage A — editorial:** for a DRAFT request, prepare for Owner approval. For an explicit PUBLISH request with final text and image, final body copy is already approved: preserve it; derive only faithful technical metadata and mechanical Markdown formatting per `docs/CODEX_ONE_MESSAGE_PUBLISHING.md`. EN adaptation requires its own approved version. Do not append editorial copy/CTAs or rewrite existing material.

**Stage B — technical (after explicit PUBLISH or approved final draft):** create a separate branch from latest main and add only approved Markdown/media plus any separately approved small technical mapping. Do not use `git add .` blindly. Do not commit/push to main or change existing published copy. If route/translation mapping/frontmatter logic needs technical source-code modification, submit precise plan for Claude's independent technical agreement before implementation/merge. For content-only release adding approved Markdown and Owner-selected image, no pre-merge Claude gate; Codex performs full post-deploy verification, records it, and follows the Owner Protocol #16 independent post-release review convention without pretending approval was obtained. Owner's content approval is a distinct gate.

If lockfile-matched dependencies are available and verified, reuse them safely; otherwise run the already-authorized routine `npm ci` (subject to real OS/network permission). Build clean baseline and candidate with `TZ=UTC npm run build`, using separate `.astro`/Vite caches and output dirs, including for docs-only PRs because Tailwind v4 can scan docs and change generated CSS. Produce one exact output-diff. Never share mutable cache paths or repeat passing builds without code/main changes. Compare `dist/` exact expected/actual changes. For new articles, expect possible changes in list/pagination, RSS, sitemap, article output, local previews, assets, and hreflang; **do not use an assumed fixed count**. Investigate unexpected changed HTML, missing pages, 404s or non-deterministic sort before merge. Confirm current HTML output count, valid frontmatter, the entire `docs/SEO_AI_PUBLICATION_CHECKLIST.md` against rendered HTML (headings, approved editorial meaning, localized title/description, OG image, Article/Person graph and dates, canonical and reciprocal actual hreflang, relevant internal links, image/alt and crawler access), Yandex/Metricool and Formspree CTA. Create PR with file list, SHA, preflight, tests, owner approval reference, rollback plan; Claude review according to Owner Protocol.

Post-release verify live exact route and metadata, **body-visible image with correct src/alt (separate from OG/JSON-LD) and HTTP 200 image bytes**, proper language list, RSS/sitemap, analytics markers, link and media status; register accepted release in #16. For browser QA, fall back promptly from failing CUA to headless Chrome with confirmed CSS viewport; static checks don't require browser debugging. **Only one merge/deployment in flight at once; independent PRs may remain open together.** Before merging, re-fetch latest main and ensure no conflicting release is in progress. Never wait/poll an unrelated draft PR. Do not deploy unapproved content. An explicit PUBLISH request containing final content and image is the Owner authorization to deploy that exact material after technical gates; no redundant content review requested.

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
