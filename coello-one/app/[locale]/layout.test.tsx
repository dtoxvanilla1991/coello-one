import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import LocaleLayout, { generateMetadata } from "./layout";

describe("LocaleLayout", () => {
  it("should render children and have correct data-testid", async () => {
    const ui = await LocaleLayout({
      params: Promise.resolve({ locale: "en-GB" }),
      children: <div data-testid="child">Child</div>,
    });
    const { container } = render(ui);
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
    expect(
      container.querySelector('[data-testid="locale-layout-provider"]')
    ).toBeTruthy();
  });

  it("should throw notFound for unsupported locale", async () => {
    await expect(
      LocaleLayout({
        params: Promise.resolve({ locale: "fr-FR" as "en-GB" | "es-ES" }),
        children: <div />,
      })
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("should generate correct metadata for en-GB", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en-GB" }),
    });
    expect(metadata).toEqual({
      alternates: {
        languages: {
          "en-GB": "/en-GB",
          "es-ES": "/es-ES",
        },
      },
    });
  });

  it("should generate correct metadata for es-ES", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "es-ES" }),
    });
    expect(metadata).toEqual({
      alternates: {
        languages: {
          "es-ES": "/es-ES",
          "en-GB": "/en-GB",
        },
      },
    });
  });
});
