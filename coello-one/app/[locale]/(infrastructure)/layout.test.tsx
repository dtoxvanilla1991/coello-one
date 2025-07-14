import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InfrastructureLayout from "./layout";

// Mock child components to isolate the layout component in tests
vi.mock("@/components/navbar-components/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));
vi.mock("@/components/navbar-components/NavbarSider", () => ({
  NavbarSiderComponent: () => <div data-testid="navbar-sider">NavbarSider</div>,
}));
vi.mock("@/components/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

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
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-sider")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
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
