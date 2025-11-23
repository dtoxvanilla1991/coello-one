import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { clickWithAct } from "@test-utils/clickWithAct";
import { trackEventMock } from "@test-utils/trackEventMock";
import type { AboutCopy } from "@/types/pages";
import AboutUsContent from "./AboutUsContent";

const mockCopy: AboutCopy = {
  metadata: {
    title: "About",
    description: "About copy",
  },
  hero: {
    kicker: "Story",
    title: "Test Title",
    description: "Test Description",
    highlightStats: [
      { label: "Prototype hours", value: "10" },
      { label: "Artists", value: "3" },
      { label: "Residencies", value: "2" },
    ],
  },
  story: {
    title: "Origin",
    paragraphs: ["Paragraph one", "Paragraph two"],
    quote: {
      text: "Quote",
      attribution: "Laura",
    },
  },
  pillars: [
    {
      id: "craft",
      title: "Craft",
      description: "Craft detail",
      statLabel: "Cycles",
      statValue: "5",
    },
    {
      id: "performance",
      title: "Performance",
      description: "Performance detail",
      statLabel: "Labs",
      statValue: "3",
    },
    {
      id: "community",
      title: "Community",
      description: "Community detail",
      statLabel: "Events",
      statValue: "9",
    },
  ],
  timeline: {
    title: "Milestones",
    milestones: [
      { year: "2021", title: "Start", description: "Started" },
      { year: "2022", title: "Build", description: "Built" },
    ],
  },
  cta: {
    label: "Explore",
    href: "/one-sleeve-classic",
  },
};

describe("AboutUsContent", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: renders the story and pillars copy", () => {
    render(<AboutUsContent copy={mockCopy} ctaHref="/en-GB/one-sleeve-classic" />);

    expect(screen.getByRole("heading", { level: 2, name: /Origin/i })).toBeTruthy();
    expect(screen.getByText(/Paragraph one/i)).toBeTruthy();
    expect(screen.getByText(/Craft detail/i)).toBeTruthy();
  });

  it("integration: shows the CTA link and milestones", () => {
    render(<AboutUsContent copy={mockCopy} ctaHref="/en-GB/one-sleeve-classic" />);

    expect(screen.getByRole("link", { name: /Explore/i })).toBeTruthy();
    expect(screen.getByText(/2021/i)).toBeTruthy();
    expect(screen.getByText(/Build/i)).toBeTruthy();
  });

  it("integration: tracks CTA clicks with locale metadata", async () => {
    render(<AboutUsContent copy={mockCopy} ctaHref="/en-GB/one-sleeve-classic" />);

    await clickWithAct(screen.getByRole("link", { name: /Explore/i }));

    expect(trackEventMock).toHaveBeenCalledWith(
      "about_cta_click",
      { surface: "about_timeline" },
      expect.objectContaining({ locale: "en-GB", translationKey: "pages.about.cta.label" }),
    );
  });
});
