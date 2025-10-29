"use client";

import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Flex, Space } from "antd";

const { Title } = Typography;

const data = [
  { title: "Lifting" },
  { title: "Cardio" },
  { title: "Yoga" },
  // ...existing or additional items...
];

const PopularSection: React.FC = () => {
  return (
    <Flex
      className="bg-black p-4! pr-0! pb-8!"
      vertical
      gap={16}
      role="region"
      aria-labelledby="popular-section-title">
      <Title
        level={3}
        className="mb-0! uppercase text-white!"
        id="popular-section-title">
        Popular right now
      </Title>
      <Space size={16}>
        <Button className="px-5! uppercase" size="large">
          Women
        </Button>
        <Button className="px-8! uppercase" size="large">
          Men
        </Button>
      </Space>
      <Flex
        gap={16}
        role="list"
        aria-label="Popular products"
        className="hide-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            variant="borderless"
            cover={
              <Flex className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 6}.jpg`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="object-cover object-top"
                />
              </Flex>
            }
            hoverable
            actions={[
              <Button key={`${item.title}-cta`} className="uppercase">
                Browse options
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
