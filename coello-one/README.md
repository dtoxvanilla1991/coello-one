## Technical Stack
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
