// import '@testing-library/jest-dom'; // removed as jest-dom is no longer installed
import { vi } from "vitest";

// Mock next/navigation notFound to throw so tests can catch it
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("notFound");
  },
}));
// Mock next/font/google for Vitest: stub font loader functions
vi.mock("next/font/google", () => ({
  Geist: (opts: { variable: string }) => ({ variable: opts.variable }),
  Geist_Mono: (opts: { variable: string }) => ({ variable: opts.variable }),
}));
