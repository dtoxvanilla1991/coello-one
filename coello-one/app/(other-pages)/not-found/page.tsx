"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import NotFoundImg from "@public/ai-generated/not-found.svg";

const { Title, Text } = Typography;

export default function NotFoundPage() {
  const { push } = useRouter();

  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Image
          src={NotFoundImg}
          alt="not found"
          className="xs:max-w-[370px] mx-auto mb-8 aspect-360/326 max-w-[256px] lg:mb-12 2xl:mb-16"
        />

        <Title
          level={1}
          className="text-gray-1000 text-[22px] leading-normal font-bold lg:text-3xl"
        >
          Sorry, the page not found
        </Title>

        <Text className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
          We have been spending long hours in order to launch our new website. Join our
          <br className="hidden sm:inline-block" />
          mailing list or follow us on Facebook for the latest update.
        </Text>

        <Button
          type="primary"
          size="large"
          className="mt-8 h-12 px-4 xl:h-14 xl:px-6"
          onClick={() => push("/")}
        >
          <HomeOutlined className="mr-1.5 text-lg" />
          Back to home
        </Button>
      </div>
    </div>
  );
}
