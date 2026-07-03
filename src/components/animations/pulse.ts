import { useEffect } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type AnimatedStyle,
} from "react-native-reanimated";
import type { ViewStyle } from "react-native";

import { DURATION } from "./config";

export interface PulseOptions {
  minScale?: number;
  maxScale?: number;
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
}

/**
 * Continuous scale/opacity pulse on the UI thread. Reusable for the latest
 * chart dot, notification badges, or any "alive" indicator.
 */
export const usePulse = (options: PulseOptions = {}): AnimatedStyle<ViewStyle> => {
  const {
    minScale = 1,
    maxScale = 1.15,
    minOpacity = 1,
    maxOpacity = 1,
    duration = DURATION.glow,
  } = options;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [duration, progress]);

  return useAnimatedStyle(() => ({
    opacity: minOpacity + (maxOpacity - minOpacity) * progress.value,
    transform: [{ scale: minScale + (maxScale - minScale) * progress.value }],
  }));
};
