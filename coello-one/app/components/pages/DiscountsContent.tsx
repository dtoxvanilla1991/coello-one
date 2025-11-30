"use client";

import { useState, useCallback } from "react";
import { Card, Flex, List, Typography, Button } from "antd";
import type { DiscountsCopy } from "@/types/pages";
import BrandPageShell from "./BrandPageShell";
import PromoSignupModal from "@/components/common/PromoSignupModal";
import { trackEvent } from "@/utils/trackEvent";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

const { Title, Paragraph, Text } = Typography;

type DiscountsContentProps = {
  copy: DiscountsCopy;
};

export default function DiscountsContent({ copy }: DiscountsContentProps) {
  const locale = useCurrentLocale();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsSignupModalOpen(true);
    trackEvent(
      "discounts_open_signup_click",
      {},
      { locale, translationKey: "pages.discounts.form.submitLabel" },
    );
  }, [locale]);

  const handleCloseModal = useCallback(() => {
    setIsSignupModalOpen(false);
  }, []);

  return (
    <BrandPageShell hero={copy.hero}>
      <Card className="border-gray-200 bg-gray-50">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl md:text-3xl!">
            {copy.statusCard.title}
          </Title>
          <Paragraph className="mb-0! text-gray-700">{copy.statusCard.body}</Paragraph>
          <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
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
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {copy.form.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{copy.form.description}</Paragraph>
          <Button type="primary" size="large" onClick={handleOpenModal}>
            {copy.form.submitLabel}
          </Button>
          <Text className="text-xs text-gray-500">{copy.form.privacyNote}</Text>
        </Flex>
      </Card>
      <PromoSignupModal
        open={isSignupModalOpen}
        onClose={handleCloseModal}
        copy={copy.form}
        source="discounts-page"
      />
    </BrandPageShell>
  );
}
