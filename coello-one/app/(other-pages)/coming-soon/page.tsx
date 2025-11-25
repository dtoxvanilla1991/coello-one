import Image from "next/image";
import ComingSoonImg from "@public/ai-generated/coming-soon.svg";
import ComingSoonTwoImg from "@public/ai-generated/coming-soon-2.svg";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import CountdownTimer from "./countdown-timer";
import SubscriptionForm from "@components/SubscriptionForm";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export default async function ComingSoonPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "systemPages").comingSoon;

  return (
    <div className="relative flex grow flex-col-reverse items-center justify-center gap-y-5 px-6 pt-10 lg:flex-row lg:pt-0 xl:px-10">
      <div className="z-10 mx-auto w-full max-w-[1536px] text-center lg:text-start">
        <Title
          level={1}
          className="text-gray-1000 mb-3 text-2xl font-bold md:mb-5 md:text-3xl md:leading-snug xl:text-4xl xl:leading-normal 2xl:text-5xl 2xl:leading-normal"
        >
          {copy.title[0]} <br className="hidden sm:inline-block" /> {copy.title[1]}
        </Title>
        <p className="mb-6 text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
          {copy.body.primary}
          <br className="hidden sm:inline-block" />
          {copy.body.secondary}
        </p>
        <div className="flex justify-center lg:justify-start">
          <CountdownTimer labels={copy.countdown.labels} />
        </div>
        <p className="mt-8 mb-4 text-sm leading-normal font-semibold text-gray-800 md:mt-10 xl:mt-12 xl:mb-6 xl:text-base">
          {copy.subscribePrompt}
        </p>
        <SubscriptionForm />
      </div>

      <Image
        src={ComingSoonTwoImg}
        alt={copy.images.primaryAlt}
        className="3xl:inline-block 3xl:w-32 fixed start-0 top-0 hidden w-28 rtl:rotate-90 dark:invert"
      />
      <div className="3xl:end-[15%] end-10 top-1/2 lg:absolute lg:-translate-y-1/2 xl:end-[10%]">
        <Image
          src={ComingSoonImg}
          alt={copy.images.secondaryAlt}
          className="3xl:max-w-[531px] aspect-531/721 max-w-[194px] md:max-w-[256px] lg:max-w-sm xl:max-w-[400px]"
        />
      </div>

      <PLusIconPatterns />
    </div>
  );
}

function PLusIconPatterns() {
  return (
    <>
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-5 top-5 hidden [--popup-delay:200ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-3 bottom-5 hidden [--popup-delay:200ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[20%] top-5 hidden [--popup-delay:300ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[7%] top-1/3 hidden rotate-45 [--popup-delay:100ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[10%] bottom-[10%] hidden rotate-45 text-xl [--popup-delay:150ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[20%] top-[20%] hidden [--popup-delay:300ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[40%] top-[20%] hidden [--popup-delay:400ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[48%] top-10 hidden text-[10px] [--popup-delay:500ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[40%] top-1/2 hidden rotate-45 text-xl [--popup-delay:250ms] lg:inline-block" />
      <PlusOutlined className="animate-popup text-gray-1000 absolute end-[38%] bottom-10 hidden [--popup-delay:200ms] lg:inline-block" />
    </>
  );
}
