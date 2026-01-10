<div id="top"></div>
<div align="right">

[![LinkedIn][linkedin-shield]][linkedin-url]

</div>
<br />
<div align="center">

  <h1 align="center">COELLO ONE</h1>

  <p align="center">
    <br />
    <a href="https://github.com/dtoxvanilla1991/coello-one"><strong>Explore the docs »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-app">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The App

### Stop Hiding Your Story.
Empowering you to showcase your story—one sleeve at a time. Coello One combines bold design with active performance, celebrating individuality, artistry, and the confidence to stand out. We always saw a disconnect.

You commit hours and endure the pain to wear your story on your skin. That art is a permanent badge of honor, a piece of your identity. Then, you hit the gym, the track, or the trail—another act of pure discipline—and you're forced to cover that story up. At Coello, we believe your art and your athleticism come from the same fire. Both are proof of persistence. Both are forged in commitment. Both deserve to be seen.

We aren't just a clothing brand. We are a statement. We created Coello for the niche-within-a-niche: the athlete who is also the canvas. Our one-sleeve design isn't a gimmick; it's the frame your masterpiece deserves. It's technical apparel built to perform, with a fit that finally celebrates the unique way you've chosen to express yourself. This is for everyone who knows the patience of the artist's chair and the burn of the last rep.

Welcome to Coello.

<p align="right">(<a href="#top">back to top</a>)</p>

## Screenshots of the app

Below are some screenshots illustrating key parts of the application.

![Home Page](https://github.com/user-attachments/assets/65ec917c-badc-4e72-a542-d93811c9d6f9)
![Product Page](https://github.com/user-attachments/assets/db7c1398-9d6f-46a9-a0cc-93dcdd3a2a71)
![Wishlist Page](https://github.com/user-attachments/assets/c4163229-b420-4d0b-ad80-d6ff65db9580)

App is still in development. Once MVP is completed, more core screenshots will be added and the app will be deployed to Vercel.

## Built With

Frameworks, libraries, and languages currently in play:

- [Next.js 16.1.1](https://nextjs.org/) with the App Router
- [React 19.2.x](https://react.dev/) and the latest concurrent features
- [Bun ≥ 1.2.21](https://bun.sh/) as the runtime, package manager, and test runner
- [Ant Design](https://ant.design/) components styled with [Tailwind CSS v4 syntax](https://tailwindcss.com/)
- [TypeScript 5.x](https://www.typescriptlang.org/) across the monorepo
- [Flask 3.x](https://flask.palletsprojects.com/en/stable/) on Python 3.11 for the backend APIs
- [Jotai](https://jotai.org/) atoms for shared state
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for typed form validation
- [Drizzle ORM](https://orm.drizzle.team/) for schema-managed persistence
- [ESLint 9](https://eslint.org/) and [Prettier](https://prettier.io/) for linting/formatting enforcement

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

The repository is a two-headed monorepo: the Next.js frontend lives in `coello-one/` (running on Bun) and the Flask API resides in `flask-server/` (Python 3.11). Install Bun ≥ 1.2.21 and Python 3.11 before you begin.

### One-command bootstrap

```bash
make setup
```

`make setup` installs frontend dependencies, hooks, and backend tooling in a single pass.

### Manual setup (if you prefer the long way)

**Frontend (Next.js + Bun)**

```bash
cd coello-one
bun install
bun dev            # Next.js dev server (Turbopack)
bun run build      # production build
bun run lint       # zero-warning ESLint policy
bun run test       # Bun-powered unit + integration tests
bun run verify:locales   # ensures en-GB ↔ es-ES parity
```

**Backend (Flask)**

```bash
cd flask-server
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt          # or make install for cached lockfiles
python app.py                            # serves on http://localhost:3500
```

Use `pip install -r requirements-dev.txt` if you also want local Black/Ruff tooling.

### Repository Tooling

- `make setup` wires up git hooks, Bun deps, and backend tooling; rerun it after pulling new hook logic.
- `bun run lint`, `bun run test`, and `bun run format` (or `format:fix`) enforce the zero-warning policy before every PR.
- `bun run verify:locales` is mandatory whenever user-facing copy changes to keep en-GB and es-ES in lockstep.
- Backend helpers live under `flask-server/`: `make format-check`, `make backend-status`, `make backend-ci`, `make backend-upgrade`, and `make backend-lint(-fix)` keep the Python side healthy.
- `bun audit --audit-level=high` must pass before proposing dependency upgrades; capture the report in Serena for reviewers.
- Knowledge workflow: every doc or code lookup flows through Context7, and the supporting snippet IDs are logged in Serena alongside your plan + outcome notes.
- Tailwind governance: only ship v4 utilities vetted via the latest Tailwind guidance surfaced through Context7; request an upgrade if a needed utility is missing instead of backsliding to legacy syntax.

### Testing Mandate

- **Every method or function must ship with both unit and integration coverage.** The default posture is "write the test before or alongside the implementation."
- **Exemptions must be explicit.** If coverage is genuinely unreasonable (for example, third-party hooks that cannot be exercised in jsdom), leave a code comment in the affected file that starts with `// TEST-WAIVER:` and describes the rationale plus a tracking issue/reference.
- **Bias toward high-value tests.** Focus on behavior that protects the user journey or business logic; redundant snapshots, boilerplate renders, or tests that fail to add signal should be skipped and explicitly called out as non-essential.
- **Cross-reference in pull requests.** When exceptions are used, mention the waiver in PR notes so reviewers (and future agents) can re-evaluate.

## Implemented Features

- Locale-aware Next.js App Router experience with enforced `/[locale]` routing, sticky navigation, and SSR-first rendering for top Core Web Vitals.
- Semantic product + training search that blends server-side relevance scoring with responsive client hydration via Bun.
- Jotai-powered bag and checkout flows instrumented through a central analytics adapter (`trackEvent`) for deterministic telemetry.
- Comprehensive localization pipeline (`verify:locales`, `useTranslations`) that keeps en-GB and es-ES copy perfectly aligned.
- Accessibility-first Ant Design implementations with Tailwind v4 utilities, focus handling, and motion tuned for mobile.
- Bun-native tooling (tests, formatting, Drizzle migrations) shared across the monorepo to keep backend and frontend in sync.

## Ideas for Future Features

- AI sleeve goal-specific Trainer: from a mood board or text prompt.
- Intelligent fit + training insights: blend wearable inputs with LLM coaching to recommend sizing, recovery routines, and training blocks.
- Generative personalization engine that rewrites on-site copy and CTAs per locale, behavior, and campaign intent while tracking KPIs.
- Real-time AI observability guardrails that watch analytics streams for anomalies and open incidents before humans notice.
- Mixed-reality try-on powered by computer vision + on-device segmentation to preview one-sleeve looks in AR.

## Contact

Project Link: [Coello One App](https://github.com/dtoxvanilla1991/coello-one)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/yuri-avdijevski
