import { describe, expect, it } from "bun:test";
import { getNamespaceCopy } from "../dictionary";
import { DEFAULT_LOCALE, normalizeLocale } from "../config";

describe("localization dictionary", () => {
  it("normalizes unsupported locales to the default", () => {
    expect(normalizeLocale(undefined)).toBe(DEFAULT_LOCALE);
    expect(normalizeLocale("fr-FR")).toBe(DEFAULT_LOCALE);
  });

  it("returns English home copy when locale is omitted", () => {
    const copy = getNamespaceCopy(undefined, "home");
    expect(copy.mainBanner.headline).toBe("NOW YOU TRULY STAND OUT.");
  });

  it("returns Spanish checkout copy when requested", () => {
    const copy = getNamespaceCopy("es-ES", "checkout");
    expect(copy.embedded.title).toBe("Checkout seguro con Stripe");
    expect(copy.returnPage.success.badge).toBe("Pagado");
  });
});
