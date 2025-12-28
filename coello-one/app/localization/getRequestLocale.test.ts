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
  it("prefers the proxy-provided locale header over other hints", async () => {
    requestLocaleHeaderState.locale = "es-ES";
    requestLocaleCookieState.NEXT_LOCALE = "en-GB";
    requestLocaleHeaderState.acceptLanguage = "en-GB";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });

  it("uses NEXT_LOCALE cookie when the proxy header is missing", async () => {
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
