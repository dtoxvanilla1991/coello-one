"use client";

import { Button, Card, Divider, Flex, Input, Space, Tag, Typography } from "antd";
import { formatPrice, PAYMENT_METHODS } from "../constants";

const { Title, Text } = Typography;

type BagSummaryColumnProps = {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
};

export function BagSummaryColumn({
  subtotal,
  shipping,
  total,
  onCheckout,
}: BagSummaryColumnProps) {
  return (
    <Flex vertical gap={16} className="w-full lg:max-w-sm">
      <Card className="rounded-2xl! border border-gray-200!">
        <Flex vertical gap={12}>
          <Title level={4} className="m-0! uppercase tracking-wide">
            Discount code
          </Title>
          <Space.Compact className="w-full">
            <Input placeholder="Enter code" size="large" aria-label="Enter discount code" />
            <Button type="primary" size="large">
              Apply
            </Button>
          </Space.Compact>
          <Text className="text-xs text-gray-500">
            Gift card codes can be applied at checkout.
          </Text>
        </Flex>
      </Card>

      <Card
        title="Order summary"
        className="rounded-2xl! border border-gray-200!"
        classNames={{
          header: "uppercase tracking-wide text-sm!",
        }}>
        <Flex vertical gap={12} className="text-sm">
          <Flex justify="space-between">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="font-semibold">{formatPrice.format(subtotal)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="text-gray-500">Express shipping</Text>
            <Text className="font-semibold">
              {shipping === 0 ? "Free" : formatPrice.format(shipping)}
            </Text>
          </Flex>
          <Divider className="my-2" />
          <Flex justify="space-between" align="center">
            <Text className="text-base font-semibold uppercase">Total</Text>
            <Space direction="vertical" size={0} className="text-right">
              <Text className="text-lg font-semibold">{formatPrice.format(total)}</Text>
              <Text className="text-xs text-gray-500">Taxes included where applicable</Text>
            </Space>
          </Flex>
          <Button
            type="primary"
            size="large"
            block
            className="mt-2 rounded-full! py-5 text-base! uppercase tracking-wide!"
            onClick={onCheckout}>
            Checkout securely
          </Button>
        </Flex>
      </Card>

      <Card className="rounded-2xl! border border-gray-200!">
        <Flex vertical gap={12}>
          <Text strong>We accept</Text>
          <Space wrap size={[8, 8]}>
            {PAYMENT_METHODS.map((method) => (
              <Tag key={method} className="rounded-full! px-4 py-2 text-sm! uppercase">
                {method}
              </Tag>
            ))}
          </Space>
        </Flex>
      </Card>
    </Flex>
  );
}
