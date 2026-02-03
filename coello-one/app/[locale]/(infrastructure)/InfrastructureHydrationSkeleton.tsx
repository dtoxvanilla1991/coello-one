import { Flex } from "antd";
import { SkeletonBlock, SkeletonLine } from "@/components/common/BareSkeleton";

export default function InfrastructureHydrationSkeleton() {
  return (
    <Flex
      vertical
      className="min-h-screen bg-white px-4 py-4"
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Flex
        vertical
        className="rounded-xl border border-gray-200 bg-white p-4"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <SkeletonLine width="60%" height={14} />
        <SkeletonLine width="90%" height={12} opacity={0.9} />
        <SkeletonLine width="70%" height={12} opacity={0.85} />
        <Flex style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <SkeletonBlock width={120} height={36} radius={12} />
          <SkeletonBlock width={120} height={36} radius={12} />
        </Flex>
      </Flex>

      <Flex
        vertical
        className="rounded-xl border border-gray-200 bg-white p-4"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SkeletonLine width="35%" height={14} />
        <SkeletonLine width="75%" height={12} opacity={0.9} />
      </Flex>

      <Flex
        vertical
        className="rounded-xl border border-gray-200 bg-white p-4"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SkeletonLine width="45%" height={14} />
        <SkeletonLine width="90%" height={12} opacity={0.9} />
        <SkeletonLine width="80%" height={12} opacity={0.85} />
        <SkeletonLine width="65%" height={12} opacity={0.8} />
      </Flex>

      <Flex
        vertical
        className="rounded-xl border border-gray-200 bg-white p-4"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SkeletonLine width="40%" height={14} />
        <SkeletonLine width="75%" height={12} opacity={0.9} />
        <SkeletonLine width="55%" height={12} opacity={0.85} />
      </Flex>

      <Flex
        vertical
        className="rounded-xl border border-gray-200 bg-white p-4"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SkeletonLine width="30%" height={14} />
        <SkeletonLine width="90%" height={12} opacity={0.9} />
        <SkeletonLine width="80%" height={12} opacity={0.85} />
        <SkeletonLine width="70%" height={12} opacity={0.8} />
        <SkeletonLine width="60%" height={12} opacity={0.75} />
      </Flex>
    </Flex>
  );
}
