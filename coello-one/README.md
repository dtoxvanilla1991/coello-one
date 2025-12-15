# Coello One (Monorepo) 🗺️

The Coello One monorepo powers the one-sleeve apparel experience across a **Next.js frontend** (Bun runtime) and a **Flask backend**. This document is the **single source of truth** for every AI assistant and contributor—keep it open while working and treat every section as mandatory.

---

## Repository Overview

| Area | Path | Notes |
| --- | --- | --- |
| Frontend | `coello-one/` | Next.js App Router (React 19) running on Bun |
| Backend | `flask-server/` | Flask API + CLI utilities |
| Shared Config | `config/`, `scripts/`, `app/localization/` | Centralized data, tooling, and translations |

Always `cd` into the correct directory before running commands. Frontend scripts assume Bun; backend scripts assume Python/Make.

---

## Tech Stack & Version Pins

- **Next.js:** `16.0.3`
- **React:** `19.2.x`
- **Styling:** Tailwind CSS + Ant Design
- **State:** Jotai atoms (`store/`)
- **Forms:** React Hook Form + Zod
- **Package Manager:** Bun `>= 1.2.21` (pinned in CI)
- **Backend:** Flask (Python 3.11)

Match these versions when referencing documentation or adding integrations.

---

## Setup & Tooling

1. **Bootstrap in one step:** `make setup` (installs Bun deps, Flask tooling, Husky hooks).
2. **Manual installs (if needed):**

   - Frontend: `cd coello-one && bun install`
   - Backend tooling: `pip install -r flask-server/requirements-dev.txt`

3. **Common scripts (run inside `coello-one/`):**

   - `bun dev` – Next.js dev server (Turbopack)
   - `bun run build` – production build
   - `bun run lint` – ESLint with zero-warning policy
   - `bun run test` – Bun tests (auto-preloads `test-setup.ts`)
   - `bun run format` / `bun run format:fix` – Prettier + Tailwind sorting
   - `bun run verify:locales` – ensure namespace parity across locales

4. **Formatting hooks:** staged TS/TSX files auto-format with Prettier; staged Python files auto-format with Black. Resolve hook output before committing.

---

## AI Operations Handbook

### 1. Core Mandates

- **Mobile-first always:** design, implement, and test the handheld experience before tablet/desktop.
- **Context7 + Serena:** fetch context via Context7, cite snippet IDs in Serena notes, and log plans/outcomes inside Serena prior to editing.
- **No rogue packages:** never add, remove, or modify `package.json` / `bun.lock` entries without explicit user authorization.
- **Icon policy:** only Ant Design Icons are allowed. Third-party icon packs or ad-hoc SVG imports are verboten without approval.
- **Copy parity:** every new or modified user-facing string must land in both en-GB and es-ES localization files before the work is considered complete.
- **Bun-native:** use `Bun.file`, `Bun.write`, `Bun.SQL`, `Bun.secrets`, and Bun YAML helpers for server-side work. Node `fs` and legacy `bun:sqlite` APIs are banned.
- **Testing doctrine:** every method or behavior needs both unit **and** integration coverage unless a `// TEST-WAIVER: reason` comment (plus Serena note) documents the exception.
- **Chief’s Insight:** respond to each request through the Chief Advisory Team lens and surface a `[Chief's Insight]` section that critiques risk and suggests upgrades.

### 2. Persona Protocol

Personas live in [`AGENTS.md`](../AGENTS.md). Before executing any task, determine which persona (Laura, Olaf, or Yuriy) best fits the work and adopt that voice automatically—switch personas as scopes change without waiting for user direction.

### 3. Interaction Workflow

1. Read this README in full before every work session.
2. Use Context7 for all code/doc lookups, cite snippet IDs in Serena, and only fall back to manual reads when Context7 cannot surface the file.
3. Plan edits with Serena MCP tools (symbol overviews, searches) prior to touching files.
4. Apply changes via project-safe tooling (`apply_patch`, Bun scripts, etc.) and keep diffs minimal.
5. Document outcomes, open questions, and exceptions back in Serena.

**Pre-flight Serena checklist (must be logged before making edits):**

- Confirm “README digested” and note the specific section(s) you are operating under.
- Record which Chief persona you have activated and why it matches the task.
- Outline the initial plan of attack (files to inspect, tools to run) so reviewers can trace intent vs. execution.
- Capture blockers or assumptions so new contributors can resume the thread without rework.

### 4. UX & Styling Standards

