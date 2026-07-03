import { memo, useEffect, useMemo, useState } from "react";
import { Text, View, type LayoutChangeEvent } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { DURATION, EASING, usePulse } from "@/components/animations";
import { cn } from "@/utils/cn";
import { useTailwind } from "@/hooks/useTailwind";

export interface ChartProps {
  data: number[];
  /** Value range mapped to the vertical axis (defaults to 0..100). */
  domain?: { min: number; max: number };
  yLabels?: string[];
  xLabels?: string[];
  /** Per-point callout tags (e.g. "5mg", "Next"). */
  tags?: (string | undefined)[];
  showDots?: boolean;
  pulseLatest?: boolean;
  /** Tooltip text pinned above the latest point (e.g. "84.2 kg"). */
  tooltip?: string;
  guideLine?: boolean;
  height?: number;
}

const PADDING_X = 6;
const PADDING_Y = 18;
const Y_AXIS_WIDTH = 34;
const TAG_WIDTH = 44;
const CURVE_TENSION = 0.18;
const DEFAULT_DOMAIN = { min: 0, max: 100 };

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Coord {
  x: number;
  y: number;
  tag?: string;
}

/** Catmull-Rom -> cubic bézier smoothing for an organic curve. */
function buildGeometry(
  data: number[],
  tags: (string | undefined)[] | undefined,
  width: number,
  height: number,
  domain: { min: number; max: number },
) {
  const plotW = width - PADDING_X * 2;
  const plotH = height - PADDING_Y * 2;
  const step = data.length > 1 ? plotW / (data.length - 1) : 0;
  const span = domain.max - domain.min || 1;

  const coords: Coord[] = data.map((value, i) => ({
    x: PADDING_X + step * i,
    y: PADDING_Y + plotH * (1 - Math.min(1, Math.max(0, (value - domain.min) / span))),
    tag: tags?.[i],
  }));

  let line = coords.length ? `M ${coords[0].x} ${coords[0].y}` : "";
  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] ?? coords[i];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) * CURVE_TENSION;
    const c1y = p1.y + (p2.y - p0.y) * CURVE_TENSION;
    const c2x = p2.x - (p3.x - p1.x) * CURVE_TENSION;
    const c2y = p2.y - (p3.y - p1.y) * CURVE_TENSION;
    line += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  const baseline = height - PADDING_Y;
  const area =
    coords.length > 0
      ? `${line} L ${coords[coords.length - 1].x} ${baseline} L ${coords[0].x} ${baseline} Z`
      : "";

  let length = 0;
  for (let i = 1; i < coords.length; i += 1) {
    length += Math.hypot(coords[i].x - coords[i - 1].x, coords[i].y - coords[i - 1].y);
  }

  return { coords, line, area, length, baseline };
}

/** Curved line/area chart with animated draw-on. Powers the medication and weight charts.
 *  SVG props can't take className, so colours are raw; text labels use Tailwind. */
function ChartComponent({
  data,
  domain = DEFAULT_DOMAIN,
  yLabels,
  xLabels,
  tags,
  showDots = false,
  pulseLatest = false,
  tooltip,
  guideLine = false,
  height = 150,
}: ChartProps) {
  const { color } = useTailwind();
  const [width, setWidth] = useState(0);
  const draw = useSharedValue(0);
  const pulseStyle = usePulse({ minScale: 1, maxScale: 1.9, minOpacity: 0.5, maxOpacity: 0 });

  const geo = useMemo(
    () => buildGeometry(data, tags, width, height, domain),
    [data, tags, width, height, domain],
  );

  useEffect(() => {
    if (width > 0) {
      draw.value = withDelay(
        400,
        withTiming(1, { duration: DURATION.chart, easing: EASING.standard }),
      );
    }
  }, [width, draw]);

  const lineProps = useAnimatedProps(() => ({ strokeDashoffset: geo.length * (1 - draw.value) }));
  const areaProps = useAnimatedProps(() => ({ fillOpacity: draw.value }));

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const last = geo.coords[geo.coords.length - 1];

  return (
    <View>
      <View className="flex-row">
        {yLabels ? (
          <View className="justify-between" style={{ width: Y_AXIS_WIDTH, height }}>
            {yLabels.map((label) => (
              <Text key={label} className="text-caption text-muted">
                {label}
              </Text>
            ))}
          </View>
        ) : null}

        <View className="flex-1" onLayout={onLayout}>
          <Svg width={width} height={height}>
            <Defs>
              <SvgLinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={color.accent} stopOpacity="0.28" />
                <Stop offset="1" stopColor={color.accent} stopOpacity="0" />
              </SvgLinearGradient>
            </Defs>

            {width > 0 && last ? (
              <>
                <AnimatedPath d={geo.area} fill="url(#chartFill)" animatedProps={areaProps} />
                {guideLine ? (
                  <Line
                    x1={last.x}
                    y1={PADDING_Y}
                    x2={last.x}
                    y2={geo.baseline}
                    stroke={color.accent}
                    strokeWidth={1}
                    strokeDasharray="3 4"
                    opacity={0.5}
                  />
                ) : null}
                <AnimatedPath
                  d={geo.line}
                  stroke={color.accent}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={geo.length}
                  animatedProps={lineProps}
                />
                {showDots
                  ? geo.coords.map((c, i) => (
                      <Circle
                        key={i}
                        cx={c.x}
                        cy={c.y}
                        r={3.5}
                        fill={color.background}
                        stroke={color.accent}
                        strokeWidth={2}
                      />
                    ))
                  : null}
              </>
            ) : null}
          </Svg>

          {last ? (
            <>
              {pulseLatest ? (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    {
                      position: "absolute",
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: color.accent,
                      left: last.x - 9,
                      top: last.y - 9,
                    },
                    pulseStyle,
                  ]}
                />
              ) : null}
              {tooltip ? (
                <>
                  <View
                    className="absolute rounded-sm px-md py-xs"
                    style={{
                      backgroundColor: color.foreground,
                      left: Math.min(Math.max(last.x - 34, 0), Math.max(width - 68, 0)),
                      top: Math.max(last.y - 34, 0),
                    }}
                  >
                    <Text className="text-caption font-bold" style={{ color: color.background }}>
                      {tooltip}
                    </Text>
                  </View>
                  <View
                    pointerEvents="none"
                    style={{
                      position: "absolute",
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color.accent,
                      borderWidth: 2,
                      borderColor: color.card,
                      left: last.x - 5,
                      top: last.y - 5,
                    }}
                  />
                </>
              ) : null}
              {geo.coords.map((c, i) =>
                c.tag ? (
                  <View
                    key={i}
                    className="absolute items-center rounded-sm py-xxs"
                    style={{
                      width: TAG_WIDTH,
                      backgroundColor: color.cardElevated,
                      borderWidth: 1,
                      borderColor: color.border,
                      left: Math.min(
                        Math.max(c.x - TAG_WIDTH / 2, 0),
                        Math.max(width - TAG_WIDTH, 0),
                      ),
                      top: c.y - 32,
                    }}
                  >
                    <Text className="text-caption text-foreground">{c.tag}</Text>
                  </View>
                ) : null,
              )}
            </>
          ) : null}
        </View>
      </View>

      {xLabels ? (
        <View
          className="mt-sm flex-row justify-between"
          style={{ marginLeft: yLabels ? Y_AXIS_WIDTH : 0 }}
        >
          {xLabels.map((label, i) => (
            <Text
              key={label}
              className={cn(
                "text-caption",
                i === xLabels.length - 1 ? "text-foreground" : "text-muted",
              )}
            >
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export const Chart = memo(ChartComponent);
