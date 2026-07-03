import { Easing } from "react-native-reanimated";
import type { WithSpringConfig } from "react-native-reanimated";

/**
 * Shared animation tuning. Every animation in the app draws its timing/spring
 * feel from here so motion is consistent and there are no magic numbers.
 */

/** Spring presets — tuned for an Apple-Health / Linear feel. */
export const SPRING = {
  /** Smooth, low-overshoot — cards, entrances. */
  gentle: { damping: 18, stiffness: 160, mass: 1 },
  /** Snappy — layout reactions. */
  responsive: { damping: 15, stiffness: 220, mass: 0.9 },
  /** Playful overshoot — icon bounces. */
  bouncy: { damping: 9, stiffness: 180, mass: 0.8 },
  /** Tight — press feedback in/out. */
  press: { damping: 20, stiffness: 400, mass: 0.6 },
} satisfies Record<string, WithSpringConfig>;

/** Timing durations in ms. */
export const DURATION = {
  fast: 200,
  base: 350,
  slow: 600,
  progress: 1200,
  chart: 1100,
  breathe: 2600,
  glow: 2000,
} as const;

/** Easing curves. */
export const EASING = {
  /** easeOutQuint — decisive settle, used for most entrances. */
  standard: Easing.bezier(0.22, 1, 0.36, 1),
  inOut: Easing.inOut(Easing.cubic),
  linear: Easing.linear,
} as const;

/** Scale a pressable shrinks to while held. */
export const PRESS_SCALE = 0.96;

/** Delay (ms) between staggered siblings. */
export const STAGGER_STEP = 90;
