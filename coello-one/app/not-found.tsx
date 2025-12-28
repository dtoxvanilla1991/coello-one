"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import NotFoundImg from "@public/ai-generated/not-found.svg";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Text } = Typography;

export default function NotFound() {
  const copy = useTranslations("systemPages").notFound;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Image
          src={NotFoundImg}
          alt={copy.imageAlt}
          className="xs:max-w-[370px] mx-auto mb-8 aspect-360/326 max-w-[256px] lg:mb-12 2xl:mb-16"
        />

        <Title
          level={1}
          className="text-gray-1000 text-[22px] leading-normal font-bold lg:text-3xl"
        >
          {copy.title}
        </Title>

        <Text className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
          {copy.body.primary}
          <br className="hidden sm:inline-block" />
          {copy.body.secondary}
        </Text>

        <Link href="/">
          <Button type="primary" size="large" className="mt-8 h-12 px-4 xl:h-14 xl:px-6">
            <HomeOutlined className="mr-1.5 text-lg" />
            {copy.buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
