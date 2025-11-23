import { beforeEach, describe, it, expect } from "bun:test";
import { resetRequestLocaleState } from "@test-utils/requestLocaleState";

const { default: RootLayout } = await import("./layout");

beforeEach(() => {
  resetRequestLocaleState();
});

describe("RootLayout", () => {
  it("renders the locale shell with font utilities in test environments", async () => {
    const tree = await RootLayout({
      children: <div data-testid="child">Hello World</div>,
    });

    expect(tree.props.className).toContain("--font-geist-sans");
    expect(tree.props.className).toContain("--font-geist-mono");
    expect(tree.props.className).toContain("antialiased");

    const provider = tree.props.children;
    expect(provider.props.value).toBe("en-GB");
    expect(provider.props.children.props["data-testid"]).toBe("child");
  });
});
