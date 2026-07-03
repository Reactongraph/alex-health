import { STAGGER_STEP } from "./config";

/**
 * Compute an entrance delay for the item at `index` so siblings cascade in.
 * Pair with an entrance preset: `entering={fadeInUp(staggerDelay(i))}`.
 */
export const staggerDelay = (index: number, step: number = STAGGER_STEP, base = 0): number =>
  base + Math.max(0, index) * step;
