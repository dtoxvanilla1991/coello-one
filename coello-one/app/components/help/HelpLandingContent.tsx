"use client";

import Link from "next/link";
import { ArrowRightOutlined, MessageOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import type { ReactNode } from "react";
import HelpPageShell from "@components/help/HelpPageShell";

const { Title, Paragraph, Text } = Typography;

type QuickLinkIconKey = "question" | "arrow";

const QUICK_LINK_ICONS: Record<QuickLinkIconKey, ReactNode> = {
  question: <QuestionCircleOutlined className="text-xl text-gray-500" />,
  arrow: <ArrowRightOutlined className="text-xl text-gray-500" />,
};

const resolveQuickLinkIcon = (icon: string) =>
  QUICK_LINK_ICONS[icon as QuickLinkIconKey] ?? QUICK_LINK_ICONS.arrow;

type QuickLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  ctaLabel: string;
};

type HelpLandingContentProps = {
  hero: {
    title: string;
    description: string;
  };
  introCard: {
    title: string;
    description: string;
  };
  quickLinks: QuickLink[];
  contactCard: {
    title: string;
    description: string;
    channelsLabel: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

export default function HelpLandingContent({
  hero,
  introCard,
  quickLinks,
  contactCard,
}: HelpLandingContentProps) {
  return (
    <HelpPageShell title={hero.title} description={hero.description}>
      <Flex vertical gap={24}>
        <Card className="border-gray-200">
          <Flex vertical gap={16}>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              {introCard.title}
            </Title>
            <Paragraph className="mb-0! text-gray-600">{introCard.description}</Paragraph>
          </Flex>
        </Card>

        <Flex gap={16} wrap>
          {quickLinks.map((link) => (
            <Card
              key={link.id ?? link.title}
              className="w-full border-gray-200 bg-white/70 shadow-sm backdrop-blur md:w-[calc(50%-8px)]"
              actions={[
                <Link key="cta" href={link.href} className="font-medium text-gray-900">
                  {link.ctaLabel} <ArrowRightOutlined />
                </Link>,
              ]}
            >
              <Flex vertical gap={12}>
                <Flex align="center" gap={12}>
                  {resolveQuickLinkIcon(link.icon)}
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
                  {contactCard.title}
                </Title>
                <Paragraph className="mb-0! text-gray-600">{contactCard.description}</Paragraph>
                <Text className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                  {contactCard.channelsLabel}
                </Text>
              </Flex>
              <Button
                size="large"
                type="primary"
                icon={<MessageOutlined />}
                href={contactCard.buttonHref}
              >
                {contactCard.buttonLabel}
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </HelpPageShell>
  );
}
