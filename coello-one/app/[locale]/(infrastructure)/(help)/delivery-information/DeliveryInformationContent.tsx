"use client";

import { Card, Flex, Timeline, Typography } from "antd";
import DeliveryCalculator from "./DeliveryCalculator";
import DeliveryMatrixTable from "./DeliveryMatrixTable";
import type { DeliveryPromise, DeliveryTier, DutyInsight, PackingStep } from "./constants";

const { Title, Paragraph } = Typography;

type DeliveryInformationContentProps = {
  tiers: DeliveryTier[];
  promises: DeliveryPromise[];
  packingSteps: PackingStep[];
  dutyInsights: DutyInsight[];
};

// TEST-WAIVER: Pure presentational aggregator; behavior is exercised via DeliveryCalculator and higher-level page tests.
export function DeliveryInformationContent({
  tiers,
  promises,
  packingSteps,
  dutyInsights,
}: DeliveryInformationContentProps) {
  return (
    <Flex vertical gap={24}>
      <DeliveryCalculator tiers={tiers} />

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Shipping speeds at a glance
          </Title>
          <Paragraph className="mb-0! text-gray-600">
            Pricing auto-adjusts for your locale at checkout. Express and same-day options appear when your postcode
            qualifies.
          </Paragraph>
          <DeliveryMatrixTable tiers={tiers} />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            What you can expect
          </Title>
          <Flex gap={16} wrap>
            {promises.map((promise) => (
              <Card key={promise.title} className="w-full border-gray-200 md:max-w-[320px] md:flex-1">
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {promise.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{promise.description}</Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            From studio to your door
          </Title>
          <Timeline
            mode="left"
            items={packingSteps.map((step) => ({
              children: (
                <Flex vertical gap={4}>
                  <Title level={4} className="mb-0! text-base font-semibold">
                    {step.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{step.description}</Paragraph>
                </Flex>
              ),
            }))}
          />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/60">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Duties and taxes, simplified
          </Title>
          <Flex gap={16} wrap>
            {dutyInsights.map((insight) => (
              <Card key={insight.market} className="w-full border-gray-200 md:max-w-[320px] md:flex-1">
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {insight.market}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{insight.detail}</Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
