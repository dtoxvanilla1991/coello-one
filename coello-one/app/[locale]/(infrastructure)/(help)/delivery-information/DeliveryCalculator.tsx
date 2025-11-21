"use client";

import { Alert, Button, Card, Flex, Form, InputNumber, Result, Select, Typography } from "antd";
import { useMemo, useState } from "react";
import { z } from "zod";
import { trackEvent } from "@/utils/trackEvent";
import type { DeliveryTier } from "./constants";
import { DELIVERY_MATRIX } from "./constants";

const { Title, Paragraph, Text } = Typography;

const REGION_OPTIONS = [
  "United Kingdom",
  "London Zones 1-3",
  "European Union",
  "North America",
] as const;

const SERVICE_OPTIONS = ["Standard", "Express", "Same Day"] as const;

const calculatorSchema = z.object({
  region: z.enum(REGION_OPTIONS),
  service: z.enum(SERVICE_OPTIONS),
  orderValue: z.number().min(0).max(5000),
});

type QuoteResult = {
  tier: DeliveryTier;
  fulfilledCost: string;
  savingsLabel?: string;
};

type FormValues = z.infer<typeof calculatorSchema>;

type DeliveryCalculatorProps = {
  tiers?: DeliveryTier[];
  initialValues?: Partial<FormValues>;
};

const DEFAULT_INITIAL_VALUES: FormValues = {
  region: REGION_OPTIONS[0],
  service: "Standard",
  orderValue: 120,
};

export default function DeliveryCalculator({
  tiers = DELIVERY_MATRIX,
  initialValues,
}: DeliveryCalculatorProps) {
  const [form] = Form.useForm<FormValues>();
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const tierMap = useMemo(() => {
    return tiers.reduce<Record<string, DeliveryTier>>((acc, tier) => {
      const key = `${tier.region}-${tier.service}`;
      acc[key] = tier;
      return acc;
    }, {});
  }, [tiers]);

  const availableServicesByRegion = useMemo(() => {
    return tiers.reduce<Record<string, DeliveryTier["service"][]>>((acc, tier) => {
      acc[tier.region] = acc[tier.region] ? [...acc[tier.region], tier.service] : [tier.service];
      return acc;
    }, {});
  }, [tiers]);

  const handleFinish = (values: FormValues) => {
    const parsed = calculatorSchema.safeParse(values);
    if (!parsed.success) {
      setValidationError("Please review the inputs and try again.");
      setQuote(null);
      return;
    }

    setValidationError(null);

    const { region, service, orderValue } = parsed.data;
    const tier = tierMap[`${region}-${service}`];

    if (!tier) {
      setQuote(null);
      setValidationError("We do not currently ship that combination—choose another option.");
      return;
    }

    const qualifiesForFree =
      typeof tier.freeThresholdValue === "number" && orderValue >= tier.freeThresholdValue;

    const fulfilledCost = qualifiesForFree ? "Complimentary" : tier.displayCost;

    const savingsLabel = qualifiesForFree
      ? `Saved ${tier.displayCost} shipping with your spend.`
      : undefined;

    setQuote({ tier, fulfilledCost, savingsLabel });
    trackEvent("help_delivery_quote", { region, service, orderValue, qualifiesForFree });
  };

  const selectedRegion = Form.useWatch("region", form);
  const availableServices = selectedRegion
    ? (availableServicesByRegion[selectedRegion] ?? [])
    : SERVICE_OPTIONS;
  const uniqueServices = Array.from(new Set(availableServices));

  return (
    <Card className="border-gray-200 bg-white/70">
      <Flex vertical gap={16}>
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0! text-2xl">
            Delivery cost calculator
          </Title>
          <Paragraph className="mb-0! text-gray-600">
            Model your shipping charge in seconds. Spend thresholds unlock complimentary delivery
            automatically.
          </Paragraph>
        </Flex>
        {validationError ? (
          <Alert type="error" showIcon message={validationError} className="border-red-200" />
        ) : null}
        <Form<FormValues>
          form={form}
          layout="vertical"
          initialValues={{
            ...DEFAULT_INITIAL_VALUES,
            ...initialValues,
          }}
          onFinish={handleFinish}
        >
          <Form.Item<FormValues> name="region" label="Where are we delivering?">
            <Select
              options={REGION_OPTIONS.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(nextRegion: FormValues["region"]) => {
                const services = availableServicesByRegion[nextRegion] ?? [];
                form.setFieldsValue({ service: services[0] });
                setQuote(null);
                setValidationError(null);
              }}
            />
          </Form.Item>
          <Form.Item<FormValues>
            name="service"
            label="Choose a service"
            rules={[{ required: true, message: "Select your service level." }]}
          >
            <Select
              placeholder="Select delivery speed"
              options={uniqueServices.map((service) => ({
                label: service,
                value: service,
              }))}
              onChange={() => {
                setQuote(null);
                setValidationError(null);
              }}
            />
          </Form.Item>
          <Form.Item<FormValues>
            name="orderValue"
            label="Order value (local currency)"
            rules={[{ required: true, message: "Enter your order total." }]}
          >
            <InputNumber
              min={0}
              max={5000}
              className="w-full"
              controls={false}
              onChange={() => {
                setQuote(null);
                setValidationError(null);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit" size="large">
                Calculate shipping
              </Button>
            </Flex>
          </Form.Item>
        </Form>
        {quote ? (
          <Result
            status="success"
            title={`Your shipping is ${quote.fulfilledCost}`}
            subTitle={
              <Flex vertical gap={4}>
                <Text className="text-gray-700">
                  {quote.tier.service} · {quote.tier.eta} · {quote.tier.cutoff}
                </Text>
                {quote.savingsLabel ? (
                  <Text className="text-sm text-emerald-600">{quote.savingsLabel}</Text>
                ) : null}
              </Flex>
            }
          />
        ) : (
          <Card className="border-dashed border-gray-200 bg-gray-50">
            <Paragraph className="mb-0! text-center text-gray-500">
              Enter your details and tap submit to preview shipping.
            </Paragraph>
          </Card>
        )}
      </Flex>
    </Card>
  );
}
