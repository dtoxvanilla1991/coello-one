"use client";

import { Flex } from "antd";
import type { ReactNode } from "react";
import { useEffect, useSyncExternalStore } from "react";
import { SkeletonCircle, SkeletonLine } from "./BareSkeleton";

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

export type HydrationGateProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function DefaultHydrationFallback() {
  return (
    <Flex
      vertical
      className="min-h-[60vh] w-full bg-white px-4 py-6"
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <Flex align="center" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SkeletonCircle size={28} />
        <SkeletonLine width={180} />
      </Flex>
      <SkeletonLine width="70%" />
      <SkeletonLine width="55%" opacity={0.9} />
      <SkeletonLine width="85%" opacity={0.8} />
      <SkeletonLine width="40%" opacity={0.75} />
    </Flex>
  );
}

export default function HydrationGate({ children, fallback }: HydrationGateProps) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot,
  );

  useEffect(() => {
    markHydrated();
  }, []);

  if (!hydrated) {
    return fallback ?? <DefaultHydrationFallback />;
  }

  return <>{children}</>;
}
