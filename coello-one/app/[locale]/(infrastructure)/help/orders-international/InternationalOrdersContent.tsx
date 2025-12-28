"use client";

import { useMemo } from "react";
import { Card, Flex, Table, Timeline, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import type { CurrencyCoverage } from "./constants";

const { Title, Paragraph, Text, Link } = Typography;

type InternationalOrdersContentProps = {
  contactHref: string;
};

export default function InternationalOrdersContent({
  contactHref,
}: InternationalOrdersContentProps) {
  const ordersCopy = useTranslations("helpOrdersInternational");
  const fulfilment = ordersCopy.sections.fulfilment;
  const currency = ordersCopy.sections.currency;
  const timeline = ordersCopy.sections.timeline;
  const concierge = ordersCopy.sections.concierge;
  const currencyColumns = useMemo<TableColumnsType<CurrencyCoverage>>(
    () => [
      {
        title: currency.table.columns.currency,
        dataIndex: "currency",
        key: "currency",
      },
      {
        title: currency.table.columns.regions,
        dataIndex: "regions",
        key: "regions",
      },
      {
        title: currency.table.columns.notes,
        dataIndex: "notes",
        key: "notes",
      },
    ],
    [currency.table.columns.currency, currency.table.columns.regions, currency.table.columns.notes],
  );

  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {fulfilment.title}
          </Title>
          <Flex gap={16} wrap>
            {fulfilment.cards.map((node) => (
              <Card key={node.title} className="w-full border-gray-200 md:max-w-[320px] md:flex-1">
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {node.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{node.description}</Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {currency.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{currency.description}</Paragraph>
          <Table
            rowKey="currency"
            columns={currencyColumns}
            dataSource={currency.table.rows}
            pagination={false}
            className="overflow-hidden rounded-xl border border-gray-200"
          />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/60">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {timeline.title}
          </Title>
          <Timeline
            mode="start"
            items={timeline.steps.map((step) => ({
              content: (
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

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            {concierge.title}
          </Title>
          <Flex gap={16} wrap>
            {concierge.tips.map((insight) => (
              <Card
                key={insight.title}
                className="w-full border-gray-200 md:max-w-[320px] md:flex-1"
              >
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {insight.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{insight.description}</Paragraph>
                </Flex>
              </Card>
            ))}
          </Flex>
          <Text className="text-sm text-gray-500">
            {concierge.prompt.lead}{" "}
            <Link href={contactHref} className="font-semibold text-gray-900">
              {concierge.prompt.linkLabel}
            </Link>{" "}
            {concierge.prompt.trail}
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
