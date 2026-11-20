# Codex automated publishing — new Blog/Cases RU/EN

## Owner input — no other information required

    ПУБЛИКУЙ
    Картинка: 28
    Текст:
    [final, already approved article and heading]

The Codex chat already owns Blog RU/EN or Cases RU/EN role. Writing, translation and final editorial approval occur in another chat. Codex never rewrites content, asks for a second approval, or chooses another language. Image number resolves to the actual existing repository asset (e.g. public/post-28.jpg); it does not determine the page URL. New ORIGINAL pages use descriptive SEO slugs, while existing published post-28 URLs stay unchanged. No redirects are part of this pipeline.

## Select the release transport first

Use one consistent priority with **[CODEX_CONNECTOR_FIRST_FASTLANE.md](CODEX_CONNECTOR_FIRST_FASTLANE.md)**: if authenticated `gh` **and** repository network are **already verified** in a trusted CLI environment, use the CLI driver. Otherwise choose connected GitHub tools when they can write, without first attempting the CLI driver or retrying blocked shell access. If the connector cannot write, test `gh` authentication/network at most once, then STOP if unavailable. **Connector releases must inspect the PR changed-file list and QA log: `new_pages` ≥ 1, no `TECHNICAL PR` marker, and only added approved Markdown plus any added approved image; otherwise STOP regardless of green CI.** Both routes require SHA-protected merge, Vercel Preview, exact production parity and Owner permissions. Technical PRs never use the content-only fastlane.

## Exact internal sequence after Codex assembles Markdown

From a dedicated isolated branch based on latest main, verify the original JPEG and ensure the approved Markdown contains one template H1, faithful metadata and visible body image. Call once:

    node scripts/publish-release.mjs --approved-publish --route /en/blog/descriptive-topic-slug/ --image 28

Optional `--dry-run` does read-only preflight without network or Git mutations. The full driver requires git, Node and an authenticated GitHub CLI. It stages only the NEW article and chosen image, pushes, creates a content-only PR, watches GitHub QA and Vercel preview, refuses to merge on a stale main, merges after all PASS, waits for production QA and prints the live URL. It does not change published author text or source code. Technical Astro/template modifications require a separate Claude-reviewed release.

## Quality gates owned by GitHub, not repeated by Codex

`.github/workflows/publish-quality-gate.yml` runs on pull_request. It builds clean baseline and candidate with locked npm dependencies and TZ=UTC, then runs `scripts/verify-content-release.mjs`: exact expected/actual output scope, NEW Markdown only, correct SEO fields, title/H1, lang, canonical, Article/Person JSON-LD, image visible in article and OG, meaningful alt, actual reciprocal hreflang, RSS and sitemap. GitHub provides PASS/FAIL logs. Vercel's connected integration automatically builds PR preview and reports a `Vercel` status; it must be successful before merge.

After main merge a separate GitHub Actions job rebuilds that exact main and runs `scripts/verify-live-parity.mjs`, waiting for Vercel deployment and comparing every public generated page/asset byte-for-byte at https://www.ivandubai.xyz/ with HTTP 200. Codex waits for this result. Independent Claude postrelease review is still recorded separately; its absence must not be misrepresented as ACCEPT. No automatic rollback or unapproved site edits.

## Permissions and fallback

Codex sandbox shell can deny git fetch/push or browser. Repository scripts cannot override OS/security permissions. One-time trusted repository network authorization may be required. If shell commands fail due to DNS or gh access, STOP retrying and instead use connected GitHub actions for PR/create/check/merge plus GitHub Actions/Vercel verification, all under the existing Owner PUBLISH command. If neither channel can act, report ONE concrete missing permission; do not ask the Owner to manage technical files.

Do not run manual npm ci, two local builds, or Chrome viewport screenshots for unchanged content-only template/CSS. For code/layout changes, follow separate technical review and visual QA. Log actual elapsed timestamps in PR/Actions, not speculative runtime targets. Independent content PRs may coexist, but production merges/deployments are serialized.