import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { clickWithAct } from "@test-utils/clickWithAct";
import { trackEventMock } from "@test-utils/trackEventMock";
import type { SustainabilityCopy } from "@/types/pages";
import SustainabilityContent from "./SustainabilityContent";

const sustainabilityCopy: SustainabilityCopy = {
  metadata: {
    title: "Sustainability",
    description: "Meta",
  },
  hero: {
    kicker: "Planet",
    title: "Respect the canvas",
    description: "Hero",
  },
  initiatives: [
    {
      title: "Recycled fibers",
      description: "Made with recycled nylon",
      badge: "70%",
    },
    {
      title: "Traceability",
      description: "EU partners",
      badge: "EU",
    },
    {
      title: "Repair",
      description: "Free repair",
      badge: "Care",
    },
  ],
  metrics: [
    { label: "Water", value: "11 L" },
    { label: "Solar", value: "82%" },
  ],
  materials: {
    title: "Materials",
    items: ["SeaCell", "Dope dyed"],
  },
  roadmap: {
    title: "Roadmap",
    steps: [
      { year: "2025", title: "Measure", description: "Audit" },
      { year: "2026", title: "Reduce", description: "Renewables" },
    ],
  },
  cta: {
    label: "Manifesto",
    href: "https://example.com",
  },
};

describe("SustainabilityContent", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: displays initiatives and material list", () => {
    render(<SustainabilityContent copy={sustainabilityCopy} />);

    expect(screen.getByText(/Recycled fibers/i)).toBeTruthy();
    expect(screen.getByText(/SeaCell/i)).toBeTruthy();
  });

  it("integration: renders roadmap steps and stats", () => {
    render(<SustainabilityContent copy={sustainabilityCopy} />);

    expect(screen.getByText(/2025/i)).toBeTruthy();
    expect(screen.getByText(/82%/i)).toBeTruthy();
  });

  it("integration: tracks manifest CTA clicks", async () => {
    render(<SustainabilityContent copy={sustainabilityCopy} />);

    await clickWithAct(screen.getByRole("link", { name: /Manifesto/i }));

    expect(trackEventMock).toHaveBeenCalledWith(
      "sustainability_manifesto_click",
      { surface: "sustainability_roadmap" },
      expect.objectContaining({
        locale: "en-GB",
        translationKey: "pages.sustainability.cta.label",
      }),
    );
  });
});
