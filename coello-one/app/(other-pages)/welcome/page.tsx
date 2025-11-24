"use client";

import Image from "next/image";
import { Typography, Button } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import WelcomeImg from "@public/ai-generated/welcome.svg";
import WelcomeTwoImg from "@public/ai-generated/welcome-2.svg";

const { Title, Text } = Typography;

export default function WelcomePage() {
  const copy = useTranslations("systemPages").welcome;

  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="3xl:max-w-[1520px] mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start">
        <div>
          <Title
            level={2}
            className="3xl:text-5xl 3xl:leading-snug mb-3 text-[22px] leading-snug font-bold sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px]"
          >
            {copy.title[0]} <br />
            {copy.title[1]}
          </Title>

          <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            {copy.body.primary}
            <br className="hidden sm:inline-block lg:hidden" />
            {copy.body.secondary}
          </Text>

          <div className="mt-8 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start xl:gap-6">
            <Button type="primary" size="large" className="h-12 px-4 xl:h-14 xl:px-6">
              {copy.actions.primary}
            </Button>

            <Button size="large" type="default" className="h-12 px-4 xl:h-14 xl:px-6">
              {copy.actions.secondary}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Image
            src={WelcomeImg}
            alt={copy.images.primaryAlt}
            className="3xl:max-w-[632px] aspect-632/630 max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl"
          />
          <Image
            src={WelcomeTwoImg}
            alt={copy.images.secondaryAlt}
            className="absolute top-1/2 left-0 z-10 aspect-275/390 max-w-[100px] -translate-y-1/2 lg:max-w-[210px]"
          />
          <div className="bg-gray-1000/50 mx-auto h-20 w-32 transform-[rotateX(80deg)] blur-[57px]" />
          <div className="bg-gray-1000/50 absolute bottom-10 left-3 mx-auto h-20 w-32 transform-[rotateX(80deg)] blur-[57px] lg:left-7" />
        </div>
      </div>
    </div>
  );
}
