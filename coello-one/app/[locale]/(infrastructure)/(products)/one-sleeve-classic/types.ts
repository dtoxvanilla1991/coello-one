export type Gender = "male" | "female";

export type Color = {
  name: string;
  swatchClass: string;
  ringClass: string;
};

export type SizeGuideRow = {
  key: string;
  size: string;
  chest: string;
  waist: string;
  hips: string;
};

export interface ProductVariant {
  colors: Color[];
  sizeGuide: SizeGuideRow[];
}

export interface ProductData {
  name: string;
  price: string;
  sizes: string[];
  images: string[];
  variants: Record<Gender, ProductVariant>;
}
