import { useCallback } from "react";

import { ScreenContainer } from "@/components/ui";

import {
  DoseSection,
  Header,
  MedicationChartSection,
  ProtocolSection,
  QuickActionsSection,
} from "./components";
import { useDoseStepper } from "./hooks/useDoseStepper";
import type { QuickActionId } from "./types";

/** Dashboard tab — composes the feature sections and owns screen-level state. */
export function DashboardScreen() {
  const { currentMg, increment, decrement } = useDoseStepper();

  const handleQuickAction = useCallback((_id: QuickActionId) => {}, []);

  return (
    <ScreenContainer>
      <Header /> 
      <ProtocolSection />
      <DoseSection currentMg={currentMg} onIncrement={increment} onDecrement={decrement} />
      <MedicationChartSection />
      <QuickActionsSection onAction={handleQuickAction} />
    </ScreenContainer>
  );
}
