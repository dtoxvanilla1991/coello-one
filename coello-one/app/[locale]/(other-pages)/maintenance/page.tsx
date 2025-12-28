"use client";

import Image from "next/image";
// broken image
// import MaintenanceImg from "@public/ai-generated/under-maintenance.svg";
import MaintenanceImg from "@public/ai-generated/welcome.svg";
import { Typography } from "antd";
import { useTranslations } from "@/localization/useTranslations";
import SubscriptionForm from "@components/SubscriptionForm";

export default function MaintenancePage() {
  const { Title, Text } = Typography;
  const copy = useTranslations("systemPages").maintenance;
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto flex w-full max-w-[1520px] flex-col-reverse items-center justify-between gap-5 text-center lg:flex-row lg:text-start">
        <div>
          <Title className="text-gray-1000 3xl:text-5xl 3xl:leading-snug mb-3 text-[22px] leading-snug font-bold sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px]">
            {copy.title[0]} <br className="hidden sm:inline-block" />
            {copy.title[1]}
          </Title>
          <Text className="mb-6 text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            {copy.body.primary}
            <br className="hidden md:inline-block lg:hidden xl:inline-block" />
            {copy.body.secondary}
          </Text>
          <Text className="mt-8 mb-4 text-sm leading-normal font-semibold text-gray-800 md:mt-10 xl:mt-12 xl:mb-6 xl:text-base">
            {copy.subscribePrompt}
          </Text>
          <SubscriptionForm />
        </div>
        <div className="pt-5 lg:pt-0">
          <Image
            src={MaintenanceImg}
            alt={copy.imageAlt}
            width={768}
            height={558}
            // className="aspect-768/558 max-w-[320px] dark:invert sm:max-w-sm xl:max-w-[580px] 2xl:max-w-[768px]"
          />
        </div>
      </div>
    </div>
  );
}
