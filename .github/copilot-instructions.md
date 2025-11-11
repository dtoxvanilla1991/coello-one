# Copilot Instruction Set

Please treat `coello-one/README.md` as the authoritative playbook for AI collaborators; review it before and during implementation.

- Honor the mobile-first mandate—ship the handheld breakpoint first, then scale up.
- Prefer Ant Design components and Tailwind utilities; document any necessary deviations.
- Never introduce native HTML tags; compose UI solely from Ant Design or sanctioned Next.js components and log any required exception in Serena before coding.
- Maintain the primary header with a white background.
- Reuse shared mocks (`test-setup.ts`, `@test-utils/navigation`) instead of redefining them in tests.
- Run `make setup` at the repository root to enable Husky/lint-staged hooks, install frontend deps, and pull in Flask tooling. Hooks format staged frontend files with Prettier and staged Flask modules with Black; ensure `pip install -r flask-server/requirements-dev.txt` is run if you perform manual setup.
- For any Next.js API routes, route handlers, or server-side functions, rely on Bun's `Bun.file`/`Bun.write` primitives instead of Node's `fs` module for file IO.
