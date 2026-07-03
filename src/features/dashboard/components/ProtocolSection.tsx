import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { ClipPath, Defs, LinearGradient, Rect, Stop, Text as SvgText } from "react-native-svg";

import { fadeInUp, staggerDelay, useFloating } from "@/components/animations";
import { Card, ProgressBar } from "@/components/ui";
import { useTailwind } from "@/hooks/useTailwind";
import { withAlpha } from "@/utils/helpers";

import { PROTOCOL, SECTION_DELAY } from "../constants";

function FloatingBottle({ size = 132, doseLabel = "5mg" }: { size?: number; doseLabel?: string }) {
  const { color } = useTailwind();
  const floatStyle = useFloating({ amplitude: 6, rotate: 3 });
  const width = size * 0.64;

  return (
    <View className="items-center justify-center" style={{ width, height: size }}>
      <Animated.View style={floatStyle}>
        <Svg width={width} height={size} viewBox="0 0 100 160">
          <Defs>
            <LinearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color.accent} stopOpacity="0.95" />
              <Stop offset="1" stopColor={color.accentDim} stopOpacity="0.9" />
            </LinearGradient>
            <ClipPath id="body">
              <Rect x="24" y="22" width="52" height="134" rx="18" />
            </ClipPath>
          </Defs>
          <Rect x="37" y="4" width="26" height="14" rx="4" fill={color.accent} />
          <Rect x="40" y="16" width="20" height="7" fill={color.accentDim} />
          <Rect
            x="24"
            y="22"
            width="52"
            height="134"
            rx="18"
            fill="#10161F" // one-off bottle-glass shade (not a design-system token)
            stroke={withAlpha(color.accent, 0.4)}
            strokeWidth="1.5"
          />
          <Rect x="24" y="72" width="52" height="84" fill="url(#liquid)" clipPath="url(#body)" />
          <Rect x="24" y="72" width="52" height="4" fill={color.accent} clipPath="url(#body)" />
          <Rect x="32" y="34" width="6" height="72" rx="3" fill={color.foreground} opacity="0.14" />
          <SvgText
            x="50"
            y="118"
            fill={color.foreground}
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
          >
            {doseLabel}
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
}

/** Current-protocol summary card with the floating medication bottle. */
export function ProtocolSection() {
  const percent = Math.round(PROTOCOL.activeFraction * 100);
  const subtitle = `Day ${PROTOCOL.dayCurrent} of ${PROTOCOL.dayTotal} • ${PROTOCOL.nextDoseLabel}`;

  return (
    <Animated.View entering={fadeInUp(staggerDelay(0, 90, SECTION_DELAY))}>
      <Card elevation="glow" className="overflow-hidden">
        <View className="flex-row">
          <View className="flex-1 pr-sm">
            <Text className="text-caption font-medium text-muted">Current Protocol</Text>
            <View className="mt-sm flex-row items-center gap-sm">
              <Text className="text-title font-bold text-foreground">{PROTOCOL.medication}</Text>
              <View className="rounded-pill bg-accent/10 px-md py-xxs">
                <Text className="text-caption font-semibold text-accent">{PROTOCOL.doseLabel}</Text>
              </View>
            </View>
            <Text className="mt-xs text-micro font-medium text-subtle">{subtitle}</Text>
            <View className="mt-lg flex-row items-center gap-md">
              <ProgressBar progress={PROTOCOL.activeFraction} delay={300} style={{ flex: 1 }} />
              <View className="items-end">
                <Text className="text-caption font-semibold text-accent">{percent}%</Text>
                <Text className="text-micro font-medium text-subtle">Active</Text>
              </View>
            </View>
          </View>
          <FloatingBottle size={132} doseLabel={PROTOCOL.doseLabel.replace(" ", "")} />
        </View>
      </Card>
    </Animated.View>
  );
}
