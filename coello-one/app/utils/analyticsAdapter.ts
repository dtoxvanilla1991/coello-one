export type AnalyticsPayload = Record<string, unknown>;

export type AnalyticsDetail = {
  event: string;
  timestamp: number;
  payload: AnalyticsPayload;
};

export type AnalyticsAdapter = (detail: AnalyticsDetail) => void;
export type AnalyticsListener = (detail: AnalyticsDetail) => void;

let adapter: AnalyticsAdapter | null = null;
const listeners = new Set<AnalyticsListener>();

export function setAnalyticsAdapter(customAdapter: AnalyticsAdapter | null) {
  adapter = customAdapter;
}

export function getAnalyticsAdapter(): AnalyticsAdapter | null {
  return adapter;
}

export function subscribeAnalytics(listener: AnalyticsListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function dispatchAnalytics(detail: AnalyticsDetail): void {
  listeners.forEach((listener) => listener(detail));
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
      "*",
    );
  }
}
