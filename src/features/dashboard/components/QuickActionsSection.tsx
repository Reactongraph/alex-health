import { useCallback } from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Icon, PressableScale } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";
import { withAlpha } from "@/utils/helpers";

import { QUICK_ACTIONS, SECTION_DELAY } from "../constants";
import type { QuickAction, QuickActionId } from "../types";

function QuickActionTile({
  action,
  index,
  onPress,
}: {
  action: QuickAction;
  index: number;
  onPress: (id: QuickActionId) => void;
}) {
  const { color } = useTailwind();
  const handlePress = useCallback(() => onPress(action.id), [onPress, action.id]);
  return (
    <Animated.View entering={fadeInUp(staggerDelay(index))} className="flex-1">
      <PressableScale
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={action.label}
        android_ripple={{ color: withAlpha(action.color, 0.16) }}
        style={[local.tile, { borderColor: color.border, backgroundColor: color.card }]}
      >
        <View
          className="h-[46px] w-[46px] items-center justify-center rounded-md"
          style={{ backgroundColor: withAlpha(action.color, 0.14) }}
        >
          <Icon name={action.icon} size={22} color={action.color} />
        </View>
        <Text className="text-micro font-semibold text-foreground">{action.label}</Text>
      </PressableScale>
    </Animated.View>
  );
}

interface QuickActionsSectionProps {
  onAction: (id: QuickActionId) => void;
}

/** Row of quick-action tiles, each with its own staggered entrance. */
export function QuickActionsSection({ onAction }: QuickActionsSectionProps) {
  return (
    <Animated.View entering={fadeInUp(staggerDelay(3, 90, SECTION_DELAY))}>
      <Text className="text-body font-bold text-foreground">Quick Actions</Text>
      <View className="mt-lg flex-row gap-md">
        {QUICK_ACTIONS.map((action, index) => (
          <QuickActionTile key={action.id} action={action} index={index} onPress={onAction} />
        ))}
      </View>
    </Animated.View>
  );
}

// Layout-only styles for the animated PressableScale target (className can't
// reach it). Colours are applied inline from useTailwind() at the call site.
const local = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
  } as ViewStyle,
});
