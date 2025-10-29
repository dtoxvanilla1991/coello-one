import type { AnalyticsPayload } from "./analyticsAdapter";
import { dispatchAnalytics } from "./analyticsAdapter";

type TrackEventPayload = AnalyticsPayload;

/**
 * Emits analytics details via the configured adapter, including a timestamp.
 */
export function trackEvent(event: string, payload: TrackEventPayload = {}): void {
  const detail = {
    event,
    timestamp: Date.now(),
    payload,
  };

  dispatchAnalytics(detail);
}
