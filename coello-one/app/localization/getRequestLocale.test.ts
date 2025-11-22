import { beforeEach, describe, expect, it, mock } from "bun:test";

type HeaderState = {
  host?: string;
  acceptLanguage?: string;
};

type CookieState = {
  NEXT_LOCALE?: string;
};

const headerState: HeaderState = {};
const cookieState: CookieState = {};

const headersMock = mock(async () => {
  const snapshot = { ...headerState };
  return {
    get: (key: string) => {
      const normalized = key.toLowerCase();
      if (normalized === "host") {
        return snapshot.host ?? null;
      }
      if (normalized === "accept-language") {
        return snapshot.acceptLanguage ?? null;
      }
      return null;
    },
  };
});

const cookiesMock = mock(async () => {
  const snapshot = { ...cookieState };
  return {
    get: (name: string) => {
      if (name === "NEXT_LOCALE" && snapshot.NEXT_LOCALE) {
        return { name, value: snapshot.NEXT_LOCALE };
      }
      return undefined;
    },
  };
});

mock.module("server-only", () => ({}));

mock.module("next/headers", () => ({
  __esModule: true,
  headers: headersMock,
  cookies: cookiesMock,
}));

const { getRequestLocale } = await import("./getRequestLocale");

const resetState = () => {
  headerState.host = undefined;
  headerState.acceptLanguage = undefined;
  cookieState.NEXT_LOCALE = undefined;
};

beforeEach(() => {
  resetState();
  headersMock.mockClear();
  cookiesMock.mockClear();
});

describe("getRequestLocale", () => {
  it("prefers domain-level locale mappings over cookies or headers", async () => {
    headerState.host = "coelloone.co";
    cookieState.NEXT_LOCALE = "en-GB";
    headerState.acceptLanguage = "en-GB";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });

  it("uses NEXT_LOCALE cookie when host is not mapped", async () => {
    headerState.host = "preview.coello.test";
    cookieState.NEXT_LOCALE = "es-ES";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });

  it("falls back to Accept-Language when host and cookie are unavailable", async () => {
    headerState.acceptLanguage = "es-ES, en;q=0.8";

    const locale = await getRequestLocale();
    expect(locale).toBe("es-ES");
  });
});
