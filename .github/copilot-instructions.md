# Copilot Instruction Set

Please treat `coello-one/README.md` as the authoritative playbook for AI collaborators; review it before and during implementation.

- Honor the mobile-first mandate—ship the handheld breakpoint first, then scale up.
- Prefer Ant Design components and Tailwind utilities; document any necessary deviations.
- Never introduce native HTML tags; compose UI solely from Ant Design or sanctioned Next.js components and log any required exception in Serena before coding.
- Maintain the primary header with a white background.
- Reuse shared mocks (`test-setup.ts`, `@test-utils/navigation`) instead of redefining them in tests.
