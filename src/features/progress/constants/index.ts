import type { RangeId, WeightEntry } from "../types";

/** Mock weight data (replace with an API/store later). */

/** Stagger delay (ms) between the progress screen's entering sections. */
export const SECTION_DELAY = 100;

/** Goal target (kg). Not derivable from logged entries, so it lives here as
 *  config; the rest of the summary (today's weight, delta, %) is derived live
 *  from the store — see `deriveWeightSummary`. */
export const WEIGHT_GOAL_KG = 80.0;

export const RANGES: RangeId[] = ["7D", "30D", "90D", "1Y", "All"];

export const WEIGHT_VALUES = [
  85.0, 85.6, 85.3, 84.8, 85.4, 84.9, 84.1, 83.4, 83.8, 84.4, 84.0, 84.2,
];
export const WEIGHT_DOMAIN = { min: 78, max: 88 };
export const WEIGHT_Y_LABELS = ["88", "86", "84", "82", "80", "78"];
export const WEIGHT_X_LABELS = ["May 3", "May 10", "May 17", "May 24", "Today"];
export const WEIGHT_LATEST_LABEL = "84.2 kg";

export const WEIGHT_HISTORY: WeightEntry[] = [
  { id: "2025-05-28", date: "May 28, 2025", weightKg: 84.2, deltaKg: -0.3 },
  { id: "2025-05-27", date: "May 27, 2025", weightKg: 84.5, deltaKg: -0.4 },
  { id: "2025-05-26", date: "May 26, 2025", weightKg: 84.9, deltaKg: -0.6 },
  { id: "2025-05-25", date: "May 25, 2025", weightKg: 85.5, deltaKg: -0.2 },
];
