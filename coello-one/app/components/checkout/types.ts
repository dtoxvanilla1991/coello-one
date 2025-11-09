export type CheckoutFormValues = {
  email: string;
  marketingOptIn?: boolean;
  deliveryMethod: "home" | "pickup";
  country: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  phone?: string;
  paymentMethod: string;
  rememberMe?: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type ExpressMethodOption = {
  key: string;
  label: string;
  className: string;
};
