import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import InfrastructureLayout from "./layout";

describe("InfrastructureLayout", () => {
  it("should render its children", () => {
    render(
      <InfrastructureLayout>
        <div>Child Component</div>
      </InfrastructureLayout>
    );
    expect(screen.getByText("Child Component")).toBeTruthy();
  });

  it("should render the Navbar, NavbarSider, and Footer components", () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(screen.getByRole("banner")).toBeTruthy();
    expect(
      screen.getByRole("navigation", { name: /navigation sidebar/i })
    ).toBeTruthy();
    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });

  it("should provide a main content region", () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(screen.getByRole("main")).toBeTruthy();
  });
});
