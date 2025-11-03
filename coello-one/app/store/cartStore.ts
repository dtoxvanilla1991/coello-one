import { atom } from "jotai";

export const cartCountAtom = atom(0);

export const incrementCartAtom = atom(null, (get, set) => {
  const current = get(cartCountAtom);
  set(cartCountAtom, current + 1);
});
