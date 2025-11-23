import type { Gender, ProductData } from "./types";

export const DEFAULT_GENDER: Gender = "male";
export const DEFAULT_COLOR_NAME = "Gray";
export const DEFAULT_SIZE = "M";
export const PRODUCT_NAME_SLUG = "one-sleeve-classic";

export const PRODUCT_DATA: ProductData = {
  name: "One Sleeve Classic",
  price: "£45.00",
  sizes: ["S", "M", "L"],
  images: [
    "/athletes/vertical/main-secondary-1.jpg",
    "/athletes/vertical/main-secondary-2.jpg",
    "/athletes/vertical/main-secondary-3.jpg",
  ],
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
