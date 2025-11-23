"use client";

import { Card, Flex, List, Tag, Typography } from "antd";
import ContactForm from "./ContactForm";

const { Title, Paragraph, Text, Link } = Typography;

const contactChannels = [
  {
    title: "Concierge chat",
    description: "WhatsApp +44 20 1234 5678 · iMessage concierge@coello.one",
    availability: "08:00 – 00:00 GMT",
  },
  {
    title: "Email support",
    description: "support@coello.one",
    availability: "Replies within 4 business hours",
  },
  {
    title: "Phone",
    description: "+44 20 7654 3210",
    availability: "Monday to Friday, 09:00 – 18:00 GMT",
  },
];

type ContactPageContentProps = {
  faqHref: string;
};

export default function ContactPageContent({ faqHref }: ContactPageContentProps) {
  return (
    <Flex vertical gap={24}>
      <Card className="border-gray-200 bg-white/70">
        <Flex vertical gap={16}>
          <Title level={3} className="mb-0! text-2xl">
            Concierge channels
          </Title>
          <Flex gap={16} wrap>
            {contactChannels.map((channel) => (
              <Card
                key={channel.title}
                className="w-full border-gray-200 md:max-w-[300px] md:flex-1"
              >
                <Flex vertical gap={8}>
                  <Title level={4} className="mb-0! text-lg font-semibold">
                    {channel.title}
                  </Title>
                  <Paragraph className="mb-0! text-gray-600">{channel.description}</Paragraph>
                  <Tag color="blue" className="w-fit tracking-wide uppercase">
                    {channel.availability}
                  </Tag>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card className="border-gray-200">
        <Flex vertical gap={8}>
          <Title level={3} className="mb-0! text-2xl">
            Send us a message
          </Title>
          <Paragraph className="mb-0! text-gray-600">
            Share your question below. We route directly to the right specialist based on your
            topic.
          </Paragraph>
        </Flex>
      </Card>

      <ContactForm />

      <Card className="border-gray-200 bg-white/60">
        <Flex vertical gap={12}>
          <Title level={4} className="mb-0! text-lg font-semibold">
            Response standards
          </Title>
          <List
            dataSource={[
              "Chat: under 2 minutes during staffed hours",
              "Email: within 4 business hours",
              "VIP members: priority routing with optional video styling sessions",
            ]}
            renderItem={(item) => (
              <List.Item className="px-0">
                <Paragraph className="mb-0! text-gray-600">{item}</Paragraph>
              </List.Item>
            )}
          />
          <Text className="text-sm text-gray-500">
            Need instant answers? Browse the{" "}
            <Link href={faqHref} className="font-semibold text-gray-900">
              FAQ
            </Link>{" "}
            any time.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
