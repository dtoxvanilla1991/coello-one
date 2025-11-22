import type { AnalyticsDetail } from "@/utils/analyticsAdapter";

export type HelpFlowMetrics = {
  attempts: number;
  completed: number;
  errors: number;
  averageResponseMs: number;
  completionRate: number;
};

export type HelpKpiSnapshot = {
  contact: HelpFlowMetrics;
  returns: HelpFlowMetrics;
  totalEvents: number;
};

type FlowEventShape = {
  attempt: string;
  success: string;
  error: string;
};

const CONTACT_FLOW: FlowEventShape = {
  attempt: "help_contact_request_attempt",
  success: "help_contact_request",
  error: "help_contact_request_error",
};

const RETURN_FLOW: FlowEventShape = {
  attempt: "help_return_request_attempt",
  success: "help_return_request",
  error: "help_return_request_error",
};

const defaultMetrics: HelpFlowMetrics = Object.freeze({
  attempts: 0,
  completed: 0,
  errors: 0,
  averageResponseMs: 0,
  completionRate: 0,
});

const flows = {
  contact: CONTACT_FLOW,
  returns: RETURN_FLOW,
};

type FlowKey = keyof typeof flows;

type FlowAccumulator = {
  attempts: number;
  completed: number;
  errors: number;
  responseSamples: number[];
};

const defaultAccumulator: FlowAccumulator = {
  attempts: 0,
  completed: 0,
  errors: 0,
  responseSamples: [],
};

function computeFlowMetrics(events: AnalyticsDetail[], key: FlowKey): HelpFlowMetrics {
  const shape = flows[key];
  const accumulator = events.reduce<FlowAccumulator>((acc, detail) => {
    if (detail.event === shape.attempt) {
      return { ...acc, attempts: acc.attempts + 1 };
    }

    if (detail.event === shape.success) {
      const responseTime = Number(detail.payload?.responseTimeMs);
      const responseSamples = Number.isFinite(responseTime)
        ? [...acc.responseSamples, responseTime]
        : acc.responseSamples;
      return {
        ...acc,
        completed: acc.completed + 1,
        responseSamples,
      };
    }

    if (detail.event === shape.error) {
      return { ...acc, errors: acc.errors + 1 };
    }

    return acc;
  }, defaultAccumulator);

  const averageResponseMs =
    accumulator.responseSamples.length > 0
      ? Math.round(
          accumulator.responseSamples.reduce((sum, sample) => sum + sample, 0) /
            accumulator.responseSamples.length,
        )
      : 0;
  const completionRate = accumulator.attempts > 0 ? accumulator.completed / accumulator.attempts : 0;

  return {
    attempts: accumulator.attempts,
    completed: accumulator.completed,
    errors: accumulator.errors,
    averageResponseMs,
    completionRate: Number(completionRate.toFixed(2)),
  };
}

export function buildHelpKpiSnapshot(events: AnalyticsDetail[]): HelpKpiSnapshot {
  if (events.length === 0) {
    return {
      contact: { ...defaultMetrics },
      returns: { ...defaultMetrics },
      totalEvents: 0,
    };
  }

  return {
    contact: computeFlowMetrics(events, "contact"),
    returns: computeFlowMetrics(events, "returns"),
    totalEvents: events.length,
  };
}

export function getRecentHelpEvents(events: AnalyticsDetail[], limit = 8): AnalyticsDetail[] {
  if (events.length <= limit) {
    return [...events].reverse();
  }

  return events.slice(events.length - limit).reverse();
}
