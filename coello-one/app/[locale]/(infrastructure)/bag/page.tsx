import type { Metadata } from "next";
import { BagContent } from "@/components/bag/BagContent";
import { getNamespaceCopy } from "@/localization/dictionary";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "bag");
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function BagPage() {
  return <BagContent />;
}
