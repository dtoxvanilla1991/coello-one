export type FAQEntry = {
  id: string;
  question: string;
  answer: string[];
  tags: string[];
};

export type FAQCategory = {
  id: string;
  title: string;
  summary: string;
  entries: FAQEntry[];
};
