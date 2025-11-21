"use client";

import { Button, Card, Flex, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Text } = Typography;

export function WishlistCallout() {
  const bagCopy = useTranslations("bag");
  const wishlistCopy = bagCopy.wishlist;
  return (
    <Card className="rounded-2xl! border border-gray-200!">
      <Flex vertical gap={24} className="py-8">
        <Flex align="center" justify="center">
          <HeartFilled className="text-3xl text-black" />
        </Flex>
        <Flex vertical align="center" gap={12} className="text-center">
          <Title level={3} className="m-0! tracking-wide uppercase">
            {wishlistCopy.title}
          </Title>
          <Text className="max-w-xs text-gray-500">{wishlistCopy.description}</Text>
        </Flex>
        <Flex vertical gap={12} className="w-full">
          <Button type="primary" size="large" className="rounded-full! py-4 text-base! uppercase">
            {wishlistCopy.createAccount}
          </Button>
          <Button size="large" className="rounded-full! py-4 text-base! uppercase" ghost>
            {wishlistCopy.login}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
