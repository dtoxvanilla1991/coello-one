"use client";

import { Alert, Button, Card, Flex, Form, Input, Result, Select, Typography } from "antd";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { trackEvent } from "@/utils/trackEvent";

const { Paragraph, Text } = Typography;

const RESOLUTION_OPTIONS = ["Refund", "Exchange"] as const;
const COURIER_OPTIONS = ["DPD Pickup", "Royal Mail Drop", "DHL Express"] as const;

const returnSchema = z.object({
  orderId: z
    .string()
    .trim()
    .min(6, "Order number should be at least 6 characters.")
    .max(12, "Order number is too long."),
  email: z.string().email("Enter a valid email."),
  reason: z.string().min(1, "Select a reason for returning."),
  resolution: z.enum(RESOLUTION_OPTIONS),
  courier: z.enum(COURIER_OPTIONS),
  notes: z
    .string()
    .max(400, "Notes cannot exceed 400 characters.")
    .optional()
    .or(z.literal(""))
    .transform((value) => value ?? ""),
});

type ReturnFormValues = z.infer<typeof returnSchema>;

type ReturnRequestFormProps = {
  defaultEmail?: string;
  initialValues?: Partial<ReturnFormValues>;
};

const reasonOptions = ["Fit wasn't right", "Changed my mind", "Gift return", "Product issue"];

const getTimestamp = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

export default function ReturnRequestForm({
  defaultEmail,
  initialValues: initialOverrides = {},
}: ReturnRequestFormProps) {
  const [form] = Form.useForm<ReturnFormValues>();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ReturnFormValues | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const initialValues: Partial<ReturnFormValues> = useMemo(
    () => ({
      resolution: "Refund",
      courier: "DPD Pickup",
      reason: reasonOptions[0],
      email: defaultEmail,
      ...initialOverrides,
    }),
    [defaultEmail, initialOverrides],
  );

  const resetTimer = () => {
    startTimeRef.current = null;
  };

  const registerInteraction = () => {
    if (startTimeRef.current === null) {
      startTimeRef.current = getTimestamp();
    }
  };

  const handleFinish = (values: ReturnFormValues) => {
    trackEvent("help_return_request_attempt", {
      resolution: values.resolution,
      courier: values.courier,
      reason: values.reason,
    });
    const parsed = returnSchema.safeParse(values);
    if (!parsed.success) {
      const issueMessage = parsed.error.issues[0]?.message ?? "Please review the form inputs.";
      setSubmissionError(issueMessage);
      setConfirmation(null);
      trackEvent("help_return_request_error", {
        resolution: values.resolution,
        courier: values.courier,
        reason: values.reason,
        message: issueMessage,
      });
      return;
    }

    setSubmissionError(null);
    const payload = parsed.data;
    setConfirmation(payload);
    const startedAt = startTimeRef.current ?? getTimestamp();
    const responseTimeMs = Math.round(getTimestamp() - startedAt);
    trackEvent("help_return_request", {
      resolution: payload.resolution,
      courier: payload.courier,
      reason: payload.reason,
      responseTimeMs,
    });
    resetTimer();
  };

  const handleRetry = () => {
    setConfirmation(null);
    setSubmissionError(null);
    resetTimer();
  };

  if (confirmation) {
    return (
      <Result
        status="success"
        title="Return request logged"
        subTitle={
          <Flex vertical gap={4}>
            <Text className="text-gray-700">Order {confirmation.orderId}</Text>
            <Text className="text-gray-500">
              We emailed {confirmation.email} with your prepaid label and exchange instructions.
            </Text>
          </Flex>
        }
        extra={
          <Button type="primary" onClick={handleRetry}>
            Start another return
          </Button>
        }
      />
    );
  }

  return (
    <Card className="border-gray-200 bg-white/70">
      <Flex vertical gap={16}>
        <Paragraph className="mb-0! text-gray-600">
          Share your order details and pick the resolution you want. Our concierge team reviews
          submissions instantly.
        </Paragraph>
        {submissionError ? (
          <Alert type="error" showIcon message={submissionError} className="border-red-200" />
        ) : null}
        <Form<ReturnFormValues>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleFinish}
          onFocusCapture={registerInteraction}
        >
          <Form.Item<ReturnFormValues>
            name="orderId"
            label="Order number"
            rules={[
              { required: true, message: "Enter the order number from your confirmation email." },
            ]}
          >
            <Input placeholder="e.g. COELLO123" onChange={() => setSubmissionError(null)} />
          </Form.Item>
          <Form.Item<ReturnFormValues>
            name="email"
            label="Email address"
            rules={[{ required: true, message: "Enter the email used at checkout." }]}
          >
            <Input type="email" onChange={() => setSubmissionError(null)} />
          </Form.Item>
          <Form.Item<ReturnFormValues>
            name="reason"
            label="Reason for returning"
            rules={[{ required: true, message: "Select why you're returning." }]}
          >
            <Select
              options={reasonOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={() => setSubmissionError(null)}
            />
          </Form.Item>
          <Form.Item<ReturnFormValues>
            name="resolution"
            label="Resolution preference"
            rules={[{ required: true, message: "Choose refund or exchange." }]}
          >
            <Select
              options={RESOLUTION_OPTIONS.map((option) => ({ label: option, value: option }))}
              onChange={() => setSubmissionError(null)}
            />
          </Form.Item>
          <Form.Item<ReturnFormValues>
            name="courier"
            label="Preferred courier"
            rules={[{ required: true, message: "Pick your courier option." }]}
          >
            <Select
              options={COURIER_OPTIONS.map((option) => ({ label: option, value: option }))}
              onChange={() => setSubmissionError(null)}
            />
          </Form.Item>
          <Form.Item<ReturnFormValues>
            name="notes"
            label="Notes for the concierge team"
            rules={[{ max: 400, message: "Keep notes under 400 characters." }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Optional details on fit or product feedback"
              onChange={() => setSubmissionError(null)}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit" size="large">
                Generate return label
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}
