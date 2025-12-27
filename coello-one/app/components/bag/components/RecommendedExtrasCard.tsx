"use client";

import Image from "next/image";
import { Button, Card, Flex, Tag, Typography } from "antd";
import type { CartItem } from "@/store/cartStore";
import { useTranslations } from "@/localization/useTranslations";
import { formatPrice, recommendedExtras } from "../constants";
import type { ExtraItem } from "../types";

const { Text } = Typography;

type RecommendedExtrasCardProps = {
  items: CartItem[];
  onAddExtra: (extra: ExtraItem) => void;
};

export function RecommendedExtrasCard({ items, onAddExtra }: RecommendedExtrasCardProps) {
  const bagCopy = useTranslations("bag");
  const extrasCopy = bagCopy.extras;

  return (
    <Card
      title={extrasCopy.title}
      className="rounded-2xl! border border-gray-200!"
      classNames={{
        header: "uppercase tracking-wide text-sm!",
      }}
    >
      <Flex vertical gap={16}>
        <Text className="text-sm text-gray-500">{extrasCopy.description}</Text>
        <Flex vertical gap={12}>
          {recommendedExtras.map((extra) => {
            const isInCart = items.some((cartItem) => cartItem.id === extra.id);

            return (
              <Card
                key={extra.id}
                className="rounded-xl! border border-gray-200!"
                styles={{ body: { padding: 12 } }}
              >
                <Flex align="center" gap={12}>
                  <Flex
                    align="center"
                    justify="center"
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={extra.image}
                      alt={`${extra.name} preview`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </Flex>
                  <Flex justify="space-between" align="center" className="flex-1" gap={12} wrap>
                    <Flex vertical gap={2} className="min-w-[140px]">
                      {extra.highlightKey ? (
                        <Tag className="w-fit rounded-full! bg-amber-100! px-3 py-1 text-amber-700!">
                          {(extrasCopy.highlights as Record<string, string>)[extra.highlightKey] ?? ""}
                        </Tag>
                      ) : null}
                      <Text strong>{extra.name}</Text>
                      <Text className="text-sm text-gray-500">
                        {formatPrice.format(extra.price)}
                      </Text>
                    </Flex>
                    <Button
                      type="default"
                      shape="round"
                      onClick={() => onAddExtra(extra)}
                      disabled={isInCart}
                    >
                      {isInCart ? extrasCopy.added : extrasCopy.add}
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Card>
  );
}
