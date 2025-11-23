import type { TabsProps } from "antd";
import { Tabs } from "antd";
import TabsContent from "./TabsContent";

export type DataItem = {
  modelVariant: string;
  image: string;
  description: string;
};

export type DataModel = Map<string, DataItem[]>;

const data: DataModel = new Map([
  [
    "women",
    [
      {
        modelVariant: "Passion",
        image: "/athletes/horizontal/main-secondary-h-1.jpg",
        description: "Female athlete wearing Passion model",
      },
      {
        modelVariant: "Power",
        image: "/athletes/horizontal/main-secondary-h-2.jpg",
        description: "Female athlete wearing Power model",
      },
      {
        modelVariant: "Fire",
        image: "/athletes/horizontal/main-secondary-h-3.jpg",
        description: "Female athlete wearing Fire model",
      },
    ],
  ],
  [
    "men",
    [
      {
        modelVariant: "Fire",
        image: "/athletes/horizontal/main-secondary-h-4.jpg",
        description: "Male athlete wearing Fire model",
      },
      {
        modelVariant: "Passion",
        image: "/athletes/horizontal/main-secondary-h-5.jpg",
        description: "Male athlete wearing Passion model",
      },
      {
        modelVariant: "Power",
        image: "/athletes/horizontal/main-secondary-h-6.jpg",
        description: "Male athlete wearing Power model",
      },
    ],
  ],
  [
    "accessories",
    [
      {
        modelVariant: "Coello Bands",
        image: "/accessories/resistance-bands.png",
        description: "Coello resistance bands",
      },
    ],
  ],
]);

const onChange = (key: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(key);
  }
};
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "WOMEN",
    children: <TabsContent data={data.get("women") ?? []} />,
  },
  {
    key: "2",
    label: "MEN",
    children: <TabsContent data={data.get("men") ?? []} />,
  },
  {
    key: "3",
    label: "ACCESSORIES",
    children: <TabsContent data={data.get("accessories") ?? []} />,
  },
];
export const TabsComponent: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
);
