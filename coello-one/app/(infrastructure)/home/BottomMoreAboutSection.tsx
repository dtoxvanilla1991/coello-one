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
            className="min-w-36 snap-start !bg-gray-200"
            classNames={{ body: "!p-2" }}
            cover={
              <Flex
                className="!flex relative h-24 bg-black"
                justify="center"
                align="center">
                <Title level={5} className="!text-white uppercase">
                  COELLO ONE Hub
                </Title>
              </Flex>
            }
            hoverable>
            <Card.Meta title={item.title} className="uppercase bg-gray-200" />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default BottomMoreAboutSection;
