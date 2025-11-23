"use client";

import { useEffect, useState } from "react";
import type { AnalyticsDetail } from "@/utils/analyticsAdapter";
import { subscribeAnalytics } from "@/utils/analyticsAdapter";

export function useAnalyticsEvents(maxEvents = 50) {
  const [events, setEvents] = useState<AnalyticsDetail[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const unsubscribe = subscribeAnalytics((detail) => {
      setEvents((previous) => {
        const next = [...previous, detail];
        if (next.length <= maxEvents) {
          return next;
        }
        return next.slice(next.length - maxEvents);
      });
    });

    return unsubscribe;
  }, [maxEvents]);

  return events;
}
