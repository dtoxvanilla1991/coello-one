"use client";

import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Divider, Flex } from "antd";

const { Title } = Typography;

const data = [
  { title: "Lifting" },
  { title: "Cardio" },
  { title: "Yoga" },
  // ...existing or additional items...
];

const Training: React.FC = () => {
  return (
    <Flex className="!p-4 !pr-0 !pb-8 bg-white" vertical>
      <Title level={4} className="uppercase !mb-4">
        Our athletes workouts
      </Title>
      <Flex
        gap={16}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            cover={
              <div className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/main-secondary-${index + 9}.jpg`}
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
            <Card.Meta title={item.title} className="uppercase" />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default Training;
