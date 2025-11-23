import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { clickWithAct } from "@test-utils/clickWithAct";
import { trackEventMock } from "@test-utils/trackEventMock";
import type { EducationHubCopy } from "@/types/pages";
import EducationHubContent from "./EducationHubContent";

const hubCopy: EducationHubCopy = {
  metadata: {
    title: "Hub",
    description: "Meta",
  },
  hero: {
    kicker: "Hub",
    title: "Train smarter",
    description: "Switch tabs",
  },
  tabs: [
    {
      key: "health",
      label: "Health",
      title: "Fuel",
      description: "Fuel copy",
      image: "/athletes/vertical/main-secondary-4.jpg",
      imageAlt: "Fuel image",
      focusPoints: ["Hydrate"],
      highlights: [{ title: "Meals", description: "Colorful" }],
      resources: [
        {
          label: "Fuel guide",
          type: "video",
          href: "https://example.com/fuel",
          description: "Video",
        },
      ],
      cta: {
        label: "View fuel guide",
        href: "https://example.com",
      },
    },
    {
      key: "activity",
      label: "Activity",
      title: "Program",
      description: "Programming",
      image: "/athletes/vertical/main-secondary-7.jpg",
      imageAlt: "Activity image",
      focusPoints: ["Contrast"],
      highlights: [{ title: "Blocks", description: "Contrast" }],
      resources: [
        {
          label: "Hybrid plan",
          type: "program",
          href: "https://example.com/program",
          description: "PDF",
        },
      ],
      cta: {
        label: "View program",
        href: "https://example.com/program",
      },
    },
  ],
  commitment: {
    title: "Commitment",
    description: "We refresh the hub monthly.",
  },
};

describe("EducationHubContent", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: renders the first tab content by default", () => {
    render(<EducationHubContent copy={hubCopy} />);

    expect(screen.getByText(/Fuel copy/i)).toBeTruthy();
    expect(screen.getByText(/Hydrate/i)).toBeTruthy();
  });

  it("integration: switches content when a new tab is selected", async () => {
    render(<EducationHubContent copy={hubCopy} />);

    await clickWithAct(screen.getByRole("tab", { name: /Activity/i }));

    expect(await screen.findByText(/Programming/i)).toBeTruthy();
    expect(screen.getByText(/Hybrid plan/i)).toBeTruthy();
  });

  it("integration: tracks tab change events", async () => {
    render(<EducationHubContent copy={hubCopy} />);

    await clickWithAct(screen.getByRole("tab", { name: /Activity/i }));

    expect(trackEventMock).toHaveBeenCalledWith(
      "education_hub_tab_change",
      { tabKey: "activity" },
      expect.objectContaining({
        locale: "en-GB",
        translationKey: "pages.educationHub.tabs.activity",
      }),
    );
  });
});
