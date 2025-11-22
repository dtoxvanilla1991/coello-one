"use client";

import Image from "next/image";
import { Button, Card, Flex, List, Tabs, Tag, Typography } from "antd";
import type { EducationHubCopy, HubTab } from "@/types/pages";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import BrandPageShell from "./BrandPageShell";

const { Title, Paragraph, Text } = Typography;

const renderTabContent = (tab: HubTab) => (
  <Flex vertical gap={16}>
    <Card className="border-gray-200">
      <Flex gap={16} wrap>
        <Flex vertical gap={12} className="flex-1 min-w-60">
          <Title level={3} className="mb-0! text-2xl">
            {tab.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{tab.description}</Paragraph>
          <List
            header={
              <Text className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Focus
              </Text>
            }
            dataSource={tab.focusPoints}
            renderItem={(item) => (
              <List.Item className="border-0 px-0">
                <Paragraph className="mb-0! text-gray-700">{item}</Paragraph>
              </List.Item>
            )}
          />
        </Flex>
        <Card className="border-gray-200 bg-black/90 text-white sm:max-w-xs">
          <Image
            src={tab.image}
            alt={tab.imageAlt}
            width={640}
            height={420}
            className="h-auto w-full rounded-md object-cover"
            priority={tab.key === "health"}
          />
        </Card>
      </Flex>
    </Card>

    <Flex gap={16} wrap>
      {tab.highlights.map((highlight) => (
        <Card key={highlight.title} className="w-full border-gray-200 md:w-[calc(50%-8px)]">
          <Flex vertical gap={8}>
            <Title level={4} className="mb-0! text-lg">
              {highlight.title}
            </Title>
            <Paragraph className="mb-0! text-gray-600">{highlight.description}</Paragraph>
          </Flex>
        </Card>
      ))}
    </Flex>

    <Card className="border-gray-200">
      <List
        header={
          <Flex align="center" justify="space-between" wrap>
            <Text className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Recursos
            </Text>
            <Button type="link" href={tab.cta.href} className="px-0">
              {tab.cta.label}
            </Button>
          </Flex>
        }
        dataSource={tab.resources}
        renderItem={(resource) => (
          <List.Item className="border-0 px-0">
            <Flex vertical gap={4}>
              <Tag className="w-fit border-gray-200 uppercase text-xs tracking-[0.2em] text-gray-500">
                {resource.type}
              </Tag>
              <Typography.Link href={resource.href} target="_blank" rel="noreferrer" className="text-base font-semibold">
                {resource.label}
              </Typography.Link>
              <Paragraph className="mb-0! text-gray-600">{resource.description}</Paragraph>
            </Flex>
          </List.Item>
        )}
      />
    </Card>
  </Flex>
);

type EducationHubContentProps = {
  copy: EducationHubCopy;
};

export default function EducationHubContent({ copy }: EducationHubContentProps) {
  const locale = useCurrentLocale();

  const handleTabChange = (key: string) => {
    trackEvent(
      "education_hub_tab_change",
      { tabKey: key },
      { locale, translationKey: `pages.educationHub.tabs.${key}` },
    );
  };

  return (
    <BrandPageShell hero={copy.hero}>
      <Tabs
        className="rounded-xl border border-gray-200 p-4"
        destroyOnHidden
        onChange={handleTabChange}
        items={copy.tabs.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: renderTabContent(tab),
        }))}
      />
      <Card className="border-gray-200 bg-gray-50 text-gray-700">
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0! text-2xl">
            {copy.commitment.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{copy.commitment.description}</Paragraph>
        </Flex>
      </Card>
    </BrandPageShell>
  );
}
