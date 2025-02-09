"use client";

import { Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
const { Text } = Typography;

export default function FooterComponent() {
  return (
    <Footer className="border-t border-gray-300 text-center py-3">
      <Text type="secondary" className="text-sm">
        © 2025 Coello One. All rights reserved.
      </Text>
    </Footer>
  );
}
