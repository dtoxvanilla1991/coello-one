# Coello-One Project Guidelines for AI Agents

This document provides essential guidelines for working on the Coello-One project. Following these conventions will ensure consistency and maintainability.

## Architecture

- **Framework**: This is a Next.js project using the App Router.
- **Localization**: The application supports multiple locales, with routes structured under `app/[locale]`. All new pages and layouts should be created within this directory structure.
- **Styling**: We use a combination of Ant Design for UI components and Tailwind CSS for custom styling and layout.
  - Ant Design's theme is configured globally in `app/[locale]/layout.tsx`. When adding new components, ensure they adhere to the established theme.
  - Use Tailwind CSS utility classes for layout, spacing, and custom component styling.

## Developer Workflow

- **Package Manager**: This project uses `bun` for dependency management and script execution.
- **Running the App**: To start the development server, use `bun run dev`.
- **Testing**:
  - The project uses Bun's native test runner. To run the test suite, use `bun test`.
  - Test files are co-located with the components they test and have a `.test.tsx` extension.
  - When writing tests, use the `bun:test` module for test utilities (e.g., `describe`, `it`, `expect`, `mock`).

## State Management

- For simple, local component state, use the `useState` hook.
- For more complex state that involves multiple related values or has intricate update logic, prefer the `useReducer` hook. This pattern is used in components like `OneSleeveClassic.tsx` to manage product selections.

## Key Files and Directories

- `app/[locale]/layout.tsx`: The root layout for each locale. This is where the main Ant Design `ConfigProvider` is set up.
- `app/[locale]/(infrastructure)/`: This directory contains the main application structure, including shared layouts and pages.
- `app/[locale]/(other-pages)/`: This directory is for standalone pages like "coming soon" or "not found."
- `public/`: This directory contains static assets, including images. When adding new images, place them in the appropriate subdirectory.
- `bunfig.toml`: This file configures the Bun runtime, including the test runner.
