import { describe, expect, it } from "bun:test";
import { buildLocaleAlternateMap, getLocaleFromHost, type DomainLocaleConfig } from "./i18n";

const MOCK_DOMAIN_LOCALES: DomainLocaleConfig[] = [
  {
    domain: "coelloone.preview",
    defaultLocale: "en-GB",
    locales: ["en-GB", "es-ES"],
  },
  {
    domain: "localhost.preview:3000",
    defaultLocale: "es-ES",
    http: true,
  },
];

describe("i18n config", () => {
  it("builds locale alternates for every configured domain", () => {
    const alternates = buildLocaleAlternateMap(MOCK_DOMAIN_LOCALES);

    expect(alternates["en-GB"]).toBe("https://coelloone.preview");
    expect(alternates["es-ES"]).toBe("https://coelloone.preview");
  });

  it("respects the http flag when constructing absolute URLs", () => {
    const httpAlternates = buildLocaleAlternateMap([
      { domain: "localhost.preview:3000", defaultLocale: "es-ES", http: true },
    ]);

    expect(httpAlternates["es-ES"]).toBe("http://localhost.preview:3000");
  });

  it("maps hosts to locales based on the merged domain config", () => {
    expect(getLocaleFromHost("coelloone.co")).toBe("es-ES");
    expect(getLocaleFromHost("coelloone.uk")).toBe("en-GB");
    expect(getLocaleFromHost("localhost")).toBeNull();
  });
});
