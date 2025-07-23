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
    <Row className="px-4 pb-2" data-testid="legal-links">
      <Col span={24}>
        <List
          size="small"
          className="flex justify-center"
          split={false}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              className="p-1! w-full"
              data-testid={`legal-links-item-${index}`}>
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
