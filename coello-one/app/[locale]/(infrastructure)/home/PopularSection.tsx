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
      className="!p-4 !pr-0 !pb-8 bg-black"
      vertical
      gap={16}
      data-testid="popular-section">
      <Title
        level={3}
        className="uppercase !text-white !mb-0"
        data-testid="popular-section-title">
        Popular right now
      </Title>
      <Space size={16}>
        <Button
          className="uppercase !px-5"
          size="large"
          data-testid="popular-section-women-button">
          Women
        </Button>
        <Button
          className="uppercase !px-8"
          size="large"
          data-testid="popular-section-men-button">
          Men
        </Button>
      </Space>
      <Flex
        gap={16}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            variant="borderless"
            data-testid={`popular-section-card-${index}`}
            cover={
              <div className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 6}.jpg`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="object-cover object-top"
                />
              </div>
            }
            hoverable
            actions={[
              <Button
                key={index}
                className="uppercase"
                data-testid={`popular-section-card-button-${index}`}>
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
