# Codex PUBLISH — connector-first execution fastlane (R0 proposal)

**Status:** Draft technical operating procedure. No change in editorial authority, publishing permissions, or the website's content. Applies only to an Owner-authorized **NEW** Blog/Case content publish. The existing protected-content, CI, Vercel, exact-output, rollback and SEO gates remain binding.

## Goal and baseline

Last two published language versions: PR #54 around 53 tool calls, PR #55 around 46 tool calls and 28m35s. The avoidable problem was choosing the unauthed `gh`/sandbox transport and then manually switching to a working connected GitHub tool. Performance goals are **measured reductions** in unsuccessful transport attempts, duplicate QA and needless polling; do not promise fixed wall-clock times.

## Transport selection: the FIRST decision

1. **One consistent transport priority:** if an authenticated `gh` CLI **and** repository network are **already verified** in the trusted execution environment, choose the existing **CLI driver**. Otherwise, when connected GitHub actions can read and write the repository, choose **MCP connector-first** before attempting shell `git fetch`, `gh auth`, `npm ci` or the full CLI driver. Never probe a known-broken shell route just to establish priority; offline draft validation is optional.
2. If the connector cannot write and CLI access is not already verified, check authenticated `gh` **and** repository network at most once. Use the **CLI driver** `node scripts/publish-release.mjs --approved-publish ...` only if both work; otherwise STOP. Both transports retain the exact same publication and production QA gates.
3. Neither transport available => STOP with one concrete missing permission; no network retries, fabricated authentication, new Owner editorial approval request, or unapproved fallback.
4. This document is an orchestration contract, not an executable connector SDK. The Node CLI driver cannot call ChatGPT's GitHub connector. Do not assume its `gh auth` failure can be fixed from a Node script.

## Connector-first minimal release sequence

1. **One policy+asset preflight:** role RU/EN, exact approved full text and image, file already available, its real hash/approved bytes, applicable scoped `AGENTS.md` and SEO checklist, existing related counterpart and slug. Reject any edits to protected published files. No automatic translation or AI content edits. Record main SHA `B`.
2. **One coherent branch/commit:** branch from fresh `B`, create only the new Markdown source and approved new asset if needed; for small approved source changes, prefer one Git tree/commit transaction if connector supports it. No staged sitewide template/code changes. Open exactly one content-only PR.
3. **One PR gate, with mandatory content-only classification:** obtain exact PR HEAD `H`. Inspect the actual GitHub PR changed-file list and the GitHub Actions `Publish Quality Gate` log on `head_sha=H`. Require `verify_content_pr=SUCCESS`, a log line `new_pages=<expected count ≥1>`, **no `TECHNICAL PR` marker**, and `SOURCE` diff containing **only `A` (added) new approved Markdown under `src/content/blog/` or `src/content/cases/`**, plus optional **`A` (added) approved image under `public/`** if it is not already present. Reject missing/new-pages mismatches, image-only branches, any `M`/`D` source diff, and any source/code/config change: **STOP, not a content-only fastlane release, even if CI is green or an Owner PUBLISH command exists**. Require Vercel Preview combined status `SUCCESS` for the same `H`. Use CI's output manifest and SEO gates; do not repeat full local builds merely to poll finished checks. Do not interpret `queued` as PASS.
4. **SHA CAS merge, content-only guard repeated:** refresh current `main` and PR HEAD immediately before merge; if `main !== B`, revalidate the branch under the new baseline; if `HEAD !== H`, repeat **all** PR gate and content-only log/source-diff checks for the new HEAD. If any check fails, STOP. Merge only Owner-approved NEW content with `merge_pull_request(expected_head_sha=H)` or equivalent SHA-guarded action. Technical PRs require independent Claude ACCEPT and separate technical release procedure; **never merge them through this fastlane**. No direct main pushes. A parked unrelated draft PR must not be merged or waited on.
5. **Production proof:** fetch actual merge SHA `M`; get Vercel deployment `READY` with `githubCommitSha=M`. The GitHub specialized `fetch_commit_workflow_runs` may omit push workflows. Instead use the connected **GitHub fetch** action on `https://api.github.com/repos/Ivtekb/ivandubai-astro/actions/runs?head_sha=M&per_page=20`, select `event=push` and the `Publish Quality Gate` run, then `fetch_workflow_run_jobs`, ensure `verify_production=SUCCESS`; optionally `fetch_workflow_job_logs` to capture `PRODUCTION PASS N/N files byte-identical`. Do not claim production parity based on PR checks or Preview.
6. **One minimal live smoke:** correct new RU/EN URL with HTTP 200, canonical, expected visible article hero and correct locale CTA; use CI evidence for exhaustive per-file exact parity and structured SEO. If any contract is unverified, report `UNKNOWN` and do not mark as full PASS.
7. **One compact release record:** actual time from receipt of `ПУБЛИКУЙ` to verified live release; tool calls (total, failed, repeated), baseline/HEAD/merge SHA, PR/run/deployment/evidence URLs and why a fallback occurred. R1 SEO/AI monitoring as required by Owner Policy. A postrelease Claude review is independent and must never be represented as automatically ACCEPT.

## Polling / retry discipline

- Read each evidence source once after the required state is expected to be available. If not finished, use bounded state checks; every retry must be motivated by a real PENDING state and have a finite ceiling. Never poll a finished PASS again.
- No `git fetch`/network retry loop after a proven sandbox DNS denial, and no local full driver when `gh` is unauthed.
- One transport choice; no preliminary and live full-driver runs merely to follow a ritual.
- Never sacrifice protected-content rules, mandatory clean CI, Preview checks, exact production parity, or Owner editorial control for call-count reduction.

## Risk and rollout

`SEO_IMPACT=R0_IF_ZERO_GENERATED_OUTPUT`, `AI_DISCOVERABILITY_IMPACT=NONE_EXPECTED_IF_PARITY`, `INDEXATION_RISK=LOW_DIRECT`, `EXPECTED_OUTPUT_DIFF=0`, `STABILIZATION_WINDOW=NONE_FOR_TRUE_R0`, `BASELINE=PR_CURRENT_MAIN`, `POST_RELEASE_MONITORING=D0,D+1,D+3,D+7,D+14,D+28`, `ROLLBACK_TRIGGER=unexpected_output_or_release_regression`, `NEXT_SAFE_RELEASE_CONDITION=Claude_PREMERGE_ACCEPT+OWNER_GO+production_parity`.

This file and any corresponding `AGENTS.md` clarifications must be isolated in a technical PR; approval requires exact `TZ=UTC` clean baseline/current build comparison with **zero generated output changes**, independent Claude review and explicit Owner merge GO. This proposal never itself grants permission to merge or change a published article.
