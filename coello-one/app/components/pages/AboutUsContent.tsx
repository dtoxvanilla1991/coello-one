"use client";

import Image from "next/image";
import { Button, Card, Flex, Timeline, Typography } from "antd";
import type { AboutCopy } from "@/types/pages";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import BrandPageShell from "./BrandPageShell";
import heroImage from "@public/athletes/horizontal/main-secondary-h-2.jpg";

const { Title, Paragraph, Text } = Typography;

type AboutUsContentProps = {
  copy: AboutCopy;
  ctaHref: string;
};

export default function AboutUsContent({ copy, ctaHref }: AboutUsContentProps) {
  const locale = useCurrentLocale();

  const handleTimelineCta = () => {
    trackEvent(
      "about_cta_click",
      { surface: "about_timeline" },
      { locale, translationKey: "pages.about.cta.label" },
    );
  };

  return (
    <BrandPageShell hero={copy.hero}>
      <Card className="border-gray-200">
        <Flex gap={24} wrap align="stretch">
          <Flex vertical gap={16} className="min-w-64 flex-1">
            <Title level={2} className="mb-0! text-2xl md:text-3xl!">
              {copy.story.title}
            </Title>
            {copy.story.paragraphs.map((paragraph) => (
              <Paragraph key={paragraph} className="mb-0! text-base text-gray-600 md:text-lg">
                {paragraph}
              </Paragraph>
            ))}
            <Card variant="borderless" className="bg-gray-50 text-gray-700">
              <Paragraph className="mb-1! text-base text-gray-800 italic">
                “{copy.story.quote.text}”
              </Paragraph>
              <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                {copy.story.quote.attribution}
              </Text>
            </Card>
          </Flex>
          <Card className="border-gray-200 bg-black/95 text-white sm:max-w-xs">
            <Image
              src={heroImage}
              alt="Coello atelier in motion"
              className="h-auto w-full rounded-md object-cover"
              priority
            />
          </Card>
        </Flex>
      </Card>

      <Flex gap={16} wrap>
        {copy.pillars.map((pillar) => (
          <Card
            key={pillar.id}
            className="w-full border-gray-200 bg-white/70 backdrop-blur md:w-[calc(33%-11px)]"
          >
            <Flex vertical gap={12}>
              <Title level={4} className="mb-0! text-lg font-semibold">
                {pillar.title}
              </Title>
              <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                {pillar.description}
              </Paragraph>
              <Text className="text-xs tracking-[0.25em] text-gray-500 uppercase">
                {pillar.statLabel}
              </Text>
              <Title level={3} className="mb-0! text-2xl">
                {pillar.statValue}
              </Title>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Flex align="center" justify="space-between" wrap>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              {copy.timeline.title}
            </Title>
            <Button type="primary" size="large" href={ctaHref} onClick={handleTimelineCta}>
              {copy.cta.label}
            </Button>
          </Flex>
          <Timeline
            className="max-w-3xl"
            items={copy.timeline.milestones.map((milestone) => ({
              color: "black",
              content: (
                <Flex vertical gap={4}>
                  <Text className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    {milestone.year}
                  </Text>
                  <Title level={4} className="mb-0! text-lg">
                    {milestone.title}
                  </Title>
                  <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                    {milestone.description}
                  </Paragraph>
                </Flex>
              ),
            }))}
          />
        </Flex>
      </Card>
    </BrandPageShell>
  );
}
