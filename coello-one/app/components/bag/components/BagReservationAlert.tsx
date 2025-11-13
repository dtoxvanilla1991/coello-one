"use client";

import { Alert, Flex, Typography } from "antd";

const { Text } = Typography;

export function BagReservationAlert() {
  return (
    <Alert
      showIcon
      type="info"
      message={
        <Flex vertical gap={4}>
          <Text strong>Your items are not reserved</Text>
          <Text>Checkout quickly to make sure you do not miss out.</Text>
        </Flex>
      }
      className="rounded-2xl! border border-gray-200! bg-gray-50!"
    />
  );
}
