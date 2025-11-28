"use client";

import { Col, List, Row } from "antd";
import Link from "next/link";
import { useTranslations } from "@/localization/useTranslations";

export default function LegalLinks() {
  const legalCopy = useTranslations("legal");

  return (
    <Row className="px-4 pb-2" justify="center">
      <Col span={24}>
        <List
          size="small"
          className="flex justify-center"
          split={false}
          aria-label={legalCopy.navigation.ariaLabel}
          dataSource={legalCopy.navigation.links}
          rowKey="id"
          renderItem={(item) => (
            <List.Item className="w-full p-1!">
              <Link
                href={item.href}
                className="mx-auto text-xs font-semibold text-gray-600 hover:text-gray-200"
              >
                {item.label}
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
