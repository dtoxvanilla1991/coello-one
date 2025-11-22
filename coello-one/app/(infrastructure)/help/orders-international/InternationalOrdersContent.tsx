"use client";

import { Card, Flex, Table, Timeline, Typography } from "antd";
import type { TableColumnsType } from "antd";
import {
  CURRENCY_COVERAGE,
  FULFILMENT_NODES,
  SUPPORT_INSIGHTS,
} from "./constants";
import type { CurrencyCoverage } from "./constants";

const { Title, Paragraph, Text, Link } = Typography;

const currencyColumns: TableColumnsType<CurrencyCoverage> = [
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Regions",
    dataIndex: "regions",
    key: "regions",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
  },
];

type InternationalOrdersContentProps = {
  contactHref: string;
};

export default function InternationalOrdersContent({ contactHref }: InternationalOrdersContentProps) {
  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Fulfilment network
          </Title>
          <Flex gap={16} wrap>
            {FULFILMENT_NODES.map((node) => (
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
            Currency coverage
          </Title>
          <Paragraph className="mb-0! text-gray-600">
            We localise pricing in your currency and keep the rate locked for 30 minutes while you check out.
          </Paragraph>
          <Table
            rowKey="currency"
            columns={currencyColumns}
            dataSource={CURRENCY_COVERAGE}
            pagination={false}
            className="overflow-hidden rounded-xl border border-gray-200"
          />
        </Flex>
      </Card>

      <Card className="border-gray-200 bg-white/60">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Your journey timeline
          </Title>
          <Timeline
            mode="left"
            items={[
              {
                children: (
                  <Flex vertical gap={4}>
                    <Title level={4} className="mb-0! text-base font-semibold">
                      Checkout duties calculated
                    </Title>
                    <Paragraph className="mb-0! text-gray-600">
                      We show duties and taxes in your currency before you pay—no courier surprises.
                    </Paragraph>
                  </Flex>
                ),
              },
              {
                children: (
                  <Flex vertical gap={4}>
                    <Title level={4} className="mb-0! text-base font-semibold">
                      Smart routing in motion
                    </Title>
                    <Paragraph className="mb-0! text-gray-600">
                      We pick the closest fulfilment node and auto-book the fastest insured courier lane.
                    </Paragraph>
                  </Flex>
                ),
              },
              {
                children: (
                  <Flex vertical gap={4}>
                    <Title level={4} className="mb-0! text-base font-semibold">
                      Track in your language
                    </Title>
                    <Paragraph className="mb-0! text-gray-600">
                      Real-time updates arrive in your locale with locker redirect options where available.
                    </Paragraph>
                  </Flex>
                ),
              },
            ]}
          />
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Concierge tips
          </Title>
          <Flex gap={16} wrap>
            {SUPPORT_INSIGHTS.map((insight) => (
              <Card key={insight.title} className="w-full border-gray-200 md:max-w-[320px] md:flex-1">
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
            Need a hand with customs paperwork? Head to{" "}
            <Link href={contactHref} className="font-semibold text-gray-900">
              Contact Us
            </Link>{" "}
            and mention customs in your message.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
