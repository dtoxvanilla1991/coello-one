"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Empty, Flex, Space, Typography } from "antd";
import { useProductCollections } from "@/hooks/useProductCollections";
import { useLocalePath } from "@/hooks/useLocalePath";
import { trackEvent } from "@/utils/trackEvent";
import { createPopularFallbackProducts } from "./popularCuratedData";
import { DEFAULT_SIZE } from "../(products)/one-sleeve-classic/constants";
import type {
  ProductCacheMetadata,
  ProductCollectionConfig,
  ProductSummary,
} from "@/types/products";

const { Title, Text } = Typography;

type PopularSectionClientProps = {
  products: ProductSummary[];
  cache: ProductCacheMetadata;
};

export default function PopularSectionClient({ products, cache }: PopularSectionClientProps) {
  const withLocalePath = useLocalePath();
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
    [],
  );

  const { displayProducts, isFallback } = useMemo(() => {
    const derivedFallback = cache.source === "fallback" || cache.source === "curated";

    if (products.length > 0) {
      return { displayProducts: products, isFallback: derivedFallback } as const;
    }

    return {
      displayProducts: createPopularFallbackProducts(),
      isFallback: true,
    } as const;
  }, [products, cache.source]);

  const computeProductHref = (product: ProductSummary) => {
    const basePath = withLocalePath(product.slug);

    if (product.link?.type === "variant") {
      const params = new URLSearchParams({
        gender: product.link.gender,
        color: product.link.color,
        size: DEFAULT_SIZE,
      });
      return `${basePath}?${params.toString()}`;
    }

    return basePath;
  };

  const collections = useMemo<ProductCollectionConfig[]>(
    () => [
      {
        key: "all",
        label: "All",
        analyticsId: "popular-filter-all",
      },
      {
        key: "women",
        label: "Women",
        analyticsId: "popular-filter-women",
        filter: (product) => product.gender === "Women",
      },
      {
        key: "men",
        label: "Men",
        analyticsId: "popular-filter-men",
        filter: (product) => product.gender === "Men",
      },
    ],
    [],
  );

  const {
    collections: availableCollections,
    activeCollection,
    filteredProducts,
    setActiveCollection,
    activeKey,
  } = useProductCollections(displayProducts, {
    collections,
    defaultKey: "all",
    onCollectionChange: (collection) => {
      trackEvent("popular_filter_click", {
        filter: collection.label,
        source: cache.source,
        stale: cache.stale,
        fallback: isFallback,
      });
    },
  });

  const handleBrowseClick = (product: ProductSummary, href: string) => {
    trackEvent("popular_browse_click", {
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      source: cache.source,
      fallback: isFallback,
      href,
    });
  };

  return (
    <Flex
      className="bg-black p-4! pr-0! pb-8!"
      vertical
      gap={16}
      role="region"
      aria-labelledby="popular-section-title"
    >
      <Title level={3} className="mb-0! text-white! uppercase" id="popular-section-title">
        Popular right now
      </Title>
      <Space size={16}>
        {availableCollections.map((collection) => {
          const isActive = activeKey === collection.key;

          return (
            <Button
              key={collection.key}
              className={`px-6! uppercase transition-colors ${
                isActive
                  ? "bg-white! text-black! hover:bg-white! hover:text-black!"
                  : "bg-transparent! text-white/60! hover:bg-white/10! hover:text-white!"
              }`}
              size="large"
              data-analytics-id={collection.analyticsId}
              onClick={() => setActiveCollection(collection.key)}
              aria-pressed={isActive}
              aria-label={
                collection.key === "all"
                  ? "Show all popular items"
                  : `Show popular ${collection.label.toLowerCase()} items`
              }
            >
              {collection.label}
            </Button>
          );
        })}
      </Space>
      <Flex
        gap={16}
        role="list"
        aria-label="Popular products"
        className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {filteredProducts.length === 0 ? (
          <Empty
            className="min-w-full text-white!"
            description={
              <Text className="text-white!">No popular products yet. Check back soon.</Text>
            }
          />
        ) : (
          filteredProducts.map((product, index) => {
            const href = computeProductHref(product);

            return (
              <Card
                key={`${product.id}-${activeCollection?.key ?? "all"}-${index}`}
                className="min-w-72 snap-start"
                variant="borderless"
                role="article"
                aria-label={`Popular product ${product.name}`}
                hoverable
                cover={
                  <Flex className="relative h-[400px]">
                    <Image
                      alt={product.name}
                      src={
                        product.imageUrl ??
                        `/athletes/vertical/main-secondary-${(index % 8) + 6}.jpg`
                      }
                      sizes="(max-width: 640px) 100vw, 640px"
                      fill
                      className="object-cover object-top"
                    />
                  </Flex>
                }
                actions={[
                  <Link key={`${product.id}-browse`} href={href} role="link">
                    <Button
                      className="uppercase"
                      data-analytics-id={`popular-browse-${(product.category ?? "popular").toLowerCase()}`}
                      onClick={() => handleBrowseClick(product, href)}
                    >
                      Browse options
                    </Button>
                  </Link>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={currencyFormatter.format(product.price)}
                />
              </Card>
            );
          })
        )}
      </Flex>
    </Flex>
  );
}
