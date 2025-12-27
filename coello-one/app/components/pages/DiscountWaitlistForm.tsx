"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { Alert, Button, Flex, Input, Result, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { subscribeUser } from "@/components/SubscriptionForm/actions";
import type { DiscountsCopy } from "@/types/pages";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";

const { Paragraph, Text } = Typography;

type DiscountWaitlistFormProps = {
  copy: DiscountsCopy["form"];
  onSubscribe?: typeof subscribeUser;
  initialEmail?: string;
  hideTitle?: boolean;
};

export default function DiscountWaitlistForm({
  copy,
  onSubscribe = subscribeUser,
  initialEmail = "",
  hideTitle = false,
}: DiscountWaitlistFormProps) {
  const locale = useCurrentLocale();
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, copy.validation.required)
          .email(copy.validation.invalid)
          .refine((value) => !value.endsWith(".con"), copy.validation.refine),
      }),
    [copy.validation],
  );

  const handleSubmit = async (candidateEmail?: string) => {
    setErrorMessage(null);
    setFieldError(null);
    const parsed = schema.safeParse({ email: candidateEmail ?? email });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? copy.validation.invalid;
      setFieldError(message);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await onSubscribe(parsed.data.email);
      if (response.success) {
        setIsSuccess(true);
        setEmail("");
        trackEvent(
          "discount_waitlist_join",
          { channel: "email" },
          { locale, translationKey: "pages.discounts.form.submitLabel" },
        );
      } else {
        setErrorMessage(copy.validation.invalid);
      }
    } catch {
      setErrorMessage(copy.validation.invalid);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Result
        status="success"
        title={copy.successTitle}
        subTitle={copy.successDescription}
        extra={[
          <Button key="reset" onClick={() => setIsSuccess(false)}>
            {copy.submitLabel}
          </Button>,
        ]}
      />
    );
  }

  return (
    <Flex vertical gap={12}>
      <Flex vertical gap={6}>
        {hideTitle ? null : (
          <Text className="text-sm font-semibold text-gray-900">{copy.title}</Text>
        )}
        <Input
          aria-label={copy.title}
          type="email"
          placeholder={copy.emailPlaceholder}
          size="large"
          prefix={<MailOutlined className="text-gray-400" />}
          value={email}
          status={fieldError ? "error" : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          onPressEnter={(event) => {
            event.preventDefault();
            void handleSubmit(event.currentTarget.value);
          }}
        />
        {fieldError ? <Text className="text-xs text-red-500">{fieldError}</Text> : null}
      </Flex>
      {copy.description ? (
        <Paragraph className="-mt-1 mb-2 text-sm text-gray-600">{copy.description}</Paragraph>
      ) : null}
      {errorMessage ? (
        <Alert type="error" title={errorMessage} showIcon className="mb-2" />
      ) : null}
      <Button
        type="primary"
        size="large"
        loading={isSubmitting}
        block
        onClick={() => void handleSubmit(email)}
      >
        {copy.submitLabel}
      </Button>
      <Text className="mt-2 block text-xs text-gray-500">{copy.privacyNote}</Text>
    </Flex>
  );
}
