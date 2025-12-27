"use client";

import { Card, Flex, Space, Tag, Typography } from "antd";
import { EnvironmentOutlined, StarOutlined } from "@ant-design/icons";
import { useTranslations } from "@/localization/useTranslations";
import type { TrainingPlan } from "@config/training-plans";

const { Title, Paragraph, Text } = Typography;

type PlanDisplayProps = {
  plan: TrainingPlan;
};

export default function PlanDisplay({ plan }: PlanDisplayProps) {
  const pagesCopy = useTranslations("pages");
  const coelloCopy = pagesCopy.coelloCutTraining;
  const planCopy = coelloCopy.plans[plan.id];
  const planDisplayCopy = coelloCopy.planDisplay;

  if (!planCopy) {
    return null;
  }

  return (
    <Card
      className="border-neutral-800 bg-neutral-900 text-neutral-200"
      classNames={{ body: "p-6 md:p-8" }}
    >
      <Flex vertical gap={16}>
        <Flex align="center" justify="space-between" wrap>
          <Space orientation="vertical" size={0} className="text-neutral-200">
            <Text className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {plan.daysPerWeek} {planDisplayCopy.daysPerWeekLabel}
            </Text>
            <Title level={2} className="m-0 text-3xl text-white">
              {planCopy.name}
            </Title>
          </Space>
          <Tag color="gold" className="text-neutral-900">
            {planCopy.tagline}
          </Tag>
        </Flex>
        <Paragraph className="m-0 text-neutral-300">{planCopy.description}</Paragraph>
        <Flex gap={8} wrap>
          {planCopy.focus.map((focus) => (
            <Tag key={focus} color="blue" className="bg-neutral-800 text-neutral-100">
              <StarOutlined className="mr-1 text-xs" /> {focus}
            </Tag>
          ))}
        </Flex>
        <Title level={4} className="m-0 text-sm uppercase tracking-[0.3em] text-neutral-500">
          {planDisplayCopy.weeklySplitHeading}
        </Title>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
          role="list"
        >
          {planCopy.split.map((day, index) => (
            <div key={day.label} role="listitem">
              <Card
                className={`border-neutral-800 ${
                  day.isNature
                    ? "bg-emerald-600/20 text-emerald-100"
                    : "bg-neutral-950/60 text-neutral-100"
                }`}
                classNames={{ body: "p-4" }}
              >
                <Flex vertical gap={4}>
                  <Text className="text-xs font-mono uppercase tracking-wide text-neutral-500">
                    {planDisplayCopy.dayLabel} {index + 1}
                  </Text>
                  <Flex align="center" gap={6}>
                    {day.isNature ? <EnvironmentOutlined /> : null}
                    <Text className="text-sm font-semibold">{day.label}</Text>
                  </Flex>
                </Flex>
              </Card>
            </div>
          ))}
        </div>
      </Flex>
    </Card>
  );
}
