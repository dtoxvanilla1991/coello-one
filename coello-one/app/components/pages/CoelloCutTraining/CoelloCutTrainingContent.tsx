"use client";

import { Card, Divider, Flex, Typography } from "antd";
import PlanSelector from "@/components/training/PlanSelector";
import TheRitual from "@/components/training/TheRitual";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Paragraph, Text } = Typography;

// TEST-WAIVER: Presentational client view built from static config; interactive logic lives in shared training components.
export default function CoelloCutTrainingContent() {
  const pagesCopy = useTranslations("pages");
  const copy = pagesCopy.coelloCutTraining;

  return (
    <Flex vertical gap={24} className="w-full max-w-5xl px-4 py-8 md:px-0">
      <Card className="border-neutral-800 bg-neutral-950/80 text-neutral-100" classNames={{ body: "p-6 md:p-8" }}>
        <Flex vertical gap={12}>
          <Text className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            {copy.hero.kicker}
          </Text>
          <Title level={1} className="m-0 text-3xl text-white md:text-5xl">
            {copy.hero.title}
          </Title>
          <Paragraph className="m-0 text-base text-neutral-300 md:text-lg">
            {copy.hero.description}
          </Paragraph>
        </Flex>
      </Card>

      <Card className="border-neutral-800 bg-neutral-900 text-neutral-200" classNames={{ body: "p-6 md:p-8" }}>
        <Flex vertical gap={16}>
          <Title level={2} className="m-0 text-2xl text-white">
            {copy.manifesto.headline}
          </Title>
          <Paragraph className="m-0 text-neutral-300">{copy.manifesto.subheading}</Paragraph>
          <Divider className="my-2 border-neutral-800" />
          <Flex vertical gap={12} role="list">
            {copy.manifesto.bulletPoints.map((item) => (
              <div key={item.title} role="listitem">
                <Title level={4} className="mb-1 text-base font-semibold text-white">
                  {item.title}
                </Title>
                <Paragraph className="m-0 text-sm text-neutral-300">{item.description}</Paragraph>
              </div>
            ))}
          </Flex>
        </Flex>
      </Card>

      <PlanSelector />

      <Flex gap={16} wrap className="flex-col md:flex-row">
        <Flex className="flex-1 min-w-[280px]" vertical>
          <TheRitual />
        </Flex>
        <Flex className="flex-1 min-w-[280px]" vertical>
          <Card
            className="h-full border-neutral-800 bg-neutral-900 text-neutral-200"
            classNames={{ body: "p-6 md:p-8" }}
          >
            <Flex vertical gap={12}>
              <Text className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                {copy.living.kicker}
              </Text>
              <Title level={3} className="m-0 text-xl text-white">
                {copy.living.title}
              </Title>
              <Paragraph className="m-0 text-sm text-neutral-300">{copy.living.description}</Paragraph>
              <Divider className="my-3 border-neutral-800" />
              <Paragraph className="m-0 text-sm text-neutral-200">{copy.living.diet}</Paragraph>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
