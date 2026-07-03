import type { RangeId } from "../types";

/** Stagger delay (ms) between the progress screen's entering sections. */
export const SECTION_DELAY = 100;

/** Goal target (kg). Not derivable from logged entries, so it lives here as
 *  config; the rest of the summary (today's weight, delta, %) is derived live
 *  from the store — see `deriveWeightSummary`. */
export const WEIGHT_GOAL_KG = 80.0;

export const RANGES: RangeId[] = ["7D", "30D", "90D", "1Y", "All"];
