export type AnalyticsPayload = Record<string, unknown>;

export type AnalyticsDetail = {
  event: string;
  timestamp: number;
  payload: AnalyticsPayload;
};

export type AnalyticsAdapter = (detail: AnalyticsDetail) => void;

let adapter: AnalyticsAdapter | null = null;

export function setAnalyticsAdapter(customAdapter: AnalyticsAdapter | null) {
  adapter = customAdapter;
}

export function getAnalyticsAdapter(): AnalyticsAdapter | null {
  return adapter;
}

export function dispatchAnalytics(detail: AnalyticsDetail): void {
  if (adapter) {
    adapter(detail);
    return;
  }

  if (typeof window !== "undefined" && typeof window.postMessage === "function") {
    window.postMessage(
      {
        source: "coello-analytics",
        ...detail,
      },
      "*"
    );
  }
}
