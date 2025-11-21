import type { AnalyticsPayload } from "./analyticsAdapter";
import { dispatchAnalytics } from "./analyticsAdapter";

type TrackEventPayload = AnalyticsPayload;

type TrackEventLocalization = {
  locale?: string;
  translationKey?: string;
  translationVariant?: string;
};

/**
 * Emits analytics details via the configured adapter, including a timestamp.
 */
export function trackEvent(
  event: string,
  payload: TrackEventPayload = {},
  localization?: TrackEventLocalization,
): void {
  const enrichedPayload = localization
    ? {
        ...payload,
        ...(localization.locale ? { locale: localization.locale } : {}),
        ...(localization.translationKey ? { translationKey: localization.translationKey } : {}),
        ...(localization.translationVariant ? { translationVariant: localization.translationVariant } : {}),
      }
    : payload;

  const detail = {
    event,
    timestamp: Date.now(),
    payload: enrichedPayload,
  };

  dispatchAnalytics(detail);
}
