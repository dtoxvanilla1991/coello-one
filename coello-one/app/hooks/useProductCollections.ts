"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProductSummary, ProductCollectionConfig } from "@/types/products";

type UseProductCollectionsOptions = {
  collections: ProductCollectionConfig[];
  defaultKey?: string;
  onCollectionChange?: (collection: ProductCollectionConfig) => void;
};

export function useProductCollections(
  products: ProductSummary[],
  options: UseProductCollectionsOptions,
) {
  const { collections, defaultKey, onCollectionChange } = options;

  const initialKey = useMemo(() => {
    if (defaultKey) {
      const exists = collections.find((collection) => collection.key === defaultKey);
      if (exists) {
        return defaultKey;
      }
    }

    return collections[0]?.key ?? "";
  }, [collections, defaultKey]);

  const [activeKey, setActiveKey] = useState(initialKey);

  const activeCollection = useMemo(() => {
    return collections.find((collection) => collection.key === activeKey) ?? collections[0];
  }, [collections, activeKey]);

  const filteredProducts = useMemo(() => {
    if (!activeCollection?.filter) {
      return products;
    }

    return products.filter((product) => activeCollection.filter?.(product));
  }, [products, activeCollection]);

  const setActiveCollection = useCallback(
    (key: string) => {
      const nextCollection = collections.find((collection) => collection.key === key);

      if (!nextCollection) {
        return;
      }

      setActiveKey(nextCollection.key);
      onCollectionChange?.(nextCollection);
    },
    [collections, onCollectionChange],
  );

  return {
    collections,
    activeCollection,
    filteredProducts,
    setActiveCollection,
    activeKey,
  } as const;
}
