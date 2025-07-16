import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    const error = new Error("NEXT_HTTP_ERROR_FALLBACK;404");
    (error as Error & { digest?: string }).digest =
      "NEXT_HTTP_ERROR_FALLBACK;404";
    throw error;
  }),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(() => ({ get: vi.fn() })),
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Geist: (opts: { variable: string }) => ({
    variable: opts.variable,
    className: "",
  }),
  Geist_Mono: (opts: { variable: string }) => ({
    variable: opts.variable,
    className: "",
  }),
}));

// Mock UI components
vi.mock("@/components/navbar-components/Navbar", () => ({
  Navbar: ({ "data-testid": dataTestId }: { "data-testid": string }) =>
    React.createElement("div", { "data-testid": dataTestId }, "Navbar"),
}));

vi.mock("@/components/navbar-components/NavbarSider", () => ({
  NavbarSiderComponent: ({
    "data-testid": dataTestId,
  }: {
    "data-testid": string;
  }) =>
    React.createElement("div", { "data-testid": dataTestId }, "NavbarSider"),
}));

vi.mock("@/components/Footer", () => ({
  default: ({ "data-testid": dataTestId }: { "data-testid": string }) =>
    React.createElement("div", { "data-testid": dataTestId }, "Footer"),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
