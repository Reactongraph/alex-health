import { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

import { DURATION, SPRING } from "./config";

/**
 * Fade entrance presets — pass to an `Animated.View`'s `entering` prop.
 * The direction word is the direction of travel while fading in.
 */

/** Plain opacity fade-in. */
export const fadeIn = (delay = 0, duration = DURATION.base) =>
  FadeIn.delay(delay).duration(duration);

/** Fade while travelling downward into place (enters from above) — e.g. the header. */
export const fadeInDown = (delay = 0) =>
  FadeInDown.delay(delay)
    .springify()
    .damping(SPRING.gentle.damping)
    .stiffness(SPRING.gentle.stiffness)
    .mass(SPRING.gentle.mass);

/** Fade while rising into place (enters from below) — e.g. cards sliding up. */
export const fadeInUp = (delay = 0) =>
  FadeInUp.delay(delay)
    .springify()
    .damping(SPRING.gentle.damping)
    .stiffness(SPRING.gentle.stiffness)
    .mass(SPRING.gentle.mass);
