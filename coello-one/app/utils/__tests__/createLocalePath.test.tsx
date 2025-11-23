import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";

const DummyContent = () => <div>hello shell</div>;

describe("createLocalePath", () => {
  it("normalizes empty paths to the site root", () => {
    const withLocalePath = createLocalePath();
    expect(withLocalePath("help")).toBe("/help");
    expect(withLocalePath("")).toBe("/");
  });

  it("ensures a single leading slash without duplicating segments", () => {
    const withLocalePath = createLocalePath();
    expect(withLocalePath("orders")).toBe("/orders");
    expect(withLocalePath("/orders")).toBe("/orders");
  });
});

describe("createLocalePath integration", () => {
  it("builds breadcrumb links that HelpPageShell renders correctly", () => {
    const withLocalePath = createLocalePath();

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
    expect(helpLink.getAttribute("href")).toBe("/help");
  });
});
