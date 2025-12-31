import { describe, expect, it } from "bun:test";

type JsonObject = Record<string, unknown>;

function keysOf(value: unknown): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }
  return Object.keys(value as JsonObject).sort();
}

function expectExactKeys(value: unknown, expected: string[]) {
  expect(keysOf(value)).toEqual([...expected].sort());
}

async function loadCheckoutCopy(locale: "en-GB" | "es-ES") {
  const url = new URL(`../messages/${locale}/checkout.json`, import.meta.url);
  return (await Bun.file(url).json()) as JsonObject;
}

describe("checkout namespace shape", () => {
  it("stays minimal and consistent across locales", async () => {
    const [en, es] = await Promise.all([loadCheckoutCopy("en-GB"), loadCheckoutCopy("es-ES")]);

    expectExactKeys(en, ["embedded", "returnPage"]);
    expectExactKeys(es, ["embedded", "returnPage"]);

    expectExactKeys(en.embedded, [
      "title",
      "subtitle",
      "loading",
      "error",
      "retry",
      "secureNote",
      "secureDescription",
    ]);

    expectExactKeys(en.returnPage, [
      "title",
      "amountLabel",
      "customerLabel",
      "orderLabel",
      "missingSession",
      "ctaPrimary",
      "ctaSecondary",
      "success",
      "processing",
      "open",
      "error",
    ]);

    expectExactKeys((en.returnPage as JsonObject).success, ["badge", "body"]);
    expectExactKeys((en.returnPage as JsonObject).processing, ["badge", "body"]);
    expectExactKeys((en.returnPage as JsonObject).open, ["badge", "body"]);
    expectExactKeys((en.returnPage as JsonObject).error, ["badge", "body"]);

    // No extra keys in Spanish either (shape parity)
    expect(keysOf(es)).toEqual(keysOf(en));
    expect(keysOf(es.embedded)).toEqual(keysOf(en.embedded));
    expect(keysOf(es.returnPage)).toEqual(keysOf(en.returnPage));
  });
});
