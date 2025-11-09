"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Alert, Spin, Typography } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { subscribeUser } from "./actions";

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
      <div className="mx-auto max-w-[480px] p-4">
        <Alert
          message="Subscription Activated!"
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
        <div className="mt-4 text-center">
          <Button type="link" onClick={() => setIsSuccess(false)}>
            Subscribe another email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[480px] p-4">
      <Typography.Title level={2} className="text-center">
        Subscribe to Our Newsletter
      </Typography.Title>
      <Typography.Paragraph className="mb-6 text-center">
        Get the latest updates delivered to your inbox
      </Typography.Paragraph>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <Input
            {...register("email")}
            placeholder="you@email.com"
            disabled={isSubmitting}
            status={errors.email ? "error" : ""}
            suffix={
              isSubmitting ? (
                <Spin indicator={<LoadingOutlined className="text-base" spin />} />
              ) : undefined
            }
          />

          {/* Inline Error Messages */}
          {errors.email && (
            <div className="mt-2 flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-1" />
              <span>{errors.email.message}</span>
            </div>
          )}

          {serverError && (
            <div className="mt-2 flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-1" />
              <span>{serverError}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
