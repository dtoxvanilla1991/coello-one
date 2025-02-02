"use client";

import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Divider, Flex, Space } from "antd";

const { Title } = Typography;

const data = [
  { title: "Lifting" },
  { title: "Cardio" },
  { title: "Yoga" },
  // ...existing or additional items...
];

const PopularSection: React.FC = () => {
  return (
    <Flex className="!p-4 !pr-0 !pb-8 bg-black" vertical gap={16}>
      <Title level={4} className="uppercase !text-white">
        Popular right now
      </Title>
      <Space size={16}>
        <Button className="uppercase">Women</Button>
        <Button className="uppercase">Men</Button>
      </Space>
      <Flex
        gap={16}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {data.map((item, index) => (
          <Card
            key={index}
            bordered
            className="min-w-72 snap-start !border-4 !border-white"
            cover={
              <div className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/main-secondary-${index + 1}.jpg`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="object-cover object-top"
                />
              </div>
            }
            hoverable
            actions={[
              <Button key={index} className="uppercase">
                View weekly plan
              </Button>,
            ]}>
            <Card.Meta title={item.title} />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default PopularSection;
