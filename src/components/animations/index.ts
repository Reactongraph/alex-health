/**
 * Animation utilities barrel.
 *   import { fadeInUp, staggerDelay, useFloating, SPRING } from "@/animations";
 */
export { SPRING, DURATION, EASING, PRESS_SCALE, STAGGER_STEP } from "./config";

export { fadeIn, fadeInDown, fadeInUp } from "./fade";
export { slideInUp, slideInDown, slideInLeft, slideInRight } from "./slide";
export { popIn } from "./scale";

export { usePulse } from "./pulse";
export type { PulseOptions } from "./pulse";

export { useFloating } from "./floating";
export type { FloatingOptions } from "./floating";

export { staggerDelay } from "./stagger";
