import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import InfrastructureLayout from "../layout";
import { setNavigationState } from "@test-utils/navigation";

describe("Home route integration", () => {
  it("keeps the Navbar visible when the root path is loaded", async () => {
    setNavigationState({ pathname: "/" });

    render(
      <InfrastructureLayout>
        <div>Home content</div>
      </InfrastructureLayout>,
    );

    expect(await screen.findByAltText("Coello one logo")).toBeTruthy();
  });
});
