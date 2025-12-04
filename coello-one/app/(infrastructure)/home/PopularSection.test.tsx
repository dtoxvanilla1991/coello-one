import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PopularSectionClient from "./PopularSectionClient";
import type { ProductCacheMetadata, ProductSummary } from "@/types/products";

const sampleProducts: ProductSummary[] = [
  {
    id: 1,
    slug: "sample-one",
    name: "Coello One Classic Tee",
    price: 48,
    priceMinor: 4800,
    currencyCode: "GBP",
    gender: "Women",
    category: "popular",
    imageUrl: "/athletes/vertical/main-secondary-6.jpg",
    link: {
      type: "variant",
      gender: "female",
      color: "Stone Gray",
    },
  },
  {
    id: 2,
    slug: "sample-two",
    name: "Coello One Training Tee",
    price: 52,
    priceMinor: 5200,
    currencyCode: "GBP",
    gender: "Men",
    category: "popular",
    imageUrl: "/athletes/vertical/main-secondary-7.jpg",
    link: {
      type: "variant",
      gender: "male",
      color: "Sea Blue",
    },
  },
  {
    id: 3,
    slug: "sample-accessory",
    name: "Coello Resistance Bands",
    price: 20,
    priceMinor: 2000,
    currencyCode: "GBP",
    gender: "Unisex",
    category: "accessories",
    imageUrl: "/accessories/resistance-bands.png",
    link: {
      type: "accessory",
    },
  },
];

const hydratedCache: ProductCacheMetadata = {
  source: "database",
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
