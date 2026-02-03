import type { Gender, ProductData } from "./types";

export const DEFAULT_GENDER: Gender = "male";
export const DEFAULT_COLOR_NAME = "Gray";
export const DEFAULT_SIZE = "M";
export const PRODUCT_NAME_SLUG = "one-sleeve-classic";

export const PRODUCT_IMAGES_BY_COLOR_NAME: Record<string, string[]> = {
  "Stone Gray": [
    "/athletes/vertical/coello_one_classic_gray_front.png",
    "/athletes/vertical/coello_one_classic_gray_back.png",
    "/athletes/vertical/coello_one_classic_gray_back.png",
  ],
  "Sea Blue": [
    "/athletes/vertical/coello_one_classic_blue_front.png",
    "/athletes/vertical/coello_one_classic_blue_back.png",
    "/athletes/vertical/coello_one_classic_blue_side.png",
  ],
  "Mild Red": [
    "/athletes/vertical/coello_one_classic_red_front.png",
    "/athletes/vertical/coello_one_classic_red_back.png",
    "/athletes/vertical/coello_one_classic_red_side.png",
  ],
};

export function getImagesForColor(colorName: string, fallbackImages: string[]) {
  return PRODUCT_IMAGES_BY_COLOR_NAME[colorName] ?? fallbackImages;
}

const preloadedImageUrls = new Set<string>();

export function preloadImages(urls: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  for (const url of urls) {
    if (!url || preloadedImageUrls.has(url)) {
      continue;
    }

    preloadedImageUrls.add(url);

    const image = new Image();
    image.decoding = "async";
    image.src = url;
    void image.decode?.().catch(() => undefined);
  }
}

export const PRODUCT_DATA: ProductData = {
  name: "One Sleeve Classic",
  price: "£45.00",
  sizes: ["S", "M", "L"],
  images: PRODUCT_IMAGES_BY_COLOR_NAME["Stone Gray"],
  variants: {
    male: {
      colors: [
        {
          name: "Stone Gray",
          swatchClass: "bg-gray-400",
          ringClass: "ring-gray-400",
        },
        {
          name: "Sea Blue",
          swatchClass: "bg-sky-500",
          ringClass: "ring-sky-400",
        },
        {
          name: "Mild Red",
          swatchClass: "bg-rose-300",
          ringClass: "ring-rose-400",
        },
      ],
      sizeGuide: [
        { key: "S", size: "S", chest: "94", waist: "76", hips: "92" },
        { key: "M", size: "M", chest: "100", waist: "82", hips: "98" },
        { key: "L", size: "L", chest: "106", waist: "88", hips: "104" },
      ],
    },
    female: {
      colors: [
        {
          name: "Stone Gray",
          swatchClass: "bg-gray-400",
          ringClass: "ring-gray-400",
        },
        {
          name: "Sea Blue",
          swatchClass: "bg-sky-500",
          ringClass: "ring-sky-400",
        },
        {
          name: "Mild Red",
          swatchClass: "bg-rose-300",
          ringClass: "ring-rose-400",
        },
      ],
      sizeGuide: [
        { key: "S", size: "S", chest: "84", waist: "66", hips: "90" },
        { key: "M", size: "M", chest: "90", waist: "72", hips: "96" },
        { key: "L", size: "L", chest: "96", waist: "78", hips: "102" },
      ],
    },
  },
};
