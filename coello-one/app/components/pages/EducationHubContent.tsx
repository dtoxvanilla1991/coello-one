"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button, Card, Flex, Modal, Tag, Typography } from "antd";
import type { EducationHubCopy, ProtocolCardCopy } from "@/types/pages";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import BrandPageShell from "./BrandPageShell";

const { Title, Paragraph, Text } = Typography;

type EducationHubContentProps = {
  copy: EducationHubCopy;
};

export default function EducationHubContent({ copy }: EducationHubContentProps) {
  const locale = useCurrentLocale();
  const [activeProtocol, setActiveProtocol] = useState<ProtocolCardCopy | null>(null);

  const handleProtocolOpen = (protocol: ProtocolCardCopy) => {
    setActiveProtocol(protocol);
    trackEvent(
      "education_hub_protocol_modal_open",
      { protocolId: protocol.id },
      { locale, translationKey: `pages.educationHub.protocols.${protocol.id}` },
    );
  };

  const handleModalClose = () => {
    setActiveProtocol(null);
  };

  const handleDeepDiveClick = (protocol: ProtocolCardCopy) => {
    trackEvent(
      "education_hub_protocol_deep_dive",
      { protocolId: protocol.id },
      { locale, translationKey: `pages.educationHub.protocols.${protocol.id}` },
    );
  };

  const modalTitle = useMemo(() => {
    if (!activeProtocol) {
      return null;
    }

    return (
      <Flex vertical gap={4}>
        <Text className="text-xs tracking-[0.4em] text-gray-500 uppercase">{activeProtocol.code}</Text>
        <Title level={4} className="mb-0! text-lg">
          {copy.ui.modalTitlePrefix}: {activeProtocol.title}
        </Title>
      </Flex>
    );
  }, [activeProtocol, copy.ui.modalTitlePrefix]);

  return (
    <BrandPageShell hero={copy.hero}>
      <Flex vertical gap={24} className="mt-6">
        <Flex gap={16} wrap>
          {copy.protocols.map((protocol) => (
            <Card
              key={protocol.id}
              hoverable
              className="w-full border-gray-200 bg-white/70 backdrop-blur lg:w-[calc(50%-8px)]"
              actions={[
                <Button
                  key="protocol-cta"
                  type="link"
                  href={protocol.deepDive.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold"
                  onClick={() => handleDeepDiveClick(protocol)}
                >
                  {protocol.deepDive.label}
                </Button>,
              ]}
            >
              <Flex vertical gap={16}>
                <Flex align="center" justify="space-between" wrap>
                  <Tag className="border-gray-200 text-xs tracking-[0.3em] uppercase text-gray-600">
                    {protocol.code}
                  </Tag>
                  <Button type="text" onClick={() => handleProtocolOpen(protocol)}>
                    {copy.ui.openTlDrLabel}
                  </Button>
                </Flex>
                <Flex vertical gap={4}>
                  <Text className="text-xs uppercase tracking-[0.4em] text-gray-500">
                    {protocol.subtitle}
                  </Text>
                  <Title level={3} className="mb-0! text-2xl">
                    {protocol.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{protocol.tagline}</Paragraph>
                </Flex>
                <Paragraph className="mb-0! text-base text-gray-700">{protocol.summary}</Paragraph>
                <Card className="border-gray-200 bg-black text-white">
                  <Image
                    src={protocol.image}
                    alt={protocol.imageAlt}
                    width={640}
                    height={420}
                    className="h-auto w-full rounded-md object-cover"
                    priority={protocol.id === copy.protocols[0].id}
                  />
                </Card>
                <Flex vertical gap={4}>
                  <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    {copy.ui.scienceLabel}
                  </Text>
                  <Title level={4} className="mb-0! text-lg">
                    {protocol.science.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{protocol.science.description}</Paragraph>
                </Flex>
                <Flex vertical gap={4}>
                  <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    {copy.ui.actionLabel}
                  </Text>
                  <Paragraph className="mb-0! text-gray-700">{protocol.action}</Paragraph>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Modal
        open={Boolean(activeProtocol)}
        title={modalTitle}
        onCancel={handleModalClose}
        footer={
          <Flex gap={12} wrap justify="space-between">
            <Button onClick={handleModalClose}>{copy.ui.closeLabel}</Button>
            {activeProtocol ? (
              <Button
                type="primary"
                href={activeProtocol.deepDive.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleDeepDiveClick(activeProtocol)}
              >
                {activeProtocol.deepDive.label}
              </Button>
            ) : null}
          </Flex>
        }
        destroyOnHidden
        centered
        width={720}
      >
        {activeProtocol ? (
          <Flex vertical gap={16}>
            <Card className="border-gray-200 bg-gray-50">
              <Flex vertical gap={8}>
                <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                  {copy.ui.scienceLabel}
                </Text>
                <Title level={4} className="mb-0! text-lg">
                  {activeProtocol.science.title}
                </Title>
                <Paragraph className="mb-0! text-gray-600">
                  {activeProtocol.science.description}
                </Paragraph>
              </Flex>
            </Card>
            <Card className="border-gray-200">
              <Flex vertical gap={8}>
                <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                  {copy.ui.actionLabel}
                </Text>
                <Paragraph className="mb-0! text-gray-700">{activeProtocol.action}</Paragraph>
              </Flex>
            </Card>
            <Flex gap={16} wrap>
              <Card className="w-full border-gray-200 bg-gray-50 md:w-[calc(50%-8px)]">
                <Flex vertical gap={8}>
                  <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    {copy.ui.tlDrHeading}
                  </Text>
                  <Flex vertical gap={4} role="list">
                    {activeProtocol.tlDr.map((item) => (
                      <div key={item} role="listitem">
                        <Paragraph className="mb-0! text-gray-700">{item}</Paragraph>
                      </div>
                    ))}
                  </Flex>
                </Flex>
              </Card>
              <Card className="w-full border-gray-200 md:w-[calc(50%-8px)]">
                <Flex vertical gap={8}>
                  <Text className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    {copy.ui.microDoseHeading}
                  </Text>
                  <Flex vertical gap={4} role="list">
                    {activeProtocol.microDose.map((item) => (
                      <div key={item} role="listitem">
                        <Paragraph className="mb-0! text-gray-700">{item}</Paragraph>
                      </div>
                    ))}
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Flex>
        ) : null}
      </Modal>
    </BrandPageShell>
  );
}
