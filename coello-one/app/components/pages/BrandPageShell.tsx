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
          <Tag className="w-fit border-gray-200 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {hero.kicker}
          </Tag>
          <Title level={1} className="mb-0! text-3xl font-semibold leading-snug md:text-4xl!">
            {hero.title}
          </Title>
          <Paragraph className="mb-0! text-lg text-gray-600 md:text-xl">
            {hero.description}
          </Paragraph>
          {hasStats ? (
            <Flex gap={12} wrap>
              {hero.highlightStats?.map((stat) => (
                <Card key={stat.label} className="w-full border-gray-200 bg-white shadow-none md:w-[calc(33%-8px)]">
                  <Statistic
                    title={
                      <Text className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        {stat.label}
                      </Text>
                    }
                    value={stat.value}
                    valueStyle={{ fontSize: 28, fontWeight: 600 }}
                  />
                </Card>
              ))}
            </Flex>
          ) : null}
        </Flex>
      </Card>
      <Flex vertical gap={24}>{children}</Flex>
    </Flex>
  );
}
