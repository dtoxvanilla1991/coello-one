import { Flex } from "antd";
import { SkeletonBlock, SkeletonCircle, SkeletonLine } from "@/components/common/BareSkeleton";

export default function HomeHydrationSkeleton() {
  return (
    <Flex vertical className="flex min-h-screen flex-col bg-white">
      {/* MainBanner: big hero image + centered headline + CTA */}
      <Flex
        vertical
        className="relative flex h-[44em] w-full flex-col"
        role="region"
        aria-label="Home banner skeleton"
      >
        <SkeletonBlock height="100%" radius={0} />
        <Flex
          vertical
          align="center"
          className="absolute inset-x-0 bottom-3 z-[1] flex flex-col items-center gap-2 px-4"
        >
          <SkeletonLine width="70%" height={20} />
          <SkeletonBlock width={240} height={40} radius={6} />
        </Flex>
      </Flex>

      {/* Featured: title + 2x2 image grid */}
      <Flex vertical className="p-4 pb-8" role="region" aria-label="Featured skeleton">
        <Flex className="my-2 ml-4">
          <SkeletonLine width={120} height={16} />
        </Flex>
        <Flex role="list" className="flex flex-wrap justify-between gap-[5px]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Flex
              key={`featured-skel-${idx}`}
              role="listitem"
              className="flex-none basis-[calc(50%-2.5px)] overflow-hidden rounded-2xl border border-gray-200"
            >
              <Flex className="relative aspect-square w-full">
                <SkeletonBlock width="100%" height="100%" radius={0} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* SalesBlock: black panel with title, text, 2 CTAs */}
      <Flex
        vertical
        className="flex flex-col items-center justify-center gap-3 bg-black p-4! text-center"
        role="region"
        aria-label="Sales block skeleton"
        align="center"
      >
        <SkeletonLine width="90%" height={24} />
        <SkeletonLine width="75%" height={16} opacity={0.9} />
        <Flex vertical className="mt-5 flex w-1/2 flex-col gap-3">
          <SkeletonBlock height={40} radius={6} />
          <SkeletonBlock height={40} radius={6} />
        </Flex>
      </Flex>

      {/* Training: title + horizontal carousel of cards */}
      <Flex
        vertical
        role="region"
        aria-label="Training skeleton"
        className="flex flex-col gap-4 p-4! pr-0! pb-8!"
      >
        <SkeletonLine width={200} height={16} />
        <Flex
          gap={16}
          role="list"
          aria-label="Training plans skeleton"
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <Flex
              key={`training-skel-${idx}`}
              vertical
              role="listitem"
              className="min-w-72 snap-start overflow-hidden rounded-2xl border border-gray-200"
            >
              <SkeletonBlock height={400} radius={0} />
              <Flex vertical className="flex flex-col gap-2.5 p-3">
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
        role="region"
        aria-label="Popular skeleton"
        className="flex flex-col gap-3 p-4"
      >
        <SkeletonLine width={200} height={16} />
        <Flex className="flex flex-wrap gap-3">
          <SkeletonBlock width={110} height={36} radius={10} />
          <SkeletonBlock width={110} height={36} radius={10} />
          <SkeletonBlock width={110} height={36} radius={10} />
        </Flex>
        <Flex className="flex flex-wrap gap-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Flex
              key={`popular-skel-${idx}`}
              className="w-full overflow-hidden rounded-2xl border border-gray-200 sm:w-[calc(50%-6px)]"
            >
              <SkeletonBlock height={140} radius={0} />
              <Flex vertical className="flex flex-col gap-2 p-3">
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
        role="region"
        aria-label="Brand listings skeleton"
        className="flex flex-col gap-3 p-4"
      >
        {Array.from({ length: 2 }).map((_, sectionIdx) => (
          <Flex key={`brand-skel-${sectionIdx}`} vertical className="flex flex-col gap-2">
            <SkeletonLine width={140} height={14} />
            <Flex
              vertical
              className="flex flex-col gap-2"
              role="list"
              aria-label="Brand links skeleton"
            >
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
        className="flex flex-col gap-4 bg-gray-200 p-4"
        role="region"
        aria-label="Story skeleton"
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <Flex
            key={`story-skel-${idx}`}
            vertical
            className="flex flex-col gap-2.5"
            role="listitem"
          >
            <SkeletonLine width={180} height={14} />
            <SkeletonLine width="95%" height={12} opacity={0.9} />
            <SkeletonLine width="85%" height={12} opacity={0.85} />
          </Flex>
        ))}
      </Flex>

      {/* BottomMenu: two accordion headings */}
      <Flex
        vertical
        role="navigation"
        aria-label="Footer quick links skeleton"
        className="flex flex-col gap-3 px-4 py-2"
      >
        {Array.from({ length: 2 }).map((_, idx) => (
          <Flex
            key={`footer-menu-skel-${idx}`}
            align="center"
            justify="space-between"
            className="flex items-center justify-between rounded-xl border border-gray-200 p-3"
          >
            <SkeletonLine width={100} height={12} />
            <SkeletonCircle size={18} />
          </Flex>
        ))}
      </Flex>

      {/* BottomMoreAboutSection: title + horizontal cards */}
      <Flex
        vertical
        role="region"
        aria-label="More about skeleton"
        className="flex flex-col gap-4 p-4 pr-0 pb-6"
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
              role="listitem"
              className="min-w-44 snap-start overflow-hidden rounded-2xl border border-gray-200"
            >
              <SkeletonBlock height={112} radius={0} />
              <Flex className="flex flex-col gap-2 p-2" vertical>
                <SkeletonLine width="90%" height={12} />
                <SkeletonLine width="70%" height={12} opacity={0.85} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* LegalLinks: small pill links row */}
      <Flex
        justify="center"
        wrap
        gap={8}
        role="list"
        aria-label="Legal links skeleton"
        className="flex flex-wrap justify-center gap-2 px-4 pb-2"
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
