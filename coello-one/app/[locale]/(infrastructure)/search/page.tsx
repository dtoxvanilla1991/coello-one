import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

interface SearchPageProps {
  searchParams?: Promise<{ query?: string }>;
}

export const metadata: Metadata = {
  title: "Search | Coello One",
  description: "Discover Coello One pieces tailored to your training flow.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <SearchResults query={resolvedSearchParams?.query ?? ""} />;
}
