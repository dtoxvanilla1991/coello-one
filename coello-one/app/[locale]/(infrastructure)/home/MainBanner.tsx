"use client";

import { Typography, Button, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { metaObject } from "config/site.config";
import Image from "next/image";

const { Title } = Typography;

export const metadata = {
  ...metaObject(),
};

export function MainBanner() {
  return (
    <Content data-testid="main-banner">
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
            <Title
              className="text-white! font-extrabold!"
              level={4}
              data-testid="main-banner-title">
              NOW YOU TRULY STAND OUT.
            </Title>
            <Button
              className="px-10! uppercase font-semibold!"
              size="large"
              data-testid="main-banner-shop-now-button">
              Shop Now
            </Button>
          </Col>
        </Col>
      </Row>
    </Content>
  );
}
