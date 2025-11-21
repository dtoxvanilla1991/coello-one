type FAQEntry = {
  id: string;
  question: string;
  answer: string[];
  tags: string[];
};

type FAQCategory = {
  id: string;
  title: string;
  summary: string;
  entries: FAQEntry[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "orders",
    title: "Orders & Payments",
    summary: "Track the status of your order and manage how you pay for Coello essentials.",
    entries: [
      {
        id: "order-status",
        question: "How do I check my order status?",
        answer: [
          "Sign in to your Coello account and head to My Orders to view real-time updates.",
          "Guest checkout confirmations include a tracking link—use the email lookup option if you misplaced it.",
          "For pre-orders, we notify you by email the moment your one-sleeve essential is ready to ship.",
        ],
        tags: ["tracking", "account"],
      },
      {
        id: "payment-methods",
        question: "Which payment methods do you accept?",
        answer: [
          "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Klarna.",
          "Buy now, pay later options are screened instantly—no extra forms required.",
          "All transactions leverage 3-D Secure and regional compliance protocols for maximum protection.",
        ],
        tags: ["payments", "klarna"],
      },
      {
        id: "order-changes",
        question: "Can I edit or cancel an order after placing it?",
        answer: [
          "Order edits are possible within 30 minutes via the My Orders panel; look for the Manage button.",
          "If the window closes, contact Support with your order number—we will intercept the parcel where feasible.",
          "Made-to-measure pieces enter production immediately and cannot be modified once confirmed.",
        ],
        tags: ["changes", "support"],
      },
    ],
  },
  {
    id: "shipping",
    title: "Delivery",
    summary: "Understand delivery speeds, carrier partners, and how we protect your drop-off.",
    entries: [
      {
        id: "shipping-times",
        question: "What are the standard delivery timelines?",
        answer: [
          "UK orders arrive in 1-3 business days; rest of Europe typically within 3-6 days.",
          "Express service prioritises morning dispatch with guaranteed evening delivery in metro hubs.",
          "Rural regions sometimes require an extra day—track events update at every depot hand-off.",
        ],
        tags: ["shipping", "timelines"],
      },
      {
        id: "same-day",
        question: "Do you offer same-day delivery?",
        answer: [
          "Same-day drop is live in London Zones 1-3 for orders placed before 3pm local time.",
          "Select Same Day at checkout to surface courier slots; couriers send SMS confirmation within 15 minutes.",
          "We are expanding the programme—join the newsletter for launch alerts in Manchester and Birmingham.",
        ],
        tags: ["same-day", "courier"],
      },
      {
        id: "delivery-security",
        question: "How do you secure deliveries?",
        answer: [
          "Every parcel ships with tamper seals and insurance matching the order value.",
          "You can redirect to an InPost locker or DPD pickup point directly from the tracking portal.",
          "Signature release is optional—enable it in My Orders if you prefer contactless drop-offs.",
        ],
        tags: ["security", "pickup"],
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    summary: "Plan a return, exchange sizes, or convert to Coello credit with ease.",
    entries: [
      {
        id: "return-window",
        question: "How long do I have to return an item?",
        answer: [
          "You have 30 days from delivery to log a return—holiday purchases qualify for an extended 45 days.",
          "Items must be unworn and include the detachable Coello sleeve seal and authenticity card.",
          "Bundle promotions can be partially returned; credits adjust automatically.",
        ],
        tags: ["returns", "policy"],
      },
      {
        id: "exchange-sizes",
        question: "Can I exchange for a different size?",
        answer: [
          "Yes—during the return flow choose Exchange and tell us the fit you want.",
          "We reserve the replacement item for seven days while your original makes its way home.",
          "If the size sells out, we issue full refund or instant store credit per your preference.",
        ],
        tags: ["exchange", "sizes"],
      },
      {
        id: "processing-times",
        question: "How fast do refunds appear?",
        answer: [
          "Refunds land within 3-5 business days after the warehouse scans your return.",
          "Store credit is issued instantly and emails within minutes.",
          "Klarna repayments update automatically; no extra action is required on your side.",
        ],
        tags: ["refunds", "timing"],
      },
    ],
  },
  {
    id: "account",
    title: "Account & Support",
    summary: "Take control of personalization, notifications, and concierge access.",
    entries: [
      {
        id: "account-benefits",
        question: "Why create a Coello account?",
        answer: [
          "Accounts unlock sleeve tailoring insights, saved fit preferences, and early access drops.",
          "One-click checkout stores secure payment tokens via PCI-DSS compliant vaulting.",
          "You can export all personal data from Account Settings in line with GDPR requirements.",
        ],
        tags: ["account", "privacy"],
      },
      {
        id: "notifications",
        question: "How do I manage notifications?",
        answer: [
          "In Account Settings toggle the alerts you want—launches, stock reloads, or training content.",
          "SMS delivery updates are carrier-linked and can be paused without affecting email alerts.",
          "Ambassador programme invites are first-come-first-serve; respond within 48 hours to secure a slot.",
        ],
        tags: ["notifications", "ambassador"],
      },
      {
        id: "concierge",
        question: "What is Coello Concierge?",
        answer: [
          "Concierge is your 24/7 channel to stylists and product experts over WhatsApp and iMessage.",
          "Members unlock personalised training plans co-created with our pro athlete partners.",
          "Upgrade inside Account Settings > Membership—first month is complimentary for new members.",
        ],
        tags: ["concierge", "membership"],
      },
    ],
  },
];

export const FAQ_TRENDING_TOPICS: string[] = [
  "Sleeve fit guide",
  "Same-day delivery zones",
  "Returns portal login",
  "Klarna repayments",
  "Concierge membership"
];

export type { FAQCategory, FAQEntry };
