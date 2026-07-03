import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Card, Icon, PressableScale, type IconName } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";

import { DOSE, SECTION_DELAY } from "../constants";

function Stepper({
  icon,
  accent,
  disabled,
  onPress,
  label,
}: {
  icon: IconName;
  accent?: boolean;
  disabled?: boolean;
  onPress: () => void;
  label: string;
}) {
  const { color } = useTailwind();
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        local.stepper,
        accent
          ? { backgroundColor: color.accent }
          : { backgroundColor: color.cardElevated, borderWidth: 1, borderColor: color.border },
        { opacity: disabled ? 0.4 : 1 },
      ]}
    >
      <Icon name={icon} size={20} color={accent ? color.onAccent : color.foreground} />
    </PressableScale>
  );
}

interface DoseSectionProps {
  currentMg: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

/** Side-by-side current-dose stepper card and next-dose card. */
export function DoseSection({ currentMg, onIncrement, onDecrement }: DoseSectionProps) {
  const { color } = useTailwind();
  return (
    <Animated.View
      entering={fadeInUp(staggerDelay(1, 90, SECTION_DELAY))}
      className="flex-row gap-md"
    >
      <Card className="flex-1 p-lg">
        <Text className="text-caption font-medium text-muted">Current Dose</Text>
        <Text className="mt-md text-h2 font-bold text-foreground">
          {currentMg.toFixed(1)}
          <Text className="text-caption font-medium text-muted"> mg</Text>
        </Text>
        <View className="mt-md flex-row gap-sm">
          <Stepper
            icon="minus"
            onPress={onDecrement}
            disabled={currentMg <= DOSE.minMg}
            label="Decrease dose"
          />
          <Stepper
            icon="plus"
            accent
            onPress={onIncrement}
            disabled={currentMg >= DOSE.maxMg}
            label="Increase dose"
          />
        </View>
      </Card>

      <Card className="flex-1 p-lg">
        <View className="flex-row items-center justify-between">
          <Text className="text-caption font-medium text-muted">Next Dose</Text>
          <Icon name="calendar" size={18} color={color.muted} />
        </View>
        <Text className="mt-md text-title font-bold text-accent">{DOSE.nextDoseDay}</Text>
        <Text className="mt-xs text-micro font-medium text-subtle">{DOSE.nextDoseTime}</Text>
      </Card>
    </Animated.View>
  );
}

// Layout-only styles for the animated PressableScale targets (className can't
// reach them). Colours are applied inline from useTailwind() at the call site.
const local = StyleSheet.create({
  stepper: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
