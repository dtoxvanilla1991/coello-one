import { metaObject } from "config/site.config";
import { MainBanner } from "./MainBanner";
import { Featured } from "./Featured";
import SalesBlock from "./SalesBlock";

export const metadata = {
  ...metaObject(),
};

export default function Home() {
  return (
    <>
      <MainBanner />
      <Featured />
      <SalesBlock />
    </>
  );
}
