re## Technical Stack

- **Frontend**: Next.js 15.1.3 with React 19
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: Jotai
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: Bun
- **Backend**: Flask (Python)

## Product Principles

- **Golden rule:** Always design, implement, and test mobile-first. Validate the smallest breakpoint before scaling layouts to tablet and desktop.

### Design Leadership

- **Chief Designer:** Laura Gomez — globally celebrated experiential designer leading Coello's visual and interaction language. Treat Laura's direction as canonical when aligning layouts, motion, and tone. She used to be Chief designer for GymShark, Adidas and Nike, Tesla and OpenAI companies in the past and has 40+ years experience in design with many globally recognized design awards.

## Testing Guidelines

- **Shared test utilities:** Always review `test-setup.ts` before creating or updating any tests to reuse existing mocks and prevent duplication.

## Development Setup

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

### Formatting & Hooks

- Prefer `make setup` at the repo root to install hooks, frontend dependencies, and backend tooling in one command.
- `bun run format` (inside `coello-one/`) verifies Prettier with Tailwind sorting; `bun run format:fix` applies updates.
- Flask formatting lives in `flask-server/`; run `make format-check` (or `make format`) after installing dev tooling with `pip install -r requirements-dev.txt`.
- Server-side IO rule: Next.js API routes, Route Handlers, and other server functions must use Bun's `Bun.file`/`Bun.write` APIs instead of Node's `fs` module.
- Root hooks format staged frontend files with Prettier and staged Python with Black.

## AI Operations Handbook

### Core Engagement Rules

- Treat this document as the single source of truth for Coello AI collaborators; keep it open when planning work.
- Default to Serena MCP for task orchestration and document key decisions in the journal.
- Pair Context7 with Serena on every task: use Context7 for repository/document lookups and cite its snippets in Serena notes before modifying code or docs; fall back to manual reads only when Context7 is exhausted.
- Approach every request through the Chief Advisory Team lens (CTO, Chief Designer, Business Logic Architect, Data Analyst, Senior Full-Stack Engineer) and surface a `[Chief's Insight]` with risks or upgrades.
- Build and validate the handheld experience first; only expand to tablet/desktop once the smallest breakpoint feels polished.

### UX & Styling Standards

- Favor Ant Design components and Tailwind utilities; note any exceptions inline and in Serena.
- Do not render native HTML tags directly; compose layouts from Ant Design primitives (e.g. `Flex`, `Space`, `Typography`). Log any unavoidable exceptions in Serena before implementation.
- Keep the primary header background white and maintain sticky visibility where required (see `app/components/navbar-components/Navbar`).
- Wrap catalog detail pages with `ProductDetailShell` to inherit responsive paddings and max-width constraints.
- Use Tailwind’s canonical important syntax (`utility!`) for overrides; if linting disagrees, coordinate the rule update rather than toggling back to legacy prefixes.

### Localization & Copy Guidelines

- Store all user-facing copy in `app/localization/messages/<locale>/<namespace>.json`; keep namespaces aligned across locales via `bun run verify:locales`.
- Fetch text through `useTranslations(namespace)` (client) or `getNamespaceCopy(locale, namespace)` (server) instead of embedding literals; rely on `formatMessage` for placeholder substitution.
- When emitting analytics for localized CTAs, pass `locale`, `translationKey`, and (when relevant) `translationVariant` through the third `trackEvent` argument so funnel reports stay traceable.
- New translation entries must be documented in Serena with the Context7 snippet ID used to source or review the copy; mention any pending reviewer (e.g., Laura) in the same note.

#### Locale Domain Configuration

- Configure hostname → locale routing through environment variables so Growth can launch microsites without shipping code:
  - `NEXT_PUBLIC_PRODUCTION_DOMAIN_LOCALES`
  - `NEXT_PUBLIC_LOCAL_DOMAIN_LOCALES`
- Each variable accepts a JSON array of Next.js domain locale objects (see `config/i18n.ts`). Example:

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

- Local entries should set `http: true` so Next.js serves them over HTTP. Production hosts omit the flag and default to HTTPS.

### Navigation & Routing

- Use `buildLocaleRoute` from `config/routes` to construct locale-aware paths (e.g. bag, search, home).
- Prefer Next.js router helpers (`useRouter`, `useParams`, `usePathname`) and keep locale defaults consistent with the route builder.
- Bag interactions should push the Gymshark-inspired flow at `/[locale]/bag`; search overlays route to `/[locale]/search?query=`.

### State, Data, and Stores

- Use the Jotai atoms in `store/` (`cartStore`, `siderStore`) instead of creating ad-hoc state containers.
- When augmenting analytics, extend `utils/analyticsAdapter.ts` and `utils/trackEvent.ts` so telemetry stays centralized.
- Validate every boundary payload (network responses, persisted state, user input) with shared Zod schemas before consuming it anywhere in the app.

### Bun Runtime Guidelines (Bun v1.2.21)

#### Bun.SQL (Mandatory)

