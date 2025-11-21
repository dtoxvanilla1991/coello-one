export type DeliveryTier = {
  id: string;
  region: string;
  service: "Standard" | "Express" | "Same Day" | "Estándar" | "Express" | "Mismo día";
  eta: string;
  cutoff: string;
  displayCost: string;
  costValue: number;
  currency: "GBP" | "EUR" | "USD";
  freeThreshold?: string;
  freeThresholdValue?: number;
};

export type DeliveryPromise = {
  title: string;
  description: string;
};

export type PackingStep = {
  title: string;
  description: string;
};

export type DutyInsight = {
  market: string;
  detail: string;
};

export type DeliveryMatrixColumnCopy = {
  region: string;
  service: string;
  eta: string;
  cutoff: string;
  cost: string;
};
