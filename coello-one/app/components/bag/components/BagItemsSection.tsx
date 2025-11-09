"use client";

import { Button, Flex } from "antd";
import type { CartItem } from "@/store/cartStore";
import type { ExtraItem } from "../types";
import { BagItemCard } from "./BagItemCard";
import { RecommendedExtrasCard } from "./RecommendedExtrasCard";

type BagItemsSectionProps = {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onAddExtra: (extra: ExtraItem) => void;
  onContinueShopping: () => void;
};

export function BagItemsSection({
  items,
  onQuantityChange,
  onRemove,
  onAddExtra,
  onContinueShopping,
}: BagItemsSectionProps) {
  return (
    <Flex vertical gap={16} className="flex-1 min-w-0">
      {items.map((item) => (
        <BagItemCard
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}

      <RecommendedExtrasCard items={items} onAddExtra={onAddExtra} />

      <Button type="link" onClick={onContinueShopping}>
        Continue shopping
      </Button>
    </Flex>
  );
}
