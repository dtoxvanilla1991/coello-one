"use client";

import { useMemo, useState } from "react";
import { Flex } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addCartItemAtom,
  cartItemsAtom,
  cartShippingAtom,
  cartSubtotalAtom,
  cartTotalAtom,
  FREE_SHIPPING_THRESHOLD,
  removeCartItemAtom,
  updateCartItemQuantityAtom,
} from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { useTranslations } from "@/localization/useTranslations";
import { formatMessage } from "@/localization/formatMessage";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import { formatPrice } from "./constants";
import type { ExtraItem, ViewMode } from "./types";
import { BagHeader } from "./components/BagHeader";
import { BagShippingStatusCard } from "./components/BagShippingStatusCard";
import { BagReservationAlert } from "./components/BagReservationAlert";
import { BagItemsSection } from "./components/BagItemsSection";
import { BagSummaryColumn } from "./components/BagSummaryColumn";
import { BagEmptyState } from "./components/BagEmptyState";
import { WishlistCallout } from "./components/WishlistCallout";

export function BagContent() {
  const items = useAtomValue(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const shipping = useAtomValue(cartShippingAtom);
  const total = useAtomValue(cartTotalAtom);
  const updateQuantity = useSetAtom(updateCartItemQuantityAtom);
  const removeItem = useSetAtom(removeCartItemAtom);
  const addItem = useSetAtom(addCartItemAtom);
  const router = useRouter();
  const locale = useCurrentLocale();
  const bagCopy = useTranslations("bag");
  const homeRoute = buildLocaleRoute(locale, "home");
  const checkoutRoute = buildLocaleRoute(locale, "checkout");

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const [viewMode, setViewMode] = useState<ViewMode>("bag");

  const hasItems = items.length > 0;

  const shippingPercent =
    subtotal === 0 ? 0 : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const remainingForShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const qualifiesForFreeShipping = hasItems && remainingForShipping === 0;

  const shippingCopy = qualifiesForFreeShipping
    ? bagCopy.shippingStatus.qualifiedCopy
    : formatMessage(bagCopy.shippingStatus.progressCopy, {
        amount: formatPrice.format(remainingForShipping),
      });

  const shippingTooltip = qualifiesForFreeShipping
    ? bagCopy.shippingStatus.qualifiedTooltip
    : bagCopy.shippingStatus.progressTooltip;

  const handleContinueShopping = () => {
    router.push(homeRoute);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity({
      id,
      quantity,
    });
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }

    trackEvent(
      "bag_checkout_attempt",
      {
        subtotal,
        shipping,
        total,
        itemCount,
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
          fit: item.fit,
        })),
      },
      {
        locale,
        translationKey: "bag.summary.checkoutCta",
        translationVariant: "primary",
      },
    );

    router.push(checkoutRoute);
  };

  const handleAddExtra = (extra: ExtraItem) => {
    addItem({
      id: extra.id,
      name: extra.name,
      image: extra.image,
      price: extra.price,
      color: extra.color,
      size: extra.size,
      fit: extra.fit,
    });
  };

  return (
    <Flex vertical gap={24} className="w-full px-4 pt-8 pb-24 md:px-8">
      <BagHeader viewMode={viewMode} itemCount={itemCount} onViewModeChange={setViewMode} />
      {viewMode === "bag" ? (
        <Flex vertical gap={24} className="w-full">
          {hasItems ? (
            <>
              <BagShippingStatusCard
                qualifiesForFreeShipping={qualifiesForFreeShipping}
                shippingPercent={shippingPercent}
                shippingCopy={shippingCopy}
                shippingTooltip={shippingTooltip}
              />
              <BagReservationAlert />
              <Flex vertical gap={24} className="lg:flex-row" align="start" wrap>
                <BagItemsSection
                  items={items}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onAddExtra={handleAddExtra}
                  onContinueShopping={handleContinueShopping}
                />
                <BagSummaryColumn
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onCheckout={handleCheckout}
                />
              </Flex>
            </>
          ) : (
            <BagEmptyState onContinueShopping={handleContinueShopping} />
          )}
        </Flex>
      ) : (
        <WishlistCallout />
      )}
    </Flex>
  );
}
