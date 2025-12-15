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
  label: string;
  route: RouteKey;
};

export type FooterLinkGroup = {
  title: string;
  key: string;
  links: readonly FooterLink[];
};

export const footerLinkGroups = [
  {
    title: "Help",
    key: "help",
    links: [
      { label: "FAQ", route: "helpFaq" },
      { label: "Delivery Information", route: "helpDeliveryInformation" },
      { label: "Returns Policy", route: "helpReturnsPolicy" },
      { label: "Return An Item", route: "helpReturnAnItem" },
      { label: "Contact Us", route: "helpContactUs" },
      { label: "Orders International", route: "helpOrdersInternational" },
    ],
  },
  {
    title: "Pages",
    key: "pages",
    links: [
      { label: "About Us", route: "about" },
      { label: "Discounts", route: "discounts" },
      { label: "Coello One Blueprint", route: "blueprint" },
      { label: "Sustainability", route: "sustainability" },
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
