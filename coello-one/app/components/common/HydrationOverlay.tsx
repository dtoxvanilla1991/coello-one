"use client";

import { Flex } from "antd";
import type { ReactNode } from "react";
import { useEffect, useSyncExternalStore } from "react";

let didHydrate = false;
const hydrationListeners = new Set<() => void>();

function subscribeToHydration(onStoreChange: () => void) {
  hydrationListeners.add(onStoreChange);
  return () => hydrationListeners.delete(onStoreChange);
}

function getHydrationSnapshot() {
  return didHydrate;
}

function getHydrationServerSnapshot() {
  return false;
}

function markHydrated() {
  if (didHydrate) {
    return;
  }

  didHydrate = true;
  hydrationListeners.forEach((listener) => listener());
}

export type HydrationOverlayProps = {
  children: ReactNode;
  overlay: ReactNode;
  className?: string;
  hideChildrenUntilHydrated?: boolean;
};

export default function HydrationOverlay({
  children,
  overlay,
  className,
  hideChildrenUntilHydrated = true,
}: HydrationOverlayProps) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot,
  );

  useEffect(() => {
    markHydrated();
  }, []);

  const childVisibility = hideChildrenUntilHydrated && !hydrated ? "opacity-0" : "opacity-100";

  return (
    <Flex vertical className={`relative ${className ?? ""}`.trim()}>
      <Flex
        vertical
        aria-hidden={hideChildrenUntilHydrated && !hydrated}
        className={`w-full transition-opacity duration-150 ${childVisibility}`}
      >
        {children}
      </Flex>
      {!hydrated ? <Flex className="absolute inset-0 z-20 w-full bg-white">{overlay}</Flex> : null}
    </Flex>
  );
}
