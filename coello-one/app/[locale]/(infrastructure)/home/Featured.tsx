"use client";

import { Typography, Flex, Card } from "antd";
import Image from "next/image";

const { Title } = Typography;

export function Featured() {
  return (
    <Flex vertical className="p-4 pb-8" role="region" aria-labelledby="featured-section-title">
      <Title level={4} className="my-2 ml-4 uppercase" id="featured-section-title">
        Featured
      </Title>
      <Flex gap={5} wrap="wrap" justify="space-between" role="list">
        {Array.from({ length: 4 }, (_, i) => (
          <Card
            key={i}
            role="listitem"
            className="w-[calc(50%-2.5px)]"
            hoverable
            styles={{ body: { padding: 0 } }}
          >
            <Flex className="relative aspect-square w-full">
              <Image
                src={`/athletes/vertical/main-secondary-${i + 2}.jpg`}
                alt={`Coello One athlete ${i + 1}`}
                sizes="(max-width: 640px) 100vw, 640px"
                fill
                priority={i === 0}
                className="rounded-none! object-cover object-top"
              />
            </Flex>
          </Card>
        ))}
      </Flex>
      {/* <PromoSection /> */}
    </Flex>
  );
}
