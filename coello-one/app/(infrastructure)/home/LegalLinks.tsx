"use client";

import { Col, Flex, Row } from "antd";
import Link from "next/link";
import { useTranslations } from "@/localization/useTranslations";

export default function LegalLinks() {
  const legalCopy = useTranslations("legal");

  return (
    <Row className="px-4 pb-2" justify="center">
      <Col span={24}>
        <Flex
          gap={8}
          justify="center"
          wrap
          aria-label={legalCopy.navigation.ariaLabel}
          role="list"
        >
          {legalCopy.navigation.links.map((item) => (
            <div key={item.id} className="p-1" role="listitem">
              <Link
                href={item.href}
                className="mx-auto text-xs font-semibold text-gray-600 hover:text-gray-200"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </Flex>
      </Col>
    </Row>
  );
}
