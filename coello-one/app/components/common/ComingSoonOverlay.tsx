"use client";

import { Flex, Typography } from "antd";
import type { FC } from "react";

const { Text } = Typography;

export type ComingSoonOverlayProps = {
  className?: string;
  label?: string;
};

const baseClassName =
  "absolute inset-0 items-center justify-center bg-black/75 text-white pointer-events-auto cursor-not-allowed";

const haloBaseClass =
  "pointer-events-none absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full";

const ComingSoonOverlay: FC<ComingSoonOverlayProps> = ({ className, label = "COMING SOON" }) => {
  const overlayClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <Flex className={overlayClassName} role="status" aria-live="polite" aria-label={label}>
      <Flex className="relative items-center justify-center px-8 py-4">
        <Flex aria-hidden className={`${haloBaseClass} block! h-24 w-56 bg-white/50 blur-3xl`} />
        <Flex aria-hidden className={`${haloBaseClass} block! h-20 w-48 bg-white/70 blur-xl`} />
        <Text className="relative text-xl font-black tracking-[0.2em] text-white uppercase drop-shadow-lg">
          {label}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ComingSoonOverlay;
