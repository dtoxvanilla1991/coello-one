type ReturnHighlight = {
  title: string;
  description: string;
};

type ReturnStep = {
  title: string;
  description: string;
};

type ReturnFAQ = {
  question: string;
  answer: string;
};

export const RETURN_HIGHLIGHTS: ReturnHighlight[] = [
  {
    title: "30-day window",
    description: "Log a return within 30 days (45 during the festive season) to stay eligible for full refund or credit.",
  },
  {
    title: "Instant credit",
    description: "Choose Coello credit for immediate reuse while your original sleeve travels back to us.",
  },
  {
    title: "Free UK returns",
    description: "Standard UK returns ship on us. International labels are subsidised with flat rates.",
  },
];

export const RETURN_STEPS: ReturnStep[] = [
  {
    title: "Start the return portal",
    description: "Head to the Return an Item page, enter your order number, and pick refund or exchange.",
  },
  {
    title: "Pack it with care",
    description: "Use the original garment bag, remove the security sleeve chip only after we confirm receipt.",
  },
  {
    title: "Courier drop-off",
    description: "Choose DPD pickup, Royal Mail drop, or DHL Express for international parcels.",
  },
  {
    title: "Refund or exchange",
    description: "Refunds release within 3-5 business days. Exchanges dispatch as soon as your parcel scans.",
  },
];

export const RETURN_FAQ: ReturnFAQ[] = [
  {
    question: "Can I return a worn item?",
    answer:
      "We happily accept try-on level wear. Training sessions void the return unless the garment is defective.",
  },
  {
    question: "How do I swap sizes?",
    answer:
      "Select Exchange in the portal. We reserve the requested size for seven days and confirm by email.",
  },
  {
    question: "What if my sleeve tag is missing?",
    answer:
      "Reach our concierge with photos. We review within 24 hours and escalate to a manual inspection if needed.",
  },
];

export type { ReturnFAQ, ReturnHighlight, ReturnStep };
