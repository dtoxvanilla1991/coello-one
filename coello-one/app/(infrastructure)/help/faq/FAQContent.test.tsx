import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen, within } from "@testing-library/react";
import type { FAQCategory } from "./types";

const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { default: FAQContent } = await import("./FAQContent");

const categoriesFixture: FAQCategory[] = [
  {
    id: "delivery",
    title: "Delivery",
    summary: "Shipping and speed queries",
    entries: [
      {
        id: "delivery-speed",
        question: "How fast do orders arrive?",
        answer: ["Most UK orders arrive in 1-3 days."],
        tags: ["speed"],
      },
    ],
  },
];

describe("FAQContent", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: filters categories based on the search query", () => {
    render(<FAQContent categories={categoriesFixture} initialQuery="returns" />);

    expect(screen.queryByText(/Shipping and speed queries/i)).toBeNull();
    expect(
      screen.getByText(/No answers found—try another keyword or reach us via Concierge chat./i),
    ).toBeTruthy();
  });

  it("integration: records a telemetry event when a question is opened", () => {
    render(<FAQContent categories={categoriesFixture} />);

    const collapseHeader = screen.getByRole("button", { name: /How fast do orders arrive/i });
    fireEvent.click(collapseHeader);

    const panel = collapseHeader.closest(".ant-collapse-item");
    expect(panel).toBeTruthy();
    if (panel) {
      expect(within(panel as HTMLElement).getByText(/Most UK orders arrive in 1-3 days./i)).toBeTruthy();
    }
    expect(trackEventMock).toHaveBeenCalledWith("help_faq_view_question", {
      questionId: "delivery-speed",
    });
  });
});
