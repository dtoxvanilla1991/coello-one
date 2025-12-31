"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Flex, Tag, Typography } from "antd";

const { Text } = Typography;

type StatusKey = "success" | "processing" | "open" | "error";

const STATUS_BADGE_COLOR: Record<StatusKey, string> = {
  success: "green",
  processing: "gold",
  open: "blue",
  error: "red",
};

type SafeOrderSnapshot = {
  sessionId: string;
  status: string | null;
  paymentStatus: string | null;
  currency: string | null;
  amountTotal: number | null;
  locale: string | null;
  updatedAt: string | null;
  createdAt: string | null;
  events: Array<{ type: string; created: number }>;
};

type ReturnCopy = {
  title: string;
  amountLabel: string;
  customerLabel: string;
  orderLabel: string;
  missingSession: string;
  ctaPrimary: string;
  ctaSecondary: string;
  success: { badge: string; body: string };
  processing: { badge: string; body: string };
  open: { badge: string; body: string };
  error: { badge: string; body: string };
};

export type ReturnOrderStatusClientProps = {
  sessionId: string;
  returnCopy: ReturnCopy;
  initialStatusKey: StatusKey;
};

function mapOrderToStatusKey(order: SafeOrderSnapshot | null): StatusKey {
  if (!order) {
    return "open";
  }

  if (order.status === "complete") {
    return order.paymentStatus === "paid" ? "success" : "processing";
  }

  if (order.status === "open") {
    return "open";
  }

  return "error";
}

export function ReturnOrderStatusClient({
  sessionId,
  returnCopy,
  initialStatusKey,
}: ReturnOrderStatusClientProps) {
  const [statusKey, setStatusKey] = useState<StatusKey>(initialStatusKey);
  const [events, setEvents] = useState<Array<{ type: string; created: number }>>([]);

  const statusCopy = returnCopy[statusKey];
  const shouldPoll = useMemo(
    () => statusKey === "open" || statusKey === "processing",
    [statusKey],
  );

  useEffect(() => {
    if (!shouldPoll) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 40;
    const intervalMs = 2500;
    let cancelled = false;
    let timer: number | null = null;

    const tick = async () => {
      attempts += 1;
      try {
        const response = await fetch(`/api/checkout/order?session_id=${encodeURIComponent(sessionId)}`);
        const payload = (await response.json().catch(() => null)) as
          | { order: SafeOrderSnapshot | null }
          | null;

        if (cancelled) {
          return;
        }

        const nextOrder = payload?.order ?? null;
        setStatusKey(mapOrderToStatusKey(nextOrder));
        setEvents(nextOrder?.events ?? []);
      } catch {
        // Swallow polling errors; server-rendered state remains visible.
      }

      if (attempts >= maxAttempts) {
        if (timer) {
          window.clearInterval(timer);
        }
      }
    };

    void tick();
    timer = window.setInterval(() => void tick(), intervalMs);

    return () => {
      cancelled = true;
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [sessionId, shouldPoll]);

  return (
    <Flex vertical gap={12}>
      <Flex gap={12} align="center">
        <Tag color={STATUS_BADGE_COLOR[statusKey]}>{statusCopy.badge}</Tag>
        <Text className="text-xs text-gray-500">
          {returnCopy.orderLabel}: <strong>{sessionId}</strong>
        </Text>
      </Flex>

      <Text className="text-base text-gray-600">{statusCopy.body}</Text>

      {events.length > 0 ? (
        <Alert
          type="info"
          showIcon
          title={events[0]?.type ?? ""}
          description={
            <Flex vertical gap={4}>
              {events.slice(0, 6).map((event) => (
                <Text key={`${event.type}:${event.created}`} className="text-xs text-gray-500">
                  {event.type} · {new Date(event.created * 1000).toLocaleString()}
                </Text>
              ))}
            </Flex>
          }
          className="rounded-xl! border border-gray-200!"
        />
      ) : null}
    </Flex>
  );
}
