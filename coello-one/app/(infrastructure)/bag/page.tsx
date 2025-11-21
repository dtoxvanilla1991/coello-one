import type { Metadata } from "next";
import { BagContent } from "@/components/bag/BagContent";

export const metadata: Metadata = {
  title: "Bag | Coello One",
  description: "Review your selected Coello One pieces and get ready to checkout.",
};

export default function BagPage() {
  return <BagContent />;
}
