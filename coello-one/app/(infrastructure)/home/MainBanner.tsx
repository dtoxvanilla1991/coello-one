"use client";

import { Typography, Button, Grid, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { metaObject } from "config/site.config";
import Image from "next/image";

const { Title, Text } = Typography;

export const metadata = {
  ...metaObject(),
};

export function MainBanner() {
  return (
    <Content>
      <Row>
        <Col className="h-[44em] grid items-end w-full">
          <Image
            src="/athletes/main image.jpg"
            alt="Coello One banner"
            sizes="(max-width: 640px) 100vw, 640px"
            fill
            priority
            className="object-cover w-full"
          />
          <Col className="z-10 mb-3 text-center">
            <Title className="!text-white !font-extrabold" level={4}>
              NOW YOU TRULY STAND OUT.
            </Title>
            <Button className="!px-10 uppercase !font-semibold" size="large">
              Shop Now
            </Button>
          </Col>
        </Col>
      </Row>
    </Content>
  );
}
