re## Technical Stack

- **Frontend**: Next.js 15.1.3 with React 19
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: Jotai
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: Bun
- **Backend**: Flask (Python)

## Product Principles

- **Golden rule:** Always design, implement, and test mobile-first. Validate the smallest breakpoint before scaling layouts to tablet and desktop.

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
- Approach every request through the Chief Advisory Team lens (CTO, Chief Designer, Business Logic Architect, Data Analyst, Senior Full-Stack Engineer) and surface a `[Chief's Insight]` with risks or upgrades.
- Build and validate the handheld experience first; only expand to tablet/desktop once the smallest breakpoint feels polished.

### UX & Styling Standards

- Favor Ant Design components and Tailwind utilities; note any exceptions inline and in Serena.
- Do not render native HTML tags directly; compose layouts from Ant Design primitives (e.g. `Flex`, `Space`, `Typography`). Log any unavoidable exceptions in Serena before implementation.
- Keep the primary header background white and maintain sticky visibility where required (see `app/components/navbar-components/Navbar`).
- Wrap catalog detail pages with `ProductDetailShell` to inherit responsive paddings and max-width constraints.
- Use Tailwind’s canonical important syntax (`utility!`) for overrides; if linting disagrees, coordinate the rule update rather than toggling back to legacy prefixes.

### Navigation & Routing

- Use `buildLocaleRoute` from `config/routes` to construct locale-aware paths (e.g. bag, search, home).
- Prefer Next.js router helpers (`useRouter`, `useParams`, `usePathname`) and keep locale defaults consistent with the route builder.
- Bag interactions should push the Gymshark-inspired flow at `/[locale]/bag`; search overlays route to `/[locale]/search?query=`.

### State, Data, and Stores

- Use the Jotai atoms in `store/` (`cartStore`, `siderStore`) instead of creating ad-hoc state containers.
- When augmenting analytics, extend `utils/analyticsAdapter.ts` and `utils/trackEvent.ts` so telemetry stays centralized.
- Validate every boundary payload (network responses, persisted state, user input) with shared Zod schemas before consuming it anywhere in the app.

### Bun & Database Guidelines

## Mandatory SQLite Pattern: Bun.SQL
When writing server-side code involving `Bun.sqlite` or database interactions in this project, you strictly adhere to the following rules:

1.  **Use the `Bun.SQL` API**: You MUST use the modern, unified tagged template literal syntax (`db.sql\``) introduced in Bun v1.2.21.
2.  **Legacy Methods Forbidden**: DO NOT use the legacy `db.query()`, `db.prepare()`, `db.run()`, or `statement.all()` methods.
3.  **Security**: Always rely on the built-in parameter interpolation of `Bun.SQL`. Do not manually concatenate strings for queries.

## Code Examples

## ❌ INCORRECT (Legacy/Forbidden)
```typescript
import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite");

// Do NOT do this
const query = db.query("SELECT * FROM users WHERE id = $id");
const user = query.get({ $id: userId });
```

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

### Analytics & Experimentation

- Track key funnel events with `trackEvent`; include subtotal, shipping, total, and itemCount when instrumenting cart milestones.
- Advocate for measurement hooks whenever shipping new UI flows; note planned KPIs in Serena before implementation.

### Accessibility & Content

- Maintain semantic Ant Design components, provide descriptive `alt` text for all `next/image` assets, and keep CTA copy actionable.
- Verify cross-locale content when adjusting copy or routes; default locales live under `app/[locale]/`.

### Documentation & Communication

- Record major architectural or UX decisions in Serena’s journal and cross-link to the relevant PR.
- Update this handbook when rules evolve; have `AGENTS.md` and `.github/copilot-instructions.md` point here instead of duplicating guidance.
