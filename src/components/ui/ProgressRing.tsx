import { memo, useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { DURATION, EASING } from "@/components/animations";
import { useTailwind } from "@/hooks/useTailwind";

export interface ProgressRingProps {
  /** Fill percentage, 0..100. */
  percent: number;
  size?: number;
  strokeWidth?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Circular progress ring with an animated sweep and centered percentage. */
function ProgressRingComponent({ percent, size = 58, strokeWidth = 5 }: ProgressRingProps) {
  const { color } = useTailwind();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  useEffect(() => {
    const target = Math.min(1, Math.max(0, percent / 100));
    progress.value = withDelay(
      400,
      withTiming(target, { duration: DURATION.progress, easing: EASING.standard }),
    );
  }, [percent, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </Svg>
      <Text className="text-caption font-semibold text-accent">{Math.round(percent)}%</Text>
    </View>
  );
}

export const ProgressRing = memo(ProgressRingComponent);
