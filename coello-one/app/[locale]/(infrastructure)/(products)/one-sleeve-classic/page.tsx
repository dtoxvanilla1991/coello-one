import { metaObject } from "config/site.config";
import OneSleeveClassic from "./OneSleeveClassic";

export const metadata = {
  ...metaObject(),
};

export default function OneSleeveClassicPage() {
  return <OneSleeveClassic />;
}
