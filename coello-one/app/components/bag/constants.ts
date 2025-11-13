import type { ExtraItem } from "./types";

export const recommendedExtras: ExtraItem[] = [
  {
    id: "diffuse-headband",
    name: "Diffuse Sweat Headband",
    image: "/athletes/vertical/main-secondary-5.jpg",
    price: 20,
    color: "Black",
    size: "One Size",
    fit: "female",
    highlight: "Add to unlock free delivery",
  },
  {
    id: "recovery-gloves",
    name: "Recovery Grip Gloves",
    image: "/athletes/vertical/main-secondary-6.jpg",
    price: 25,
    color: "Shadow",
    size: "M",
    fit: "male",
  },
  {
    id: "cool-down-bottle",
    name: "Cool Down Bottle",
    image: "/athletes/vertical/main-secondary-8.jpg",
    price: 18,
    color: "Frost",
    size: "One Size",
    fit: "female",
  },
];

export const formatPrice = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "Amex",
  "PayPal",
  "Klarna",
  "Apple Pay",
] as const;
