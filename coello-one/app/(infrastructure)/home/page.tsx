import { metaObject } from "config/site.config";
import { MainBanner } from "./MainBanner";
import { Featured } from "./Featured";
import SalesBlock from "./SalesBlock";
import Training from "./Training";

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
    </>
  );
}
