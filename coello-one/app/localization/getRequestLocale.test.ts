import { beforeEach, describe, expect, it } from "bun:test";
import {
  requestLocaleHeaderState,
  requestLocaleCookieState,
  resetRequestLocaleState,
} from "@test-utils/requestLocaleState";

const { getRequestLocale } = await import("./getRequestLocale");

beforeEach(() => {
  resetRequestLocaleState();
});

describe("getRequestLocale", () => {
  it("prefers domain-level locale mappings over cookies or headers", async () => {
    requestLocaleHeaderState.host = "coelloone.co";
    requestLocaleCookieState.NEXT_LOCALE = "en-GB";
    requestLocaleHeaderState.acceptLanguage = "en-GB";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });

  it("uses NEXT_LOCALE cookie when host is not mapped", async () => {
    requestLocaleHeaderState.host = "preview.coello.test";
    requestLocaleCookieState.NEXT_LOCALE = "es-ES";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });

  it("falls back to Accept-Language when host and cookie are unavailable", async () => {
    requestLocaleHeaderState.acceptLanguage = "es-ES, en;q=0.8";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });
});
