import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import InfrastructureLayout from "./layout";

describe("InfrastructureLayout", () => {
  it("should render its children", async () => {
    render(
      <InfrastructureLayout>
        <div>Child Component</div>
      </InfrastructureLayout>,
    );
    expect(await screen.findByText("Child Component")).toBeTruthy();
  });

  it("should render the Navbar, NavbarSider, and Footer components", async () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>,
    );
    expect(await screen.findByRole("banner")).toBeTruthy();
    expect(await screen.findByRole("navigation", { name: /navigation sidebar/i })).toBeTruthy();
    expect(await screen.findByRole("contentinfo")).toBeTruthy();
  });

  it("should provide a main content region", async () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>,
    );
    expect(await screen.findByRole("main")).toBeTruthy();
  });
});
