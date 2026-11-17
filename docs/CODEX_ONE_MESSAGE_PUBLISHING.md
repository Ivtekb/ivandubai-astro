# One-message publication workflow — Blog RU/EN and Cases RU/EN

**Owner's intended UX:** The Owner prepares an image, uploads it into the connected version-control repository or gives its exact accessible asset path, then sends the final text to the relevant Codex chat with **«ПУБЛИКУЙ» / «PUBLISH»**. The agent performs all technical work without asking the Owner to understand Git, Astro, schemas, routing or SEO metadata. **This explicit message is approval to publish the supplied text and specified image, not permission to rewrite them.**

Use this format in any of the four dedicated chats:

```text
ПУБЛИКУЙ НА IVANDUBAI.XYZ

Изображение: <точное имя файла, путь в репозитории или доступный URL>
Текст:
<полный окончательный текст с заголовком>
```

The target section and language come from the chat role (Blog RU / Blog EN / Cases RU / Cases EN). For the first version in the second language, the Owner sends an approved version in that language to the corresponding chat; translation is a separate editorial artifact requiring Owner consent.

## Agent must do autonomously — no repeated setup instructions to Owner

1. **Find the correct checkout.** Inspect `git rev-parse --show-toplevel` and `git remote -v`. If the Codex workspace is an unrelated, empty repo such as `codex/add-project-config`, do NOT use it to publish. Find the existing `Ivtekb/ivandubai-astro` checkout; if absent and GitHub access permits, clone `https://github.com/Ivtekb/ivandubai-astro.git` to a new isolated folder (never overwrite existing files). Perform all publication commands in that real checkout. If neither is possible, stop with **one short technical blocker** rather than asking the Owner to create the checkout manually or claiming readiness.
2. **Internal preflight** on every task: fetch fresh `origin/main`; read root `AGENTS.md`, `src/content/AGENTS.md`, `docs/CODEX_CONTENT_OPERATIONS.md`, `docs/SEO_AI_PUBLICATION_CHECKLIST.md`, latest Owner Policy, current content schema, actual route and BaseHead templates, and recent relevant examples. Do not dump the preflight to Owner unless a blocker exists. Retain main SHA and test evidence in the PR/release log.
3. **Image:** locate exact asset (e.g. `public/post-27.jpg`) or an approved externally hosted URL. Verify it exists and will render, with correct filename/case, supported format, image dimensions, and path in `seo.image.src`. If image is in repository but outside public folder, copy exactly the supplied file to an appropriate `public/` path, preserving visual content, on the publication branch. Do not silently change, regenerate, crop or swap Owner's image. If more than one possible image matches, ask which one.
4. **Preserve final body exactly**: do not remove, rephrase, translate, add facts, inject editorial CTAs or change author voice. If Markdown is needed for the Astro renderer, only make clearly mechanical formatting transformations (headings, whitespace, bullet syntax), preserving every word and paragraph order. A standalone user-supplied title becomes the template-generated H1; body Markdown begins at H2, avoiding a duplicate H1. Any substantive copy change must be approved by Owner before proceeding.
5. **Generate technical packaging automatically** from the exact Owner text: unique filename ID and URL, current date in `Asia/Dubai` as `publishDate` only if the Owner didn't specify another date; correct schema-required frontmatter; concise description/excerpt and SEO title without new factual claims (SEO description ≤150 characters); approved image path/alt that literally describes the image; tags from the real topic without invented classifications. These derived non-body fields are approved by the Owner's explicit **PUBLISH** command *only insofar as they faithfully summarize supplied material*. If a title, image, dated claim or compliance requirement cannot be resolved faithfully, stop and ask a **single precise question**, never fabricate it.
6. **Reuse current site architecture**: no hard-coded canonical or hreflang frontmatter as authoritative; BaseHead controls Article+Person JSON-LD, OG, canonical and localized language alternates. If different RU/EN slugs require a new `explicitTranslationPairs` entry, get Claude technical review first. Do not add duplicate schema, fake sources, fabricated permit numbers or auto-edit existing publications. Apply all mandatory new-page SEO/AI checks.
7. **Build, review and publish** on a dedicated branch/PR (never push directly to `main`): clean `TZ=UTC npm run build` of current main vs branch and expected file-by-file output diff, validate image, route, canonical/hreflang, Article/Person, heading hierarchy, listing, RSS/sitemap, internal navigation, analytics and Formspree. For technical source-code changes obtain Claude technical agreement as mandated by Owner Protocol; do not seek Claude editorial sign-off. Execute authorized merge/deploy after required release gates; verify the public page and record release. When the environment cannot perform an action, report its exact blocker and a minimal next action.
8. **Return only the result Owner needs:** public RU/EN page link, whether deployed, image confirmation and short test status. Do not flood the Owner with Git SHA, long checklists, or a new request to approve the supplied text; technical evidence belongs in the PR/issue.

## Explicit boundaries

- **DRAFT / «Подготовь черновик»** means prepare a draft, do not publish.
- **PUBLISH / «Публикуй» + final copy + specified image** means the Owner approved that exact material for publication and its *faithful technical metadata*. It does not authorize stylistic editing, invented claims, publication of other language versions or changes to existing pages.
- If the user simply pastes material without PUBLISH, ask whether the request is to draft or publish; do not assume.
- If a previous publication exists at the target ID, STOP (never overwrite). Preserve all Owner-approved existing publications.
- Keep user-facing interaction minimal; all reproducible checks and source-of-truth comparisons occur autonomously.
