export const routes = {
  root: "/",
  home: "/",
  bag: "/bag",
  checkout: "/checkout",
  search: "/search",
  help: "/help",
  helpFaq: "/help/faq",
  helpDeliveryInformation: "/help/delivery-information",
  helpReturnsPolicy: "/help/returns-policy",
  helpReturnAnItem: "/help/return-an-item",
  helpContactUs: "/help/contact-us",
  helpOrdersInternational: "/help/orders-international",
  helpKpiDashboard: "/help/kpi-dashboard",
  accessibility: "/accessibility",
  accessDenied: "/access-denied",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  notFound: "/not-found",
  welcome: "/welcome",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  about: "/about-us",
  discounts: "/discounts",
  blueprint: "/hub",
  coelloCutTraining: "/coello-cut-training",
  sustainability: "/sustainability",
} as const;

export type RouteKey = keyof typeof routes;

export function buildLocaleRoute(routeKey: RouteKey): string {
  return routes[routeKey];
}

type FooterLink = {
  key: string;
  route: RouteKey;
};

export type FooterLinkGroup = {
  key: string;
  links: readonly FooterLink[];
};

export const footerLinkGroups = [
  {
    key: "help",
    links: [
      { key: "faq", route: "helpFaq" },
      { key: "delivery", route: "helpDeliveryInformation" },
      { key: "returnsPolicy", route: "helpReturnsPolicy" },
      { key: "returnItem", route: "helpReturnAnItem" },
      { key: "contact", route: "helpContactUs" },
      { key: "ordersInternational", route: "helpOrdersInternational" },
    ],
  },
  {
    key: "pages",
    links: [
      { key: "about", route: "about" },
      { key: "discounts", route: "discounts" },
      { key: "blueprint", route: "blueprint" },
      { key: "sustainability", route: "sustainability" },
    ],
  },
  // phase 2
  // {
  //   title: "Account",
  //   key: "account",
  //   links: [
  //         createMenuOption("Sign up", "/sign-up"),
  //         createMenuOption("Sing in", "/sign-in"),
  //   ],
  // },
] satisfies readonly FooterLinkGroup[];
