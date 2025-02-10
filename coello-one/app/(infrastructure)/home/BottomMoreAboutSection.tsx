"use client";

import React from "react";
import { Card, Button, Typography, Flex } from "antd";

const { Title, Text } = Typography;

const data = [{ title: "Lifting" }, { title: "Cardio" }, { title: "Yoga" }];

const BottomMoreAboutSection: React.FC = () => {
  return (
    <Flex className="!p-4 !pr-0 !pb-8" vertical>
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
              <div className="relative h-96 bg-black text-center">
                <Title className="text-white uppercase">COELLO ONE Hub</Title>
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

export default BottomMoreAboutSection;
