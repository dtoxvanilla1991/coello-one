import type { Metadata } from "next";
import { ArrowRightOutlined, MessageOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";

const { Title, Paragraph, Text, Link } = Typography;

export const metadata: Metadata = {
  title: "Coello Help Centre",
  description:
    "Explore delivery timelines, returns, concierge contact options, and more inside the Coello help centre.",
};

type HelpLandingPageProps = {
  params: {
    locale?: string;
  };
};

// TEST-WAIVER: Route shell composes static content plus tested widgets; duplicative render tests add minimal value.
export default function HelpLandingPage({ params }: HelpLandingPageProps) {
  const withLocalePath = createLocalePath(params?.locale);

  const quickLinks = [
    {
      title: "Find your answer fast",
      description: "Browse our curated FAQ updated weekly by the concierge desk.",
      href: withLocalePath("faq"),
      icon: <QuestionCircleOutlined className="text-xl text-gray-500" />,
    },
    {
      title: "Delivery timelines",
      description: "See shipping cut-offs, courier partners, and international ETAs.",
      href: withLocalePath("delivery-information"),
      icon: <ArrowRightOutlined className="text-xl text-gray-500" />,
    },
    {
      title: "Returns & exchanges",
      description: "Review our 30-day promise and start a size swap in minutes.",
      href: withLocalePath("returns-policy"),
      icon: <ArrowRightOutlined className="text-xl text-gray-500" />,
    },
    {
      title: "International orders",
      description: "Understand duties, currency support, and customs tracking.",
      href: withLocalePath("orders-international"),
      icon: <ArrowRightOutlined className="text-xl text-gray-500" />,
    },
  ];

  return (
    <HelpPageShell
      title="Welcome to the Coello Help Centre"
      description="From sleeve fit to customs duties, we cover every detail so you can focus on feeling incredible."
    >
      <Flex vertical gap={24}>
        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              Concierge-crafted support
            </Title>
            <Paragraph className="mb-0! text-gray-600">
              Our help hub mirrors the premium experience in our flagship stores—curated, proactive, and
              multilingual-ready. Start with the tiles below or connect with our concierge team any time.
            </Paragraph>
          </Flex>
        </Card>

        <Flex gap={16} wrap>
          {quickLinks.map((link) => (
            <Card
              key={link.title}
              className="w-full border-gray-200 bg-white/70 shadow-sm backdrop-blur md:w-[calc(50%-8px)]"
              actions={[
                <Link key="cta" href={link.href} className="font-medium text-gray-900">
                  Explore <ArrowRightOutlined />
                </Link>,
              ]}
            >
              <Flex vertical gap={12}>
                <Flex align="center" gap={12}>
                  {link.icon}
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {link.title}
                  </Title>
                </Flex>
                <Paragraph className="mb-0! text-gray-600">{link.description}</Paragraph>
              </Flex>
            </Card>
          ))}
        </Flex>

  <Card className="border-gray-200 bg-linear-to-br from-gray-50 to-white">
          <Flex vertical gap={16}>
            <Flex justify="space-between" align="center" wrap>
              <Flex vertical gap={6} className="max-w-xl">
                <Title level={3} className="mb-0! text-2xl md:text-3xl!">
                  Need a human right now?
                </Title>
                <Paragraph className="mb-0! text-gray-600">
                  Our concierge stylists respond in under two minutes between 8am and midnight GMT.
                </Paragraph>
                <Text className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  WhatsApp • iMessage • Email
                </Text>
              </Flex>
              <Button
                size="large"
                type="primary"
                icon={<MessageOutlined />}
                href={withLocalePath("contact-us")}
              >
                Speak with us
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </HelpPageShell>
  );
}
