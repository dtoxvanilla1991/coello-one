import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import InfrastructureLayout from "./layout";

describe("InfrastructureLayout", () => {
  it("should render its children", () => {
    const { container } = render(
      <InfrastructureLayout>
        <div data-testid="child">Child Component</div>
      </InfrastructureLayout>
    );
    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("should render the Navbar, NavbarSider, and Footer components", () => {
    const { container } = render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(
      container.querySelector('[data-testid="navbar-component"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="navbar-sider-component"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="footer-component"]')
    ).toBeTruthy();
  });

  it("should have the 'infrastructure-layout' test id", () => {
    const { container } = render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(
      container.querySelector('[data-testid="infrastructure-layout"]')
    ).toBeTruthy();
  });
});
