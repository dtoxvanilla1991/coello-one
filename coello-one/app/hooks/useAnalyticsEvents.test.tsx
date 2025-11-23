import { describe, expect, it } from "bun:test";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Typography } from "antd";
import { dispatchAnalytics } from "@/utils/analyticsAdapter";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";

const { Text } = Typography;

type HarnessProps = {
  limit?: number;
};

function Harness({ limit = 5 }: HarnessProps) {
  const events = useAnalyticsEvents(limit);
  return <Text data-testid="count">{events.length}</Text>;
}

describe("useAnalyticsEvents", () => {
  it("collects analytics events up to the specified limit", async () => {
    render(<Harness limit={2} />);

    await act(async () => {
      dispatchAnalytics({ event: "help_contact_request_attempt", timestamp: 1, payload: {} });
    });

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("1");
    });

    await act(async () => {
      dispatchAnalytics({
        event: "help_contact_request",
        timestamp: 2,
        payload: { responseTimeMs: 500 },
      });
      dispatchAnalytics({
        event: "help_contact_request_error",
        timestamp: 3,
        payload: { reason: "validation" },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("2");
    });
  });
});
