'use client';

import { Flex, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

type AccessibilityContentProps = {
  title: string;
  paragraphs: string[];
};

export default function AccessibilityContent({ title, paragraphs }: AccessibilityContentProps) {
  return (
    <Flex
      vertical
      gap={24}
      className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6"
      role="region"
      aria-live="polite"
    >
      <Title level={3} className="mb-0! uppercase tracking-[0.2em] text-gray-800">
        {title}
      </Title>
      <Flex vertical gap={16} role="list" aria-label="Accessibility statement">
        {paragraphs.map((content, index) => (
          <Paragraph key={`accessibility-paragraph-${index}`} role="listitem">
            <Text className="text-base text-gray-600 md:text-lg">{content}</Text>
          </Paragraph>
        ))}
      </Flex>
    </Flex>
  );
}