- Compose UI exclusively with Ant Design or sanctioned Next.js primitives (e.g., `Flex`, `Typography`, `Activity`). Native HTML tags require a documented Serena exception.
- Maintain the primary header with a white background and sticky behavior.
- Product detail pages must wrap content with `ProductDetailShell` for consistent responsive gutters.
- Tailwind rules:
  - Prefer utilities over bespoke CSS.
  - Use the canonical important syntax (`utility!`).
  - Query Context7 for Tailwind docs before introducing new utilities and cite the snippet in Serena.
- Motion: favor purposeful transitions validated on mobile first (Laura’s standard).

### 5. Localization & Copy

- Store copy in `app/localization/messages/<locale>/<namespace>.json`.
- Access copy via `useTranslations(namespace)` (client) or `getNamespaceCopy(locale, namespace)` (server). Avoid inline literals.
- After editing copy, update both en-GB and es-ES files and run `bun run verify:locales`.
- When emitting analytics for localized CTAs, pass `locale`, `translationKey`, and optional `translationVariant` to `trackEvent` as metadata.

### 6. Testing & QA Doctrine

- Run `bun run test` and `bun run lint` before sharing work.
- Prefer behavior-driven assertions over snapshots.
- Reuse shared helpers: `@test-utils/navigation`, `@test-utils/trackEventMock`, `@test-utils/clickWithAct`, and the mocks defined in `test-setup.ts`.
- `config/footerLinks.smoke.test.ts` and `config/db.smoke.test.ts` remain in the suite—enable them via env vars (`FOOTER_LINKS_BASE_URL`, etc.) when needed.
- Olaf’s mandate: flakiness is unacceptable. Stabilize brittle specs immediately.

### 7. Bun Runtime & Server Rules

- Use `Bun.SQL` tagged template literals for all SQL. Never call `db.query()` / `db.prepare()` from `bun:sqlite`.
- Prefer Bun’s YAML loader (`Bun.YAML.parse`) and `Bun.secrets` for config + credential handling.
- Run `bun audit --audit-level=high` before proposing dependency upgrades and document the audit in Serena.

### 8. State, Data, and Analytics

- Leverage Jotai atoms in `store/` (`cartStore`, `siderStore`) instead of creating new global stores.
- Centralize telemetry through `utils/analyticsAdapter.ts` and `utils/trackEvent.ts`; include `subtotal`, `shipping`, `total`, and `itemCount` when tracking cart milestones.
- Advocate for measurement hooks whenever a new UX flow launches and log proposed KPIs in Serena.

### 9. Navigation & Layout Rules

- Use helpers in `config/routes.ts` to build locale-aware paths (bag, search, home, etc.).
- Search overlays route to `/[locale]/search?query=…`; bag flows live at `/[locale]/bag`.
- Keep the Navbar sticky, ensure language selectors respect locale defaults, and wrap catalog detail pages with `ProductDetailShell`.

### 10. Documentation & Communication

- Log significant architecture or UX decisions in Serena and cross-link to the relevant PR.
- Update this README when rules evolve—other instruction files (e.g., `.github/copilot-instructions.md`) simply point back here.
- When exceptions occur (native HTML, missing tests, etc.), record the rationale plus remediation plan in Serena before committing code.

---

## Appendix

### Locale Domain Configuration

Manage locale routing through env variables (`NEXT_PUBLIC_PRODUCTION_DOMAIN_LOCALES`, `NEXT_PUBLIC_LOCAL_DOMAIN_LOCALES`). Example payload:

```json
[
  {
    "domain": "coelloone.uk",
    "defaultLocale": "en-GB",
    "locales": ["en-GB"]
  },
  {
    "domain": "localhost.co",
    "defaultLocale": "es-ES",
    "locales": ["es-ES"],
    "http": true
  }
]
```

### Shared Testing Helpers

```ts
import { resetNavigationMocks, routerMocks, setNavigationState } from "@test-utils/navigation";
import { trackEventMock } from "@test-utils/trackEventMock";
import { clickWithAct } from "@test-utils/clickWithAct";
```

- Call `resetNavigationMocks()` + `setNavigationState()` in `beforeEach`.
- Reset `trackEventMock` between tests.
- Wrap user interactions with `clickWithAct` to keep Ant Design forms synchronized.

### Observability Quick Reference

- `scripts/verifyTranslations.ts` – guarantees localization parity.
- `reports/junit-report.xml` – Bun test output for CI parsers.
- `product-cache.sqlite` – hydrated via Bun-native scripts; never mutate manually.

Following this handbook keeps every contributor aligned with Coello’s standards, voice, and delivery quality. Deviations require explicit approval and documentation.
