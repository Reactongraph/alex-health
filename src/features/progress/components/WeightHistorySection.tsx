import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Button, Card, Icon, PressableScale } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { useTailwind } from "@/hooks/useTailwind";
import { selectWeightEntriesDesc } from "@/store/slices/weightSlice";
import { formatEntryDate } from "@/utils/date";

import { SECTION_DELAY } from "../constants";

function HistoryRow({ date, weight, delta }: { date: string; weight: number; delta: number }) {
  const { color } = useTailwind();
  const loss = delta <= 0;
  const deltaText = `${loss ? "↓" : "↑"} ${Math.abs(delta).toFixed(1)} kg`;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${date}, ${weight} kilograms`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <Text className="text-body text-foreground">{date}</Text>
      <View className="flex-row items-center gap-md">
        <Text className="text-body font-bold text-foreground">{weight.toFixed(1)} kg</Text>
        <Text
          className="text-caption"
          style={{ color: loss ? color.success : color.danger, width: 58, textAlign: "right" }}
        >
          {deltaText}
        </Text>
        <Icon name="chevron-right" size={18} color={color.subtle} />
      </View>
    </PressableScale>
  );
}

interface WeightHistorySectionProps {
  onAddPress: () => void;
}

/** How many recent entries the history list shows ("See All" reveals the rest). */
const HISTORY_LIMIT = 5;

/** Weight history list plus the "Add Weight" action. */
export function WeightHistorySection({ onAddPress }: WeightHistorySectionProps) {
  const { color } = useTailwind();
  const entries = useAppSelector(selectWeightEntriesDesc);
  const recent = entries.slice(0, HISTORY_LIMIT);

  return (
    <Animated.View entering={fadeInUp(staggerDelay(2, 90, SECTION_DELAY))}>
      <Card>
        <View className="flex-row items-center justify-between">
          <Text className="text-body font-bold text-foreground">Weight History</Text>
          <PressableScale accessibilityRole="button" accessibilityLabel="See all history">
            <Text className="text-caption text-accent">See All</Text>
          </PressableScale>
        </View>

        <View className="mt-xs">
          {recent.map((entry, i) => (
            <HistoryRow
              key={entry.id}
              date={formatEntryDate(entry.timestamp)}
              weight={entry.weight}
              delta={entry.weight - (entries[i + 1]?.weight ?? entry.weight)}
            />
          ))}
        </View>

        <Button
          label="Add Weight"
          fullWidth
          leftIcon={<Icon name="plus" size={18} color={color.onAccent} />}
          onPress={onAddPress}
          style={{ marginTop: 12 }}
        />
      </Card>
    </Animated.View>
  );
}
