"use client";

import { Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
const { Text } = Typography;

type FooterProps = { "data-testid"?: string };

export default function FooterComponent(props: FooterProps) {
  return (
    <Footer
      data-testid={props["data-testid"]}
      className="border-t border-gray-300 text-center py-3">
      <Text type="secondary" className="text-sm">
        © 2025 Coello One Limited. All rights reserved.
      </Text>
    </Footer>
  );
}