When writing server-side code involving SQLite or any SQL database, you must:

1. **Use the `Bun.SQL` API** – rely on the unified tagged template literal syntax introduced in Bun v1.2.21.
2. **Avoid legacy `bun:sqlite` APIs** – `db.query()`, `db.prepare()`, `db.run()`, and `statement.all()` are banned in this codebase.
3. **Let Bun handle parameterization** – never build SQL strings manually; use tagged literals for automatic escaping.

```typescript
// ✅ Correct
import { SQL } from "bun";

const db = new SQL(":memory:");
const [{ total }] = await db`
  SELECT COUNT(*) AS total
  FROM products
  WHERE category = ${category}
`;
```

```typescript
// ❌ Incorrect
import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite");
const query = db.query("SELECT * FROM users WHERE id = $id");
const user = query.get({ $id: userId });
```

#### Built-in YAML Support

- Prefer Bun’s native YAML integrations (`import config from "./config.yaml";` or `Bun.YAML.parse`) instead of third-party parsers like `js-yaml`.
- Keep YAML-Backed config co-located with TypeScript types and ensure schemas validate the parsed payload before use.

#### Secrets & Credentials

- Use `Bun.secrets` to read/write sensitive values during local tooling or CLI tasks. This routes through Keychain (macOS), libsecret (Linux), or Windows Credential Manager, keeping secrets off disk.
- Document any non-Bun credential storage (e.g., cloud secret managers) in Serena and justify the exception.

#### Tooling & Supply Chain

- Run `bun audit --audit-level=high` before shipping meaningful dependency changes; the Bun 1.2.21 audit filters help surface critical issues fast.
- Security scanners can now hook directly into `bun install`. If you add one (e.g., Socket’s scanner), record the config in Serena and update CI accordingly.
- Prefer `bun install --lockfile-only` in CI-generated environments that only need an updated `bun.lock` without downloading tarballs.

#### Operational Notes

- `postMessage`/`structuredClone` improvements in Bun 1.2.21 make worker-based data passing far cheaper—lean on workers for heavy transforms when needed.
- Keep Bun pinned to ≥1.2.21 (see `.github/workflows/ci.yml`) to guarantee access to these runtime guarantees.

### React 19.2 Toolkit

- Prefer `<Activity>` over conditional mounts when you need to toggle visibility but keep background work alive for instant resumes.
- Split side-effect callbacks out of `useEffect` using `useEffectEvent` so dependency arrays stay accurate and reconnections don’t thrash.
- Reach for the new cache-aware server APIs—`cacheSignal`, `prerender`, and `resume`—whenever you need deduped data fetching, pre-render persistence, or resumable streaming.

### Testing & Quality Gates

- Run unit tests with Bun (`bun test`) and lint with `bun run lint` before shipping changes.
- All tests automatically load `test-setup.ts`; never recreate Next.js mocks locally.
- Reuse the shared navigation helpers from `test-utils/navigation`:

```ts
import { resetNavigationMocks, routerMocks, setNavigationState } from "@test-utils/navigation";

beforeEach(() => {
  resetNavigationMocks();
  setNavigationState({
    locale: "en-GB",
    pathname: "/en-GB/search",
    searchParams: new URLSearchParams("query=one+sleeve"),
  });
});

it("routes to the locale bag", () => {
  routerMocks.push.mockResolvedValueOnce();
  // render and assert
});
```

- Prefer React Testing Library for component assertions and lean on Jotai’s `Provider` when stateful atoms are involved.

#### Shared Testing Helpers

- `@test-utils/trackEventMock`: import this mock to assert telemetry payloads; call `trackEventMock.mockReset()` inside `beforeEach` hooks so parallel specs stay isolated.
- `@test-utils/clickWithAct`: wrap `fireEvent.click` calls with this helper to automatically run interactions inside `act()`—it keeps Ant Design form updates synchronous without repeating boilerplate.

#### Footer Smoke Test

- `config/footerLinks.smoke.test.ts` walks every footer link and asserts a 200 response. Set `FOOTER_LINKS_BASE_URL` (for example, `http://127.0.0.1:3000`) in CI to enable the check; when the variable is absent the suite is skipped locally so you can iterate without launching the dev server first.

### Analytics & Experimentation

- Track key funnel events with `trackEvent`; include subtotal, shipping, total, and itemCount when instrumenting cart milestones.
- Advocate for measurement hooks whenever shipping new UI flows; note planned KPIs in Serena before implementation.

### Accessibility & Content

- Maintain semantic Ant Design components, provide descriptive `alt` text for all `next/image` assets, and keep CTA copy actionable.
- Verify cross-locale content when adjusting copy or routes; default locales live under `app/[locale]/`.

### Documentation & Communication

- Record major architectural or UX decisions in Serena’s journal and cross-link to the relevant PR.
- Update this handbook when rules evolve; have `AGENTS.md` and `.github/copilot-instructions.md` point here instead of duplicating guidance.
