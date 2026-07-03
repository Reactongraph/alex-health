import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "@/components/animations";
import { useTailwind } from "@/hooks/useTailwind";
import { BrandWordmark } from "./BrandWordmark";

export interface AnimatedSplashProps {
  onFinish: () => void;
  holdMs?: number;
}

/** Branded splash: the PepMind wordmark sits over a pulsing teal glow, then the
 *  overlay fades out to reveal the app. The native splash is hidden only once
 *  this overlay has painted, so the handoff is seamless (no blank frame). */
export function AnimatedSplash({ onFinish, holdMs = 1300 }: AnimatedSplashProps) {
  const { color, shadows } = useTailwind();
  const overlayOpacity = useSharedValue(1);
  const logoScale = useSharedValue(0.94);
  const glow = useSharedValue(0.4);
  const nativeHidden = useRef(false);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) });
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: DURATION.glow, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: DURATION.glow, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    overlayOpacity.value = withDelay(
      holdMs,
      withTiming(0, { duration: DURATION.base, easing: Easing.in(Easing.cubic) }, (finished) => {
        if (finished) runOnJS(onFinish)();
      }),
    );
  }, [glow, holdMs, logoScale, onFinish, overlayOpacity]);

  const handleLayout = () => {
    if (nativeHidden.current) return;
    nativeHidden.current = true;
    ExpoSplashScreen.hideAsync().catch(() => {});
  };

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));
  const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: logoScale.value }] }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value * 0.6,
    transform: [{ scale: 0.8 + glow.value * 0.4 }],
  }));

  return (
    <Animated.View
      onLayout={handleLayout}
      className="z-overlay items-center justify-center bg-background"
      style={[StyleSheet.absoluteFill, overlayStyle]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: color.accentGlow,
          },
          shadows.glowStrong,
          glowStyle,
        ]}
      />
      <Animated.View style={logoStyle}>
        <BrandWordmark size="display" />
      </Animated.View>
    </Animated.View>
  );
}
