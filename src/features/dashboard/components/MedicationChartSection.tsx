import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { fadeInUp, staggerDelay } from "@/components/animations";
import { Card, Chart, Icon } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";

import {
  MED_LEVEL_TAGS,
  MED_LEVEL_VALUES,
  MED_LEVEL_X_LABELS,
  MED_LEVEL_Y_LABELS,
  SECTION_DELAY,
} from "../constants";

/** Medication-level chart card. */
export function MedicationChartSection() {
  const { color } = useTailwind();
  return (
    <Animated.View entering={fadeInUp(staggerDelay(2, 90, SECTION_DELAY))}>
      <Card>
        <View className="flex-row items-center justify-between">
          <Text className="text-title font-bold text-foreground">Medication Level</Text>
          <Icon name="info" size={18} color={color.muted} />
        </View>
        <View className="mt-lg">
          <Chart
            data={MED_LEVEL_VALUES}
            tags={MED_LEVEL_TAGS}
            yLabels={MED_LEVEL_Y_LABELS}
            xLabels={MED_LEVEL_X_LABELS}
            showDots
            pulseLatest
          />
        </View>
      </Card>
    </Animated.View>
  );
}
