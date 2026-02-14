import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import type { AnalyticsDetail } from "../analyticsAdapter";

let trackEvent: typeof import("../trackEvent").trackEvent;
let setAnalyticsAdapter: typeof import("../analyticsAdapter").setAnalyticsAdapter;

describe("trackEvent", () => {
  const originalPostMessage = globalThis.window?.postMessage;

  beforeEach(async () => {
    mock.restore();
    ({ trackEvent } = await import("../trackEvent"));
    ({ setAnalyticsAdapter } = await import("../analyticsAdapter"));
    setAnalyticsAdapter(null);
    if (originalPostMessage) {
      globalThis.window.postMessage = originalPostMessage;
    }
  });

  afterEach(() => {
    setAnalyticsAdapter(null);
    if (originalPostMessage) {
      globalThis.window.postMessage = originalPostMessage;
    }
  });

  it("routes events through a custom analytics adapter when configured", () => {
    const adapter = mock<(detail: AnalyticsDetail) => void>(() => {});
    setAnalyticsAdapter(adapter);

    trackEvent("custom_event", { foo: "bar" });

    expect(adapter).toHaveBeenCalledTimes(1);
    const call = adapter.mock.calls[0];
    expect(call).toBeDefined();
    const [detail] = call!;
    expect(detail.event).toBe("custom_event");
    expect(detail.payload).toEqual({ foo: "bar" });
    expect(detail.timestamp).toBeGreaterThan(0);
  });

  it("falls back to window.postMessage when no adapter is present", () => {
    const postMessageSpy = mock<(message: unknown, target?: string) => void>(() => {});
    globalThis.window.postMessage = postMessageSpy as unknown as typeof window.postMessage;

    trackEvent("fallback_event", { fizz: "buzz" });

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    const call = postMessageSpy.mock.calls[0];
    expect(call).toBeDefined();
    const [message, target] = call!;
    expect(target).toBe("*");
    expect(message).toMatchObject({
      source: "coello-analytics",
      event: "fallback_event",
      payload: { fizz: "buzz" },
    });
    expect(typeof (message as { timestamp: unknown }).timestamp).toBe("number");
  });
});
