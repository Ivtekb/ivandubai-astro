# ivandubai.xyz — mandatory Codex project instructions

> OWNER POLICY: https://docs.google.com/document/d/191b_eRr0CHg7TlehV1qaJ88q9R-Aj09mwEKj835mnq8/edit
> EXECUTION REGISTER: https://github.com/Ivtekb/ivandubai-astro/issues/16
> LOCAL WORKFLOW: [docs/CODEX_CONTENT_OPERATIONS.md](docs/CODEX_CONTENT_OPERATIONS.md)
> FOUR CHAT ROLES: [docs/CODEX_CHAT_STARTERS.md](docs/CODEX_CHAT_STARTERS.md)

This repository runs the live `https://www.ivandubai.xyz/` Astro website. **Read these instructions on every new task.** Always inspect the current Git worktree, relevant source files and repository docs rather than relying on the age of the chat or any old screenshot. Re-read the Owner Policy via the connected Google Drive tool at the start of a publishing task; if inaccessible, STOP before changing published content. A previous chat, plan or guide never grants new editorial authority.

## Authority and STOP conditions

- **Owner controls all words, facts, images and editorial decisions.** All existing published facts and cases are Owner-confirmed. Never challenge, re-check, reclassify, remove, rewrite or 'SEO-improve' them unless Owner explicitly directs it.
- New Blog/Case materials: prepare source-grounded draft and EN adaptation if requested, but **do not edit repository content or merge/deploy without Owner approval of the exact final RU/EN text, headline, metadata, imagery and publish date**. Consent to draft is not consent to publish. No made-up numbers, sources, clients, advertiser permit IDs or quotes.
- Pure technical changes within an already approved task may proceed only in exact scope, with **independent Claude technical review** required per the current Owner Protocol. Claude acceptance is *never* editorial approval.
- Stop for a stale or diverged branch, conflicting policy, missing required Owner approval, ambiguous target language/slug/translation, unverified output diff, broken link, missing image or unexpected build change. Report the blocker rather than improvise.
- Never commit or push directly to `main`. Use a dedicated branch and PR. Do not touch files outside the approved scope or mix unrelated work.

## Mandatory task preflight (repeat even in existing chats)

1. Verify workspace identity using `pwd`, `git rev-parse --show-toplevel`, and `git remote get-url origin` (must be `Ivtekb/ivandubai-astro`). Then run `git status --short`; `git fetch origin main`; record `git rev-parse origin/main`, `git rev-parse HEAD`, active branch. Use a clean worktree at the current `origin/main`. If not current, rebase/switch or STOP; do not overwrite someone else's edits.
2. Read **this file**, the applicable scoped `src/content/AGENTS.md`, `docs/CODEX_CONTENT_OPERATIONS.md`, the current `src/content.config.ts`, corresponding `src/pages/{,en/}{blog,cases}/...` routes, `src/components/BaseHead.astro`, and 1–2 recent approved examples in the same collection/language. Check the Owner Policy and newest relevant Owner decisions in issue #16. The frozen 15 Nov backlog table in #16 is *historic*; later Owner decisions override it.
3. Print a concise PRE-FLIGHT: current main SHA; loaded instruction sources and policy availability; role Blog RU / Blog EN / Cases RU / Cases EN; exact planned input/output paths; current generated URL conventions; Owner editorial approval status; image and link dependencies; and expected changed build outputs. **STOP before editing if any item is unresolved.**

## Current repository truths (verify again against current code)

- Astro 5 content collections are schema-defined in `src/content.config.ts`. Current file **ID**, not an extra `slug` field in frontmatter, determines the URL.
- RU Blog: `src/content/blog/<id>.md` → `/blog/<id>/`; EN Blog: `src/content/blog/en/<id>.md` → `/en/blog/<id>/`.
- RU Case: `src/content/cases/<id>.md` → `/cases/<id>/`; EN Case: `src/content/cases/en/<id>.md` → `/en/cases/<id>/`.
- Check for ID collisions in both language folders, pagination/list visibility, and the actual public media in `public/`. Do not calculate next post number from `wc -l` or assume `post-N` is mandatory.
- `BaseHead.astro` builds canonical URLs from the route and owns hreflang. Different RU/EN Blog IDs require an **explicit approved translation mapping** in `explicitTranslationPairs`; never create fake language pairs. Such code changes require Claude technical review. A frontmatter `canonical` or `hreflang` key alone does not make the site emit it.
- SEO fields supported by current schema: `seo.title`, `seo.description`, `seo.image.src/alt`, `seo.pageType`. Apply approved editorial maximum 150 characters to the meta description (Zod technical maximum 160). Prefer existing validated author metadata and JSON-LD; do not inject duplicate article schema scripts.
- Preserve Yandex Metrika, Metricool, Formspree, ClientRouter, sitemap, RSS and existing author/canonicals unless an approved task specifically modifies them.

## Execution gate

When and only when final material is approved, create the smallest isolated branch/PR; use `npm ci`, `TZ=UTC npm run build`, and compare output files against a **clean build of current `origin/main`**. Record exact expected vs actual file differences (new pages, homepage/list pagination, sitemap/RSS, public media and any approved hreflang mapping) and report unexplained changes as HOLD. No blanket assumption that only a new article HTML changes. Preview and check RU/EN route, SEO/JSON-LD, assets, links, CTA and analytics. Technical change → Claude review; publish only after Owner editorial approval; post-production verification and register updates as per Owner Protocol.

**Deprecated legacy guides:** `docs/QUICK_BLOG_POST_GUIDE.md` and `docs/QUICK_BLOG_POST_GUIDE_RU.md` contain pre-modernization commands (including direct push to main). Do NOT use their numbered-file, canonical/hreflang or deployment instructions as the source of truth. Use the live code and `docs/CODEX_CONTENT_OPERATIONS.md`.
