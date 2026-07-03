import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { fadeInDown } from "@/components/animations";
import { Avatar, BrandWordmark, Icon, IconButton } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";

import { DASHBOARD_USER } from "../constants";

function AnimatedBell({ hasNotifications }: { hasNotifications: boolean }) {
  const { color } = useTailwind();
  const rotation = useSharedValue(0);
  useEffect(() => {
    const ring = withSequence(
      withTiming(-12, { duration: 110, easing: Easing.out(Easing.quad) }),
      withTiming(12, { duration: 110, easing: Easing.inOut(Easing.quad) }),
      withTiming(-7, { duration: 100, easing: Easing.inOut(Easing.quad) }),
      withTiming(0, { duration: 120, easing: Easing.out(Easing.quad) }),
    );
    rotation.value = withRepeat(withDelay(3200, ring), -1, false);
  }, [rotation]);
  const bellStyle = useAnimatedStyle(() => ({ transform: [{ rotateZ: `${rotation.value}deg` }] }));

  return (
    <IconButton variant="surface" accessibilityLabel="Notifications">
      <Animated.View style={[{ transformOrigin: "top" }, bellStyle]}>
        <Icon name="bell" size={20} color={color.foreground} />
      </Animated.View>
      {hasNotifications ? (
        <View className="absolute right-[12px] top-[10px] h-[8px] w-[8px] rounded-full border-thin border-card bg-accent" />
      ) : null}
    </IconButton>
  );
}

/** Greeting + wordmark on the left, notification bell + avatar on the right. */
export function Header() {
  return (
    <Animated.View entering={fadeInDown(0)} className="flex-row items-center justify-between">
      <View>
        <Text className="text-label font-medium text-muted">{DASHBOARD_USER.greeting}</Text>
        <BrandWordmark size="header" />
      </View>
      <View className="flex-row items-center gap-md">
        <AnimatedBell hasNotifications={DASHBOARD_USER.hasNotifications} />
        <Avatar
          source={{ uri: DASHBOARD_USER.avatarUri }}
          size={46}
          online={DASHBOARD_USER.online}
        />
      </View>
    </Animated.View>
  );
}
