import { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Card, Chart, PressableScale } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { useTailwind } from "@/hooks/useTailwind";
import { selectWeightEntries, type WeightEntry } from "@/store/slices/weightSlice";
import { cn } from "@/utils/cn";
import { DAY_MS, formatAxisDate } from "@/utils/date";

import { RANGES, SECTION_DELAY } from "../constants";
import type { RangeId } from "../types";

/** Rolling time window (in days) each range shows; "All" shows every entry. */
const RANGE_DAYS: Record<RangeId, number | null> = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "1Y": 365,
  All: null,
};

const Y_TICKS = 6;
const X_LABEL_COUNT = 5;
/** Cap plotted points so long windows (90D/1Y/All) stay readable and each range
 *  renders a distinctly-shaped, evenly-sampled curve. */
const MAX_POINTS = 32;

interface WeightChartData {
  values: number[];
  domain: { min: number; max: number };
  yLabels: string[];
  xLabels: string[];
  tooltip?: string;
}

/** Pick up to `n` evenly-spaced items, always keeping the first and last. */
function pickEvenly<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  return Array.from({ length: n }, (_, i) => items[Math.round((i * (items.length - 1)) / (n - 1))]);
}

/** Build the chart series + axes live from logged entries within the active range.
 *  The chart plots oldest -> newest (left -> right). */
function deriveWeightChart(entries: WeightEntry[], range: RangeId, now: number): WeightChartData {
  const days = RANGE_DAYS[range];
  const cutoff = days ? now - days * DAY_MS : -Infinity;
  const windowed = entries
    .filter((e) => e.timestamp >= cutoff)
    .sort((a, b) => a.timestamp - b.timestamp);
  const sampled = pickEvenly(windowed, MAX_POINTS);
  const values = sampled.map((e) => e.weight);

  if (values.length === 0) {
    return { values, domain: { min: 0, max: 100 }, yLabels: [], xLabels: [] };
  }

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = Math.max(1, (hi - lo) * 0.15);
  const min = Math.floor(lo - pad);
  const max = Math.ceil(hi + pad);

  const ticks = Math.min(Y_TICKS, max - min + 1);
  const yLabels = Array.from({ length: ticks }, (_, i) =>
    Math.round(max - ((max - min) * i) / (ticks - 1)).toString(),
  );
  const xLabels = pickEvenly(
    sampled.map((e) => formatAxisDate(e.timestamp, now)),
    X_LABEL_COUNT,
  );

  return {
    values,
    domain: { min, max },
    yLabels,
    xLabels,
    tooltip: `${values[values.length - 1].toFixed(1)} kg`,
  };
}

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

/** Range selector plus the weight trend chart, derived live from logged entries. */
export function WeightChartSection() {
  const [activeRange, setActiveRange] = useState<RangeId>("7D");
  const handleRange = useCallback((r: RangeId) => setActiveRange(r), []);

  const entries = useAppSelector(selectWeightEntries);
  const chart = useMemo(
    () => deriveWeightChart(entries, activeRange, Date.now()),
    [entries, activeRange],
  );

  return (
    <Animated.View entering={fadeInUp(staggerDelay(1, 90, SECTION_DELAY))}>
      <Card>
        <RangeSelector active={activeRange} onChange={handleRange} />
        <View className="mt-lg">
          <Chart
            data={chart.values}
            domain={chart.domain}
            yLabels={chart.yLabels}
            xLabels={chart.xLabels}
            tooltip={chart.tooltip}
            guideLine
            height={160}
          />
        </View>
      </Card>
    </Animated.View>
  );
}
