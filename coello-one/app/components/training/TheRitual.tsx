"use client";

import type { ReactNode } from "react";
import { Card, Flex, Typography } from "antd";
import { CloudOutlined, EnvironmentOutlined, FireOutlined } from "@ant-design/icons";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Paragraph, Text } = Typography;

const ritualIcons: Record<string, ReactNode> = {
  cardio: <FireOutlined />,
  stretch: <CloudOutlined />,
  sundayService: <EnvironmentOutlined />,
};

export default function TheRitual() {
  const pagesCopy = useTranslations("pages");
  const ritualCopy = pagesCopy.coelloCutTraining.ritual;

  return (
    <Card className="border-neutral-800 bg-neutral-900 text-neutral-200" classNames={{ body: "p-6 md:p-8" }}>
      <Flex vertical gap={16}>
        <Title level={2} className="m-0 text-2xl text-white">
          {ritualCopy.title}
        </Title>
        <Paragraph className="m-0 text-neutral-300">{ritualCopy.philosophy}</Paragraph>
        <Flex gap={16} wrap>
          {ritualCopy.cards.map((card) => (
            <Flex
              key={card.id}
              vertical
              className={`flex-1 min-w-[200px] rounded-xl border border-neutral-800 p-4 ${
                card.id === "sundayService" ? "bg-emerald-900/30" : "bg-neutral-950/40"
              }`}
              gap={8}
            >
              <Flex align="center" gap={8}>
                {ritualIcons[card.id] ?? <FireOutlined />}
                <Text className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                  {card.label}
                </Text>
              </Flex>
              <Paragraph className="m-0 text-sm text-neutral-200">{card.description}</Paragraph>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
