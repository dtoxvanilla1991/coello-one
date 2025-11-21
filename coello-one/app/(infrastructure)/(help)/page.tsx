import type { Metadata } from "next";
import { ArrowRightOutlined, MessageOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import HelpPageShell from "@components/help/HelpPageShell";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";

const { Title, Paragraph, Text, Link } = Typography;

const QUICK_LINK_ICONS = {
  question: <QuestionCircleOutlined className="text-xl text-gray-500" />,
  arrow: <ArrowRightOutlined className="text-xl text-gray-500" />,
} as const;

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpLanding");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell composes static content plus tested widgets; duplicative render tests add minimal value.
export default async function HelpLandingPage() {
  const locale = await getRequestLocale();
  const withLocalePath = createLocalePath();
  const landingCopy = getNamespaceCopy(locale, "helpLanding");
  const quickLinks = landingCopy.quickLinks.map((link) => ({
    ...link,
    href: withLocalePath(link.href),
  }));

  return (
    <HelpPageShell title={landingCopy.hero.title} description={landingCopy.hero.description}>
      <Flex vertical gap={24}>
        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              {landingCopy.introCard.title}
            </Title>
            <Paragraph className="mb-0! text-gray-600">
              {landingCopy.introCard.description}
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
                  {link.ctaLabel} <ArrowRightOutlined />
                </Link>,
              ]}
            >
              <Flex vertical gap={12}>
                <Flex align="center" gap={12}>
                  {QUICK_LINK_ICONS[link.icon] ?? QUICK_LINK_ICONS.arrow}
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
                  {landingCopy.contactCard.title}
                </Title>
                <Paragraph className="mb-0! text-gray-600">
                  {landingCopy.contactCard.description}
                </Paragraph>
                <Text className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                  {landingCopy.contactCard.channelsLabel}
                </Text>
              </Flex>
              <Button
                size="large"
                type="primary"
                icon={<MessageOutlined />}
                href={withLocalePath(landingCopy.contactCard.buttonHref)}
              >
                {landingCopy.contactCard.buttonLabel}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </HelpPageShell>
  );
}
