"use client";

import { Button, Card, Divider, Flex, Input, Space, Tag, Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import { formatPrice, PAYMENT_METHODS } from "../constants";

const { Title, Text } = Typography;

type BagSummaryColumnProps = {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
};

export function BagSummaryColumn({ subtotal, shipping, total, onCheckout }: BagSummaryColumnProps) {
  const bagCopy = useTranslations("bag");
  const summaryCopy = bagCopy.summary;
  return (
    <Flex vertical gap={16} className="w-full lg:max-w-sm">
      <Card className="rounded-2xl! border border-gray-200!">
        <Flex vertical gap={12}>
          <Title level={4} className="m-0! tracking-wide uppercase">
            {summaryCopy.discountTitle}
          </Title>
          <Space.Compact className="w-full">
            <Input
              placeholder={summaryCopy.discountPlaceholder}
              size="large"
              aria-label={summaryCopy.discountPlaceholder}
            />
            <Button type="primary" size="large">
              {summaryCopy.discountApply}
            </Button>
          </Space.Compact>
          <Text className="text-xs text-gray-500">{summaryCopy.discountHelp}</Text>
        </Flex>
      </Card>

      <Card
        title={summaryCopy.title}
        className="rounded-2xl! border border-gray-200!"
        classNames={{
          header: "uppercase tracking-wide text-sm!",
        }}
      >
        <Flex vertical gap={12} className="text-sm">
          <Flex justify="space-between">
            <Text className="text-gray-500">{summaryCopy.subtotal}</Text>
            <Text className="font-semibold">{formatPrice.format(subtotal)}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text className="text-gray-500">{summaryCopy.shipping}</Text>
            <Text className="font-semibold">
              {shipping === 0 ? summaryCopy.shippingFree : formatPrice.format(shipping)}
            </Text>
          </Flex>
          <Divider className="my-2" />
          <Flex justify="space-between" align="center">
            <Text className="text-base font-semibold uppercase">{summaryCopy.total}</Text>
            <Space orientation="vertical" size={0} className="text-right">
              <Text className="text-lg font-semibold">{formatPrice.format(total)}</Text>
              <Text className="text-xs text-gray-500">{summaryCopy.taxes}</Text>
            </Space>
          </Flex>
          <Button
            type="primary"
            size="large"
            block
            className="mt-2 rounded-full! py-5 text-base! tracking-wide! uppercase"
            onClick={onCheckout}
          >
            {summaryCopy.checkoutCta}
          </Button>
        </Flex>
      </Card>

      <Card className="rounded-2xl! border border-gray-200!">
        <Flex vertical gap={12}>
          <Text strong>{summaryCopy.accepted}</Text>
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
