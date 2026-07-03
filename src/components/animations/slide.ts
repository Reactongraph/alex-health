import { SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from "react-native-reanimated";

import { SPRING } from "./config";

/**
 * Slide entrance presets (larger travel than fade) — for elements that enter
 * from a screen edge, e.g. the floating tab bar rising into view.
 */

/** Rises up from below the screen edge. */
export const slideInUp = (delay = 0) =>
  SlideInDown.delay(delay)
    .springify()
    .damping(SPRING.responsive.damping)
    .stiffness(SPRING.responsive.stiffness)
    .mass(SPRING.responsive.mass);

/** Drops down from above the screen edge. */
export const slideInDown = (delay = 0) =>
  SlideInUp.delay(delay)
    .springify()
    .damping(SPRING.responsive.damping)
    .stiffness(SPRING.responsive.stiffness)
    .mass(SPRING.responsive.mass);

/** Enters from the left edge. */
export const slideInLeft = (delay = 0) =>
  SlideInLeft.delay(delay)
    .springify()
    .damping(SPRING.responsive.damping)
    .stiffness(SPRING.responsive.stiffness)
    .mass(SPRING.responsive.mass);

/** Enters from the right edge. */
export const slideInRight = (delay = 0) =>
  SlideInRight.delay(delay)
    .springify()
    .damping(SPRING.responsive.damping)
    .stiffness(SPRING.responsive.stiffness)
    .mass(SPRING.responsive.mass);
