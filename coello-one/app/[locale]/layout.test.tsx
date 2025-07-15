import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LocaleLayout, { generateMetadata } from "./layout";

describe("LocaleLayout", () => {
  it("should render children and have correct data-testid", async () => {
    render(
      await LocaleLayout({
        params: { locale: "en-GB" },
        children: <div data-testid="child">Child</div>,
      })
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("locale-layout-provider")).toBeInTheDocument();
  });

  it("should throw notFound for unsupported locale", async () => {
    await expect(
      LocaleLayout({
        params: { locale: "fr-FR" as "en-GB" | "es-ES" },
        children: <div />,
      })
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("should generate correct metadata for en-GB", async () => {
    const metadata = await generateMetadata({
      params: { locale: "en-GB" },
      children: <div />,
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
      params: { locale: "es-ES" },
      children: <div />,
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
