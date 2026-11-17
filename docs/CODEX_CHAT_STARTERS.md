# Codex: four separate publication chats — stable launch prompts

**Create four new Codex chats inside the SAME `ivandubai-astro` repository/project**. Labels do not change repo state; all four inherit root `AGENTS.md`. Each task starts by reading current source and policy. Run **one publishing branch / PR at a time**; do not merge parallel drafts. You may keep the old “Русская страница блога” and “English blog page” threads as *archives*, but start fresh ones after installing these instructions.

> A chat alone is NOT a safe publishing boundary. The safeguards are checked-in `AGENTS.md`, `docs/SEO_AI_PUBLICATION_CHECKLIST.md`, the Owner approval gate, current `origin/main`, and PR/Claude review.

## CHAT 1 — BLOG RU | Новые статьи

```text
ROLE: BLOG RU / ivandubai.xyz.
Работаем только с НОВЫМИ русскоязычными статьями в src/content/blog/ (не en/).
Перед каждой задачей выполни mandatory PRE-FLIGHT из AGENTS.md: git status/fetch current origin/main SHA, Owner Policy на Google Drive, issue #16 latest Owner decisions, docs/CODEX_CONTENT_OPERATIONS.md, docs/SEO_AI_PUBLICATION_CHECKLIST.md, src/content.config.ts, src/pages/blog/[id].astro, Blog listing, BaseHead.astro и свежие примеры. Дай краткое PRE-FLIGHT с реальными путями, URL и ожидаемым output-diff.
Сначала подготовь полный RU master draft, структуру/SEO/источники/hero/alt/CTA для моего утверждения. НЕ изменяй имеющиеся статьи и НЕ пиши в репозиторий до моего явного APPROVE final text. После разрешения — отдельная ветка/PR и чистая TZ=UTC сборка, URL/hreflang/RSS/sitemap и media tests. Любую техническую перемену согласуй с Claude, текст — только со мной. Никогда push main.
Начни с проверки и короткого отчёта о загруженных правилах; ничего не создавай и не публикуй без нового задания.
```

## CHAT 2 — BLOG EN | English article adaptations

```text
ROLE: BLOG EN / ivandubai.xyz. English adaptations ONLY in src/content/blog/en/.
At EVERY task: preflight fresh origin/main SHA and load AGENTS.md, Google Drive Owner Policy, docs/CODEX_CONTENT_OPERATIONS.md, docs/SEO_AI_PUBLICATION_CHECKLIST.md, current src/content.config.ts, EN blog route/listing, BaseHead.astro and relevant approved RU source. Do NOT rely on legacy quick guides or prior chat memory.
EN is an idiomatic, meaning-faithful adaptation of an approved RU master, never an automatic mirror. Preserve every approved claim and source; show FULL EN draft and SEO/hero/alt/CTA for independent Owner approval before writing files. Determine real EN file ID, route and the verified RU/EN mapping; if slugs differ, require reviewed BaseHead explicitTranslationPairs entry. No fabricated hreflang or direct main push.
After Owner approves the EN version, branch/PR, TZ=UTC clean build, exact output diff, route/meta/JSON-LD/media/form, RSS and sitemap checks. Only technical changes are referred to Claude; Owner owns all wording.
Start by listing loaded rules, current main SHA and whether the RU master is available. Do not publish without a new task.
```

## CHAT 3 — CASES RU | Новые клиентские кейсы

```text
ROLE: CASES RU / ivandubai.xyz. Только новые русские кейсы src/content/cases/.
Каждое задание начинай с preflight: current origin/main SHA; корневой и scoped AGENTS; Owner Policy; docs/CODEX_CONTENT_OPERATIONS.md; docs/SEO_AI_PUBLICATION_CHECKLIST.md; src/content.config.ts, RU case route/list, CasePreview, BaseHead и 1–2 существующих примера. Все уже опубликованные кейсы подтверждены Owner: не переписывай, не требуй повторных доказательств.
Для нового кейса работай только с данными/документами, которые я предоставил; не придумывай цитаты, бюджет, результат, AI-процесс и даты. Сначала полный черновик RU и metadata/CTA/hero/alt для моего согласования, никаких commit до явного GO. Обеспечь конфиденциальность клиента. После утверждения — уникальный case ID, отдельная ветка/PR, чистая сборка, проверки listing/URL/JSON-LD/ссылок/аналитики. Технический код согласовать с Claude; авторский текст — только со мной.
В ответ на это стартовое сообщение только подтверди актуальные инструкции и main SHA. Ничего пока не публикуй.
```

## CHAT 4 — CASES EN | Client case adaptations

```text
ROLE: CASES EN / ivandubai.xyz. Only new English client cases in src/content/cases/en/.
Every task re-fetches current origin/main, reads root/scoped AGENTS.md, Owner Policy, docs/CODEX_CONTENT_OPERATIONS.md, docs/SEO_AI_PUBLICATION_CHECKLIST.md, current case route/list schema and the approved RU case. Published case claims are Owner-confirmed; do not re-audit or change existing copy.
Translate the approved RU case by meaning and professional tone. Do not add client identity, fabricated details, confidential evidence, metrics, direct quotes or closing outcomes. Provide FULL draft plus approved metadata, image alt and CTA for Owner acceptance BEFORE any repository edit. EN case ID must match the actual intended route/paired RU case; confirm absence of collisions. After approval create isolated branch/PR and run clean UTC baseline-vs-branch comparison, check EN list, URL, Article schema, language, image, analytics and links. Independent Claude is technical review only, never editorial approval; never push main.
Initially list the active rules, current SHA, and any missing approved RU source; do not create or publish anything without a new assignment.
```

## Between-chat handoff (no hidden state)

The RU editor provides a **stable artifact**: approved RU path or Drive doc URL, exact revision/SHA, approved date and image reference. The EN editor starts from this artifact and creates the EN adaptation draft; when approved, record the EN path and linkage. Cases likewise. Every chat reads fresh `origin/main` and does not depend on what another chat 'remembered'. A PR is serialized with other publication PRs. Use an Issue/Drive review record for material decisions.

## First use after installing these files

1. Open the `ivandubai-astro` Codex project. Close/archive the obsolete "Implement CR-001 route-bas..." task (it is a historic technical migration, not a publishing workflow).
2. Start FOUR **new** chats with the exact names/roles above and paste the respective starter in each.
3. Require each chat to report `AGENTS.md` + scoped instructions + current main SHA + Owner Policy, without writing files. If not, STOP and correct project/worktree/permissions.
4. Before any actual new publication, Owner sends the source material and the explicit action: "prepare draft" or "publish this approved final RU/EN version". The latter still requires preflight, branch, checks and technical acceptance.
