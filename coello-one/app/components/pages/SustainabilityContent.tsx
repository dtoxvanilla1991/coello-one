"use client";

import { Button, Card, Flex, Statistic, Tag, Timeline, Typography } from "antd";
import type { SustainabilityCopy } from "@/types/pages";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import BrandPageShell from "./BrandPageShell";

const { Title, Paragraph, Text } = Typography;

type SustainabilityContentProps = {
  copy: SustainabilityCopy;
};

export default function SustainabilityContent({ copy }: SustainabilityContentProps) {
  const locale = useCurrentLocale();

  const handleManifestoClick = () => {
    trackEvent(
      "sustainability_manifesto_click",
      { surface: "sustainability_roadmap" },
      { locale, translationKey: "pages.sustainability.cta.label" },
    );
  };

  return (
    <BrandPageShell hero={copy.hero}>
      <Flex gap={16} wrap>
        {copy.initiatives.map((initiative) => (
          <Card key={initiative.title} className="w-full border-gray-200 md:w-[calc(33%-11px)]">
            <Flex vertical gap={12}>
              <Tag className="w-fit border-gray-200 text-xs tracking-[0.3em] text-gray-500 uppercase">
                {initiative.badge}
              </Tag>
              <Title level={3} className="mb-0! text-xl">
                {initiative.title}
              </Title>
              <Paragraph className="mb-0! text-gray-600">{initiative.description}</Paragraph>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Card className="border-gray-200">
        <Flex gap={16} wrap>
          {copy.metrics.map((metric) => (
            <Card key={metric.label} className="min-w-48 flex-1 border-gray-200 bg-white/70">
              <Statistic
                title={
                  <Text className="text-xs tracking-[0.25em] text-gray-500 uppercase">
                    {metric.label}
                  </Text>
                }
                value={metric.value}
                styles={{ content: { fontSize: 32, fontWeight: 600 } }}
              />
            </Card>
          ))}
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={12}>
          <Title level={3} className="mb-0! text-2xl">
            {copy.materials.title}
          </Title>
          <Flex vertical gap={4} role="list">
            {copy.materials.items.map((item) => (
              <div key={item} role="listitem">
                <Paragraph className="mb-0! text-gray-600">{item}</Paragraph>
              </div>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Flex align="center" justify="space-between" wrap>
            <Title level={3} className="mb-0! text-2xl">
              {copy.roadmap.title}
            </Title>
            <Button
              type="default"
              href={copy.cta.href}
              target="_blank"
              rel="noreferrer"
              onClick={handleManifestoClick}
            >
              {copy.cta.label}
            </Button>
          </Flex>
          <Timeline
            items={copy.roadmap.steps.map((step) => ({
              color: "black",
              content: (
                <Flex vertical gap={4}>
                  <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    {step.year}
                  </Text>
                  <Title level={4} className="mb-0! text-lg">
                    {step.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{step.description}</Paragraph>
                </Flex>
              ),
            }))}
          />
        </Flex>
      </Card>
    </BrandPageShell>
  );
}
