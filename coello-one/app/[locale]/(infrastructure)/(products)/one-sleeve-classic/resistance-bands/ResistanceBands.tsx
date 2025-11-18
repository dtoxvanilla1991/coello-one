"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { Button, Card, Flex, List, Space, Typography, Row, Col, Tag } from "antd";
import { useSetAtom } from "jotai";
import { ProductDetailShell } from "@/components/product/ProductDetailShell";
import { incrementCartAtom } from "@/store/cartStore";
import { trackEvent } from "@/utils/trackEvent";
import {
  RESISTANCE_BANDS_DEFAULT_COLOR,
  RESISTANCE_BANDS_DEFAULT_SIZE,
  RESISTANCE_BANDS_IMAGE,
  RESISTANCE_BANDS_NAME,
  RESISTANCE_BANDS_PRICE_GBP,
  RESISTANCE_BANDS_PRODUCT_ID,
} from "./constants";

const { Title, Text, Paragraph } = Typography;

const STRENGTH_LEVELS = [
  {
    key: "light",
    badge: "Light • Peach",
    resistance: "5–10 kg (10–20 lb)",
    focus: "Mobility, warm-ups, and controlled activation.",
  },
  {
    key: "medium",
    badge: "Medium • Coral",
    resistance: "10–20 kg (20–45 lb)",
    focus: "Strength building, compound reinforcement, tempo work.",
  },
  {
    key: "heavy",
    badge: "Heavy • Merlot",
    resistance: "20–35 kg (45–75 lb)",
    focus: "Power training, athletic conditioning, maximal stability.",
  },
] as const;

const BAG_CONTENTS = [
  "Three tonal bands (Peach, Coral, Merlot)",
  "Breathable mesh carry pouch",
  "Quick-start activation guide",
] as const;

type StrengthLevel = (typeof STRENGTH_LEVELS)[number];

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
            bordered={false}
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
          <Space direction="vertical" size={24} className="w-full px-4 md:px-0">
            <Space direction="vertical" size={8}>
              <Title level={2} className="uppercase tracking-wide">
                {RESISTANCE_BANDS_NAME}
              </Title>
              <Text className="text-lg text-gray-400 uppercase">Unisex • Fuel your session</Text>
              <Text strong className="text-2xl">{formattedPrice}</Text>
            </Space>

            <Paragraph className="text-base text-gray-200">
              Three loop bands tuned for progressive overload. Each strap matches our one-sleeve
              palette and ships in a breathable pouch for post-session ventilation.
            </Paragraph>

            <Card bordered className="bg-gray-950!">
              <Space direction="vertical" size={16} className="w-full">
                <Text strong className="text-xs text-gray-400 uppercase">
                  Strength guide
                </Text>
                <List<StrengthLevel>
                  itemLayout="vertical"
                  dataSource={Array.from(STRENGTH_LEVELS)}
                  renderItem={(item) => (
                    <List.Item key={item.key} className="border-0! px-0!">
                      <Space direction="vertical" size={4} className="w-full">
                        <Space size={8} align="center">
                          <Tag color="magenta" className="uppercase">
                            {item.badge}
                          </Tag>
                          <Text className="text-sm text-gray-300">{item.resistance}</Text>
                        </Space>
                        <Text className="text-sm text-gray-200">{item.focus}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Card>

            <Card bordered className="bg-gray-950!">
              <Space direction="vertical" size={12} className="w-full">
                <Text strong className="text-xs text-gray-400 uppercase">
                  What&apos;s in the bag
                </Text>
                <List<string>
                  itemLayout="horizontal"
                  dataSource={Array.from(BAG_CONTENTS)}
                  renderItem={(item, index) => (
                    <List.Item key={index} className="border-0! px-0!">
                      <Text className="text-sm text-gray-200">{item}</Text>
                    </List.Item>
                  )}
                />
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
