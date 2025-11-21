import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";

const DummyContent = () => <div>hello shell</div>;

describe("createLocalePath", () => {
  it("falls back to en-GB when no locale is provided", () => {
    const withLocalePath = createLocalePath(undefined);
    expect(withLocalePath("help")).toBe("/en-GB/help");
    expect(withLocalePath("")).toBe("/en-GB");
  });

  it("avoids duplicating locale segments", () => {
    const withLocalePath = createLocalePath("es-ES");
    expect(withLocalePath("es-ES/orders")).toBe("/es-ES/orders");
    expect(withLocalePath("/orders")).toBe("/es-ES/orders");
  });
});

describe("createLocalePath integration", () => {
  it("builds breadcrumb links that HelpPageShell renders correctly", () => {
    const withLocalePath = createLocalePath("es-ES");

    render(
      <HelpPageShell
        title="Test Shell"
        description="Testing breadcrumb integration"
        breadcrumb={[{ title: "Help Centre", href: withLocalePath("help") }]}
      >
        <DummyContent />
      </HelpPageShell>,
    );

    const helpLink = screen.getByRole("link", { name: /help centre/i });
    expect(helpLink.getAttribute("href")).toBe("/es-ES/help");
  });
});
