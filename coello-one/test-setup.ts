import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import { expect, afterEach, afterAll, mock } from "bun:test";
import { getNavigationState, resetNavigationMocks, routerMocks } from "./test-utils/navigation";
import {
  requestLocaleHeaderState,
  requestLocaleCookieState,
} from "./test-utils/requestLocaleState";

// Register the DOM environment
GlobalRegistrator.register();

// Tell React that the test runner wraps updates in act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

if (typeof window !== "undefined") {
  window.open = () => null;
}

const nativeFetch = globalThis.fetch;
if (typeof nativeFetch === "function") {
  const resolveUrl = (input: RequestInfo | URL): string => {
    if (typeof input === "string") {
      return input;
    }
    if (typeof URL !== "undefined" && input instanceof URL) {
      return input.toString();
    }
    if (typeof Request !== "undefined" && input instanceof Request) {
      return input.url;
    }
    return "";
  };

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const target = resolveUrl(input);
    if (target.startsWith("https://example.com/")) {
      return new Response(null, { status: 200 });
    }
    return nativeFetch(input, init);
  }) as typeof globalThis.fetch;
}

const ReactModule = await import("react");
const createElement = ReactModule.createElement;

// Repair Testing Library's screen export now that a DOM exists.
const domTestingLibrary = await import("@testing-library/dom");
const boundScreen = domTestingLibrary.getQueriesForElement(
  document.body,
  domTestingLibrary.queries,
);
Object.assign(domTestingLibrary.screen, boundScreen);

// Extend Bun's expect with the matchers from jest-dom
expect.extend(matchers);

// Ensure the DOM is cleaned up between tests to avoid cross-test pollution
afterEach(() => {
  cleanup();
  resetNavigationMocks();
});

afterAll(() => {
  GlobalRegistrator.unregister();
});

// Next.js-specific props used by next/image that aren't valid on a plain img element
const NEXT_IMAGE_PROPS = [
  "fill",
  "priority",
  "placeholder",
  "blurDataURL",
  "loader",
  "quality",
] as const;

// Globally mock next/image to a plain img to avoid URL parsing and layout issues in tests
mock.module("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    // Strip Next-specific props that aren't valid on img
    const cleaned: Record<string, unknown> = {
      ...(props as Record<string, unknown>),
    };
    for (const k of NEXT_IMAGE_PROPS) {
      if (k in cleaned) delete cleaned[k];
    }
    const alt = typeof cleaned.alt === "string" ? (cleaned.alt as string) : "";
    return createElement("img", {
      ...(cleaned as ImgHTMLAttributes<HTMLImageElement>),
      alt,
    });
  },
}));

// Mock next/font/google to avoid importing Next internals during tests
mock.module("next/font/google", () => ({
  __esModule: true,
  Geist: (opts?: { variable?: string; subsets?: string[] }) => ({
    variable: opts?.variable ?? "--font-geist-sans",
    className: "mocked-font",
  }),
  Geist_Mono: (opts?: { variable?: string; subsets?: string[] }) => ({
    variable: opts?.variable ?? "--font-geist-mono",
    className: "mocked-font",
  }),
}));

// Mock next/link to a basic anchor element
mock.module("next/link", () => ({
  __esModule: true,
  default: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: unknown;
      children?: ReactNode;
    },
  ) => {
    let href = "/";
    const candidate = props.href as unknown;
    if (typeof candidate === "string") {
      href = candidate;
    } else if (candidate && typeof (candidate as { pathname?: unknown }).pathname === "string") {
      const { pathname, query } = candidate as {
        pathname?: string;
        query?: Record<string, unknown>;
      };
      const basePath = pathname ?? "/";
      if (query && Object.keys(query).length > 0) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (typeof value === "string") {
            params.append(key, value);
          }
        });
        const search = params.toString();
        href = search ? `${basePath}?${search}` : basePath;
      } else {
        href = basePath;
      }
    }
    // Spread props first, then override href to avoid TS unused vars
    return createElement(
      "a",
      { ...(props as AnchorHTMLAttributes<HTMLAnchorElement>), href },
      props.children,
    );
  },
}));

mock.module("next/headers", () => ({
  __esModule: true,
  headers: async () => ({
    get: (key: string) => {
      const normalized = key.toLowerCase();
      if (normalized === "host") {
        return requestLocaleHeaderState.host ?? null;
      }
      if (normalized === "accept-language") {
        return requestLocaleHeaderState.acceptLanguage ?? null;
      }
      if (normalized === "x-locale") {
        return requestLocaleHeaderState.locale ?? null;
      }
      return null;
    },
  }),
  cookies: async () => ({
    get: (name: string) => {
      if (name === "NEXT_LOCALE" && requestLocaleCookieState.NEXT_LOCALE) {
        return { name, value: requestLocaleCookieState.NEXT_LOCALE };
      }
      return undefined;
    },
  }),
}));

// Mock next/navigation hooks and functions using shared router state
mock.module("next/navigation", () => ({
  __esModule: true,
  useServerInsertedHTML: () => {},
  useRouter: () => routerMocks,
  usePathname: () => getNavigationState().pathname,
  useSearchParams: () => new URLSearchParams(getNavigationState().searchParams),
  useParams: () => ({ ...getNavigationState().params }),
  useSelectedLayoutSegment: () => null,
  useSelectedLayoutSegments: () => [],
  notFound: () => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  },
  redirect: () => {
    throw new Error("NEXT_REDIRECT");
  },
}));

// Prevent server-only guard from throwing when server modules are imported in tests
mock.module("server-only", () => ({}));

// Mock AntdRegistry to be a pass-through wrapper in tests
mock.module("@ant-design/nextjs-registry", () => ({
  __esModule: true,
  AntdRegistry: ({ children }: { children: ReactNode }) => children,
}));
