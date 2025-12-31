"use client";

import { useCallback, useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Flex, Spin, Typography } from "antd";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Text } = Typography;

type SessionResponse = {
  clientSecret?: string;
  error?: string;
};

export function EmbeddedCheckoutExperience() {
  const checkoutCopy = useTranslations("checkout");
  const { embedded } = checkoutCopy;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestClientSecret = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as SessionResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? `Request failed with status ${response.status}`);
      }

      if (!payload.clientSecret) {
        throw new Error("Missing client secret in API response");
      }

      setClientSecret(payload.clientSecret);
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Failed to bootstrap embedded checkout", error);
      }
      setClientSecret(null);
      setErrorMessage(embedded.error);
    } finally {
      setIsLoading(false);
    }
  }, [embedded.error]);

  useEffect(() => {
    void requestClientSecret();
  }, [requestClientSecret]);

  const shouldRenderCheckout = Boolean(clientSecret && !isLoading && !errorMessage);

  return (
    <Flex vertical gap={24} className="min-h-screen bg-white px-4 py-12 md:px-10">
      <Flex vertical gap={8} className="max-w-3xl">
        <Title level={2} className="m-0! tracking-wide uppercase">
          {embedded.title}
        </Title>
        <Text className="text-base text-gray-500">{embedded.subtitle}</Text>
      </Flex>

      <Card className="w-full rounded-2xl! border border-gray-200! bg-white! shadow-sm">
        {isLoading && (
          <Flex
            vertical
            gap={16}
            align="center"
            justify="center"
            className="min-h-105 w-full"
          >
            <Spin size="large" />
            <Text className="text-sm text-gray-500">{embedded.loading}</Text>
          </Flex>
        )}

        {!isLoading && errorMessage && (
          <Flex vertical gap={16} align="center" className="w-full py-10">
            <Alert type="error" showIcon title={errorMessage} className="w-full max-w-lg" />
            <Button icon={<ReloadOutlined />} size="large" onClick={() => void requestClientSecret()}>
              {embedded.retry}
            </Button>
          </Flex>
        )}

        {shouldRenderCheckout && clientSecret ? <CheckoutForm clientSecret={clientSecret} /> : null}
      </Card>

      <Alert
        type="info"
        showIcon
        title={embedded.secureNote}
        description={embedded.secureDescription}
        className="w-full rounded-2xl! border border-gray-200!"
      />
    </Flex>
  );
}
