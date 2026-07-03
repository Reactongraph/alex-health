import { memo } from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTailwind } from "@/hooks/useTailwind";

/** App-semantic icon names — decoupled from the underlying glyph library. */
export type IconName =
  | "bell"
  | "calendar"
  | "syringe"
  | "calculator"
  | "inventory"
  | "history"
  | "home"
  | "protocol"
  | "progress"
  | "more"
  | "plus"
  | "minus"
  | "info"
  | "chevron-right";

type GlyphFamily = "feather" | "ionicons" | "material-community";

const GLYPHS: Record<IconName, { family: GlyphFamily; glyph: string }> = {
  bell: { family: "feather", glyph: "bell" },
  calendar: { family: "feather", glyph: "calendar" },
  syringe: { family: "material-community", glyph: "needle" },
  calculator: { family: "ionicons", glyph: "calculator-outline" },
  inventory: { family: "material-community", glyph: "bottle-tonic" },
  history: { family: "ionicons", glyph: "time-outline" },
  home: { family: "feather", glyph: "home" },
  protocol: { family: "feather", glyph: "list" },
  progress: { family: "feather", glyph: "bar-chart-2" },
  more: { family: "feather", glyph: "more-horizontal" },
  plus: { family: "feather", glyph: "plus" },
  minus: { family: "feather", glyph: "minus" },
  info: { family: "feather", glyph: "info" },
  "chevron-right": { family: "feather", glyph: "chevron-right" },
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

function IconComponent({ name, size = 20, color: tint }: IconProps) {
  const { color } = useTailwind();
  const { family, glyph } = GLYPHS[name];
  const props = { name: glyph as never, size, color: tint ?? color.foreground };

  if (family === "ionicons") return <Ionicons {...props} />;
  if (family === "material-community") return <MaterialCommunityIcons {...props} />;
  return <Feather {...props} />;
}

export const Icon = memo(IconComponent);
