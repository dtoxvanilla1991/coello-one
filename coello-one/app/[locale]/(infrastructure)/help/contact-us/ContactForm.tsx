"use client";

import { Alert, Button, Card, Flex, Form, Input, Result, Select, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { trackEvent } from "@/utils/trackEvent";

const { Paragraph, Text } = Typography;

const TOPICS = [
  "Order support",
  "Product styling",
  "Membership & concierge",
  "Partnership enquiry",
] as const;

const CHANNELS = ["Email", "WhatsApp", "Phone"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name so we know how to greet you."),
  email: z.string().email("Use a valid email address."),
  topic: z.enum(TOPICS),
  channel: z.enum(CHANNELS),
  message: z
    .string()
    .trim()
    .min(10, "Let us know how we can help—add at least 10 characters.")
    .max(1000, "Keep your message under 1000 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  defaultEmail?: string;
  initialValues?: Partial<ContactFormValues>;
};

export default function ContactForm({
  defaultEmail,
  initialValues: initialOverrides = {},
}: ContactFormProps) {
  const [form] = Form.useForm<ContactFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState<ContactFormValues | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const initialValues = useMemo(
    () => ({
      channel: "Email",
      topic: TOPICS[0],
      email: defaultEmail,
      ...initialOverrides,
    }),
    [defaultEmail, initialOverrides],
  );

  const getTimestamp = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

  const resetTimer = () => {
    startTimeRef.current = getTimestamp();
  };

  useEffect(() => {
    startTimeRef.current = getTimestamp();
  }, []);

  const handleFinish = (values: ContactFormValues) => {
    trackEvent("help_contact_request_attempt", {
      topic: values.topic,
      channel: values.channel,
    });
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please double-check your inputs.");
      setComplete(null);
      trackEvent("help_contact_request_error", {
        topic: values.topic,
        channel: values.channel,
        reason: parsed.error.issues[0]?.message ?? "unknown",
      });
      return;
    }

    setError(null);
    setComplete(parsed.data);
    const startedAt = startTimeRef.current ?? getTimestamp();
    const responseTimeMs = Math.round(getTimestamp() - startedAt);
    trackEvent("help_contact_request", {
      topic: parsed.data.topic,
      channel: parsed.data.channel,
      responseTimeMs,
    });
    resetTimer();
  };

  const resetForm = () => {
    setComplete(null);
    setError(null);
    form.resetFields();
    resetTimer();
  };

  if (complete) {
    return (
      <Result
        status="success"
        title="Message received"
        subTitle={
          <Flex vertical gap={4}>
            <Text className="text-gray-700">
              We will reply via {complete.channel.toLowerCase()} shortly.
            </Text>
            <Text className="text-gray-500">Reference topic: {complete.topic}</Text>
          </Flex>
        }
        extra={
          <Button type="primary" onClick={resetForm}>
            Send another message
          </Button>
        }
      />
    );
  }

  return (
    <Card className="border-gray-200 bg-white/70">
      <Flex vertical gap={16}>
        <Paragraph className="mb-0! text-gray-600">
          Our concierge team responds within minutes between 08:00 and 00:00 GMT. Choose your
          preferred channel and we will pick up from there.
        </Paragraph>
        {error ? <Alert type="error" showIcon title={error} className="border-red-200" /> : null}
        <Form<ContactFormValues>
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleFinish}
        >
          <Form.Item<ContactFormValues>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please share your name." }]}
          >
            <Input placeholder="Your name" onChange={() => setError(null)} />
          </Form.Item>
          <Form.Item<ContactFormValues>
            name="email"
            label="Email"
            rules={[{ required: true, message: "We need your email to follow up." }]}
          >
            <Input type="email" placeholder="name@example.com" onChange={() => setError(null)} />
          </Form.Item>
          <Form.Item<ContactFormValues>
            name="topic"
            label="Topic"
            rules={[{ required: true, message: "Select the topic that best fits." }]}
          >
            <Select
              options={TOPICS.map((topic) => ({
                label: topic,
                value: topic,
              }))}
              onChange={() => setError(null)}
            />
          </Form.Item>
          <Form.Item<ContactFormValues>
            name="channel"
            label="Preferred channel"
            rules={[{ required: true, message: "Pick how we should contact you." }]}
          >
            <Select
              options={CHANNELS.map((channel) => ({
                label: channel,
                value: channel,
              }))}
              onChange={() => setError(null)}
            />
          </Form.Item>
          <Form.Item<ContactFormValues>
            name="message"
            label="How can we help?"
            rules={[{ required: true, message: "Tell us more about what you need." }]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Include order numbers, sizing questions, or feedback"
              onChange={() => setError(null)}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit" size="large">
                Send message
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
}
