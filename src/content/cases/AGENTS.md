# Cases collection — scoped Codex instructions

Read root `AGENTS.md`, Owner Policy, and `docs/CODEX_CONTENT_OPERATIONS.md`. The Owner confirms existing published case information; never challenge or rewrite previous cases.

- Use current `src/content.config.ts`, RU/EN cases route generators and `CasePreview.astro`. Never copy outdated Blog frontmatter or rely on old Codex thread instructions.
- RU path `src/content/cases/<id>.md` → `/cases/<id>/`; EN path `src/content/cases/en/<id>.md` → `/en/cases/<id>/`. Match IDs for genuine translation pairs where appropriate. Check collisions and generated listings.
- Required current metadata: `title` and `publishDate`. Optional according to current schema: `description`, `clientName`, `projectType`, `budget`, `timeline`, `isFeatured`, `seo`. Include only exact Owner-approved facts; client confidentiality is mandatory.
- Prepare owner-supplied narrative and RU/EN editorial adaptation for approval. **No invented client quotes, performance numbers, outcome, schedule or identity**. Never publish confidential documents as source evidence.
- Update only the specific approved new case and assets, never the existing published Case-1. Branch, clean UTC build/output diff, route/image/JSON-LD/link tests, Claude technical review and postrelease acceptance.
