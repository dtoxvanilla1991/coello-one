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
  </p> -->
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

![Home Page](<img width="396" height="835" alt="image" src="https://github.com/user-attachments/assets/65ec917c-badc-4e72-a542-d93811c9d6f9" />)
![Product Page](<img width="396" height="834" alt="image" src="https://github.com/user-attachments/assets/db7c1398-9d6f-46a9-a0cc-93dcdd3a2a71" />)
![Wishlist Page](<img width="396" height="808" alt="image" src="https://github.com/user-attachments/assets/c4163229-b420-4d0b-ad80-d6ff65db9580" />)

App is still in development. Once MVP is completed, more core screenshots will be added and the app will be deployed to Vercel.

## Built With

Frameworks/libraries/languages used:

- [Next.js v15](https://nextjs.org/)
- [Next.js' Turbopack for Dev](https://nextjs.org/docs/app/api-reference/turbopack)
- [Ant Design](https://ant.design/)
- [Node.js](https://nodejs.org/en/)
- [Bun](https://bun.sh/)
- [Flask v3](https://flask.palletsprojects.com/en/stable/)
- [Tailwind v4](https://tailwindcss.com/)
- [Typescript v5](https://www.typescriptlang.org/)
- [Atomic Jotai](https://jotai.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Prettier](https://prettier.io/)
- [Eslint v9](https://eslint.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps after downloading the files from the Github.

## Prerequisites

### Backend (Flask)

1. **Install dependencies:**
   ```bash
   python -m venv venv
   source venv/bin/activate        # On macOS/Linux
   pip install -r requirements.txt
   ```

_Optional:_ install formatting tooling with `pip install -r requirements-dev.txt` to enable local Black runs.

2. **Run the Flask server** — `python app.py`

3. The backend runs by default at http://localhost:3500.

### Frontend (Next.js)

#### Bun

This project uses Bun package manager. If you do not have it, run this in your terminal using Homebrew to install Bun globally:

```bash
brew tap oven-sh/bun
brew install bun
```

Or using an official script:

```bash
curl -fsSL https://bun.sh/install | bash
```

1. **Install dependencies**
   `bun install`

2. **Start the Next.js development server**
   - 🔥 `bun start` - run development server
   - 🔧 `bun run dev` - run development server
   - 🔧 `bun run build` - build web app for production

3. Open your browser at http://localhost:3000.

### Repository Tooling

- Run `make setup` after cloning to install git hooks, frontend dependencies, and backend tooling in one step.
- Manual setup alternative: `bun install` (root hooks), `cd coello-one && bun install`, and `cd flask-server && make install` (uses pip-tools to compile cached lockfiles before installation).
- Prettier checks live behind `cd coello-one && bun run format`; use `format:fix` to write changes.
- Backend formatting uses Black: `cd flask-server && make format-check` (or `make format`).
- Backend env status helper: `make backend-status` (shows git ignored state for the managed `.venv`).
- Backend dependency guard: `make backend-ci` (runs pip-compile dry-runs to ensure cached lockfiles are current).
- Backend dependency upgrade: `make backend-upgrade` (rebuilds lockfiles with `pip-compile --upgrade`).
- Backend linting: `make backend-lint` (runs Ruff checks; `make backend-lint-fix` applies autofixes).
- CI enforces both checks (`bun run format` and `python -m black --check .`) to prevent drift across services.
- Run `cd coello-one && bun run verify:locales` before opening a PR that adds or edits copy to ensure every locale ships the same keyset.
- Knowledge workflow: use Context7 for every documentation or code lookup and capture the retrieved snippet/links in Serena before editing so future agents can trace decisions.

### Testing Mandate

- **Every method or function must ship with both unit and integration coverage.** The default posture is "write the test before or alongside the implementation."
- **Exemptions must be explicit.** If coverage is genuinely unreasonable (for example, third-party hooks that cannot be exercised in jsdom), leave a code comment in the affected file that starts with `// TEST-WAIVER:` and describes the rationale plus a tracking issue/reference.
- **Bias toward high-value tests.** Focus on behavior that protects the user journey or business logic; redundant snapshots, boilerplate renders, or tests that fail to add signal should be skipped and explicitly called out as non-essential.
- **Cross-reference in pull requests.** When exceptions are used, mention the waiver in PR notes so reviewers (and future agents) can re-evaluate.

## Implemented Features

- Semantic Search
- SSR for SEO and bundle js size optimizations
- Internationalization for US, GB and ES
- Easy and slick user purchase journey
- Data Storage
- A11y features (semantic HTML structure, ARIA attributes, ATL tags etc.)
- Various optimizations (lazy loading, code splitting, tree shaking, etc.)

## Ideas for Future Features

- Add Storybook for more effective building and maintenance of the custom UI components and pages in isolation (since the app mainly uses Ant Design component);
- CI/CD using Github Actions;
- Add unit tests using Jest, including edge cases;
- Add e2e tests using Cypress and Argos Screenshots;
- Add more graceful and "smart" error handling, providing the user with more information about the error and the development team with more information about the error;
- Move assets to Cloudinary (that hosts with on AWS and optimizes them for all devices) for maximum performance;
- Using dependency injection for better code scalability & testability;
- Logging & monitoring using FullStory;
- Crash/Error reports using Sentry;

## Contact

Project Link: [Coello One App](https://github.com/dtoxvanilla1991/coello-one)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/yuri-avdijevski

```

```
