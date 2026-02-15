"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Button, Card, Flex, Input, Spin, Typography } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { subscribeUser } from "./actions";

const { Title, Paragraph } = Typography;

const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => !email.endsWith(".con"), "Did you mean .com?")
    .refine((email) => email.includes("@"), "Email must contain @ symbol"),
});

const SubscriptionForm = () => {
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      setServerError("");
      const result = await subscribeUser(data.email);

      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(
          "Unable to subscribe at the moment. Please try again later." + error.message,
        );
      } else {
        setServerError("Unable to subscribe at the moment. Please try again later.");
      }
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <Flex justify="center" className="p-4">
        <Card className="w-full max-w-120 border-gray-200">
          <Flex vertical gap={16}>
            <Alert
              title="Subscription Activated!"
              description={
                <>
                  Thank you for subscribing! Please check your email for a confirmation link.
                  We&rsquo;re excited to keep you updated with our latest news.
                </>
              }
              type="success"
              showIcon
              icon={<MailOutlined className="text-green-500" />}
            />
            <Flex justify="center">
              <Button type="link" onClick={() => setIsSuccess(false)}>
                Subscribe another email
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex justify="center" className="p-4">
      <Card className="w-full max-w-120 border-gray-200">
        <Flex vertical gap={16}>
          <Flex vertical gap={4}>
            <Title level={2} className="text-center">
              Subscribe to Our Newsletter
            </Title>
            <Paragraph className="mb-0! text-center">
              Get the latest updates delivered to your inbox
            </Paragraph>
          </Flex>

          <Flex vertical gap={8}>
            <Input
              {...register("email")}
              placeholder="you@email.com"
              disabled={isSubmitting}
              status={errors.email ? "error" : ""}
              onPressEnter={() => void handleSubmit(onSubmit)()}
              suffix={
                isSubmitting ? (
                  <Spin indicator={<LoadingOutlined className="text-base" spin />} />
                ) : undefined
              }
            />

            {errors.email?.message ? (
              <Alert
                type="error"
                showIcon
                icon={<ExclamationCircleOutlined />}
                title={errors.email.message}
              />
            ) : null}

            {serverError ? (
              <Alert
                type="error"
                showIcon
                icon={<ExclamationCircleOutlined />}
                title={serverError}
              />
            ) : null}

            <Button
              type="primary"
              block
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={() => void handleSubmit(onSubmit)()}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SubscriptionForm;
