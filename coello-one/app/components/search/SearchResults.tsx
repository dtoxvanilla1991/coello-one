"use client";

import { useMemo } from "react";
import { Card, Empty, Flex, Space, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";

const { Title, Text } = Typography;

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

type SearchCatalogItem = {
  id: string;
  name: string;
  description: string;
  genderLabel: string;
  price: number;
  image: string;
  slug: string;
  query: Record<string, string>;
  tags: string[];
  colorHighlights: string;
};

export const searchCatalog: SearchCatalogItem[] = [
  {
    id: "one-sleeve-classic-men",
    name: "One Sleeve Classic",
    description: "Asymmetrical compression sleeve engineered for upper-body days.",
    genderLabel: "Men's fit",
    price: 45,
    image: "/athletes/vertical/main-secondary-1.jpg",
    slug: "one-sleeve-classic",
    query: { gender: "male" },
    tags: [
      "men",
      "male",
      "classic",
      "one sleeve",
      "performance",
      "gray",
      "sea blue",
    ],
    colorHighlights: "Gray · Sea Blue · Mild Red",
  },
  {
    id: "one-sleeve-classic-men-sea",
    name: "One Sleeve Classic",
    description: "Marine inspired palette for coastal sessions and cooler tones.",
    genderLabel: "Men's fit",
    price: 45,
    image: "/athletes/horizontal/main-secondary-h-2.jpg",
    slug: "one-sleeve-classic",
    query: { gender: "male", color: "Sea Blue" },
    tags: ["men", "blue", "coastal", "one sleeve", "training"],
    colorHighlights: "Sea Blue limited",
  },
  {
    id: "one-sleeve-classic-women",
    name: "One Sleeve Classic",
    description: "Tailored silhouette supporting studio and strength work alike.",
    genderLabel: "Women's fit",
    price: 45,
    image: "/athletes/vertical/main-secondary-2.jpg",
    slug: "one-sleeve-classic",
    query: { gender: "female" },
    tags: [
      "women",
      "female",
      "classic",
      "one sleeve",
      "training",
      "gray",
      "sea blue",
    ],
    colorHighlights: "Gray · Sea Blue · Mild Red",
  },
  {
    id: "one-sleeve-classic-women-red",
    name: "One Sleeve Classic",
    description: "Vivid mild red for bold conditioning sessions and meets.",
    genderLabel: "Women's fit",
    price: 45,
    image: "/athletes/horizontal/main-secondary-h-4.jpg",
    slug: "one-sleeve-classic",
    query: { gender: "female", color: "Mild Red" },
    tags: ["women", "red", "statement", "one sleeve", "gymshark inspiration"],
    colorHighlights: "Mild Red limited",
  },
];

interface SearchResultsProps {
  locale?: string;
  query?: string;
}

export function SearchResults({
  locale = "en-GB",
  query = "",
}: SearchResultsProps) {
  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return searchCatalog;
    }

    return searchCatalog.filter((item) =>
      [
        item.name,
        item.description,
        item.genderLabel,
        item.colorHighlights,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  if (results.length === 0) {
    const emptyDescription =
      trimmedQuery.length > 0
        ? `We couldn't find matches for "${trimmedQuery}".`
        : "We couldn't find matching products.";

    return (
      <Flex vertical align="center" gap={16} className="px-4 py-24 text-center">
        <Title level={3} className="uppercase tracking-wide">
          No matches found
        </Title>
        <Empty
          description={emptyDescription}
          styles={{ image: { marginBottom: 12 } }}
        />
        <Text className="text-gray-500">
          Try searching for a fit, color, or product name instead.
        </Text>
      </Flex>
    );
  }

  const summaryText = normalizedQuery
    ? `Showing ${results.length} ${
        results.length === 1 ? "result" : "results"
      } for "${trimmedQuery}"`
    : "Showing all Coello One essentials";

  return (
    <section className="px-4 py-8 md:px-8">
      <Space direction="vertical" size={24} className="w-full">
        <div>
          <Title level={2} className="uppercase tracking-wide">
            Search results
          </Title>
          <Text className="text-gray-500">{summaryText}</Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => {
            const productPath = `/${locale}/${item.slug}`;
            const href = Object.keys(item.query).length
              ? { pathname: productPath, query: item.query }
              : productPath;

            return (
              <Card
                key={item.id}
                hoverable
                variant="borderless"
                className="rounded-3xl! border border-gray-200! p-0 shadow-sm transition-shadow duration-200 hover:shadow-md"
                cover={
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    <Image
                      fill
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                }>
                <Space
                  direction="vertical"
                  size={12}
                  className="w-full px-4 pb-4 pt-2">
                  <Title level={4} className="m-0! text-lg!">
                    {item.name}
                  </Title>
                  <Text className="text-gray-500">{item.genderLabel}</Text>
                  <Text className="text-sm text-gray-500">
                    {item.colorHighlights}
                  </Text>
                  <Text className="font-semibold">
                    {priceFormatter.format(item.price)}
                  </Text>
                  <Link
                    href={href}
                    className="font-semibold uppercase text-primary-500 transition-colors hover:text-primary-600">
                    View product
                  </Link>
                </Space>
              </Card>
            );
          })}
        </div>
      </Space>
    </section>
  );
}
