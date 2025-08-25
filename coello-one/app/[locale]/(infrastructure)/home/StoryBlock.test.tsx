import { render } from "@testing-library/react";
import StoryBlock from "./StoryBlock";
import { describe, it, expect } from "bun:test";

describe("StoryBlock", () => {
  it("should render the story block", () => {
    const { container } = render(<StoryBlock />);
    expect(container.querySelector('[data-testid="story-block"]')).toBeTruthy();
  });

  it("should render 3 listings", () => {
    const { container } = render(<StoryBlock />);
    expect(
      container.querySelector('[data-testid="story-block-listing-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="story-block-listing-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="story-block-listing-2"]')
    ).toBeTruthy();
  });
});
