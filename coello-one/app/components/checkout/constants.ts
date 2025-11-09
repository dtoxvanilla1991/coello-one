import type { ExpressMethodOption, SelectOption } from "./types";

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
];

export const EXPRESS_METHODS: ExpressMethodOption[] = [
  {
    key: "shop",
    label: "shop",
    className:
      "rounded-full! bg-[#6c4cf4]! border-[#6c4cf4]! text-white! shadow-sm",
  },
  {
    key: "paypal",
    label: "PayPal",
    className:
      "rounded-full! bg-[#ffc439]! border-[#ffc439]! text-black! shadow-sm",
  },
  {
    key: "gpay",
    label: "G Pay",
    className:
      "rounded-full! bg-black! border-black! text-white! shadow-sm",
  },
];

export const PAYMENT_OPTIONS: SelectOption[] = [
  { label: "Credit / Debit Card", value: "card" },
  { label: "PayPal", value: "paypal" },
  { label: "Klarna - Flexible payments", value: "klarna" },
  { label: "Clearpay", value: "clearpay" },
];

export const FORMAT_PRICE = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
