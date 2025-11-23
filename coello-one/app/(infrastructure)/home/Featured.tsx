"use client";

import { Typography, Flex, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";

const { Title } = Typography;

export function Featured() {
  return (
    <Content className="p-4 pb-8" role="region" aria-labelledby="featured-section-title">
      <Title level={4} className="mb-2 uppercase" id="featured-section-title">
        Featured
      </Title>
      <Flex gap={5} wrap="wrap" justify="space-between" role="list">
        {Array.from({ length: 4 }, (_, i) => (
          <Card
            key={i}
            role="listitem"
            className="aspect-square w-[calc(50%-2.5px)]"
            hoverable
            styles={{ body: { padding: 0 } }}
            classNames={{
              cover: "h-full",
            }}
            cover={
              <Flex className="relative h-full w-full">
                <Image
                  src={`/athletes/vertical/main-secondary-${i + 1}.jpg`}
                  alt={`Coello One athlete ${i + 1}`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  priority
                  className="rounded-none! object-cover object-top"
                />
              </Flex>
            }
          />
        ))}
      </Flex>
      {/* <PromoSection /> */}
    </Content>
  );
}
