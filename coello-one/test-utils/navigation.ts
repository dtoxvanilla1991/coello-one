import { mock } from "bun:test";

// Centralized Next.js navigation mocks so tests reuse shared router state.

type NavigationState = {
  pathname: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
};

type RouterMocks = {
  push: ReturnType<typeof mock<(href: string) => void>>;
  replace: ReturnType<typeof mock<(href: string, options?: { scroll?: boolean }) => void>>;
  prefetch: ReturnType<typeof mock<(href: string) => Promise<void>>>;
  back: ReturnType<typeof mock<() => void>>;
  forward: ReturnType<typeof mock<() => void>>;
  refresh: ReturnType<typeof mock<() => void>>;
};

const createRouterMocks = (): RouterMocks => ({
  push: mock<(href: string) => void>(() => {}),
  replace: mock<(href: string, options?: { scroll?: boolean }) => void>(() => {}),
  prefetch: mock<(href: string) => Promise<void>>(() => Promise.resolve()),
  back: mock<() => void>(() => {}),
  forward: mock<() => void>(() => {}),
  refresh: mock<() => void>(() => {}),
});

const routerMocks = createRouterMocks();

const createDefaultNavigationState = (): NavigationState => ({
  pathname: "/",
  params: {},
  searchParams: new URLSearchParams(),
});

let navigationState: NavigationState = createDefaultNavigationState();

const applyDefaultRouterImplementations = () => {
  routerMocks.push.mockImplementation(() => {});
  routerMocks.replace.mockImplementation(() => {});
  routerMocks.prefetch.mockImplementation(() => Promise.resolve());
  routerMocks.back.mockImplementation(() => {});
  routerMocks.forward.mockImplementation(() => {});
  routerMocks.refresh.mockImplementation(() => {});
};

const resetNavigationMocks = () => {
  Object.values(routerMocks).forEach((mockFn) => mockFn.mockReset());
  applyDefaultRouterImplementations();
  navigationState = createDefaultNavigationState();
};

const setNavigationState = (overrides: Partial<NavigationState>) => {
  navigationState = {
    ...navigationState,
    ...overrides,
    params: {
      ...navigationState.params,
      ...(overrides.params ?? {}),
    },
    searchParams:
      overrides.searchParams !== undefined
        ? new URLSearchParams(overrides.searchParams)
        : navigationState.searchParams,
  };
};

const getNavigationState = (): NavigationState => ({
  ...navigationState,
  params: { ...navigationState.params },
  searchParams: new URLSearchParams(navigationState.searchParams),
});

applyDefaultRouterImplementations();
resetNavigationMocks();

export { routerMocks, resetNavigationMocks, setNavigationState, getNavigationState };
