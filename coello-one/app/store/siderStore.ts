import { atom } from "jotai";

// This atom controls whether the Sider is collapsed
// Couldn't use local state or context bc of how Any design Layout and Sider work and they are in layout.tsx which is ssr.
// couldn't put it in the wrapper either bc it is too high lvl and would make all kids client-side rendered
export const siderCollapsedAtom = atom<boolean>(true);

// Tracks whether the collapsible animation is currently running so triggers can debounce themselves
export const siderAnimatingAtom = atom<boolean>(false);
