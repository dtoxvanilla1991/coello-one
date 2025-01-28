"use client";

import { Typography, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { metaObject } from "config/site.config";
import Image from "next/image";

const { Title, Text } = Typography;

export const metadata = {
  ...metaObject(),
};

export function MainBanner() {
  return (
    <>
      <div className="h-[40em] relative grid items-end">
        {/* Hero Banner Section (Placeholder) */}
        <Image
          src="/athletes/main image.jpg"
          alt="Coello One banner"
          sizes="(max-width: 640px) 100vw, 640px"
          fill
          priority
          className="object-cover"
        />
        <Content className="z-10 grid grid-cols-1 mb-3 px-4 items-center text-center">
          <Title className="!text-white !font-extrabold" level={3}>
            NOW YOU TRULY STAND OUT.
          </Title>
          <Button size="large">
            <Text>Shop Now</Text>
          </Button>
        </Content>
      </div>
    </>
  );
}
