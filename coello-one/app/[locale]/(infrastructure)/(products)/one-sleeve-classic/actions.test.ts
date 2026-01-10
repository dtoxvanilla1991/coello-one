import { describe, expect, it } from "bun:test";
import { getLiveStock } from "./actions";

describe("getLiveStock", () => {
  it("returns null when the response is not ok", async () => {
    const previousFetch = globalThis.fetch;

    try {
      process.env.FLASK_API_BASE_URL = "http://example.test";

      globalThis.fetch = (async () =>
        new Response(JSON.stringify({ error: "nope" }), {
          status: 500,
          headers: { "content-type": "application/json" },
        })) as unknown as typeof fetch;

      const result = await getLiveStock("one-sleeve-classic");
      expect(result).toBeNull();
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it("returns null when the response payload is invalid", async () => {
    const previousFetch = globalThis.fetch;

    try {
      process.env.FLASK_API_BASE_URL = "http://example.test";

      globalThis.fetch = (async () =>
        new Response(JSON.stringify({ slug: 123, sizes: "bad" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })) as unknown as typeof fetch;

      const result = await getLiveStock("one-sleeve-classic");
      expect(result).toBeNull();
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it("returns parsed stock data when ok", async () => {
    const previousFetch = globalThis.fetch;

    try {
      process.env.FLASK_API_BASE_URL = "http://example.test";

      let fetchedUrl: string | undefined;
      let fetchedOptions: RequestInit | undefined;

      globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        fetchedUrl = typeof input === "string" ? input : input.toString();
        fetchedOptions = init;

        return new Response(
          JSON.stringify({
            slug: "one-sleeve-classic",
            sizes: { S: 1, M: 0, L: 10 },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      }) as unknown as typeof fetch;

      const result = await getLiveStock("one-sleeve-classic");

      expect(fetchedUrl).toBe("http://example.test/api/stock?slug=one-sleeve-classic");
      expect(fetchedOptions?.cache).toBe("no-store");
      expect(result).toEqual({
        slug: "one-sleeve-classic",
        sizes: { S: 1, M: 0, L: 10 },
      });
    } finally {
      globalThis.fetch = previousFetch;
    }
  });
});
