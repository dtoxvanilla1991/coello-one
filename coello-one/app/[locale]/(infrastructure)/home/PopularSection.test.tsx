import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PopularSectionClient from "./PopularSectionClient";
import type { ProductCacheMetadata, ProductSummary } from "@/types/products";
import { getTestTranslations } from "@test-utils/translations";

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

const HOME_COPY = getTestTranslations("home");
const POPULAR_COPY = HOME_COPY.popularSection;

const getFilterLabel = (key: string) => {
  const filter = POPULAR_COPY.filters.find((item) => item.key === key);
  return filter?.ariaLabel ?? filter?.label ?? key;
};

const PRODUCT_CARD_NAME_PATTERN = new RegExp(
  POPULAR_COPY.aria.productCard.replace("{productName}", ".*"),
  "i",
);

describe("PopularSection", () => {
  it("should render the popular section", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    expect(screen.getByRole("region", { name: POPULAR_COPY.title })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: POPULAR_COPY.title,
    });
    expect(heading.textContent).toBe(POPULAR_COPY.title);
  });

  it("should render the women and men buttons", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    expect(screen.getByLabelText(getFilterLabel("all"))).toBeTruthy();
    expect(screen.getByLabelText(getFilterLabel("women"))).toBeTruthy();
    expect(screen.getByLabelText(getFilterLabel("men"))).toBeTruthy();
  });

  it("should render 3 cards", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const list = screen.getByRole("list", { name: POPULAR_COPY.aria.list });
    const cards = within(list).getAllByRole("article", { name: PRODUCT_CARD_NAME_PATTERN });
    expect(cards).toHaveLength(3);
  });

  it("should render the card buttons", () => {
    render(<PopularSectionClient products={sampleProducts} cache={hydratedCache} />);
    const buttons = screen.getAllByRole("button", { name: POPULAR_COPY.actions.browse });
    expect(buttons).toHaveLength(3);
  });
});
