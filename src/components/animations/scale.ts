import { ZoomIn } from "react-native-reanimated";

import { SPRING } from "./config";

/**
 * Scale entrance presets — a spring "pop" for glyphs and badges.
 * (Press-scale interaction lives in the PressableScale component.)
 */

/** Springy pop-in from a smaller scale. */
export const popIn = (delay = 0) =>
  ZoomIn.delay(delay)
    .springify()
    .damping(SPRING.bouncy.damping)
    .stiffness(SPRING.bouncy.stiffness)
    .mass(SPRING.bouncy.mass);
