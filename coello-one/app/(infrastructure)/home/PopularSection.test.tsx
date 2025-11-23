import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PopularSectionClient from "./PopularSectionClient";
import type { ProductCacheMetadata, ProductSummary } from "@/types/products";

const sampleProducts: ProductSummary[] = [
  {
    id: 1,
    name: "Coello One Classic Tee",
    price: 48,
    gender: "Women",
    category: "popular",
    imageUrl: "/athletes/vertical/main-secondary-6.jpg",
  },
  {
    id: 2,
    name: "Coello One Training Tee",
    price: 52,
    gender: "Men",
    category: "popular",
    imageUrl: "/athletes/vertical/main-secondary-7.jpg",
  },
  {
    id: 3,
    name: "Coello One Performance Tee",
    price: 55,
    gender: "Women",
    category: "popular",
    imageUrl: "/athletes/vertical/main-secondary-8.jpg",
  },
];

const hydratedCache: ProductCacheMetadata = {
  source: "network",
  updatedAt: Date.now(),
  stale: false,
  hit: false,
};

describe("PopularSection", () => {
  it("should render the popular section", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    expect(screen.getByRole("region", { name: /Popular right now/i })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: /Popular right now/i,
    });
    expect(heading.textContent).toBe("Popular right now");
  });

  it("should render the women and men buttons", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    expect(screen.getByLabelText(/Show all popular items/i)).toBeTruthy();
    expect(screen.getByLabelText(/Show popular women items/i)).toBeTruthy();
    expect(screen.getByLabelText(/Show popular men items/i)).toBeTruthy();
  });

  it("should render 3 cards", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const list = screen.getByRole("list", { name: /Popular products/i });
    const cards = within(list).getAllByRole("article", { name: /Popular product/i });
    expect(cards).toHaveLength(3);
  });

  it("should render the card buttons", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const buttons = screen.getAllByRole("button", { name: /Browse options/i });
    expect(buttons).toHaveLength(3);
  });
});
