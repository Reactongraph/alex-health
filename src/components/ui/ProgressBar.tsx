import { memo, useEffect } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { DURATION, EASING } from "@/components/animations";
import { useTailwind } from "@/hooks/useTailwind";

export interface ProgressBarProps {
  /** Fill fraction, 0..1. */
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  delay?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Track + fill that animates 0 -> progress via a UI-thread scaleX. */
function ProgressBarComponent({
  progress,
  height = 8,
  trackColor,
  fillColor,
  delay = 0,
  animated = true,
  style,
}: ProgressBarProps) {
  const { color } = useTailwind();
  const track = trackColor ?? color.border;
  const fill = fillColor ?? color.accent;
  const target = clamp01(progress);
  const value = useSharedValue(animated ? 0 : target);

  useEffect(() => {
    value.value = animated
      ? withDelay(
          delay,
          withTiming(target, { duration: DURATION.progress, easing: EASING.standard }),
        )
      : target;
  }, [animated, delay, target, value]);

  const fillStyle = useAnimatedStyle(() => ({ transform: [{ scaleX: value.value }] }));

  return (
    <View
      style={[
        { height, borderRadius: height / 2, backgroundColor: track, overflow: "hidden" },
        style,
      ]}
    >
      <Animated.View
        style={[
          { height, borderRadius: height / 2, backgroundColor: fill, transformOrigin: "left" },
          fillStyle,
        ]}
      />
    </View>
  );
}

export const ProgressBar = memo(ProgressBarComponent);
