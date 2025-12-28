"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import TabsContent from "./TabsContent";
import { useTranslations } from "@/localization/useTranslations";

export type DataItem = {
  image: string;
  imageAlt: string;
  ctaLabel: string;
};

const TAB_MEDIA = {
  women: [
    { key: "passion", image: "/athletes/horizontal/main-secondary-h-1.jpg" },
    { key: "power", image: "/athletes/horizontal/main-secondary-h-2.jpg" },
    { key: "fire", image: "/athletes/horizontal/main-secondary-h-3.jpg" },
  ],
  men: [
    { key: "fire", image: "/athletes/horizontal/main-secondary-h-4.jpg" },
    { key: "passion", image: "/athletes/horizontal/main-secondary-h-5.jpg" },
    { key: "power", image: "/athletes/horizontal/main-secondary-h-6.jpg" },
  ],
  accessories: [{ key: "bands", image: "/accessories/resistance-bands.png" }],
} as const;

const TAB_KEYS = Object.keys(TAB_MEDIA) as Array<keyof typeof TAB_MEDIA>;

const onChange = (key: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(key);
  }
};

export const TabsComponent: React.FC = () => {
  const navigationCopy = useTranslations("navigation");
  const tabsCopy = navigationCopy.sider.tabs;
  const fallbackCta = tabsCopy.viewCta ?? "View";

  const items: TabsProps["items"] = TAB_KEYS.map((tabKey, index) => {
    const cardCopy = tabsCopy.cards?.[tabKey] as Record<string, { imageAlt: string }> | undefined;
    const cards: DataItem[] = TAB_MEDIA[tabKey].map((card) => ({
      image: card.image,
      imageAlt: cardCopy?.[card.key]?.imageAlt ?? card.key,
      ctaLabel: fallbackCta,
    }));

    return {
      key: String(index + 1),
      label: tabsCopy.labels?.[tabKey] ?? tabKey.toUpperCase(),
      children: <TabsContent data={cards} />,
    };
  });

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />;
};
