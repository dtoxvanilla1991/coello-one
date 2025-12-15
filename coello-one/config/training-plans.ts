import type { TrainingPlanId } from "@/types/pages";

export type TrainingPlan = {
  id: TrainingPlanId;
  daysPerWeek: number;
};

export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: "essentialist",
    daysPerWeek: 3,
  },
  {
    id: "architect",
    daysPerWeek: 4,
  },
  {
    id: "craftsman",
    daysPerWeek: 5,
  },
];
