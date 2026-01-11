import { Flex } from "antd";
import { SkeletonBlock, SkeletonCircle, SkeletonLine } from "@/components/common/BareSkeleton";

export default function HomeHydrationSkeleton() {
  return (
    <Flex
      vertical
      className="min-h-screen bg-white"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* MainBanner: big hero image + centered headline + CTA */}
      <Flex
        vertical
        className="relative w-full"
        style={{ height: "44em", display: "flex", flexDirection: "column" }}
        role="region"
        aria-label="Home banner skeleton"
      >
        <SkeletonBlock height="100%" radius={0} />
        <Flex
          vertical
          align="center"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 12,
            zIndex: 1,
            gap: 8,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <SkeletonLine width="70%" height={20} />
          <SkeletonBlock width={240} height={40} radius={6} />
        </Flex>
      </Flex>

      {/* Featured: title + 2x2 image grid */}
      <Flex vertical className="p-4 pb-8" role="region" aria-label="Featured skeleton">
        <Flex className="ml-4" style={{ marginTop: 8, marginBottom: 8 }}>
          <SkeletonLine width={120} height={16} />
        </Flex>
        <Flex gap={5} wrap="wrap" justify="space-between" role="list">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Flex
              key={`featured-skel-${idx}`}
              className="w-[calc(50%-2.5px)]"
              role="listitem"
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Flex
                className="aspect-square w-full"
                style={{ position: "relative", display: "block" }}
              >
                <SkeletonBlock width="100%" height="100%" radius={0} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* SalesBlock: black panel with title, text, 2 CTAs */}
      <Flex
        vertical
        className="bg-black p-4! text-center"
        style={{
          background: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 16,
          gap: 12,
        }}
        role="region"
        aria-label="Sales block skeleton"
        align="center"
      >
        <SkeletonLine width="90%" height={24} />
        <SkeletonLine width="75%" height={16} opacity={0.9} />
        <Flex vertical style={{ width: "50%", gap: 12, marginTop: 20, display: "flex" }}>
          <SkeletonBlock height={40} radius={6} />
          <SkeletonBlock height={40} radius={6} />
        </Flex>
      </Flex>

      {/* Training: title + horizontal carousel of cards */}
      <Flex
        vertical
        className="p-4! pr-0! pb-8!"
        role="region"
        aria-label="Training skeleton"
        style={{ gap: 16 }}
      >
        <SkeletonLine width={200} height={16} />
        <Flex
          gap={16}
          className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
          role="list"
          aria-label="Training plans skeleton"
          style={{ display: "flex" }}
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <Flex
              key={`training-skel-${idx}`}
              vertical
              role="listitem"
              className="min-w-72 snap-start"
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <SkeletonBlock height={400} radius={0} />
              <Flex vertical className="p-3" style={{ gap: 10 }}>
                <SkeletonLine width="55%" height={12} />
                <SkeletonBlock width="100%" height={36} radius={10} opacity={0.9} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Popular section: title + filters + 3 product cards */}
      <Flex
        vertical
        className="p-4"
        role="region"
        aria-label="Popular skeleton"
        style={{ gap: 12 }}
      >
        <SkeletonLine width={200} height={16} />
        <Flex style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <SkeletonBlock width={110} height={36} radius={10} />
          <SkeletonBlock width={110} height={36} radius={10} />
          <SkeletonBlock width={110} height={36} radius={10} />
        </Flex>
        <Flex style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Flex
              key={`popular-skel-${idx}`}
              className="w-full sm:w-[calc(50%-6px)]"
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                overflow: "hidden",
                display: "block",
              }}
            >
              <SkeletonBlock height={140} radius={0} />
              <Flex vertical className="p-3" style={{ gap: 8 }}>
                <SkeletonLine width="70%" height={12} />
                <SkeletonLine width="30%" height={12} opacity={0.85} />
                <SkeletonBlock width={160} height={36} radius={10} opacity={0.9} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* BrandListings: two lists (Women/Men) with 3 links each */}
      <Flex
        vertical
        className="p-4"
        role="region"
        aria-label="Brand listings skeleton"
        style={{ gap: 12 }}
      >
        {Array.from({ length: 2 }).map((_, sectionIdx) => (
          <Flex key={`brand-skel-${sectionIdx}`} vertical style={{ gap: 8 }}>
            <SkeletonLine width={140} height={14} />
            <Flex vertical style={{ gap: 8 }} role="list" aria-label="Brand links skeleton">
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonLine
                  key={`brand-skel-${sectionIdx}-${idx}`}
                  width="45%"
                  height={12}
                  opacity={0.9}
                />
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>

      {/* Divider */}
      <SkeletonBlock height={2} radius={0} opacity={0.9} />

      {/* StoryBlock: grey background, 3 title+paragraph blocks */}
      <Flex
        vertical
        className="p-4"
        style={{ background: "#E5E7EB", gap: 16 }}
        role="region"
        aria-label="Story skeleton"
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <Flex key={`story-skel-${idx}`} vertical style={{ gap: 10 }} role="listitem">
            <SkeletonLine width={180} height={14} />
            <SkeletonLine width="95%" height={12} opacity={0.9} />
            <SkeletonLine width="85%" height={12} opacity={0.85} />
          </Flex>
        ))}
      </Flex>

      {/* BottomMenu: two accordion headings */}
      <Flex
        vertical
        className="px-4 py-2"
        role="navigation"
        aria-label="Footer quick links skeleton"
        style={{ gap: 12 }}
      >
        {Array.from({ length: 2 }).map((_, idx) => (
          <Flex
            key={`footer-menu-skel-${idx}`}
            align="center"
            justify="space-between"
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: 12,
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SkeletonLine width={100} height={12} />
            <SkeletonCircle size={18} />
          </Flex>
        ))}
      </Flex>

      {/* BottomMoreAboutSection: title + horizontal cards */}
      <Flex
        vertical
        className="p-4 pr-0 pb-6"
        role="region"
        aria-label="More about skeleton"
        style={{ gap: 16 }}
      >
        <SkeletonLine width={220} height={14} />
        <Flex
          gap={16}
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          role="list"
          aria-label="More about cards skeleton"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <Flex
              key={`more-about-skel-${idx}`}
              vertical
              className="min-w-44 snap-start"
              role="listitem"
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <SkeletonBlock height={112} radius={0} />
              <Flex className="p-2" vertical style={{ gap: 8 }}>
                <SkeletonLine width="90%" height={12} />
                <SkeletonLine width="70%" height={12} opacity={0.85} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* LegalLinks: small pill links row */}
      <Flex
        className="px-4 pb-2"
        justify="center"
        wrap
        gap={8}
        role="list"
        aria-label="Legal links skeleton"
        style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonBlock
            key={`legal-skel-${idx}`}
            width={90}
            height={18}
            radius={9}
            opacity={0.85}
          />
        ))}
      </Flex>
    </Flex>
  );
}
