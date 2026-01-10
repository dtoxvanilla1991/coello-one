type DeliveryTier = {
  id: string;
  region: string;
  service: "Standard" | "Express" | "Same Day";
  eta: string;
  cutoff: string;
  displayCost: string;
  costValue: number;
  currency: "GBP" | "EUR" | "USD";
  freeThreshold?: string;
  freeThresholdValue?: number;
};

type DeliveryPromise = {
  title: string;
  description: string;
};

type PackingStep = {
  title: string;
  description: string;
};

type DutyInsight = {
  market: string;
  detail: string;
};

export const DELIVERY_MATRIX: DeliveryTier[] = [
  {
    id: "uk-standard",
    region: "United Kingdom",
    service: "Standard",
    eta: "1-3 business days",
    cutoff: "Order before 4pm GMT",
    displayCost: "£4.95",
    costValue: 4.95,
    currency: "GBP",
    freeThreshold: "Complimentary over £45",
    freeThresholdValue: 45,
  },
  {
    id: "uk-express",
    region: "United Kingdom",
    service: "Express",
    eta: "Next day by 18:00",
    cutoff: "Order before 19:00 GMT",
    displayCost: "£9.95",
    costValue: 9.95,
    currency: "GBP",
    freeThreshold: "Complimentary over £250",
    freeThresholdValue: 250,
  },
  {
    id: "uk-same-day",
    region: "London Zones 1-3",
    service: "Same Day",
    eta: "Same evening",
    cutoff: "Order before 15:00 GMT",
    displayCost: "£14.95",
    costValue: 14.95,
    currency: "GBP",
  },
  {
    id: "eu-standard",
    region: "European Union",
    service: "Standard",
    eta: "3-6 business days",
    cutoff: "Order before 16:00 CET",
    displayCost: "€12.50",
    costValue: 12.5,
    currency: "EUR",
    freeThreshold: "Complimentary over €200",
    freeThresholdValue: 200,
  },
  {
    id: "eu-express",
    region: "European Union",
    service: "Express",
    eta: "2-3 business days",
    cutoff: "Order before 18:00 CET",
    displayCost: "€19.00",
    costValue: 19,
    currency: "EUR",
  },
  {
    id: "na-standard",
    region: "North America",
    service: "Standard",
    eta: "4-7 business days",
    cutoff: "Order before 14:00 EST",
    displayCost: "$18.00",
    costValue: 18,
    currency: "USD",
    freeThreshold: "Complimentary over $250",
    freeThresholdValue: 250,
  },
  {
    id: "na-express",
    region: "North America",
    service: "Express",
    eta: "2-4 business days",
    cutoff: "Order before 18:00 EST",
    displayCost: "$28.00",
    costValue: 28,
    currency: "USD",
  },
];

export const DELIVERY_PROMISES: DeliveryPromise[] = [
  {
    title: "Proactive tracking",
    description:
      "Receive live courier milestones in your language with ETA adjustments by the minute.",
  },
  {
    title: "Flexible destinations",
    description:
      "Redirect to a DPD Pickup, DHL locker, or concierge desk with two taps from the tracking link.",
  },
  {
    title: "Carbon-aware logistics",
    description:
      "We consolidate shipments daily and offset through verified regenerative textile projects.",
  },
];

export const PACKING_STEPS: PackingStep[] = [
  {
    title: "Order confirmed",
    description:
      "Smart routing picks the closest fulfilment centre and assigns the best-fit sleeve inventory.",
  },
  {
    title: "Performance check",
    description:
      "Each garment passes a moisture-wicking and sleeve seal inspection before bagging.",
  },
  {
    title: "Secure packaging",
    description:
      "Tamper-proof seals and recycled cushioning keep your one-sleeve pristine in transit.",
  },
  {
    title: "Courier hand-off",
    description:
      "We hand over to trusted partners with insurance matching your order value by default.",
  },
];

export const DUTY_INSIGHTS: DutyInsight[] = [
  {
    market: "EU Customs",
    detail:
      "Orders ship from our Rotterdam micro-fulfilment hub—no additional duty for EU customers.",
  },
  {
    market: "US & Canada",
    detail:
      "Import duties are pre-paid up to $800; higher values are handled seamlessly via DHL brokerage.",
  },
  {
    market: "Middle East",
    detail: "We pre-calculate VAT and duties at checkout, so there are no surprises at delivery.",
  },
];

export type { DeliveryPromise, DeliveryTier, DutyInsight, PackingStep };
