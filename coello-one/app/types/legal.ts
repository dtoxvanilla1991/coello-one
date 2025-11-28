export type LegalListItem = {
  title: string;
  description: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  listTitle?: string;
  listItems?: LegalListItem[];
};

export type LegalContactChannel = {
  label: string;
  value: string;
  href?: string;
};

export type LegalHero = {
  title: string;
  subtitle: string;
  updated: string;
  summary: string[];
};

export type LegalPageCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: LegalHero;
  sections: LegalSection[];
  contact: {
    title: string;
    description: string;
    channels: LegalContactChannel[];
  };
};

export type LegalNavigationLink = {
  id: string;
  label: string;
  href: string;
};

export type LegalCopy = {
  navigation: {
    ariaLabel: string;
    links: LegalNavigationLink[];
  };
  termsConditions: LegalPageCopy;
  privacyNotice: LegalPageCopy;
  termsOfUse: LegalPageCopy;
  cookiePolicy: LegalPageCopy;
};
