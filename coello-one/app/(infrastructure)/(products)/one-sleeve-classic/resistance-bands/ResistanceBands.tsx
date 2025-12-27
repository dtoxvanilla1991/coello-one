"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { Button, Card, Flex, Space, Typography, Row, Col, Tag } from "antd";
import { useSetAtom } from "jotai";
import { ProductDetailShell } from "@/components/product/ProductDetailShell";
import { incrementCartAtom } from "@/store/cartStore";
import { trackEvent } from "@/utils/trackEvent";
import {
  RESISTANCE_BANDS_BAG_CONTENTS,
  RESISTANCE_BANDS_DEFAULT_COLOR,
  RESISTANCE_BANDS_DEFAULT_SIZE,
  RESISTANCE_BANDS_DESCRIPTION,
  RESISTANCE_BANDS_IMAGE,
  RESISTANCE_BANDS_NAME,
  RESISTANCE_BANDS_PRICE_GBP,
  RESISTANCE_BANDS_PRODUCT_ID,
  RESISTANCE_BANDS_STRENGTH_LEVELS,
  RESISTANCE_BANDS_SUBTITLE,
  type ResistanceStrengthLevel,
} from "./constants";

const { Title, Text, Paragraph } = Typography;

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function ResistanceBands() {
  const incrementCart = useSetAtom(incrementCartAtom);
  const formattedPrice = useMemo(() => currencyFormatter.format(RESISTANCE_BANDS_PRICE_GBP), []);

  const handleAddToBag = useCallback(() => {
    incrementCart({
      id: RESISTANCE_BANDS_PRODUCT_ID,
      name: RESISTANCE_BANDS_NAME,
      image: RESISTANCE_BANDS_IMAGE,
      price: RESISTANCE_BANDS_PRICE_GBP,
      size: RESISTANCE_BANDS_DEFAULT_SIZE,
      color: RESISTANCE_BANDS_DEFAULT_COLOR,
      fit: "unisex",
    });

    trackEvent("resistance_bands_add_to_bag", {
      productId: RESISTANCE_BANDS_PRODUCT_ID,
      price: RESISTANCE_BANDS_PRICE_GBP,
    });
  }, [incrementCart]);

  return (
    <ProductDetailShell>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Card
            variant="borderless"
            className="bg-gray-950!"
            cover={
              <Flex className="relative aspect-square w-full">
                <Image
                  src={RESISTANCE_BANDS_IMAGE}
                  alt={RESISTANCE_BANDS_NAME}
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </Flex>
            }
          />
        </Col>
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={24} className="w-full px-4 md:px-0">
            <Space orientation="vertical" size={8}>
              <Title level={2} className="tracking-wide uppercase">
                {RESISTANCE_BANDS_NAME}
              </Title>
              <Text className="text-lg text-gray-400 uppercase">{RESISTANCE_BANDS_SUBTITLE}</Text>
              <Text strong className="text-2xl">
                {formattedPrice}
              </Text>
            </Space>

            <Paragraph className="text-base text-gray-200">
              {RESISTANCE_BANDS_DESCRIPTION}
            </Paragraph>

            <Card variant="borderless" className="bg-gray-950!">
              <Space orientation="vertical" size={16} className="w-full">
                <Text strong className="text-xs text-gray-400 uppercase">
                  Strength guide
                </Text>
                <Flex vertical gap={8} role="list">
                  {Array.from(RESISTANCE_BANDS_STRENGTH_LEVELS).map((item: ResistanceStrengthLevel) => (
                    <div key={item.key} role="listitem">
                      <Space orientation="vertical" size={4} className="w-full">
                        <Space size={8} align="center">
                          <Tag color="magenta" className="uppercase">
                            {item.badge}
                          </Tag>
                          <Text className="text-sm text-gray-300">{item.resistance}</Text>
                        </Space>
                        <Text className="text-sm text-gray-200">{item.focus}</Text>
                      </Space>
                    </div>
                  ))}
                </Flex>
              </Space>
            </Card>

            <Card variant="borderless" className="bg-gray-950!">
              <Space orientation="vertical" size={12} className="w-full">
                <Text strong className="text-xs text-gray-400 uppercase">
                  What&apos;s in the bag
                </Text>
                <Flex vertical gap={4} role="list">
                  {Array.from(RESISTANCE_BANDS_BAG_CONTENTS).map((item: string, index: number) => (
                    <div key={index} role="listitem">
                      <Text className="text-sm text-gray-200">{item}</Text>
                    </div>
                  ))}
                </Flex>
              </Space>
            </Card>

            <Button
              type="primary"
              size="large"
              className="w-full bg-black text-white uppercase hover:bg-gray-800"
              onClick={handleAddToBag}
              data-analytics-id="resistance-bands-add-to-bag"
            >
              Add to bag
            </Button>
          </Space>
        </Col>
      </Row>
    </ProductDetailShell>
  );
}
