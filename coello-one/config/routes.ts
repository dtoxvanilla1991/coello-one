export const routes = {
  root: "/",
  home: "/",
  bag: "/bag",
  checkout: "/checkout",
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

export function buildLocaleRoute(routeKey: RouteKey): string {
  return routes[routeKey];
}
