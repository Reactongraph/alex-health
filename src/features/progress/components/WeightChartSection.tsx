import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Card, Chart, PressableScale } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";
import { cn } from "@/utils/cn";

import {
  RANGES,
  SECTION_DELAY,
  WEIGHT_DOMAIN,
  WEIGHT_LATEST_LABEL,
  WEIGHT_VALUES,
  WEIGHT_X_LABELS,
  WEIGHT_Y_LABELS,
} from "../constants";
import type { RangeId } from "../types";

function RangeSelector({ active, onChange }: { active: RangeId; onChange: (r: RangeId) => void }) {
  const { color } = useTailwind();
  return (
    <View className="flex-row gap-[4px] rounded-pill bg-background p-[4px]">
      {RANGES.map((range) => {
        const selected = range === active;
        return (
          <PressableScale
            key={range}
            onPress={() => onChange(range)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={range}
            style={{
              flex: 1,
              paddingVertical: 8,
              alignItems: "center",
              borderRadius: 999,
              backgroundColor: selected ? color.accent : "transparent",
            }}
          >
            <Text className={cn("text-caption", selected ? "text-on-accent" : "text-muted")}>
              {range}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

/** Range selector plus the weight trend chart. */
export function WeightChartSection() {
  const [activeRange, setActiveRange] = useState<RangeId>("7D");
  const handleRange = useCallback((r: RangeId) => setActiveRange(r), []);

  return (
    <Animated.View entering={fadeInUp(staggerDelay(1, 90, SECTION_DELAY))}>
      <Card>
        <RangeSelector active={activeRange} onChange={handleRange} />
        <View className="mt-lg">
          <Chart
            data={WEIGHT_VALUES}
            domain={WEIGHT_DOMAIN}
            yLabels={WEIGHT_Y_LABELS}
            xLabels={WEIGHT_X_LABELS}
            tooltip={WEIGHT_LATEST_LABEL}
            guideLine
            height={160}
          />
        </View>
      </Card>
    </Animated.View>
  );
}
