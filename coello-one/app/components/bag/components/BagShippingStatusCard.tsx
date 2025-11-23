"use client";

import { Card, Flex, Progress, Tooltip, Typography } from "antd";
import { CheckCircleFilled, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

type BagShippingStatusCardProps = {
  qualifiesForFreeShipping: boolean;
  shippingPercent: number;
  shippingCopy: string;
  shippingTooltip: string;
};

export function BagShippingStatusCard({
  qualifiesForFreeShipping,
  shippingPercent,
  shippingCopy,
  shippingTooltip,
}: BagShippingStatusCardProps) {
  const icon = qualifiesForFreeShipping ? (
    <CheckCircleFilled className="text-emerald-500" />
  ) : (
    <InfoCircleOutlined className="text-amber-500" />
  );

  return (
    <Card
      className="rounded-2xl! border border-emerald-200! bg-emerald-50!"
      styles={{ body: { padding: 20 } }}
    >
      <Flex vertical gap={12}>
        <Flex align="center" gap={8} wrap>
          <Tooltip title={shippingTooltip}>{icon}</Tooltip>
          <Text strong className="text-sm md:text-base">
            {shippingCopy}
          </Text>
        </Flex>
        <Progress
          percent={qualifiesForFreeShipping ? 100 : shippingPercent}
          status="active"
          showInfo={false}
          strokeColor="#047857"
          trailColor="#bbf7d0"
          className="rounded-full!"
        />
      </Flex>
    </Card>
  );
}
