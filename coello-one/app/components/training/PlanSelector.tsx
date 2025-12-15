"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Flex, Segmented, Typography } from "antd";
import type { SegmentedValue } from "antd/es/segmented";
import PlanDisplay from "@/components/training/PlanDisplay";
import { TRAINING_PLANS, type TrainingPlan } from "@config/training-plans";
import { useTranslations } from "@/localization/useTranslations";

const { Paragraph, Text } = Typography;

type PlanSelectorProps = {
  plans?: TrainingPlan[];
};

export default function PlanSelector({ plans = TRAINING_PLANS }: PlanSelectorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<TrainingPlan["id"]>(plans[0].id);
  const [renderedPlanId, setRenderedPlanId] = useState<TrainingPlan["id"]>(plans[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pagesCopy = useTranslations("pages");
  const coelloCopy = pagesCopy.coelloCutTraining;
  const preloadRef = useRef<Record<string, boolean>>({});
  const motionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    PLAN_BACKGROUND_SRCS.forEach((src) => {
      if (!src || preloadRef.current[src]) {
        return;
      }
      const image = new Image();
      image.src = src;
      preloadRef.current[src] = true;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (motionTimerRef.current) {
        clearTimeout(motionTimerRef.current);
        motionTimerRef.current = null;
      }
    };
  }, []);

  const planMap = useMemo(() => {
    return plans.reduce<Record<string, TrainingPlan>>((acc, plan) => {
      acc[plan.id] = plan;
      return acc;
    }, {});
  }, [plans]);

  const segmentedOptions = useMemo(
    () =>
      plans.map((plan) => {
        const planCopy = coelloCopy.plans[plan.id];
        return {
          label: (
            <Flex vertical gap={2} className="text-left">
              <Text className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                {plan.daysPerWeek} {coelloCopy.planSelector.daysLabel}
              </Text>
              <Text className="text-sm font-semibold text-neutral-100">
                {planCopy?.name ?? plan.id}
              </Text>
            </Flex>
          ),
          value: plan.id,
        };
      }),
    [plans, coelloCopy],
  );

  const handleSegmentChange = (value: SegmentedValue) => {
    const planId = value as TrainingPlan["id"];
    if (planId === selectedPlanId) {
      return;
    }
    setSelectedPlanId(planId);
    setIsTransitioning(true);
    if (motionTimerRef.current) {
      clearTimeout(motionTimerRef.current);
    }
    motionTimerRef.current = setTimeout(() => {
      setRenderedPlanId(planId);
      setIsTransitioning(false);
      motionTimerRef.current = null;
    }, 240);
  };

  const renderedPlan = planMap[renderedPlanId];
  const backgroundSrc = PLAN_ARTWORKS[renderedPlanId];

  return (
    <Card className="border-neutral-800 bg-neutral-900 text-neutral-200" classNames={{ body: "p-6 md:p-8" }}>
      <Flex vertical gap={16}>
        <Flex vertical gap={8}>
          <Text className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {coelloCopy.planSelector.kicker}
          </Text>
          <Paragraph className="m-0 text-neutral-300">
            {coelloCopy.planSelector.description}
          </Paragraph>
        </Flex>
        <Segmented
          block
          size="large"
          value={selectedPlanId}
          onChange={handleSegmentChange}
          options={segmentedOptions}
          className="bg-neutral-950 text-neutral-100"
        />
        <Flex className="relative">
          {backgroundSrc ? (
            <Flex
              aria-hidden
              className={`pointer-events-none absolute inset-2 rounded-[28px] opacity-20 blur-lg transition-opacity duration-500 ${
                isTransitioning ? "opacity-10" : "opacity-30"
              }`}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.92), rgba(8,8,8,0.96)), url(${backgroundSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.2)",
              }}
            />
          ) : null}
          <Flex
            className={`relative w-full transition-all duration-300 ease-out ${
              isTransitioning ? "translate-y-3 opacity-40 blur-sm" : "translate-y-0 opacity-100 blur-0"
            }`}
          >
            {renderedPlan ? <PlanDisplay plan={renderedPlan} /> : null}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

const PLAN_ARTWORKS: Record<TrainingPlan["id"], string> = {
  essentialist: "/athletes/vertical/main-secondary-5.jpg",
  architect: "/athletes/vertical/main-secondary-8.jpg",
  craftsman: "/athletes/vertical/main-secondary-10.jpg",
};

const PLAN_BACKGROUND_SRCS = Object.values(PLAN_ARTWORKS);
