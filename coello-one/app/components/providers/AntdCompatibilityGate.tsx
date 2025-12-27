"use client";

import type { PropsWithChildren } from "react";

/**
 * Ensures Ant Design styles are properly initialized in client context (antd v6).
 * No longer requires React 19 patch as v6 has native support.
 */
export function AntdCompatibilityGate({ children }: PropsWithChildren) {
  return children;
}
