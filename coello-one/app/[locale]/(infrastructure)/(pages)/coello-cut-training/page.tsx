import type { Metadata } from "next";
import CoelloCutTrainingContent from "@/components/pages/CoelloCutTraining/CoelloCutTrainingContent";

export const metadata: Metadata = {
  title: "Coello Cut Training Protocol | Coello One",
  description:
    "Choose between The Essentialist, Architect, or Craftsman training archetypes and adopt the ritual that keeps stress low and adaptation high.",
};

// TEST-WAIVER: Server page composes a tested client feature with static metadata; route-level tests would duplicate component coverage.
export default function CoelloCutTrainingPage() {
  return <CoelloCutTrainingContent />;
}
