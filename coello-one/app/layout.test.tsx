import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RootLayout from "./layout";

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
    const body = document.body;
    expect(body.className).toContain("--font-geist-sans");
    expect(body.className).toContain("--font-geist-mono");
    expect(body.className).toContain("antialiased");
  });
});
