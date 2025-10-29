import { render, cleanup, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "bun:test";
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
        <div>Hello World</div>
      </RootLayout>
    );
    const childElement = screen.getByText("Hello World");
    expect(childElement).toBeTruthy();
    expect(childElement.textContent).toBe("Hello World");
  });

  it("should apply the correct font and utility classes to the body element", () => {
    const { container } = render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    const wrapper = container.firstElementChild;
    const className = wrapper?.getAttribute("class") || "";
    expect(className).toContain("--font-geist-sans");
    expect(className).toContain("--font-geist-mono");
    expect(className).toContain("antialiased");
  });
});
