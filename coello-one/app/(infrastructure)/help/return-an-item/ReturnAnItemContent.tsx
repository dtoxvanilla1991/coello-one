"use client";

import { Card, Flex, List, Steps, Typography } from "antd";
import ReturnRequestForm from "./ReturnRequestForm";

const { Title, Paragraph, Text, Link } = Typography;

const steps = [
  {
    title: "Request",
    description: "Submit your order number and select refund or exchange.",
  },
  {
    title: "Pack",
    description: "Seal the garment in its original bag with the authenticity card.",
  },
  {
    title: "Hand off",
    description: "Drop at your chosen courier or book a DPD collection slot.",
  },
  {
    title: "Refund",
    description: "We issue refunds in 3-5 days or dispatch exchanges instantly.",
  },
];

type ReturnAnItemContentProps = {
  contactHref: string;
};

export default function ReturnAnItemContent({ contactHref }: ReturnAnItemContentProps) {
  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/60">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            How the return flow works
          </Title>
          <Steps
            direction="vertical"
            items={steps.map((step) => ({
              title: <Text className="font-semibold text-gray-900">{step.title}</Text>,
              description: <Paragraph className="mb-0! text-gray-600">{step.description}</Paragraph>,
            }))}
          />
        </Flex>
      </Card>

      <ReturnRequestForm />

      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={12}>
          <Title level={4} className="mb-0! text-lg font-semibold">
            Helpful reminders
          </Title>
          <List
            dataSource={[
              "Exchanges depend on live inventory—if a size sells out we default to a refund.",
              "Gift returns issue credit to the purchaser unless you flag it as a gift during the flow.",
              "Need bespoke help? Contact concierge via speak with us.",
            ]}
            renderItem={(item, index) => (
              <List.Item className="px-0">
                <Paragraph className="mb-0! text-gray-600">
                  {index === 2 ? (
                    <>
                      Need bespoke help? Contact concierge via{" "}
                      <Link href={contactHref} className="font-medium text-gray-900">
                        speak with us
                      </Link>
                      .
                    </>
                  ) : (
                    item
                  )}
                </Paragraph>
              </List.Item>
            )}
          />
        </Flex>
      </Card>
    </Flex>
  );
}
