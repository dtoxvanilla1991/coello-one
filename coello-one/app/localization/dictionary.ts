import type { SupportedLocale } from "./config";
import homeEnGb from "./messages/en-GB/home.json" assert { type: "json" };
import bagEnGb from "./messages/en-GB/bag.json" assert { type: "json" };
import checkoutEnGb from "./messages/en-GB/checkout.json" assert { type: "json" };
import helpLandingEnGb from "./messages/en-GB/help-landing.json" assert { type: "json" };
import helpFaqEnGb from "./messages/en-GB/help-faq.json" assert { type: "json" };
import helpDeliveryEnGb from "./messages/en-GB/help-delivery.json" assert { type: "json" };
import helpContactEnGb from "./messages/en-GB/help-contact.json" assert { type: "json" };
import helpReturnsEnGb from "./messages/en-GB/help-returns.json" assert { type: "json" };
import helpOrdersInternationalEnGb from "./messages/en-GB/help-orders-international.json" assert { type: "json" };
import helpKpiEnGb from "./messages/en-GB/help-kpi.json" assert { type: "json" };
import systemPagesEnGb from "./messages/en-GB/system-pages.json" assert { type: "json" };
import accessoriesEnGb from "./messages/en-GB/accessories.json" assert { type: "json" };
import welcomeEnGb from "./messages/en-GB/welcome.json" assert { type: "json" };
import pagesEnGb from "./messages/en-GB/pages.json" assert { type: "json" };
import legalEnGb from "./messages/en-GB/legal.json" assert { type: "json" };
import homeEsEs from "./messages/es-ES/home.json" assert { type: "json" };
import bagEsEs from "./messages/es-ES/bag.json" assert { type: "json" };
import checkoutEsEs from "./messages/es-ES/checkout.json" assert { type: "json" };
import helpLandingEsEs from "./messages/es-ES/help-landing.json" assert { type: "json" };
import helpFaqEsEs from "./messages/es-ES/help-faq.json" assert { type: "json" };
import helpDeliveryEsEs from "./messages/es-ES/help-delivery.json" assert { type: "json" };
import helpContactEsEs from "./messages/es-ES/help-contact.json" assert { type: "json" };
import helpReturnsEsEs from "./messages/es-ES/help-returns.json" assert { type: "json" };
import helpOrdersInternationalEsEs from "./messages/es-ES/help-orders-international.json" assert { type: "json" };
import helpKpiEsEs from "./messages/es-ES/help-kpi.json" assert { type: "json" };
import systemPagesEsEs from "./messages/es-ES/system-pages.json" assert { type: "json" };
import accessoriesEsEs from "./messages/es-ES/accessories.json" assert { type: "json" };
import welcomeEsEs from "./messages/es-ES/welcome.json" assert { type: "json" };
import pagesEsEs from "./messages/es-ES/pages.json" assert { type: "json" };
import legalEsEs from "./messages/es-ES/legal.json" assert { type: "json" };
import { DEFAULT_LOCALE, normalizeLocale } from "./config";

const translations = {
  "en-GB": {
    home: homeEnGb,
    bag: bagEnGb,
    checkout: checkoutEnGb,
    helpLanding: helpLandingEnGb,
    helpFaq: helpFaqEnGb,
    helpDelivery: helpDeliveryEnGb,
    helpContact: helpContactEnGb,
    helpReturns: helpReturnsEnGb,
    helpOrdersInternational: helpOrdersInternationalEnGb,
    helpKpi: helpKpiEnGb,
    systemPages: systemPagesEnGb,
    accessories: accessoriesEnGb,
    welcome: welcomeEnGb,
    pages: pagesEnGb,
    legal: legalEnGb,
  },
  "es-ES": {
    home: homeEsEs,
    bag: bagEsEs,
    checkout: checkoutEsEs,
    helpLanding: helpLandingEsEs,
    helpFaq: helpFaqEsEs,
    helpDelivery: helpDeliveryEsEs,
    helpContact: helpContactEsEs,
    helpReturns: helpReturnsEsEs,
    helpOrdersInternational: helpOrdersInternationalEsEs,
    helpKpi: helpKpiEsEs,
    systemPages: systemPagesEsEs,
    accessories: accessoriesEsEs,
    welcome: welcomeEsEs,
    pages: pagesEsEs,
    legal: legalEsEs,
  },
} as const;

export type TranslationNamespaces = (typeof translations)[typeof DEFAULT_LOCALE];
export type TranslationNamespace = keyof TranslationNamespaces;

export function getNamespaceCopy<N extends TranslationNamespace>(
  locale: string | undefined,
  namespace: N,
): TranslationNamespaces[N] {
  const normalized = normalizeLocale(locale);
  return translations[normalized][namespace];
}

export function getLocaleDictionary(locale: SupportedLocale) {
  return translations[locale];
}

export function getAllDictionaries() {
  return translations;
}
