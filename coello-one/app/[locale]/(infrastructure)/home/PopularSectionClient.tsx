"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Empty, Flex, Space, Typography } from "antd";
import { useProductCollections } from "@/hooks/useProductCollections";
import { useLocalePath } from "@/hooks/useLocalePath";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { trackEvent } from "@/utils/trackEvent";
import { createPopularFallbackProducts } from "./popularCuratedData";
import { DEFAULT_SIZE } from "../(products)/one-sleeve-classic/constants";
import type {
  ProductCacheMetadata,
  ProductCollectionConfig,
  ProductSummary,
} from "@/types/products";
import { useTranslations } from "@/localization/useTranslations";

const { Title, Text } = Typography;

type PopularSectionClientProps = {
  products: ProductSummary[];
  cache: ProductCacheMetadata;
};

export default function PopularSectionClient({ products, cache }: PopularSectionClientProps) {
  const withLocalePath = useLocalePath();
  const locale = useCurrentLocale();
  const copy = useTranslations("home").popularSection;
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale ?? "en-GB", {
        style: "currency",
        currency: "GBP",
      }),
    [locale],
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

  const collections = useMemo<ProductCollectionConfig[]>(() => {
    return copy.filters.map((filter) => {
      const config: ProductCollectionConfig = {
        key: filter.key,
        label: filter.label,
        analyticsId: filter.analyticsId,
        ariaLabel: filter.ariaLabel,
      };

      if (filter.gender) {
        config.filter = (product) => product.gender === filter.gender;
      }

      return config;
    });
  }, [copy.filters]);

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
        {copy.title}
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
              aria-label={collection.ariaLabel ?? collection.label}
            >
              {collection.label}
            </Button>
          );
        })}
      </Space>
      <Flex
        gap={16}
        role="list"
        aria-label={copy.aria.list}
        className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {filteredProducts.length === 0 ? (
          <Empty
            className="min-w-full text-white!"
            description={<Text className="text-white!">{copy.emptyState.description}</Text>}
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
                aria-label={copy.aria.productCard.replace("{productName}", product.name)}
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
                      {copy.actions.browse}
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
