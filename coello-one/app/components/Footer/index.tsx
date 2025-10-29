"use client";

import { Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
const { Text } = Typography;

export default function FooterComponent() {
  return (
    <Footer className="border-t border-gray-300 py-3 text-center">
      <Text type="secondary" className="text-sm">
        © 2025 Coello One Limited. All rights reserved.
      </Text>
    </Footer>
  );
}
