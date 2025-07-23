"use client";

import { Typography, Flex, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";

const { Title } = Typography;

export function Featured() {
  return (
    <>
      <Content className="p-4 pb-8" data-testid="featured-section">
        <Title
          level={4}
          className="mb-2 uppercase"
          data-testid="featured-section-title">
          Featured
        </Title>
        <Flex gap={5} wrap="wrap" justify="space-between">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="w-[calc(50%-2.5px)] aspect-square"
              hoverable
              styles={{ body: { padding: 0 } }}
              classNames={{
                cover: "h-full",
              }}
              data-testid={`featured-section-card-${i}`}
              cover={
                <div className="relative w-full h-full">
                  <Image
                    src={`/athletes/vertical/main-secondary-${i + 1}.jpg`}
                    alt={`Coello One athlete ${i + 1}`}
                    sizes="(max-width: 640px) 100vw, 640px"
                    fill
                    priority
                    className="object-cover object-top rounded-none!"
                  />
                </div>
              }
            />
          ))}
        </Flex>
        {/* <PromoSection /> */}
      </Content>
    </>
  );
}
