"use client";

import { Button, Card, Empty, Flex, Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import EmptyBagIcon from "@public/icons/EmptyBag";

const { Title } = Typography;

type BagEmptyStateProps = {
  onContinueShopping: () => void;
};

export function BagEmptyState({ onContinueShopping }: BagEmptyStateProps) {
  const bagCopy = useTranslations("bag");
  const emptyCopy = bagCopy.empty;
  return (
    <Card className="rounded-2xl! border border-gray-200!">
      <Flex vertical align="center" gap={24} className="w-full py-12 text-center">
        <Title level={3} className="m-0! tracking-wide uppercase">
          {emptyCopy.title}
        </Title>
        <Empty
          image={<EmptyBagIcon />}
          description={emptyCopy.description}
          styles={{ image: { marginBottom: 12 } }}
        />
        <Button type="primary" size="large" onClick={onContinueShopping}>
          {emptyCopy.cta}
        </Button>
      </Flex>
    </Card>
  );
}
