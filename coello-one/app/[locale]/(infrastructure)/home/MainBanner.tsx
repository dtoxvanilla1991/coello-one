"use client";

import { Typography, Button, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { metaObject } from "config/site.config";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/localization/useTranslations";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";

const { Title } = Typography;

export const metadata = {
  ...metaObject(),
};

export function MainBanner() {
  const withLocalePath = useLocalePath();
  const homeCopy = useTranslations("home");
  const mainBannerCopy = homeCopy.mainBanner;
  const locale = useCurrentLocale();

  return (
    <Content role="region" aria-labelledby="main-banner-title" className="relative">
      <Row>
        <Col className="grid h-[44em] w-full items-end">
          <Image
            src="/athletes/main image.jpg"
            alt="Coello One banner"
            sizes="(max-width: 640px) 100vw, 640px"
            fill
            priority
            className="w-full object-cover"
          />
          <Col className="z-10 mb-3 text-center">
            <Title className="font-extrabold! text-white!" level={4} id="main-banner-title">
              {mainBannerCopy.headline}
            </Title>
            <Link href={withLocalePath("/one-sleeve-classic")}>
              <Button
                className="px-10! font-semibold! uppercase"
                size="large"
                data-analytics-id="main-banner-shop-now"
                onClick={() =>
                  trackEvent(
                    "main_banner_shop_now_click",
                    {},
                    {
                      locale,
                      translationKey: mainBannerCopy.ctaAnalyticsKey,
                      translationVariant: mainBannerCopy.ctaVariant,
                    },
                  )
                }
              >
                {mainBannerCopy.ctaLabel}
              </Button>
            </Link>
          </Col>
        </Col>
      </Row>
    </Content>
  );
}
