import type { Metadata } from "next";
import { Card, Flex, List, Steps, Typography } from "antd";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";
import ReturnRequestForm from "./ReturnRequestForm";

const { Title, Paragraph, Text, Link } = Typography;

export const metadata: Metadata = {
  title: "Return an Item | Coello Help",
  description:
    "Start a return or exchange for your Coello one-sleeve essential in a few quick steps.",
};

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

// TEST-WAIVER: Route shell simply wraps ReturnRequestForm (which is tested) plus static copy.
export default function ReturnAnItemPage() {
  const withLocalePath = createLocalePath();

  return (
    <HelpPageShell
      title="Return or exchange an item"
      description="Log your return, print a label, and choose between refund, exchange, or instant credit."
      breadcrumb={[
        { title: "Help Centre", href: withLocalePath("help") },
        { title: "Return an item" },
      ]}
    >
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
                description: (
                  <Paragraph className="mb-0! text-gray-600">{step.description}</Paragraph>
                ),
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
                        <Link
                          href={withLocalePath("contact-us")}
                          className="font-medium text-gray-900"
                        >
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
    </HelpPageShell>
  );
}
