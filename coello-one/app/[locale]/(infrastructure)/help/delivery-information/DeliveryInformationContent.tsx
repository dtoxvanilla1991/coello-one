"use client";

import { Card, Flex, Grid, Timeline, Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import DeliveryCalculator from "./DeliveryCalculator";
import DeliveryMatrixTable from "./DeliveryMatrixTable";
import type { DeliveryPromise, DeliveryTier, DutyInsight, PackingStep } from "./types";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

type DeliveryInformationContentProps = {
  tiers?: DeliveryTier[];
  promises?: DeliveryPromise[];
  packingSteps?: PackingStep[];
  dutyInsights?: DutyInsight[];
};

// TEST-WAIVER: Pure presentational aggregator; behavior is exercised via DeliveryCalculator and higher-level page tests.
export function DeliveryInformationContent({
  tiers,
  promises,
  packingSteps,
  dutyInsights,
}: DeliveryInformationContentProps) {
  const deliveryCopy = useTranslations("helpDelivery");
  const screens = useBreakpoint();
  const resolvedTiers = tiers ?? deliveryCopy.tiers;
  const resolvedPromises = promises ?? deliveryCopy.promises;
  const resolvedPackingSteps = packingSteps ?? deliveryCopy.packingSteps;
  const resolvedDutyInsights = dutyInsights ?? deliveryCopy.dutyInsights;

  return (
    <Flex vertical gap={24} className="md:gap-8">
      <DeliveryCalculator tiers={resolvedTiers as DeliveryTier[]} />

      <Card className="border-gray-200" classNames={{ body: "p-4 md:p-6" }}>
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-xl md:text-2xl">
            {deliveryCopy.sections.speedsTitle}
          </Title>
          <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
            {deliveryCopy.sections.speedsDescription}
          </Paragraph>
          <DeliveryMatrixTable
            tiers={resolvedTiers as DeliveryTier[]}
            columnCopy={deliveryCopy.matrixColumns}
          />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/70" classNames={{ body: "p-4 md:p-6" }}>
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-xl md:text-2xl">
            {deliveryCopy.sections.promisesTitle}
          </Title>
          <Flex gap={12} wrap className="flex-col md:flex-row">
            {resolvedPromises.map((promise) => (
              <Card
                key={promise.title}
                className="w-full border-gray-200 md:max-w-[320px] md:flex-1"
                classNames={{ body: "p-4" }}
              >
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-base font-semibold md:text-lg">
                    {promise.title}
                  </Title>
                  <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                    {promise.description}
                  </Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card className="border-gray-200" classNames={{ body: "p-4 md:p-6" }}>
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-xl md:text-2xl">
            {deliveryCopy.sections.packingTitle}
          </Title>
          <Timeline
            mode={screens.md ? "alternate" : "start"}
            items={resolvedPackingSteps.map((step) => ({
              content: (
                <Flex vertical gap={4}>
                  <Title level={4} className="mb-0! text-base font-semibold">
                    {step.title}
                  </Title>
                  <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                    {step.description}
                  </Paragraph>
                </Flex>
              ),
            }))}
          />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/60" classNames={{ body: "p-4 md:p-6" }}>
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-xl md:text-2xl">
            {deliveryCopy.sections.dutiesTitle}
          </Title>
          <Flex gap={12} wrap className="flex-col md:flex-row">
            {resolvedDutyInsights.map((insight) => (
              <Card
                key={insight.market}
                className="w-full border-gray-200 md:max-w-[320px] md:flex-1"
                classNames={{ body: "p-4" }}
              >
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-base font-semibold md:text-lg">
                    {insight.market}
                  </Title>
                  <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                    {insight.detail}
                  </Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
