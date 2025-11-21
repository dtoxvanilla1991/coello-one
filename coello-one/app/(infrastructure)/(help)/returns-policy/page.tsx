import type { Metadata } from "next";
import { Card, Collapse, Flex, List, Statistic, Timeline, Typography } from "antd";
import type { CollapseProps } from "antd";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";
import { RETURN_FAQ, RETURN_HIGHLIGHTS, RETURN_STEPS } from "./constants";

const { Title, Paragraph, Text } = Typography;

export const metadata: Metadata = {
  title: "Returns Policy | Coello Help",
  description: "Understand Coello's returns window, exchange options, and how refunds are processed.",
};

const faqItems: CollapseProps["items"] = RETURN_FAQ.map((entry, index) => ({
  key: `return-faq-${index}`,
  label: (
    <Text className="font-medium text-gray-900">{entry.question}</Text>
  ),
  children: (
    <Paragraph className="mb-0! text-gray-600">{entry.answer}</Paragraph>
  ),
}));

const eligibilityChecklist = [
  "Garments must be unused beyond try-on and include the sleeve seal.",
  "All packaging, authenticity cards, and extras travel back with the return.",
  "Bundle promotions can be partially returned—remaining pieces recalibrate discounts automatically.",
];

// TEST-WAIVER: Route shell stitches together static policy content; deeper behavior lives in dedicated forms.
export default function ReturnsPolicyPage() {
  const withLocalePath = createLocalePath();

  return (
    <HelpPageShell
      title="Returns policy"
      description="We engineered the returns flow to be as frictionless as your training session."
      breadcrumb={[{ title: "Help Centre", href: withLocalePath("help") }, { title: "Returns" }]}
    >
      <Flex vertical gap={24}>
        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl">
              Your 30-day promise
            </Title>
            <Paragraph className="mb-0! text-gray-600">
              Start a return within 30 days of delivery (extended to 45 days for November and
              December purchases). We refund to your original payment method or convert instantly to
              Coello credit—your choice every time.
            </Paragraph>
            <Flex gap={16} wrap>
              {RETURN_HIGHLIGHTS.map((highlight) => (
                <Card
                  key={highlight.title}
                  className="w-full border-gray-200 md:max-w-[320px] md:flex-1"
                >
                  <Flex vertical gap={8}>
                    <Title level={4} className="mb-0! text-lg font-semibold">
                      {highlight.title}
                    </Title>
                    <Paragraph className="mb-0! text-gray-600">{highlight.description}</Paragraph>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Card>

        <Card className="border-gray-200 bg-white/70">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl">
              Refund timing snapshot
            </Title>
            <Flex gap={16} wrap>
              <Card className="w-full border-gray-200 md:max-w-[220px] md:flex-1">
                <Statistic
                  title="Refunds land in"
                  value="3-5 days"
                  valueStyle={{ fontSize: "1.5rem" }}
                />
                <Text className="text-sm text-gray-500">
                  from the moment the warehouse scans your sleeve
                </Text>
              </Card>
              <Card className="w-full border-gray-200 md:max-w-[220px] md:flex-1">
                <Statistic
                  title="Credit issued"
                  value="Instantly"
                  valueStyle={{ fontSize: "1.5rem" }}
                />
                <Text className="text-sm text-gray-500">
                  usable in checkout as soon as you confirm
                </Text>
              </Card>
              <Card className="w-full border-gray-200 md:max-w-[220px] md:flex-1">
                <Statistic
                  title="Exchange prep"
                  value="Under 24h"
                  valueStyle={{ fontSize: "1.5rem" }}
                />
                <Text className="text-sm text-gray-500">
                  replacement sleeves pulled as soon as you request
                </Text>
              </Card>
            </Flex>
          </Flex>
        </Card>

        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl">
              How the process flows
            </Title>
            <Timeline
              items={RETURN_STEPS.map((step) => ({
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
              Eligibility checklist
            </Title>
            <List
              dataSource={eligibilityChecklist}
              renderItem={(item) => (
                <List.Item className="px-0">
                  <Text className="text-gray-600">{item}</Text>
                </List.Item>
              )}
            />
          </Flex>
        </Card>

        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl">
              Quick answers
            </Title>
            <Collapse items={faqItems} bordered={false} />
          </Flex>
        </Card>
      </Flex>
    </HelpPageShell>
  );
}
