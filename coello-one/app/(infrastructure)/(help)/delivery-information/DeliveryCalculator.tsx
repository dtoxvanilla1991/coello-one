"use client";

import { Alert, Button, Card, Flex, Form, InputNumber, Result, Select, Typography } from "antd";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { useTranslations } from "@/localization/useTranslations";
import { formatMessage } from "@/localization/formatMessage";
import { trackEvent } from "@/utils/trackEvent";
import type { DeliveryTier } from "./types";

const { Title, Paragraph, Text } = Typography;

type QuoteResult = {
  tier: DeliveryTier;
  fulfilledCost: string;
  savingsLabel?: string;
};

type FormValues = {
  region: string;
  service: string;
  orderValue: number;
};

type DeliveryCalculatorProps = {
  tiers?: DeliveryTier[];
  initialValues?: Partial<FormValues>;
};

export default function DeliveryCalculator({
  tiers,
  initialValues,
}: DeliveryCalculatorProps) {
  const [form] = Form.useForm<FormValues>();
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const locale = useCurrentLocale();
  const helpDeliveryCopy = useTranslations("helpDelivery");
  const calculatorCopy = helpDeliveryCopy.calculator;
  const resolvedTiers = tiers ?? helpDeliveryCopy.tiers;

  const regionOptions = useMemo(
    () => Array.from(new Set(resolvedTiers.map((tier) => tier.region))),
    [resolvedTiers],
  );

  const serviceOptions = useMemo(
    () => Array.from(new Set(resolvedTiers.map((tier) => tier.service))),
    [resolvedTiers],
  );

  const defaultRegion = regionOptions[0] ?? "";
  const defaultService =
    resolvedTiers.find((tier) => tier.region === defaultRegion)?.service ?? serviceOptions[0] ?? "";

  const effectiveInitialValues: FormValues = {
    region: initialValues?.region ?? defaultRegion,
    service: initialValues?.service ?? defaultService,
    orderValue: initialValues?.orderValue ?? 120,
  };

  const calculatorSchema = useMemo(
    () =>
      z.object({
        region: z
          .string()
          .refine((value) => regionOptions.includes(value), calculatorCopy.validationError),
        service: z
          .string()
          .refine((value) => serviceOptions.includes(value), calculatorCopy.serviceRequired),
        orderValue: z.number().min(0).max(5000),
      }),
    [calculatorCopy.serviceRequired, calculatorCopy.validationError, regionOptions, serviceOptions],
  );

  const tierMap = useMemo(() => {
    return resolvedTiers.reduce<Record<string, DeliveryTier>>((acc, tier) => {
      const key = `${tier.region}-${tier.service}`;
      acc[key] = tier;
      return acc;
    }, {});
  }, [resolvedTiers]);

  const availableServicesByRegion = useMemo(() => {
    return resolvedTiers.reduce<Record<string, DeliveryTier["service"][]>>((acc, tier) => {
      acc[tier.region] = acc[tier.region] ? [...acc[tier.region], tier.service] : [tier.service];
      return acc;
    }, {});
  }, [resolvedTiers]);

  const handleFinish = (values: FormValues) => {
    const parsed = calculatorSchema.safeParse(values);
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? calculatorCopy.validationError);
      setQuote(null);
      return;
    }

    setValidationError(null);

    const { region, service, orderValue } = parsed.data;
    const tier = tierMap[`${region}-${service}`];

    if (!tier) {
      setQuote(null);
      setValidationError(calculatorCopy.combinationError);
      return;
    }

    const qualifiesForFree =
      typeof tier.freeThresholdValue === "number" && orderValue >= tier.freeThresholdValue;

    const fulfilledCost = qualifiesForFree ? calculatorCopy.complimentaryLabel : tier.displayCost;

    const savingsLabel = qualifiesForFree
      ? formatMessage(calculatorCopy.savingsLabel, { amount: tier.displayCost })
      : undefined;

    setQuote({ tier, fulfilledCost, savingsLabel });
    trackEvent(
      "help_delivery_quote",
      { region, service, orderValue, qualifiesForFree },
      { locale, translationKey: "helpDelivery.calculator" },
    );
  };

  const selectedRegion = Form.useWatch("region", form);
  const availableServices = selectedRegion
    ? (availableServicesByRegion[selectedRegion] ?? [])
    : serviceOptions;
  const uniqueServices = Array.from(new Set(availableServices));

  return (
    <Card className="border-gray-200 bg-white/70">
      <Flex vertical gap={16}>
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0! text-2xl">
            {calculatorCopy.title}
          </Title>
          <Paragraph className="mb-0! text-gray-600">{calculatorCopy.subtitle}</Paragraph>
        </Flex>
        {validationError ? (
          <Alert type="error" showIcon message={validationError} className="border-red-200" />
        ) : null}
        <Form<FormValues>
          form={form}
          layout="vertical"
          initialValues={effectiveInitialValues}
          onFinish={handleFinish}
        >
          <Form.Item<FormValues> name="region" label={calculatorCopy.regionLabel}>
            <Select
              options={regionOptions.map((option) => ({
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
            label={calculatorCopy.serviceLabel}
            rules={[{ required: true, message: calculatorCopy.serviceRequired }]}
          >
            <Select
              placeholder={calculatorCopy.servicePlaceholder}
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
            label={calculatorCopy.orderValueLabel}
            rules={[{ required: true, message: calculatorCopy.orderValueRequired }]}
          >
            <InputNumber
              min={0}
              max={5000}
              className="w-full"
              controls={false}
              placeholder={calculatorCopy.orderValuePlaceholder}
              onChange={() => {
                setQuote(null);
                setValidationError(null);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit" size="large">
                {calculatorCopy.submitLabel}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
        {quote ? (
          <Result
            status="success"
            title={formatMessage(calculatorCopy.resultTitle, { amount: quote.fulfilledCost })}
            subTitle={
              <Flex vertical gap={4}>
                <Text className="text-gray-700">
                  {formatMessage(calculatorCopy.resultMeta, {
                    service: quote.tier.service,
                    eta: quote.tier.eta,
                    cutoff: quote.tier.cutoff,
                  })}
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
              {calculatorCopy.emptyPrompt}
            </Paragraph>
          </Card>
        )}
      </Flex>
    </Card>
  );
}
