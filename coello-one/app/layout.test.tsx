import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
import RootLayout from "./layout";

// Manually cleaning up the DOM after each test to prevent test pollution
afterEach(() => {
  cleanup();
  document.body.className = "";
});

describe("RootLayout", () => {
  it("should render its children", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Hello World</div>
      </RootLayout>
    );
    const childElement = container.querySelector(
      '[data-testid="test-child"]'
    ) as HTMLElement;
    expect(childElement).toBeTruthy();
    expect(childElement.textContent).toBe("Hello World");
  });

  it("should apply the correct font and utility classes to the body element", () => {
    const { container } = render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    const wrapper = container.querySelector('[data-testid="root-layout"]');
    const className = wrapper?.getAttribute("class") || "";
    expect(className).toContain("--font-geist-sans");
    expect(className).toContain("--font-geist-mono");
    expect(className).toContain("antialiased");
  });
});
