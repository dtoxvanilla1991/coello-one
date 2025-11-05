export const routes = {
  root: "/",
  home: "/home",
  bag: "/bag",
  search: "/search",
  accessDenied: "/access-denied",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  notFound: "/not-found",
  welcome: "/welcome",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
} as const;

export type RouteKey = keyof typeof routes;

export function buildLocaleRoute(locale: string, routeKey: RouteKey): string {
  const path = routes[routeKey];

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}
