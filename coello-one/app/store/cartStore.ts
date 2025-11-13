import { atom } from "jotai";

export type CartFit = "male" | "female";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  fit: CartFit;
}

export type CartItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

const initialCartItems: CartItem[] = [];

export const cartItemsAtom = atom<CartItem[]>(initialCartItems);

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((count, item) => count + item.quantity, 0),
);

export const cartSubtotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((subtotal, item) => subtotal + item.price * item.quantity, 0),
);

export const FLAT_SHIPPING_RATE = 8.5;
export const FREE_SHIPPING_THRESHOLD = 150;

export const cartShippingAtom = atom((get) => {
  const subtotal = get(cartSubtotalAtom);

  if (subtotal === 0) {
    return 0;
  }

  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
});

export const cartTotalAtom = atom((get) => get(cartSubtotalAtom) + get(cartShippingAtom));

export const addCartItemAtom = atom(null, (get, set, item: CartItemInput) => {
  const quantity = item.quantity ?? 1;
  const items = get(cartItemsAtom);
  const existingIndex = items.findIndex(
    (current) =>
      current.id === item.id &&
      current.size === item.size &&
      current.color === item.color &&
      current.fit === item.fit,
  );

  if (existingIndex !== -1) {
    const updated = items.map((current, index) =>
      index === existingIndex ? { ...current, quantity: current.quantity + quantity } : current,
    );

    set(cartItemsAtom, updated);
    return;
  }

  set(cartItemsAtom, [
    ...items,
    {
      ...item,
      quantity,
    },
  ]);
});

export const incrementCartAtom = atom(null, (get, set, item: CartItemInput) =>
  set(addCartItemAtom, item),
);

export const updateCartItemQuantityAtom = atom(
  null,
  (get, set, { id, quantity }: { id: string; quantity: number }) => {
    if (quantity <= 0 || Number.isNaN(quantity)) {
      set(removeCartItemAtom, id);
      return;
    }

    const items = get(cartItemsAtom).map((current) =>
      current.id === id ? { ...current, quantity } : current,
    );

    set(cartItemsAtom, items);
  },
);

export const removeCartItemAtom = atom(null, (get, set, id: string) => {
  const filtered = get(cartItemsAtom).filter((item) => item.id !== id);
  set(cartItemsAtom, filtered);
});

export const clearCartAtom = atom(null, (_, set) => {
  set(cartItemsAtom, []);
});
