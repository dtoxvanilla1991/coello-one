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

const { Title, Text } = Typography;

type CheckoutFormValues = {
  email: string;
  marketingOptIn?: boolean;
  deliveryMethod: "home" | "pickup";
  country: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  phone?: string;
  paymentMethod: string;
  rememberMe?: boolean;
};

const countryOptions = [
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
];

const expressMethods = [
  {
    key: "shop",
    label: "shop",
    className:
      "rounded-full! bg-[#6c4cf4]! border-[#6c4cf4]! text-white! shadow-sm",
  },
  {
    key: "paypal",
    label: "PayPal",
    className:
      "rounded-full! bg-[#ffc439]! border-[#ffc439]! text-black! shadow-sm",
  },
  {
    key: "gpay",
    label: "G Pay",
    className:
      "rounded-full! bg-black! border-black! text-white! shadow-sm",
  },
];

const paymentOptions = [
  { label: "Credit / Debit Card", value: "card" },
  { label: "PayPal", value: "paypal" },
  { label: "Klarna - Flexible payments", value: "klarna" },
  { label: "Clearpay", value: "clearpay" },
];

const formatPrice = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function CheckoutContent() {
  const items = useAtomValue(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const shipping = useAtomValue(cartShippingAtom);
  const total = useAtomValue(cartTotalAtom);
  const router = useRouter();
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en-GB";
  const bagRoute = buildLocaleRoute(locale, "bag");

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

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
    <Flex vertical gap={24} className="w-full px-4 pb-24 pt-8 md:px-8">
      <Flex
        justify="space-between"
        align="center"
        wrap
        className="gap-4">
        <Title level={2} className="m-0! uppercase tracking-wide">
          Checkout
        </Title>
        <Button type="link" onClick={handleReturnToBag}>
          Back to bag
        </Button>
      </Flex>

      {!hasItems ? (
        <Alert
          type="info"
          showIcon
          message="Add at least one item to complete your order."
          className="rounded-2xl! border border-gray-200! bg-gray-50!"
        />
      ) : null}

      <Flex vertical gap={24} className="lg:flex-row" align="start" wrap>
        <Flex vertical gap={24} className="flex-1 min-w-0">
          <Card className="rounded-2xl! border border-gray-200!">
            <Flex vertical gap={16}>
              <Text strong className="uppercase tracking-wide text-xs text-gray-500">
                Express checkout
              </Text>
              <Space direction="vertical" size={12} className="w-full">
                {expressMethods.map((method) => (
                  <Button
                    key={method.key}
                    type="primary"
                    size="large"
                    block
                    className={method.className}
                  >
                    {method.label}
                  </Button>
                ))}
              </Space>
            </Flex>
          </Card>

          <Divider plain className="uppercase tracking-wide text-xs text-gray-400">
            or
          </Divider>

          <Form
            layout="vertical"
            initialValues={initialValues}
            onFinish={handlePlaceOrder}
            className="flex-1"
          >
            <Space direction="vertical" size={24} className="w-full">
              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Flex justify="space-between" align="center" wrap className="gap-3">
                    <Title level={4} className="m-0! uppercase tracking-wide">
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
                    <Checkbox>
                      Tick here to receive emails about launches and exclusives.
                    </Checkbox>
                  </Form.Item>
                  <Text className="text-xs text-gray-500">
                    View our Privacy Policy.
                  </Text>
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! uppercase tracking-wide">
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
                    <Select
                      size="large"
                      options={countryOptions}
                      className="w-full"
                    />
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
                  <Form.Item label="City" name="city" rules={[{ required: true, message: "Enter a city" }]}>
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
                  <Title level={4} className="m-0! uppercase tracking-wide">
                    Payment
                  </Title>
                  <Text className="text-xs text-gray-500">
                    All transactions are secure and encrypted via Stripe.
                  </Text>
                  <Form.Item name="paymentMethod">
                    <Radio.Group className="w-full">
                      <Space direction="vertical" size={12} className="w-full">
                        {paymentOptions.map((option) => (
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
                  <Title level={4} className="m-0! uppercase tracking-wide">
                    Remember me
                  </Title>
                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Switch
                      checkedChildren="On"
                      unCheckedChildren="Off"
                    />
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
              <Title level={4} className="m-0! uppercase tracking-wide">
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
                            <Text className="text-sm text-gray-500">
                              Qty {item.quantity}
                            </Text>
                            <Text className="text-sm font-semibold">
                              {formatPrice.format(item.price * item.quantity)}
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
              <Flex justify="space-between">
                <Text className="text-gray-500">Items</Text>
                <Text className="font-semibold">{itemCount}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text className="text-base font-semibold uppercase">Total</Text>
                <Text className="text-lg font-semibold">
                  {formatPrice.format(total)}
                </Text>
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
