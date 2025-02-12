"use client";

import { Col, List, Row } from "antd";
import Link from "next/link";

const createListOption = (title: string, href: string) => {
  return { title, href };
};

const data = [
  createListOption("Privacy Notice", "/privacy-notice"),
  createListOption("Terms & Conditions", "/terms-conditions"),
  createListOption("Terms of Use", "/terms-of-use"),
  createListOption("Cookie Policy", "/cookie-policy"),
];

export default function LegalLinks() {
  return (
    <Row className="px-4 py-2">
      <Col span={24}>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-200">
                {item.title}
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
