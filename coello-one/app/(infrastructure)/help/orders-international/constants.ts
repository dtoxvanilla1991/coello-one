export type FulfilmentNode = {
  title: string;
  description: string;
};

export type CurrencyCoverage = {
  currency: string;
  regions: string;
  notes: string;
};

export type TimelineStep = {
  title: string;
  description: string;
};

export type SupportInsight = {
  title: string;
  description: string;
};

export type ConciergePrompt = {
  lead: string;
  linkLabel: string;
  trail: string;
};

export type InternationalOrdersSections = {
  fulfilment: {
    title: string;
    cards: FulfilmentNode[];
  };
  currency: {
    title: string;
    description: string;
    table: {
      columns: {
        currency: string;
        regions: string;
        notes: string;
      };
      rows: CurrencyCoverage[];
    };
  };
  timeline: {
    title: string;
    steps: TimelineStep[];
  };
  concierge: {
    title: string;
    tips: SupportInsight[];
    prompt: ConciergePrompt;
  };
};

export type InternationalOrdersCopy = {
  metadata: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  title: string;
  description: string;
  sections: InternationalOrdersSections;
};
