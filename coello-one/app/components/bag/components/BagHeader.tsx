"use client";

import { useMemo } from "react";
import type { SegmentedValue } from "antd/es/segmented";
import { Flex, Segmented, Typography } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import type { ViewMode } from "../types";

const { Title, Text } = Typography;

type BagHeaderProps = {
  viewMode: ViewMode;
  itemCount: number;
  onViewModeChange: (mode: ViewMode) => void;
};

export function BagHeader({
  viewMode,
  itemCount,
  onViewModeChange,
}: BagHeaderProps) {
  const options = useMemo(
    () => [
      {
        label: (
          <Flex align="center" justify="center" gap={8} className="h-full">
            {viewMode === "bag" ? (
              <ShoppingFilled className="text-base" />
            ) : (
              <ShoppingOutlined className="text-base" />
            )}
            <Text strong>{`Bag (${itemCount})`}</Text>
          </Flex>
        ),
        value: "bag" as const,
      },
      {
        label: (
          <Flex align="center" justify="center" gap={8} className="h-full">
            {viewMode === "wishlist" ? (
              <HeartFilled className="text-base" />
            ) : (
              <HeartOutlined className="text-base" />
            )}
            <Text strong>Wishlist</Text>
          </Flex>
        ),
        value: "wishlist" as const,
      },
    ],
    [viewMode, itemCount]
  );

  return (
    <Flex vertical gap={16} className="w-full">
      <Title
        level={2}
        className="mb-0! mt-8 text-center uppercase tracking-wide">
        {viewMode === "bag" ? "Your bag" : "Wishlist"}
      </Title>
      <Segmented
        block
        size="large"
        value={viewMode}
        options={options}
        onChange={(value: SegmentedValue) =>
          onViewModeChange(value as ViewMode)
        }
        className="bg-gray-100! [&_.ant-segmented-item-label]:flex [&_.ant-segmented-item-label]:h-full [&_.ant-segmented-item-label]:items-center [&_.ant-segmented-item-label]:justify-center"
      />
    </Flex>
  );
}
