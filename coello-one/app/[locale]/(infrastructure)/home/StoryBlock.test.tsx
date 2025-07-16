import { render, screen } from "@testing-library/react";
import StoryBlock from "./StoryBlock";

describe("StoryBlock", () => {
  it("should render the story block", () => {
    render(<StoryBlock />);
    expect(screen.getByTestId("story-block")).toBeInTheDocument();
  });

  it("should render 3 listings", () => {
    render(<StoryBlock />);
    expect(screen.getByTestId("story-block-listing-0")).toBeInTheDocument();
    expect(screen.getByTestId("story-block-listing-1")).toBeInTheDocument();
    expect(screen.getByTestId("story-block-listing-2")).toBeInTheDocument();
  });
});
