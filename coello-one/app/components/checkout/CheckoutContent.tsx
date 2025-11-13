"use client";

import { useMemo } from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import Image from "next/image";
import { useAtomValue } from "jotai";
import {
  cartItemsAtom,
  cartShippingAtom,
  cartSubtotalAtom,
  cartTotalAtom,
} from "@/store/cartStore";
import { useParams, useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { trackEvent } from "@/utils/trackEvent";
import type { CheckoutFormValues } from "./types";
import { COUNTRY_OPTIONS, EXPRESS_METHODS, FORMAT_PRICE, PAYMENT_OPTIONS } from "./constants";

const { Title, Text } = Typography;

export function CheckoutContent() {
  const items = useAtomValue(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const shipping = useAtomValue(cartShippingAtom);
  const total = useAtomValue(cartTotalAtom);
  const router = useRouter();
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en-GB";
  const bagRoute = buildLocaleRoute(locale, "bag");

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const hasItems = items.length > 0;

  const initialValues: CheckoutFormValues = {
    email: "",
    marketingOptIn: false,
    deliveryMethod: "home",
    country: "GB",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    phone: "",
    paymentMethod: "card",
    rememberMe: true,
  };

  const handleReturnToBag = () => {
    router.push(bagRoute);
  };

  const handlePlaceOrder = (values: CheckoutFormValues) => {
    if (!hasItems) {
      message.warning("Add an item to your bag before completing checkout.");
      return;
    }

    trackEvent("checkout_submit_attempt", {
      subtotal,
      shipping,
      total,
      itemCount,
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
      rememberMe: values.rememberMe ?? false,
    });

    message.success("Checkout submission captured. Configure Stripe to finish.");
  };

  return (
    <Flex vertical gap={24} className="w-full px-4 pt-8 pb-24 md:px-8">
      <Flex justify="space-between" align="center" wrap className="gap-4">
        <Flex vertical gap={4}>
          <Title level={2} className="m-0! tracking-wide uppercase">
            Checkout
          </Title>
          <Text className="text-sm text-gray-500">
            {hasItems
              ? "Review your details before placing the order."
              : "Add at least one item to complete your order."}
          </Text>
        </Flex>
        <Button
          type="default"
          size="large"
          className="rounded-full! px-6 uppercase"
          onClick={handleReturnToBag}
        >
          Back to bag
        </Button>
      </Flex>

      <Flex gap={24} className="flex-col lg:flex-row">
        <Flex vertical gap={16} className="flex-1">
          <Card className="rounded-2xl! border border-gray-200!">
            <Flex vertical gap={16}>
              <Title level={4} className="m-0! tracking-wide uppercase">
                Express checkout
              </Title>
              <Space size={12} wrap>
                {EXPRESS_METHODS.map((method) => (
                  <Button
                    key={method.key}
                    size="large"
                    className={`${method.className} px-6 text-base!`}
                  >
                    {method.label}
                  </Button>
                ))}
              </Space>
              <Divider className="my-2">or</Divider>
              <Text className="text-xs text-gray-500">
                Continue to secure checkout for additional payment methods.
              </Text>
            </Flex>
          </Card>

          <Form layout="vertical" initialValues={initialValues} onFinish={handlePlaceOrder}>
            <Space direction="vertical" size={16} className="w-full">
              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Flex justify="space-between" align="center">
                    <Title level={4} className="m-0! tracking-wide uppercase">
                      Contact
                    </Title>
                    <Button type="link">Sign in</Button>
                  </Flex>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Enter an email" }]}
                  >
                    <Input size="large" type="email" placeholder="Email" />
                  </Form.Item>
                  <Form.Item name="marketingOptIn" valuePropName="checked">
                    <Checkbox>Tick here to receive emails about launches and exclusives.</Checkbox>
                  </Form.Item>
                  <Text className="text-xs text-gray-500">View our Privacy Policy.</Text>
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    Delivery
                  </Title>
                  <Form.Item name="deliveryMethod">
                    <Radio.Group className="w-full">
                      <Space direction="vertical" size={12} className="w-full">
                        <Radio value="home">Home Delivery (selected)</Radio>
                        <Radio value="pickup">Pickup Point</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Country/Region"
                    name="country"
                    rules={[{ required: true, message: "Select a country" }]}
                  >
                    <Select size="large" options={COUNTRY_OPTIONS} className="w-full" />
                  </Form.Item>
                  <Flex gap={16} className="flex-col md:flex-row">
                    <Form.Item
                      label="First name"
                      name="firstName"
                      className="flex-1"
                      rules={[{ required: true, message: "Enter first name" }]}
                    >
                      <Input size="large" placeholder="First name" />
                    </Form.Item>
                    <Form.Item
                      label="Last name"
                      name="lastName"
                      className="flex-1"
                      rules={[{ required: true, message: "Enter last name" }]}
                    >
                      <Input size="large" placeholder="Last name" />
                    </Form.Item>
                  </Flex>
                  <Form.Item
                    label="Address line 1"
                    name="addressLine1"
                    rules={[{ required: true, message: "Enter an address" }]}
                  >
                    <Input size="large" placeholder="Address line 1" />
                  </Form.Item>
                  <Form.Item label="Address line 2" name="addressLine2">
                    <Input size="large" placeholder="Address line 2" />
                  </Form.Item>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: "Enter a city" }]}
                  >
                    <Input size="large" placeholder="City" />
                  </Form.Item>
                  <Flex gap={16} className="flex-col md:flex-row">
                    <Form.Item
                      label="Postcode"
                      name="postcode"
                      className="flex-1"
                      rules={[{ required: true, message: "Enter postcode" }]}
                    >
                      <Input size="large" placeholder="Postcode" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" className="flex-1">
                      <Input size="large" placeholder="Phone" />
                    </Form.Item>
                  </Flex>
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    Payment
                  </Title>
                  <Text className="text-xs text-gray-500">
                    All transactions are secure and encrypted via Stripe.
                  </Text>
                  <Form.Item name="paymentMethod">
                    <Radio.Group className="w-full">
                      <Space direction="vertical" size={12} className="w-full">
                        {PAYMENT_OPTIONS.map((option) => (
                          <Radio key={option.value} value={option.value}>
                            {option.label}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Alert
                    type="warning"
                    showIcon
                    message="Connect your Stripe keys to process live payments."
                    className="rounded-xl! border border-amber-200! bg-amber-50!"
                  />
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    Remember me
                  </Title>
                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Switch checkedChildren="On" unCheckedChildren="Off" />
                  </Form.Item>
                  <Text className="text-sm text-gray-500">
                    Save your information for a faster checkout with a Coello account.
                  </Text>
                </Flex>
              </Card>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="rounded-full! py-4 text-base! uppercase"
                disabled={!hasItems}
              >
                Place order securely
              </Button>
            </Space>
          </Form>
        </Flex>

        <Flex vertical gap={16} className="w-full lg:max-w-md">
          <Card className="rounded-2xl! border border-gray-200!">
            <Flex vertical gap={16}>
              <Title level={4} className="m-0! tracking-wide uppercase">
                Order summary
              </Title>
              <Flex vertical gap={12}>
                {hasItems ? (
                  items.map((item) => (
                    <Card
                      key={`${item.id}-${item.size}`}
                      className="rounded-xl! border border-gray-200!"
                      styles={{ body: { padding: 12 } }}
                    >
                      <Flex gap={12} align="start">
                        <Flex
                          align="center"
                          justify="center"
                          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                        >
                          <Image
                            src={item.image}
                            alt={`${item.name} preview`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </Flex>
                        <Flex vertical className="flex-1" gap={4}>
                          <Text strong>{item.name}</Text>
                          <Text className="text-xs text-gray-500">
                            {`${item.color} • Size ${item.size}`}
                          </Text>
                          <Flex justify="space-between" align="center">
                            <Text className="text-sm text-gray-500">Qty {item.quantity}</Text>
                            <Text className="text-sm font-semibold">
                              {FORMAT_PRICE.format(item.price * item.quantity)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  ))
                ) : (
                  <Alert
                    type="info"
                    showIcon
                    message="Your bag is empty. Add items to see the order summary."
                    className="rounded-xl! border border-gray-200!"
                  />
                )}
              </Flex>

              <Space.Compact className="w-full">
                <Input placeholder="Gift card or discount code" size="large" />
                <Button type="default" size="large">
                  Apply
                </Button>
              </Space.Compact>
              <Button type="link" className="self-start">
                Been referred by a friend?
              </Button>

              <Divider className="my-2" />

              <Flex justify="space-between">
                <Text className="text-gray-500">Subtotal</Text>
                <Text className="font-semibold">{FORMAT_PRICE.format(subtotal)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text className="text-gray-500">Shipping</Text>
                <Text className="font-semibold">
                  {shipping === 0 ? "Free" : FORMAT_PRICE.format(shipping)}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text className="text-gray-500">Items</Text>
                <Text className="font-semibold">{itemCount}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text className="text-base font-semibold uppercase">Total</Text>
                <Text className="text-lg font-semibold">{FORMAT_PRICE.format(total)}</Text>
              </Flex>
              <Text className="text-xs text-gray-500">
                Enter your shipping address to view available methods.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
