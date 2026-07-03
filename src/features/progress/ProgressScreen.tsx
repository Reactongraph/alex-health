import { useCallback, useState } from "react";

import { ScreenContainer } from "@/components/ui";
import { useAppDispatch } from "@/hooks/redux";
import { addWeight } from "@/store/slices/weightSlice";

import {
  AddWeightModal,
  Header,
  WeightChartSection,
  WeightHistorySection,
  WeightSummarySection,
} from "./components";

/** Progress tab — composes the weight sections and owns the add-entry flow. */
export function ProgressScreen() {
  const dispatch = useAppDispatch();
  const [addOpen, setAddOpen] = useState(false);

  const handleAddWeight = useCallback(
    (kg: number) => {
      dispatch(addWeight(kg));
      setAddOpen(false);
    },
    [dispatch],
  );

  return (
    <ScreenContainer>
      <Header />
      <WeightSummarySection />
      <WeightChartSection />
      <WeightHistorySection onAddPress={() => setAddOpen(true)} />

      <AddWeightModal
        visible={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddWeight}
      />
    </ScreenContainer>
  );
}
