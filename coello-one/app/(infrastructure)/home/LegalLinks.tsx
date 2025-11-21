"use client";

import { Col, List, Row } from "antd";
import Link from "next/link";

const createListOption = (title: string, href: string) => {
  return { title, href };
};

const data = [
  createListOption("Terms & Conditions", "/terms-conditions"),
  createListOption("Privacy Notice", "/privacy-notice"),
  createListOption("Terms of Use", "/terms-of-use"),
  createListOption("Cookie Policy", "/cookie-policy"),
];

export default function LegalLinks() {
  return (
    <Row className="px-4 pb-2" justify="center">
      <Col span={24}>
        <List
          size="small"
          className="flex justify-center"
          split={false}
          aria-label="Legal policies"
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="w-full p-1!">
              <Link
                href={item.href}
                className="mx-auto text-xs font-semibold text-gray-600 hover:text-gray-200"
              >
                {item.title}
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
