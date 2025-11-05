"use client";

import { useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  InputNumber,
  Space,
  Typography,
} from "antd";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import {
  cartItemsAtom,
  cartShippingAtom,
  cartSubtotalAtom,
  cartTotalAtom,
  removeCartItemAtom,
  updateCartItemQuantityAtom,
} from "@/store/cartStore";
import { useParams, useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import EmptyBagIcon from "@public/icons/EmptyBag";
import { trackEvent } from "@/utils/trackEvent";

const { Title, Text } = Typography;

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function BagContent() {
  const items = useAtomValue(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const shipping = useAtomValue(cartShippingAtom);
  const total = useAtomValue(cartTotalAtom);
  const updateQuantity = useSetAtom(updateCartItemQuantityAtom);
  const removeItem = useSetAtom(removeCartItemAtom);
  const router = useRouter();
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en-GB";
  const homeRoute = buildLocaleRoute(locale, "home");

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const handleContinueShopping = () => {
    router.push(homeRoute);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }

    trackEvent("bag_checkout_attempt", {
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
    });
  };

  if (items.length === 0) {
    return (
      <Flex
        vertical
        gap={24}
        className="w-full min-h-[70vh] px-4 py-12 text-center"
        align="center"
        justify="center">
        <Title level={2} className="uppercase tracking-wide">
          Your bag is empty
        </Title>
        <Empty
          image={<EmptyBagIcon />}
          description="Browse the collection to add your first piece"
          styles={{ image: { marginBottom: 12 } }}
        />
        <Button type="primary" size="large" onClick={handleContinueShopping}>
          Continue shopping
        </Button>
      </Flex>
    );
  }

  return (
    <section aria-labelledby="bag-heading" className="w-full px-4 py-8 md:px-8">
      <Flex
        justify="space-between"
        align="center"
        className="mb-8 flex-wrap gap-3">
        <Title id="bag-heading" level={2} className="uppercase tracking-wide">
          Your bag
        </Title>
        <Space size="small" align="center">
          <Badge count={itemCount} color="black" />
          <Button type="link" onClick={handleContinueShopping}>
            Continue shopping
          </Button>
        </Space>
      </Flex>

      <Flex vertical gap={24} className="lg:flex-row" align="stretch" wrap>
        <Flex vertical gap={16} className="flex-1 min-w-0">
          {items.map((item) => (
            <Card
              key={item.id}
              variant="borderless"
              className="!rounded-2xl border !border-gray-200 px-4 py-4 shadow-sm">
              <Flex gap={16} align="start" className="flex-wrap">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={`${item.name} preview`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <Flex
                  vertical
                  justify="space-between"
                  className="min-w-[180px] flex-1">
                  <div>
                    <Title level={4} className="!m-0 !text-lg">
                      {item.name}
                    </Title>
                    <Text className="text-gray-500">
                      {item.fit === "male" ? "Men's fit" : "Women's fit"} ·{" "}
                      {item.color} · Size {item.size}
                    </Text>
                  </div>
                  <Flex
                    justify="space-between"
                    align="center"
                    wrap
                    className="gap-3 pt-4">
                    <Space align="center" size={4}>
                      <Text className="text-sm uppercase text-gray-500">
                        Qty
                      </Text>
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        size="small"
                        aria-label={`Quantity for ${item.name}`}
                        onChange={(value) => {
                          const nextValue = Number(value ?? item.quantity);
                          updateQuantity({ id: item.id, quantity: nextValue });
                        }}
                      />
                    </Space>
                    <Space align="center" size={16}>
                      <Text className="text-lg font-semibold">
                        {formatPrice.format(item.price * item.quantity)}
                      </Text>
                      <Button
                        type="link"
                        danger
                        onClick={() => removeItem(item.id)}>
                        Remove
                      </Button>
                    </Space>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>

        <Card
          title="Order summary"
          variant="borderless"
          className="w-full !rounded-2xl border !border-gray-200 lg:max-w-sm"
          classNames={{
            header: "uppercase tracking-wide",
            body: "space-y-4",
          }}>
          <Space direction="vertical" size={16} className="w-full text-sm">
            <Flex justify="space-between">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="font-semibold">
                {formatPrice.format(subtotal)}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text className="text-gray-500">Shipping</Text>
              <Text className="font-semibold">
                {shipping === 0 ? "Free" : formatPrice.format(shipping)}
              </Text>
            </Flex>
            <Divider className="my-0" />
            <Flex justify="space-between" align="center">
              <Text className="text-base font-semibold uppercase">Total</Text>
              <Space direction="vertical" size={0} className="text-right">
                <Text className="text-lg font-semibold">
                  {formatPrice.format(total)}
                </Text>
                <Text className="text-xs text-gray-500">
                  Inclusive of taxes where applicable
                </Text>
              </Space>
            </Flex>
            <Button type="primary" size="large" block onClick={handleCheckout}>
              Checkout
            </Button>
          </Space>
        </Card>
      </Flex>
    </section>
  );
}
