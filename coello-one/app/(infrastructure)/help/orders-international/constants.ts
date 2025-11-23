type FulfilmentNode = {
  title: string;
  description: string;
};

type CurrencyCoverage = {
  currency: string;
  regions: string;
  notes: string;
};

type SupportInsight = {
  title: string;
  description: string;
};

export const FULFILMENT_NODES: FulfilmentNode[] = [
  {
    title: "Rotterdam hub",
    description: "Serves the EU with duty-paid shipments and next-day hand-offs to DHL and DPD.",
  },
  {
    title: "London flagship",
    description:
      "Fulfils UK, Nordics, and Middle East orders with same-day tailoring capabilities.",
  },
  {
    title: "Los Angeles studio",
    description:
      "Supports North America with climate-controlled storage and 48-hour express dispatch.",
  },
];

export const CURRENCY_COVERAGE: CurrencyCoverage[] = [
  {
    currency: "GBP",
    regions: "United Kingdom, Middle East",
    notes: "Primary currency—qualifies for Klarna and Apple Pay installments.",
  },
  {
    currency: "EUR",
    regions: "European Union, Switzerland",
    notes: "Duties included and processed through SEPA-compliant partners.",
  },
  {
    currency: "USD",
    regions: "United States, Canada",
    notes: "Import taxes pre-paid up to $800; above that we handle brokerage paperwork for you.",
  },
  {
    currency: "AED",
    regions: "United Arab Emirates",
    notes: "Converted automatically at checkout with locked-in rates for 30 minutes.",
  },
];

export const SUPPORT_INSIGHTS: SupportInsight[] = [
  {
    title: "Duties guaranteed",
    description: "Coello calculates duties and VAT upfront so parcels arrive with zero surprises.",
  },
  {
    title: "Localized tracking",
    description:
      "Tracking pages localize to your language and surface locker redirection when available.",
  },
  {
    title: "Size & fit guidance",
    description:
      "Request a concierge video consult before delivery—especially handy for first-time one-sleeve buyers.",
  },
];

export type { CurrencyCoverage, FulfilmentNode, SupportInsight };
