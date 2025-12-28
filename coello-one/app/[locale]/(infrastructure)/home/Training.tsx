"use client";

import type { FC } from "react";
import Image from "next/image";
import { Card, Button, Typography, Flex } from "antd";
import { trackEvent } from "@/utils/trackEvent";
import ComingSoonOverlay from "@/components/common/ComingSoonOverlay";
import { useTranslations } from "@/localization/useTranslations";

const { Title } = Typography;

const Training: FC = () => {
  const copy = useTranslations("home").training;
  return (
    <Flex
      className="p-4! pr-0! pb-8!"
      vertical
      role="region"
      aria-labelledby="training-section-title"
    >
      <Title level={4} className="mb-4! uppercase" id="training-section-title">
        {copy.title}
      </Title>
      <Flex
        gap={16}
        role="list"
        aria-label={copy.ariaLabel}
        className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {copy.cards.map((item, index) => (
          <Card
            key={item.id}
            className="min-w-72 snap-start opacity-60"
            role="listitem"
            cover={
              <Flex className="relative h-[400px]">
                <Image
                  alt={item.title}
                  src={`/athletes/vertical/main-secondary-${index + 9}.jpg`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="object-cover object-top"
                />
                <ComingSoonOverlay />
              </Flex>
            }
            actions={[
              <Button
                key={`${item.id}-cta`}
                className="uppercase"
                data-analytics-id={item.analyticsId}
                onClick={() => trackEvent("training_plan_click", { plan: item.title })}
                disabled
              >
                {copy.buttonLabel}
              </Button>,
            ]}
          >
            <Card.Meta title={item.title} className="uppercase" />
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default Training;
