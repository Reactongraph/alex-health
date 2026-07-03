import { useCallback, useState } from "react";

import { DOSE } from "../constants";

const snap = (v: number) => Math.round(v / DOSE.stepMg) * DOSE.stepMg;

/** Dose stepper state: the current mg plus clamped, snapped +/- controls. */
export function useDoseStepper() {
  const [currentMg, setCurrentMg] = useState(DOSE.currentMg);

  const increment = useCallback(
    () => setCurrentMg((c) => Math.min(DOSE.maxMg, snap(c + DOSE.stepMg))),
    [],
  );
  const decrement = useCallback(
    () => setCurrentMg((c) => Math.max(DOSE.minMg, snap(c - DOSE.stepMg))),
    [],
  );

  return { currentMg, increment, decrement };
}
