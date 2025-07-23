"use client";

import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Flex } from "antd";

const { Title } = Typography;

const data = [{ title: "Lifting" }, { title: "Cardio" }, { title: "Yoga" }];

const Training: React.FC = () => {
  return (
    <Flex className="p-4! pr-0! pb-8!" vertical data-testid="training-section">
      <Title
        level={4}
        className="uppercase mb-4!"
        data-testid="training-section-title">
        Our athletes workouts
      </Title>
      <Flex
        gap={16}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {data.map((item, index) => (
          <Card
            key={index}
            className="min-w-72 snap-start"
            data-testid={`training-section-card-${index}`}
            cover={
              <div className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 9}.jpg`}
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
                data-testid={`training-section-card-button-${index}`}>
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
