import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen, within } from "@testing-library/react";
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
    description: "Protocol stack",
  },
  ui: {
    modalTitlePrefix: "Protocol TL;DR",
    openTlDrLabel: "Open TL;DR",
    closeLabel: "Close",
    scienceLabel: "Science",
    actionLabel: "Action",
    tlDrHeading: "TL;DR",
    microDoseHeading: "Microdose",
  },
  protocols: [
    {
      id: "recovery",
      code: "Protocol 01",
      title: "Repair",
      subtitle: "Recovery",
      tagline: "Circadian",
      summary: "Sleep lab",
      science: {
        title: "Slow wave",
        description: "GH release",
      },
      action: "Anchor light",
      tlDr: ["Light", "Dark"],
      microDose: ["Shots", "Photos"],
      deepDive: {
        label: "Read deep dive",
        href: "https://example.com/recovery",
      },
      image: "/athletes/vertical/main-secondary-4.jpg",
      imageAlt: "Recovery",
    },
    {
      id: "canvas",
      code: "Protocol 02",
      title: "Preserve",
      subtitle: "Canvas",
      tagline: "Dermal",
      summary: "Protect ink",
      science: {
        title: "AGEs",
        description: "Collagen",
      },
      action: "Cycle meals",
      tlDr: ["No sugar"],
      microDose: ["Bone broth"],
      deepDive: {
        label: "Canvas guide",
        href: "https://example.com/canvas",
      },
      image: "/athletes/vertical/main-secondary-8.jpg",
      imageAlt: "Canvas",
    },
  ],
};

describe("EducationHubContent", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: renders protocol cards with summary content", () => {
    render(<EducationHubContent copy={hubCopy} />);

    expect(screen.getByText(/Repair/i)).toBeTruthy();
    expect(screen.getByText(/Sleep lab/i)).toBeTruthy();
    expect(screen.getByText(/Dermal/i)).toBeTruthy();
  });

  it("integration: opens TL;DR modal for a protocol", async () => {
    render(<EducationHubContent copy={hubCopy} />);

    await clickWithAct(screen.getAllByRole("button", { name: /Open TL;DR/i })[0]);

    const modal = await screen.findByRole("dialog");
    expect(within(modal).getByText(/Slow wave/i)).toBeTruthy();
    expect(within(modal).getByText(/Dark/i)).toBeTruthy();
  });

  it("integration: tracks modal open and deep dive clicks", async () => {
    render(<EducationHubContent copy={hubCopy} />);

    const tlDrButton = screen.getAllByRole("button", { name: /Open TL;DR/i })[0];
    await clickWithAct(tlDrButton);

    expect(trackEventMock).toHaveBeenCalledWith(
      "education_hub_protocol_modal_open",
      { protocolId: "recovery" },
      expect.objectContaining({
        locale: "en-GB",
        translationKey: "pages.educationHub.protocols.recovery",
      }),
    );

    const deepDiveLink = screen.getAllByRole("link", { name: /Read deep dive/i })[0];
    await clickWithAct(deepDiveLink);

    expect(trackEventMock).toHaveBeenCalledWith(
      "education_hub_protocol_deep_dive",
      { protocolId: "recovery" },
      expect.objectContaining({
        locale: "en-GB",
        translationKey: "pages.educationHub.protocols.recovery",
      }),
    );
  });
});
