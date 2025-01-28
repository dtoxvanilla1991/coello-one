import { metaObject } from "config/site.config";
import { MainBanner } from "./MainBanner";
import { Featured } from "./Featured";

export const metadata = {
  ...metaObject(),
};

export default function Home() {
  return (
    <>
      <MainBanner />
      <Featured />
    </>
  );
}
