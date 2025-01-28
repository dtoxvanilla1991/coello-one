"use client";

import { Typography, Button, Row, Col } from "antd";
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
      {/* CONTENT */}
      <Content className="px-4 mt-4">
        {/* Featured Products (Placeholder) */}
        <Title level={4} className="mb-2">
          Featured
        </Title>
        <Row gutter={[8, 8]}>
          {Array.from({ length: 4 }, (_, i) => (
            <Col key={i} span={12}>
              <div className="bg-gray-100 h-36 flex items-center justify-center relative">
                <Image
                  src={`/athletes/main-secondary-${i + 1}.jpg`}
                  alt={`Coello One athlete ${i + 1}`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </Col>
          ))}
        </Row>

        {/* Promo Section (Placeholder) */}
        <div className="mt-4 p-4 bg-gray-50 rounded text-center">
          <Title level={5} className="mb-1">
            Limited Time Offer
          </Title>
          <Text>Up to 50% off select items</Text>
          <div className="mt-2">
            <Button type="primary" size="large">
              Shop Now
            </Button>
          </div>
        </div>
      </Content>
    </>
  );
}
