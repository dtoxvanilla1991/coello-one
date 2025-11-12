import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ query?: string }>;
}

export const metadata: Metadata = {
  title: "Search | Coello One",
  description: "Discover Coello One pieces tailored to your training flow.",
};

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <SearchResults locale={resolvedParams.locale} query={resolvedSearchParams?.query ?? ""} />;
}
