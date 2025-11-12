"use client";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import { Typography, Button, Space, Flex } from "antd";
import { useLocalePath } from "@/hooks/useLocalePath";
import { trackEvent } from "@/utils/trackEvent";

const { Title, Text } = Typography;

const SalesBlock: FC = () => {
  const router = useRouter();
  const localePath = useLocalePath();

  const handleWomenClick = () => {
    trackEvent("sales_block_cta_click", { audience: "women" });
    const searchParams = new URLSearchParams({ gender: "female", size: "M", color: "red" });
    router.push(localePath(`/products?${searchParams.toString()}`));
  };

  const handleMenClick = () => {
    trackEvent("sales_block_cta_click", { audience: "men" });
    const searchParams = new URLSearchParams({ gender: "male", size: "M", color: "blue" });
    router.push(localePath(`/products?${searchParams.toString()}`));
  };

  return (
    <Flex
      className="bg-black p-4! text-center"
      vertical
      justify="center"
      align="center"
      role="region"
      aria-labelledby="sales-block-title"
    >
      <Title className="text-white!" level={3} id="sales-block-title">
        GET AN EXTRA 10% OFF WHEN BAGGING 2+ ITEMS
      </Title>
      <Text className="mb-5 text-base text-white!">
        Drop code extra10 and thank us with a tagged photo in the gym
      </Text>
      <Space direction="vertical" className="w-1/2">
        <Button
          className="w-full uppercase hover:bg-white! hover:text-black!"
          size="large"
          data-analytics-id="sales-block-shop-women"
          onClick={handleWomenClick}
        >
          Shop women
        </Button>
        <Button
          className="w-full uppercase hover:bg-white! hover:text-black!"
          size="large"
          data-analytics-id="sales-block-shop-men"
          onClick={handleMenClick}
        >
          Shop men
        </Button>
      </Space>
    </Flex>
  );
};

export default SalesBlock;
