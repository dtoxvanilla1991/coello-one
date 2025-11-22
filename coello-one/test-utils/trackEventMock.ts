import { mock } from "bun:test";

type TrackEventFn = (event: string, payload?: unknown, meta?: unknown) => void;

export const trackEventMock = mock<TrackEventFn>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

export const resetTrackEventMock = () => {
  trackEventMock.mockReset();
};
