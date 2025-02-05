import Image from "next/image";
import { Button, Flex } from "antd";
import { DataItem } from "./TabsComponent";
import React from "react";

interface TabsContentProps {
  data: DataItem[];
}

const TabsContent: React.FC<TabsContentProps> = ({ data }) => {
  return (
    <Flex
      gap={16}
      className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
      {data.map((item, index) => (
        <div className="relative h-56 min-w-72" key={index}>
          <Image
            alt={item.description}
            src={item.image}
            sizes="(max-width: 640px) 100vw, 640px"
            fill
            className="object-cover rounded-sm"
          />
          <Button
            key={index}
            size="middle"
            className="uppercase !absolute bottom-4 left-4 !px-8 !font-medium">
            View
          </Button>
        </div>
      ))}
    </Flex>
  );
};

export default TabsContent;
