import { describe, expect, it } from "bun:test";
import type { AnalyticsDetail } from "@/utils/analyticsAdapter";
import { buildHelpKpiSnapshot, getRecentHelpEvents } from "@/utils/analyticsKpis";

describe("analyticsKpis", () => {
  it("calculates flow metrics and averages", () => {
    const baseTimestamp = Date.now();
    const events: AnalyticsDetail[] = [
      { event: "help_contact_request_attempt", timestamp: baseTimestamp, payload: {} },
      {
        event: "help_contact_request",
        timestamp: baseTimestamp + 1,
        payload: { responseTimeMs: 1200 },
      },
      {
        event: "help_contact_request_error",
        timestamp: baseTimestamp + 2,
        payload: { reason: "validation" },
      },
      { event: "help_return_request_attempt", timestamp: baseTimestamp + 3, payload: {} },
      {
        event: "help_return_request",
        timestamp: baseTimestamp + 4,
        payload: { responseTimeMs: 800 },
      },
    ];

    const snapshot = buildHelpKpiSnapshot(events);

    expect(snapshot.totalEvents).toBe(5);
    expect(snapshot.contact).toEqual(
      expect.objectContaining({
        attempts: 1,
        completed: 1,
        errors: 1,
        averageResponseMs: 1200,
        completionRate: 1,
      }),
    );
    expect(snapshot.returns).toEqual(
      expect.objectContaining({
        attempts: 1,
        completed: 1,
        errors: 0,
        averageResponseMs: 800,
        completionRate: 1,
      }),
    );
  });

  it("returns the newest events first when slicing recent analytics", () => {
    const events: AnalyticsDetail[] = Array.from({ length: 10 }).map((_, index) => ({
      event: "help_contact_request_attempt",
      timestamp: index,
      payload: { n: index },
    }));

    const recent = getRecentHelpEvents(events, 3);

    expect(recent).toHaveLength(3);
    expect(recent[0].payload?.n).toBe(9);
    expect(recent[2].payload?.n).toBe(7);
  });
});
