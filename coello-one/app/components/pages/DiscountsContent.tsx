"use client";

import { Card, Flex, List, Typography } from "antd";
import type { DiscountsCopy } from "@/types/pages";
import BrandPageShell from "./BrandPageShell";
import DiscountWaitlistForm from "./DiscountWaitlistForm";

const { Title, Paragraph, Text } = Typography;

type DiscountsContentProps = {
  copy: DiscountsCopy;
};

export default function DiscountsContent({ copy }: DiscountsContentProps) {
  return (
    <BrandPageShell hero={copy.hero}>
      <Card className="border-gray-200 bg-gray-50">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl md:text-3xl!">
            {copy.statusCard.title}
          </Title>
          <Paragraph className="mb-0! text-gray-700">{copy.statusCard.body}</Paragraph>
          <Text className="text-xs uppercase tracking-[0.3em] text-gray-500">
            {copy.statusCard.reminderLabel}
          </Text>
        </Flex>
      </Card>

      <Flex gap={16} wrap>
        {copy.benefits.map((benefit) => (
          <Card key={benefit.title} className="w-full border-gray-200 md:w-[calc(33%-11px)]">
            <Flex vertical gap={8}>
              <Title level={4} className="mb-0! text-lg">
                {benefit.title}
              </Title>
              <Paragraph className="mb-0! text-gray-600">{benefit.description}</Paragraph>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {copy.privacy.title}
          </Title>
          <List
            dataSource={copy.privacy.points}
            renderItem={(item) => (
              <List.Item className="border-0 px-0">
                <Paragraph className="mb-0! text-gray-600">{item}</Paragraph>
              </List.Item>
            )}
          />
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <DiscountWaitlistForm copy={copy.form} />
      </Card>
    </BrandPageShell>
  );
}
