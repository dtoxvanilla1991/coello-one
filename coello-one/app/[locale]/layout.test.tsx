import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from "vitest";
import LocaleLayout from "./layout";

// end to end SSR tests for LocaleLayout

describe("LocaleLayout", () => {
  it("renders correct lang attribute for en-GB", () => {
    const html = renderToStaticMarkup(
      <LocaleLayout params={{ locale: "en-GB" }}>
        <div>Content</div>
      </LocaleLayout>
    );
    expect(html).toContain('lang="en-GB"');
  });

  it("renders correct lang attribute for es-ES", () => {
    const html = renderToStaticMarkup(
      <LocaleLayout params={{ locale: "es-ES" }}>
        <div>Contenido</div>
      </LocaleLayout>
    );
    expect(html).toContain('lang="es-ES"');
  });

  it("throws notFound for unsupported locale", () => {
    expect(() =>
      renderToStaticMarkup(
        <LocaleLayout params={{ locale: "fr-FR" as "en-GB" | "es-ES" }}>
          <div />
        </LocaleLayout>
      )
    ).toThrow("notFound");
  });
});
