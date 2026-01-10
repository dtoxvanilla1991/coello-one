import { metaObject } from "config/site.config";
import OneSleeveClassic from "./OneSleeveClassic";
import { getProductSpecs } from "@services/productSpecsService";
import { PRODUCT_NAME_SLUG } from "./constants";

export const metadata = {
  ...metaObject(),
};

export default async function OneSleeveClassicPage() {
  const specs = await getProductSpecs(PRODUCT_NAME_SLUG);
  return <OneSleeveClassic productData={specs?.data} />;
}
