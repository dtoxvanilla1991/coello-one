"use client";

import { Alert, Flex, Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";

const { Text } = Typography;

export function BagReservationAlert() {
  const bagCopy = useTranslations("bag");
  const reservationCopy = bagCopy.reservation;
  return (
    <Alert
      showIcon
      type="info"
      title={
        <Flex vertical gap={4}>
          <Text strong>{reservationCopy.title}</Text>
          <Text>{reservationCopy.body}</Text>
        </Flex>
      }
      className="rounded-2xl! border border-gray-200! bg-gray-50!"
    />
  );
}
