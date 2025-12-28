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
import { useRouter } from "next/navigation";
import { buildLocaleRoute } from "@config/routes";
import { useTranslations } from "@/localization/useTranslations";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { useLocalePath } from "@/hooks/useLocalePath";
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
  const locale = useCurrentLocale();
  const withLocalePath = useLocalePath();
  const checkoutCopy = useTranslations("checkout");
  const { hero, express, contact, delivery, payment, remember, orderSummary, cta, messages } =
    checkoutCopy;
  const bagRoute = withLocalePath(buildLocaleRoute("bag"));

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
      message.warning(messages.emptyWarning);
      return;
    }

    trackEvent(
      "checkout_submit_attempt",
      {
        subtotal,
        shipping,
        total,
        itemCount,
        deliveryMethod: values.deliveryMethod,
        paymentMethod: values.paymentMethod,
        rememberMe: values.rememberMe ?? false,
      },
      {
        locale,
        translationKey: "checkout.cta.submit",
        translationVariant: "primary",
      },
    );

    message.success(messages.success);
  };

  return (
    <Flex vertical gap={24} className="w-full px-4 pt-8 pb-24 md:px-8">
      <Flex justify="space-between" align="center" wrap className="gap-4">
        <Flex vertical gap={4}>
          <Title level={2} className="m-0! tracking-wide uppercase">
            {hero.title}
          </Title>
          <Text className="text-sm text-gray-500">
            {hasItems ? hero.subtitleReady : hero.subtitleEmpty}
          </Text>
        </Flex>
        <Button
          type="default"
          size="large"
          className="rounded-full! px-6 uppercase"
          onClick={handleReturnToBag}
        >
          {hero.backToBag}
        </Button>
      </Flex>

      <Flex gap={24} className="flex-col lg:flex-row">
        <Flex vertical gap={16} className="flex-1">
          <Card className="rounded-2xl! border border-gray-200!">
            <Flex vertical gap={16}>
              <Title level={4} className="m-0! tracking-wide uppercase">
                {express.title}
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
              <Divider className="my-2">{express.divider}</Divider>
              <Text className="text-xs text-gray-500">{express.helper}</Text>
            </Flex>
          </Card>

          <Form layout="vertical" initialValues={initialValues} onFinish={handlePlaceOrder}>
            <Space orientation="vertical" size={16} className="w-full">
              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Flex justify="space-between" align="center">
                    <Title level={4} className="m-0! tracking-wide uppercase">
                      {contact.title}
                    </Title>
                    <Button type="link">{contact.signIn}</Button>
                  </Flex>
                  <Form.Item
                    label={contact.emailLabel}
                    name="email"
                    rules={[{ required: true, message: contact.emailError }]}
                  >
                    <Input size="large" type="email" placeholder={contact.emailPlaceholder} />
                  </Form.Item>
                  <Form.Item name="marketingOptIn" valuePropName="checked">
                    <Checkbox>{contact.optInLabel}</Checkbox>
                  </Form.Item>
                  <Text className="text-xs text-gray-500">{contact.privacy}</Text>
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    {delivery.title}
                  </Title>
                  <Form.Item name="deliveryMethod">
                    <Radio.Group className="w-full">
                      <Space orientation="vertical" size={12} className="w-full">
                        <Radio value="home">{delivery.home}</Radio>
                        <Radio value="pickup">{delivery.pickup}</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={delivery.countryLabel}
                    name="country"
                    rules={[{ required: true, message: delivery.countryError }]}
                  >
                    <Select size="large" options={COUNTRY_OPTIONS} className="w-full" />
                  </Form.Item>
                  <Flex gap={16} className="flex-col md:flex-row">
                    <Form.Item
                      label={delivery.firstNameLabel}
                      name="firstName"
                      className="flex-1"
                      rules={[{ required: true, message: delivery.firstNameError }]}
                    >
                      <Input size="large" placeholder={delivery.firstNamePlaceholder} />
                    </Form.Item>
                    <Form.Item
                      label={delivery.lastNameLabel}
                      name="lastName"
                      className="flex-1"
                      rules={[{ required: true, message: delivery.lastNameError }]}
                    >
                      <Input size="large" placeholder={delivery.lastNamePlaceholder} />
                    </Form.Item>
                  </Flex>
                  <Form.Item
                    label={delivery.addressLine1Label}
                    name="addressLine1"
                    rules={[{ required: true, message: delivery.addressLine1Error }]}
                  >
                    <Input size="large" placeholder={delivery.addressLine1Placeholder} />
                  </Form.Item>
                  <Form.Item label={delivery.addressLine2Label} name="addressLine2">
                    <Input size="large" placeholder={delivery.addressLine2Label} />
                  </Form.Item>
                  <Form.Item
                    label={delivery.cityLabel}
                    name="city"
                    rules={[{ required: true, message: delivery.cityError }]}
                  >
                    <Input size="large" placeholder={delivery.cityPlaceholder} />
                  </Form.Item>
                  <Flex gap={16} className="flex-col md:flex-row">
                    <Form.Item
                      label={delivery.postcodeLabel}
                      name="postcode"
                      className="flex-1"
                      rules={[{ required: true, message: delivery.postcodeError }]}
                    >
                      <Input size="large" placeholder={delivery.postcodePlaceholder} />
                    </Form.Item>
                    <Form.Item label={delivery.phoneLabel} name="phone" className="flex-1">
                      <Input size="large" placeholder={delivery.phonePlaceholder} />
                    </Form.Item>
                  </Flex>
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    {payment.title}
                  </Title>
                  <Text className="text-xs text-gray-500">{payment.helper}</Text>
                  <Form.Item name="paymentMethod">
                    <Radio.Group className="w-full">
                      <Space orientation="vertical" size={12} className="w-full">
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
                    title={payment.alert}
                    className="rounded-xl! border border-amber-200! bg-amber-50!"
                  />
                </Flex>
              </Card>

              <Card className="rounded-2xl! border border-gray-200!">
                <Flex vertical gap={16}>
                  <Title level={4} className="m-0! tracking-wide uppercase">
                    {remember.title}
                  </Title>
                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Switch checkedChildren={remember.on} unCheckedChildren={remember.off} />
                  </Form.Item>
                  <Text className="text-sm text-gray-500">{remember.helper}</Text>
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
                {cta.submit}
              </Button>
            </Space>
          </Form>
        </Flex>

        <Flex vertical gap={16} className="w-full lg:max-w-md">
          <Card className="rounded-2xl! border border-gray-200!">
            <Flex vertical gap={16}>
              <Title level={4} className="m-0! tracking-wide uppercase">
                {orderSummary.title}
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
                    title={orderSummary.empty}
                    className="rounded-xl! border border-gray-200!"
                  />
                )}
              </Flex>

              <Space.Compact className="w-full">
                <Input placeholder={orderSummary.discountPlaceholder} size="large" />
                <Button type="default" size="large">
                  {orderSummary.discountApply}
                </Button>
              </Space.Compact>
              <Button type="link" className="self-start">
                {orderSummary.referral}
              </Button>

              <Divider className="my-2" />

              <Flex justify="space-between">
                <Text className="text-gray-500">{orderSummary.subtotal}</Text>
                <Text className="font-semibold">{FORMAT_PRICE.format(subtotal)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text className="text-gray-500">{orderSummary.shipping}</Text>
                <Text className="font-semibold">
                  {shipping === 0 ? orderSummary.shippingFree : FORMAT_PRICE.format(shipping)}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text className="text-gray-500">{orderSummary.items}</Text>
                <Text className="font-semibold">{itemCount}</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text className="text-base font-semibold uppercase">{orderSummary.total}</Text>
                <Text className="text-lg font-semibold">{FORMAT_PRICE.format(total)}</Text>
              </Flex>
              <Text className="text-xs text-gray-500">{orderSummary.shippingPrompt}</Text>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
