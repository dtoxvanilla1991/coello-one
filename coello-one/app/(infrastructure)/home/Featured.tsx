"use client";

import { Typography, Flex, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import { PromoSection } from "./PromoSection";

const { Title } = Typography;

export function Featured() {
  return (
    <>
      <Content className="px-4 pt-4 bg-white">
        <Title level={4} className="mb-2">
          Featured
        </Title>
        <Flex gap={5} wrap="wrap">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="size-40 relative"
              hoverable
              cover={
                <Image
                  src={`/athletes/main-secondary-${i + 1}.jpg`}
                  alt={`Coello One athlete ${i + 1}`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  priority
                  className="object-cover object-top !rounded-none"
                />
              }></Card>
          ))}
        </Flex>
        <PromoSection />
      </Content>
    </>
  );
}
