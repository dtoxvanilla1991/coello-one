"use client";
import React from "react";
import { Typography, Button, Space, Flex } from "antd";

const { Title, Text } = Typography;

const SalesBlock: React.FC = () => {
  return (
    <Flex
      className="bg-black !p-4 text-center"
      vertical={true}
      justify="center"
      align="center">
      <Title className="!text-white" level={3}>
        GET AN EXTRA 10% OFF SALE ITEMS
      </Title>
      <Text className="!text-white mb-5 text-base">
        Drop code extra10 and thank us with a tagged photo in the gym
      </Text>
      <Space direction="vertical" className="w-1/2">
        <Button className="w-full uppercase" size="large">
          Shop women
        </Button>
        <Button className="w-full uppercase" size="large">
          Shop men
        </Button>
      </Space>
    </Flex>
  );
};

export default SalesBlock;
