import { memo, useEffect } from "react";
import {
  Image,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "@/components/animations";
import { useTailwind } from "@/hooks/useTailwind";

export interface AvatarProps {
  source: ImageSourcePropType;
  size?: number;
  online?: boolean;
  style?: StyleProp<ViewStyle>;
}

const RING = 2;

/** Rounded avatar with a breathing teal glow and optional pulsing online dot. */
function AvatarComponent({ source, size = 44, online = false, style }: AvatarProps) {
  const { color } = useTailwind();
  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, { duration: DURATION.glow, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + glow.value * 0.5,
    transform: [{ scale: 1 + glow.value * 0.18 }],
  }));
  const dotStyle = useAnimatedStyle(() => ({ transform: [{ scale: 1 + glow.value * 0.2 }] }));
  const dot = Math.round(size * 0.26);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: -RING,
            left: -RING,
            right: -RING,
            bottom: -RING,
            borderRadius: (size + RING * 2) / 2,
            backgroundColor: color.accentGlow,
          },
          glowStyle,
        ]}
      />
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: RING,
          borderColor: color.accent,
        }}
      />
      {online ? (
        <Animated.View
          style={[
            {
              position: "absolute",
              right: -1,
              bottom: -1,
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              backgroundColor: color.success,
              borderWidth: 2,
              borderColor: color.background,
            },
            dotStyle,
          ]}
        />
      ) : null}
    </View>
  );
}

export const Avatar = memo(AvatarComponent);
