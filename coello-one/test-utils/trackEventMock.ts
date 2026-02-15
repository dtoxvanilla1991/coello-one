import { mock } from "bun:test";
import { subscribeAnalytics } from "@/utils/analyticsAdapter";

type TrackEventFn = (event: string, payload?: unknown, meta?: unknown) => void;

export const trackEventMock = mock<TrackEventFn>(() => {});

subscribeAnalytics((detail) => {
  const payload = detail.payload as Record<string, unknown> | undefined;
  const meta = {
    locale: typeof payload?.locale === "string" ? payload.locale : undefined,
    translationKey:
      typeof payload?.translationKey === "string" ? payload.translationKey : undefined,
    translationVariant:
      typeof payload?.translationVariant === "string" ? payload.translationVariant : undefined,
  };
  const hasLocalizationMeta = Boolean(meta.translationKey || meta.translationVariant);

  if (hasLocalizationMeta) {
    const rest = { ...(payload ?? {}) };
    delete rest.locale;
    delete rest.translationKey;
    delete rest.translationVariant;
    trackEventMock(detail.event, rest, meta);
    return;
  }

  trackEventMock(detail.event, detail.payload);
});

export const resetTrackEventMock = () => {
  trackEventMock.mockReset();
};
