"use client";

import { Card, Flex, List, Typography } from "antd";
import type { LegalPageCopy } from "@/types/legal";

const { Title, Paragraph, Text, Link } = Typography;

type LegalPageContentProps = {
  copy: LegalPageCopy;
};

export default function LegalPageContent({ copy }: LegalPageContentProps) {
  return (
    <Flex vertical gap={24} className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8">
      <Card className="border-gray-200 bg-white/80 backdrop-blur">
        <Flex vertical gap={12}>
          <Text className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
            {copy.hero.updated}
          </Text>
          <Title level={1} className="mb-0! text-3xl md:text-4xl!">
            {copy.hero.title}
          </Title>
          <Paragraph className="mb-0! text-base text-gray-600 md:text-lg">
            {copy.hero.subtitle}
          </Paragraph>
          <List
            className="mt-2"
            size="small"
            split={false}
            dataSource={copy.hero.summary}
            renderItem={(item) => (
              <List.Item className="px-0!">
                <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">{item}</Paragraph>
              </List.Item>
            )}
          />
        </Flex>
      </Card>

      {copy.sections.map((section) => (
        <Card key={section.id} className="border-gray-200">
          <Flex vertical gap={12}>
            <Title level={3} className="mb-0! text-2xl md:text-3xl!">
              {section.title}
            </Title>
            {section.paragraphs.map((paragraph) => (
              <Paragraph key={paragraph} className="mb-0! text-sm text-gray-600 md:text-base">
                {paragraph}
              </Paragraph>
            ))}
            {section.listItems && section.listItems.length > 0 ? (
              <Flex vertical gap={8} className="mt-2">
                {section.listTitle ? (
                  <Text className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
                    {section.listTitle}
                  </Text>
                ) : null}
                <List
                  split={false}
                  className="bg-gray-50"
                  dataSource={section.listItems}
                  renderItem={(item) => (
                    <List.Item className="px-4 py-3">
                      <Flex vertical gap={4}>
                        <Text className="text-sm font-semibold text-gray-900">{item.title}</Text>
                        <Paragraph className="mb-0! text-sm text-gray-600 md:text-base">
                          {item.description}
                        </Paragraph>
                      </Flex>
                    </List.Item>
                  )}
                />
              </Flex>
            ) : null}
          </Flex>
        </Card>
      ))}

      <Card className="border-gray-200 bg-gray-50">
        <Flex vertical gap={12}>
          <Title level={4} className="mb-0! text-xl">
            {copy.contact.title}
          </Title>
          <Paragraph className="mb-0! text-base text-gray-600">
            {copy.contact.description}
          </Paragraph>
          <List
            split
            dataSource={copy.contact.channels}
            renderItem={(channel) => (
              <List.Item className="px-0!">
                <Flex vertical gap={4} className="w-full">
                  <Text className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    {channel.label}
                  </Text>
                  {channel.href ? (
                    <Link href={channel.href} className="text-base font-semibold">
                      {channel.value}
                    </Link>
                  ) : (
                    <Text className="text-base font-semibold text-gray-900">{channel.value}</Text>
                  )}
                </Flex>
              </List.Item>
            )}
          />
        </Flex>
      </Card>
    </Flex>
  );
}
