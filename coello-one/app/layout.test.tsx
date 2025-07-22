import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import RootLayout from "./layout";

// Manually cleaning up the DOM after each test to prevent test pollution
afterEach(() => {
  cleanup();
  document.body.className = "";
});

describe("RootLayout", () => {
  it("should render its children", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Hello World</div>
      </RootLayout>
    );
    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hello World");
  });

  it("should apply the correct font and utility classes to the body element", () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(document.body.className).toContain("--font-geist-sans");
    expect(document.body.className).toContain("--font-geist-mono");
    expect(document.body.className).toContain("antialiased");
  });
});
