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
    <Row className="px-4 pb-2">
      <Col span={24}>
        <List
          size="small"
          className="flex justify-center"
          split={false}
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="!p-1 w-full">
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-200 p- text-xs font-semibold mx-auto">
                {item.title}
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
