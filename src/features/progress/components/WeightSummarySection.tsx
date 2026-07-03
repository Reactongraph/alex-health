import { useMemo } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Card, ProgressRing } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { useTailwind } from "@/hooks/useTailwind";
import { selectWeightEntriesDesc, type WeightEntry } from "@/store/slices/weightSlice";

import { SECTION_DELAY, WEIGHT_GOAL_KG } from "../constants";
import type { WeightSummary } from "../types";

/** Derive the live summary from logged entries (newest first) + the goal target.
 *  Progress is measured from the peak logged weight down toward the goal. */
function deriveWeightSummary(entries: WeightEntry[], goalKg: number): WeightSummary {
  const todayKg = entries[0]?.weight ?? goalKg;
  const prevKg = entries[1]?.weight ?? todayKg;
  const startKg = entries.reduce((max, e) => Math.max(max, e.weight), todayKg);
  const span = startKg - goalKg;
  const goalPercent =
    span <= 0 ? 100 : Math.min(100, Math.max(0, ((startKg - todayKg) / span) * 100));

  return {
    todayKg,
    deltaKg: todayKg - prevKg,
    goalKg,
    toGoKg: Math.max(0, todayKg - goalKg),
    goalPercent: Math.round(goalPercent),
  };
}

/** Today's weight, delta vs yesterday, goal, and the goal progress ring. */
export function WeightSummarySection() {
  const { color } = useTailwind();
  const entries = useAppSelector(selectWeightEntriesDesc);
  const s = useMemo(() => deriveWeightSummary(entries, WEIGHT_GOAL_KG), [entries]);
  const loss = s.deltaKg <= 0;
  const deltaText = `${loss ? "↓" : "↑"} ${Math.abs(s.deltaKg).toFixed(1)} kg`;

  return (
    <Animated.View entering={fadeInUp(staggerDelay(0, 90, SECTION_DELAY))}>
      <Card>
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-caption font-medium text-muted">Today&apos;s Weight</Text>
            <Text className="mt-xs text-display font-extrabold text-foreground">
              {s.todayKg.toFixed(1)}
              <Text className="text-caption font-medium text-muted"> kg</Text>
            </Text>
            <View className="mt-xs flex-row items-center">
              <Text
                className="text-micro font-medium"
                style={{ color: loss ? color.success : color.danger }}
              >
                {deltaText}
              </Text>
              <Text className="text-micro font-medium text-subtle"> vs yesterday</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-md">
            <View className="items-end">
              <Text className="text-caption font-medium text-muted">Goal</Text>
              <Text className="mt-xxs text-title font-bold text-accent">
                {s.goalKg.toFixed(1)}
                <Text className="text-caption font-medium text-muted"> kg</Text>
              </Text>
              <Text className="mt-xxs text-micro font-medium text-subtle">
                {s.toGoKg.toFixed(1)} kg to go
              </Text>
            </View>
            <ProgressRing percent={s.goalPercent} />
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}
