export type HighlightStat = {
  label: string;
  value: string;
};

export type Pillar = {
  id: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
};

export type TimelineMilestone = {
  year: string;
  title: string;
  description: string;
};

export type AboutCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    highlightStats: HighlightStat[];
  };
  story: {
    title: string;
    paragraphs: string[];
    quote: {
      text: string;
      attribution: string;
    };
  };
  pillars: Pillar[];
  timeline: {
    title: string;
    milestones: TimelineMilestone[];
  };
  cta: {
    label: string;
    href: string;
  };
};

export type DiscountBenefit = {
  title: string;
  description: string;
};

export type DiscountsCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  statusCard: {
    title: string;
    body: string;
    reminderLabel: string;
  };
  benefits: DiscountBenefit[];
  privacy: {
    title: string;
    points: string[];
  };
  form: {
    title: string;
    description: string;
    emailPlaceholder: string;
    submitLabel: string;
    privacyNote: string;
    successTitle: string;
    successDescription: string;
    validation: {
      required: string;
      invalid: string;
      refine: string;
    };
  };
};

export type HubResource = {
  label: string;
  type: string;
  href: string;
  description: string;
};

export type HubTab = {
  key: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  focusPoints: string[];
  highlights: Array<{
    title: string;
    description: string;
  }>;
  resources: HubResource[];
  cta: {
    label: string;
    href: string;
  };
};

export type EducationHubCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  tabs: HubTab[];
  commitment: {
    title: string;
    description: string;
  };
};

export type SustainabilityCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  initiatives: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  metrics: HighlightStat[];
  materials: {
    title: string;
    items: string[];
  };
  roadmap: {
    title: string;
    steps: TimelineMilestone[];
  };
  cta: {
    label: string;
    href: string;
  };
};

export type PagesCopy = {
  about: AboutCopy;
  discounts: DiscountsCopy;
  educationHub: EducationHubCopy;
  sustainability: SustainabilityCopy;
};
