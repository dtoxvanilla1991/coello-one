import { describe, expect, it } from "bun:test";
import {
  LANGUAGE_ALTERNATES,
  addLocaleToPathname,
  extractLocaleFromPathname,
  normalizeLocale,
  stripLocaleFromPathname,
} from "./i18n";

describe("i18n config", () => {
  it("extracts locale segments from localized pathnames", () => {
    expect(extractLocaleFromPathname("/en-GB/bag")).toBe("en-GB");
    expect(extractLocaleFromPathname("/es-ES")).toBe("es-ES");
    expect(extractLocaleFromPathname("/unknown")).toBeNull();
  });

  it("strips locale prefixes when requested", () => {
    expect(stripLocaleFromPathname("/en-GB/bag")).toBe("/bag");
    expect(stripLocaleFromPathname("/es-ES")).toBe("/");
    expect(stripLocaleFromPathname("/bag")).toBe("/bag");
  });

  it("adds locale prefixes safely", () => {
    expect(addLocaleToPathname("en-GB", "/bag")).toBe("/en-GB/bag");
    expect(addLocaleToPathname("es-ES", "/")).toBe("/es-ES");
    expect(addLocaleToPathname("en-GB", "/en-GB/bag")).toBe("/en-GB/bag");
  });

  it("normalizes locale values", () => {
    expect(normalizeLocale("es-ES")).toBe("es-ES");
    expect(normalizeLocale(undefined)).toBe("en-GB");
  });

  it("builds metadata alternates for every supported locale", () => {
    expect(LANGUAGE_ALTERNATES["en-GB"]).toBe("/en-GB");
    expect(LANGUAGE_ALTERNATES["es-ES"]).toBe("/es-ES");
  });
});
