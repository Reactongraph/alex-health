import { useCallback, type ReactNode } from "react";
import {
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { PRESS_SCALE, SPRING } from "@/components/animations";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends Omit<PressableProps, "style" | "children"> {
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/** Springs a scale on press, on the UI thread. The Pressable itself is styled so
 *  layout styles (flex, width) apply to the real touch target. */
export function PressableScale({
  scaleTo = PRESS_SCALE,
  onPressIn,
  onPressOut,
  style,
  children,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      scale.value = withSpring(scaleTo, SPRING.press);
      onPressIn?.(event);
    },
    [onPressIn, scale, scaleTo],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      scale.value = withSpring(1, SPRING.press);
      onPressOut?.(event);
    },
    [onPressOut, scale],
  );

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
