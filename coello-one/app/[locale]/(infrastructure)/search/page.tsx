import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

interface SearchPageProps {
  params: { locale: string };
  searchParams?: { query?: string };
}

export const metadata: Metadata = {
  title: "Search | Coello One",
  description: "Discover Coello One pieces tailored to your training flow.",
};

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  return <SearchResults locale={params.locale} query={searchParams?.query ?? ""} />;
}
