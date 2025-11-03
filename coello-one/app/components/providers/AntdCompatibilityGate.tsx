"use client";

import "@ant-design/v5-patch-for-react-19";
import type { PropsWithChildren } from "react";

/**
 * Ensures Ant Design applies its React 19 compatibility patch before client logic runs.
 */
export function AntdCompatibilityGate({ children }: PropsWithChildren) {
  return children;
}
