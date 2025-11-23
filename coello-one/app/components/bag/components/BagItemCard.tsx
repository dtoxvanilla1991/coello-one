"use client";

import Image from "next/image";
import { Button, Card, Flex, InputNumber, Space, Tag, Typography } from "antd";
import type { CartItem } from "@/store/cartStore";
import { useTranslations } from "@/localization/useTranslations";
import { formatPrice } from "../constants";

const { Title, Text } = Typography;

type BagItemCardProps = {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function BagItemCard({ item, onQuantityChange, onRemove }: BagItemCardProps) {
  const bagCopy = useTranslations("bag");
  const itemsCopy = bagCopy.items;
  const priceLabel = formatPrice.format(item.price * item.quantity);
  const fitCopy = item.fit === "male" ? itemsCopy.fitMale : itemsCopy.fitFemale;

  return (
    <Card
      key={item.id}
      variant="borderless"
      className="rounded-2xl! border border-gray-200! px-4 py-4 shadow-sm"
    >
      <Flex gap={16} wrap align="start">
        <Flex
          align="center"
          justify="center"
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl"
        >
          <Image
            src={item.image}
            alt={`${item.name} preview`}
            fill
            className="object-cover"
            sizes="112px"
          />
        </Flex>
        <Flex vertical gap={12} justify="space-between" className="min-w-[180px] flex-1">
          <Flex vertical gap={4}>
            <Space size={8} align="center">
              <Title level={4} className="m-0! text-lg!">
                {item.name}
              </Title>
              <Tag className="rounded-full! bg-black! px-3 py-1 text-white!">{itemsCopy.tag}</Tag>
            </Space>
            <Text className="text-sm text-gray-500">
              {`${fitCopy} / ${item.color} / ${itemsCopy.sizeLabel} ${item.size}`}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center" wrap className="gap-3">
            <Space align="center" size={6}>
              <Text className="text-xs text-gray-500 uppercase">{itemsCopy.quantity}</Text>
              <InputNumber
                min={1}
                value={item.quantity}
                size="small"
                aria-label={`${itemsCopy.quantity} for ${item.name}`}
                onChange={(value) => {
                  const nextValue = Number(value ?? item.quantity);
                  onQuantityChange(item.id, nextValue);
                }}
              />
            </Space>
            <Space align="center" size={16}>
              <Text className="text-lg font-semibold">{priceLabel}</Text>
              <Button type="link" danger onClick={() => onRemove(item.id)}>
                {itemsCopy.remove}
              </Button>
            </Space>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
