import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { memo } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";
import { useTailwind } from "@/hooks/useTailwind";
import { Icon, type IconName } from "./Icon";
import { PressableScale } from "./PressableScale";

const ROUTE_ICON: Record<string, IconName> = {
  dashboard: "home",
  progress: "progress",
  protocol: "protocol",
  more: "more",
};

interface Tab {
  key: string;
  label: string;
  icon: IconName;
  focused: boolean;
  onPress: () => void;
}

function TabButton({ tab }: { tab: Tab }) {
  const { color } = useTailwind();
  return (
    <PressableScale
      onPress={tab.onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: tab.focused }}
      accessibilityLabel={tab.label}
      style={{ flex: 1, alignItems: "center", gap: 4 }}
    >
      <Icon name={tab.icon} size={24} color={tab.focused ? color.accent : color.muted} />
      <Text
        numberOfLines={1}
        className={cn("text-nano font-semibold", tab.focused ? "text-accent" : "text-muted")}
      >
        {tab.label}
      </Text>
    </PressableScale>
  );
}

/* ------------------------------------------------------------------------- *
 * Center "+" FAB — DISABLED per product decision (kept for future use).
 * To re-enable: uncomment these imports, the Fab component, and the fab slot
 * + fab layer marked below in BottomTabComponent.
 *
 * import { useEffect, type ReactNode } from "react";
 * import { LinearGradient } from "expo-linear-gradient";
 * import Animated, {
 *   Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming,
 * } from "react-native-reanimated";
 * import { DURATION } from "@/components/animations";
 *
 * const FAB_SIZE = 60;
 *
 * function Fab({ children }: { children: ReactNode }) {
 *   const { color, gradient, shadows } = useTailwind();
 *   const breathe = useSharedValue(0);
 *   useEffect(() => {
 *     breathe.value = withRepeat(
 *       withTiming(1, { duration: DURATION.breathe, easing: Easing.inOut(Easing.ease) }),
 *       -1,
 *       true,
 *     );
 *   }, [breathe]);
 *   const halo = useAnimatedStyle(() => ({
 *     opacity: 0.3 + breathe.value * 0.4,
 *     transform: [{ scale: 1 + breathe.value * 0.22 }],
 *   }));
 *   return (
 *     <View style={{ width: FAB_SIZE, height: FAB_SIZE, alignItems: "center", justifyContent: "center" }}>
 *       <Animated.View
 *         pointerEvents="none"
 *         style={[
 *           { position: "absolute", width: FAB_SIZE, height: FAB_SIZE, borderRadius: FAB_SIZE / 2, backgroundColor: color.accentGlow },
 *           halo,
 *         ]}
 *       />
 *       <PressableScale
 *         accessibilityRole="button"
 *         accessibilityLabel="Add entry"
 *         style={[{ borderRadius: FAB_SIZE / 2, backgroundColor: color.accent }, shadows.fab]}
 *       >
 *         <LinearGradient
 *           colors={gradient.accentButton}
 *           start={{ x: 0, y: 0 }}
 *           end={{ x: 1, y: 1 }}
 *           style={{ width: FAB_SIZE, height: FAB_SIZE, borderRadius: FAB_SIZE / 2, alignItems: "center", justifyContent: "center" }}
 *         >
 *           {children}
 *         </LinearGradient>
 *       </PressableScale>
 *     </View>
 *   );
 * }
 * ------------------------------------------------------------------------- */

/** Full-width bottom navigation. (Center FAB currently disabled.) */
function BottomTabComponent({ state, descriptors, navigation }: BottomTabBarProps) {
  const { shadows } = useTailwind();
  const insets = useSafeAreaInsets();

  const tabs: Tab[] = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const focused = state.index === index;
    return {
      key: route.key,
      label: options.title ?? route.name,
      icon: ROUTE_ICON[route.name] ?? "more",
      focused,
      onPress: () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (!focused && !event.defaultPrevented) navigation.navigate(route.name as never);
      },
    };
  });

  return (
    <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0">
      <View
        className="flex-row items-start rounded-t-card border-t-thin border-border bg-background-elevated"
        style={[
          { paddingTop: 14, paddingBottom: Math.max(insets.bottom, 14), paddingHorizontal: 6 },
          shadows.floating,
        ]}
      >
        {tabs.map((tab) => (
          <TabButton key={tab.key} tab={tab} />
        ))}

        {/* Center FAB slot — disabled with the FAB:
        <View style={{ flex: 1 }} /> */}
      </View>

      {/* Center FAB overlay — disabled per product decision:
      <View
        pointerEvents="box-none"
        className="absolute inset-x-0 items-center"
        style={{ top: -FAB_SIZE / 2 }}
      >
        <Fab>
          <Icon name="plus" size={26} color={color.onAccent} />
        </Fab>
      </View>
      */}
    </View>
  );
}

export const BottomTab = memo(BottomTabComponent);
