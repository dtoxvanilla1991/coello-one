import type { PropsWithChildren } from "react";
import { Flex } from "antd";

interface ProductDetailShellProps {
  className?: string;
}

/**
 * Shared layout shell for product detail pages.
 * Ensures consistent max-width and responsive padding.
 */
export function ProductDetailShell({
  children,
  className = "",
}: PropsWithChildren<ProductDetailShellProps>) {
  return (
    <Flex
      vertical
      gap={32}
      className={`mx-auto w-full max-w-6xl px-4 pt-6 pb-12 md:px-8 md:pt-10 md:pb-16 ${className}`.trim()}
    >
      {children}
    </Flex>
  );
}
