"use client";

import { Typography, Button, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { metaObject } from "config/site.config";
import Image from "next/image";
import Link from "next/link";
import { useLocalePath } from "@/hooks/useLocalePath";
import { trackEvent } from "@/utils/trackEvent";

const { Title } = Typography;

export const metadata = {
  ...metaObject(),
};

export function MainBanner() {
  const withLocalePath = useLocalePath();

  return (
    <Content
      role="region"
      aria-labelledby="main-banner-title"
      className="relative">
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
              className="!text-white !font-extrabold"
              level={4}
              id="main-banner-title">
              NOW YOU TRULY STAND OUT.
            </Title>
            <Link href={withLocalePath("/one-sleeve-classic")}>
              <Button
                className="!px-10 uppercase !font-semibold"
                size="large"
                data-analytics-id="main-banner-shop-now"
                onClick={() => trackEvent("main_banner_shop_now_click")}>
                Shop Now
              </Button>
            </Link>
          </Col>
        </Col>
      </Row>
    </Content>
  );
}
