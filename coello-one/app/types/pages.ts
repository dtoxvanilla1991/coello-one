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

export type TrainingPlanId = "essentialist" | "architect" | "craftsman";

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

export type ProtocolCardCopy = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
  science: {
    title: string;
    description: string;
  };
  action: string;
  tlDr: string[];
  microDose: string[];
  deepDive: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
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
  ui: {
    modalTitlePrefix: string;
    openTlDrLabel: string;
    closeLabel: string;
    scienceLabel: string;
    actionLabel: string;
    tlDrHeading: string;
    microDoseHeading: string;
  };
  protocols: ProtocolCardCopy[];
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

export type PlanSplitCopy = {
  label: string;
  isNature?: boolean;
};

export type CoelloPlanCopy = {
  name: string;
  tagline: string;
  description: string;
  focus: string[];
  split: PlanSplitCopy[];
};

export type CoelloPlanSelectorCopy = {
  kicker: string;
  description: string;
  daysLabel: string;
};

export type CoelloPlanDisplayCopy = {
  daysPerWeekLabel: string;
  weeklySplitHeading: string;
  dayLabel: string;
};

export type CoelloRitualCardCopy = {
  id: string;
  label: string;
  description: string;
};

export type CoelloRitualCopy = {
  title: string;
  philosophy: string;
  cards: CoelloRitualCardCopy[];
};

export type CoelloLivingCopy = {
  kicker: string;
  title: string;
  description: string;
  diet: string;
};

export type CoelloCutTrainingCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  manifesto: {
    headline: string;
    subheading: string;
    bulletPoints: Array<{
      title: string;
      description: string;
    }>;
  };
  planSelector: CoelloPlanSelectorCopy;
  planDisplay: CoelloPlanDisplayCopy;
  plans: Record<TrainingPlanId, CoelloPlanCopy>;
  ritual: CoelloRitualCopy;
  living: CoelloLivingCopy;
};

export type PagesCopy = {
  about: AboutCopy;
  discounts: DiscountsCopy;
  educationHub: EducationHubCopy;
  sustainability: SustainabilityCopy;
  coelloCutTraining: CoelloCutTrainingCopy;
};
