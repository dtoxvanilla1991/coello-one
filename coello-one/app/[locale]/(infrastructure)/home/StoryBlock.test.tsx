import { render, screen } from "@testing-library/react";
import StoryBlock from "./StoryBlock";
import { describe, it, expect } from "bun:test";

describe("StoryBlock", () => {
  it("should render the story block", () => {
    render(<StoryBlock />);
    expect(screen.getByRole("list", { name: /Coello story highlights/i })).toBeTruthy();
  });

  it("should render 3 listings", () => {
    render(<StoryBlock />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
