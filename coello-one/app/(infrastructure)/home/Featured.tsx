"use client";

import { Typography, Flex, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";

const { Title } = Typography;

export function Featured() {
  return (
    <>
      <Content className="p-4 pb-8 bg-white">
        <Title level={4} className="mb-2 uppercase">
          Featured
        </Title>
        <Flex gap={5} wrap="wrap">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="size-40"
              hoverable
              cover={
                <div className="relative size-40">
                  <Image
                    src={`/athletes/vertical/main-secondary-${i + 1}.jpg`}
                    alt={`Coello One athlete ${i + 1}`}
                    sizes="(max-width: 640px) 100vw, 640px"
                    fill
                    priority
                    className="object-cover object-top !rounded-none relative"
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
