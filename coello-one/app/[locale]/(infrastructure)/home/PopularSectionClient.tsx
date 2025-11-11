'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Button, Card, Empty, Flex, Space, Typography } from 'antd';
import { useProductCollections } from '@/hooks/useProductCollections';
import { trackEvent } from '@/utils/trackEvent';
import type { ProductCacheMetadata, ProductCollectionConfig, ProductSummary } from '@/types/products';

const { Title, Text } = Typography;

type PopularSectionClientProps = {
  products: ProductSummary[];
  cache: ProductCacheMetadata;
};

function describeCache(cache: ProductCacheMetadata): string | null {
  if (cache.source === 'network') {
    return null;
  }

  if (cache.source === 'cache') {
    return cache.stale
      ? 'Serving warmed cache while we refresh popular picks.'
      : 'Serving warmed cache.';
  }

  return 'Showing featured favourites while we reconnect.';
}

export default function PopularSectionClient({ products, cache }: PopularSectionClientProps) {
  const collections = useMemo<ProductCollectionConfig[]>(
    () => [
      {
        key: 'all',
        label: 'All',
        analyticsId: 'popular-filter-all',
      },
      {
        key: 'women',
        label: 'Women',
        analyticsId: 'popular-filter-women',
        filter: (product) => product.gender === 'Women',
      },
      {
        key: 'men',
        label: 'Men',
        analyticsId: 'popular-filter-men',
        filter: (product) => product.gender === 'Men',
      },
    ],
    []
  );

  const { collections: availableCollections, activeCollection, filteredProducts, setActiveCollection, activeKey } =
    useProductCollections(products, {
      collections,
      defaultKey: 'all',
      onCollectionChange: (collection) => {
        trackEvent('popular_filter_click', {
          filter: collection.label,
          source: cache.source,
          stale: cache.stale,
        });
      },
    });

  const cacheDescriptor = useMemo(() => describeCache(cache), [cache]);

  const handleBrowseClick = (product: ProductSummary) => {
    trackEvent('popular_browse_click', {
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      source: cache.source,
    });
  };

  return (
    <Flex className="bg-black p-4! pr-0! pb-8!" vertical gap={16} role="region" aria-labelledby="popular-section-title">
      <Title level={3} className="mb-0! text-white! uppercase" id="popular-section-title">
        Popular right now
      </Title>
      {cacheDescriptor ? (
        <Text className="text-white/70!" role="status">
          {cacheDescriptor}
        </Text>
      ) : null}
      <Space size={16}>
        {availableCollections.map((collection) => (
          <Button
            key={collection.key}
            className={`bg-transparent! px-6! uppercase hover:bg-white/10! hover:text-white! ${
              activeKey === collection.key ? 'text-white!' : 'text-white/60!'
            }`}
            size="large"
            data-analytics-id={collection.analyticsId}
            onClick={() => setActiveCollection(collection.key)}
            aria-pressed={activeKey === collection.key}
            aria-label={
              collection.key === 'all'
                ? 'Show all popular items'
                : `Show popular ${collection.label.toLowerCase()} items`
            }
          >
            {collection.label}
          </Button>
        ))}
      </Space>
      <Flex gap={16} role="list" aria-label="Popular products" className="hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth">
        {filteredProducts.length === 0 ? (
          <Empty
            className="min-w-full text-white!"
            description={<Text className="text-white!">No popular products yet. Check back soon.</Text>}
          />
        ) : (
          filteredProducts.map((product, index) => (
            <Card
              key={`${product.id}-${activeCollection?.key ?? 'all'}-${index}`}
              className="min-w-72 snap-start"
              variant="borderless"
              data-testid="popular-card"
              hoverable
              cover={
                <Flex className="relative h-[400px]">
                  <Image
                    alt={product.name}
                    src={product.imageUrl ?? `/athletes/vertical/main-secondary-${(index % 8) + 6}.jpg`}
                    sizes="(max-width: 640px) 100vw, 640px"
                    fill
                    className="object-cover object-top"
                  />
                </Flex>
              }
              actions={[
                <Button
                  key={`${product.id}-browse`}
                  className="uppercase"
                  data-analytics-id={`popular-browse-${(product.category ?? 'popular').toLowerCase()}`}
                  onClick={() => handleBrowseClick(product)}
                >
                  Browse options
                </Button>,
              ]}
            >
              <Card.Meta title={product.name} description={`$${product.price.toFixed(0)}`} />
            </Card>
          ))
        )}
      </Flex>
    </Flex>
  );
}
