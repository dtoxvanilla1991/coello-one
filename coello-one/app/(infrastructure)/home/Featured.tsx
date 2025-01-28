"use client";

import { Typography, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import { PromoSection } from "./PromoSection";

const { Title } = Typography;

export function Featured() {
  return (
    <>
      <Content className="px-4 mt-4">
        {/* Featured Products (Placeholder) */}
        <Title level={4} className="mb-2">
          Featured
        </Title>
        <Row gutter={[8, 8]}>
          {Array.from({ length: 4 }, (_, i) => (
            <Col key={i} span={12}>
              <div className="bg-gray-100 h-36 flex items-center justify-center relative">
                <Image
                  src={`/athletes/main-secondary-${i + 1}.jpg`}
                  alt={`Coello One athlete ${i + 1}`}
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </Col>
          ))}
        </Row>
        <PromoSection />
      </Content>
    </>
  );
}
