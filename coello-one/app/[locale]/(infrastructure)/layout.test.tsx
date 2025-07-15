import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InfrastructureLayout from "./layout";

describe("InfrastructureLayout", () => {
  it("should render its children", () => {
    render(
      <InfrastructureLayout>
        <div data-testid="child">Child Component</div>
      </InfrastructureLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should render the Navbar, NavbarSider, and Footer components", () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-sider-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });

  it("should have the 'infrastructure-layout' test id", () => {
    render(
      <InfrastructureLayout>
        <div>Child</div>
      </InfrastructureLayout>
    );
    expect(screen.getByTestId("infrastructure-layout")).toBeInTheDocument();
  });
});
