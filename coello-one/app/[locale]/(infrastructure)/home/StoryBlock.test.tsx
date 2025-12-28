import { render, screen } from "@testing-library/react";
import StoryBlock from "./StoryBlock";
import { describe, it, expect } from "bun:test";
import { getTestTranslations } from "@test-utils/translations";

const STORY_BLOCK_COPY = getTestTranslations("home").storyBlock;

describe("StoryBlock", () => {
  it("should render the story block", () => {
    render(<StoryBlock />);
    expect(screen.getByRole("list", { name: STORY_BLOCK_COPY.ariaLabel })).toBeTruthy();
  });

  it("should render 3 listings", () => {
    render(<StoryBlock />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
