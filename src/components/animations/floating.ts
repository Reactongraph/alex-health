import { useEffect } from "react";
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type AnimatedStyle,
} from "react-native-reanimated";
import type { ViewStyle } from "react-native";

import { DURATION } from "./config";

export interface FloatingOptions {
  /** Vertical travel in px (peak-to-peak is 2×). */
  amplitude?: number;
  /** Peak rotation in degrees. */
  rotate?: number;
  duration?: number;
}

/**
 * Gentle continuous bob + sway — the floating medicine vial. Runs entirely on
 * the UI thread and loops forever with an eased in/out reverse.
 */
export const useFloating = (options: FloatingOptions = {}): AnimatedStyle<ViewStyle> => {
  const { amplitude = 8, rotate = 3, duration = DURATION.breathe } = options;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [duration, progress]);

  return useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [amplitude, -amplitude]) },
      { rotate: `${interpolate(progress.value, [0, 1], [-rotate, rotate])}deg` },
    ],
  }));
};
