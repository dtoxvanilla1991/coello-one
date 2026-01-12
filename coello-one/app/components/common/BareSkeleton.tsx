import { Flex } from "antd";

export type SkeletonBlockProps = {
  width?: number | string;
  height: number | string;
  radius?: number;
  opacity?: number;
};

export function SkeletonBlock({
  width = "100%",
  height,
  radius = 12,
  opacity = 1,
}: SkeletonBlockProps) {
  return (
    <Flex
      aria-hidden
      // STYLE-WAIVER: Skeleton dimensions are dynamic runtime values (numbers/strings).
      // Tailwind arbitrary value classes must be statically analyzable/safelisted; using
      // inline styles here keeps the skeleton reusable without expanding Tailwind config.
      style={{
        width,
        height,
        background: "#E5E7EB",
        borderRadius: radius,
        opacity,
        display: "block",
      }}
    />
  );
}

export function SkeletonLine({
  width = "100%",
  height = 12,
  radius = 8,
  opacity = 1,
}: Omit<SkeletonBlockProps, "height"> & { height?: number | string }) {
  return <SkeletonBlock width={width} height={height} radius={radius} opacity={opacity} />;
}

export function SkeletonCircle({ size, opacity = 1 }: { size: number; opacity?: number }) {
  return <SkeletonBlock width={size} height={size} radius={9999} opacity={opacity} />;
}
