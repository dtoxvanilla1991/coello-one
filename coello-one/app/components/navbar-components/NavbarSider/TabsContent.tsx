import Image from "next/image";
import { Button, Flex } from "antd";
import { DataItem } from "./TabsComponent";
import type { FC } from "react";

interface TabsContentProps {
  data: DataItem[];
}

const TabsContent: FC<TabsContentProps> = ({ data }) => {
  return (
    <Flex gap={16} className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth">
      {data.map((item, index) => (
        <div className="relative h-56 min-w-72" key={index}>
          <Image
            alt={item.imageAlt}
            src={item.image}
            sizes="(max-width: 640px) 100vw, 640px"
            fill
            className="rounded-sm object-cover"
          />
          <Button
            key={index}
            size="middle"
            className="absolute! bottom-4 left-4 px-8! font-medium! uppercase"
          >
            {item.ctaLabel}
          </Button>
        </div>
      ))}
    </Flex>
  );
};

export default TabsContent;
