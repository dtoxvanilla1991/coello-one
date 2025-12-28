"use client";

import type { ReactNode } from "react";
import { Card, Flex, Statistic, Tag, Typography } from "antd";
import type { HighlightStat } from "@/types/pages";

const { Title, Paragraph, Text } = Typography;

export type BrandPageShellProps = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    highlightStats?: HighlightStat[];
  };
  children: ReactNode;
};

export default function BrandPageShell({ hero, children }: BrandPageShellProps) {
  const hasStats = Boolean(hero.highlightStats && hero.highlightStats.length > 0);

  return (
    <Flex vertical gap={32} className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 lg:px-0">
      <Card className="border-gray-200 bg-linear-to-br from-white via-white to-gray-50 shadow-sm">
        <Flex vertical gap={20}>
          <Tag className="w-fit border-gray-200 text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
            {hero.kicker}
          </Tag>
          <Title level={1} className="mb-0! text-3xl leading-snug font-semibold md:text-4xl!">
            {hero.title}
          </Title>
          <Paragraph className="mb-0! text-lg text-gray-600 md:text-xl">
            {hero.description}
          </Paragraph>
          {hasStats ? (
            <Flex gap={12} wrap>
              {hero.highlightStats?.map((stat) => (
                <Card
                  key={stat.label}
                  className="w-full border-gray-200 bg-white shadow-none md:w-[calc(33%-8px)]"
                >
                  <Statistic
                    title={
                      <Text className="text-xs tracking-[0.25em] text-gray-500 uppercase">
                        {stat.label}
                      </Text>
                    }
                    value={stat.value}
                    styles={{ content: { fontSize: 28, fontWeight: 600 } }}
                  />
                </Card>
              ))}
            </Flex>
          ) : null}
        </Flex>
      </Card>
      <Flex vertical gap={24}>
        {children}
      </Flex>
    </Flex>
  );
}
