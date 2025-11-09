import type { CartFit } from "@/store/cartStore";

export type ViewMode = "bag" | "wishlist";

export type ExtraItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  fit: CartFit;
  highlight?: string;
};
