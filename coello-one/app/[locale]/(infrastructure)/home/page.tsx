import { metaObject } from "config/site.config";
import { MainBanner } from "./MainBanner";
import { Featured } from "./Featured";
import SalesBlock from "./SalesBlock";
import Training from "./Training";
import PopularSection from "./PopularSection";
import BrandListings from "./BrandListings";
import StoryBlock from "./StoryBlock";
import { Divider } from "antd";
import BottomMenu from "./BottomMenu";
import BottomMoreAboutSection from "./BottomMoreAboutSection";
import LegalLinks from "./LegalLinks";

export const metadata = {
  ...metaObject(),
};

export default function Home() {
  return (
    <>
      <MainBanner />
      <Featured />
      <SalesBlock />
      <Training />
      <PopularSection />
      <BrandListings />
  <Divider className="m-0! bg-gray-200 pb-1!" />
      <StoryBlock />
      <BottomMenu />
      <BottomMoreAboutSection />
      <LegalLinks />
    </>
  );
}
