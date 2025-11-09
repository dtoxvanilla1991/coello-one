"use client";
import type { FC } from "react";
import { Typography, Button, Space, Flex } from "antd";
import { trackEvent } from "@/utils/trackEvent";

const { Title, Text } = Typography;

const SalesBlock: FC = () => {
  return (
    <Flex
      className="bg-black !p-4 text-center"
      vertical
      justify="center"
      align="center"
      role="region"
      aria-labelledby="sales-block-title"
    >
      <Title className="!text-white" level={3} id="sales-block-title">
        GET AN EXTRA 10% OFF SALE ITEMS
      </Title>
      <Text className="mb-5 text-base !text-white">
        Drop code extra10 and thank us with a tagged photo in the gym
      </Text>
      <Space direction="vertical" className="w-1/2">
        <Button
          className="w-full uppercase hover:!bg-white hover:!text-black"
          size="large"
          data-analytics-id="sales-block-shop-women"
          onClick={() => trackEvent("sales_block_cta_click", { audience: "women" })}
        >
          Shop women
        </Button>
        <Button
          className="w-full uppercase hover:!bg-white hover:!text-black"
          size="large"
          data-analytics-id="sales-block-shop-men"
          onClick={() => trackEvent("sales_block_cta_click", { audience: "men" })}
        >
          Shop men
        </Button>
      </Space>
    </Flex>
  );
};

export default SalesBlock;
