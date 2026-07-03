import { memo, type ReactNode } from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";

import { cn } from "@/utils/cn";
import { useTailwind } from "@/hooks/useTailwind";

export type CardElevation = "flat" | "raised" | "glow";

export interface CardProps extends ViewProps {
  className?: string;
  elevation?: CardElevation;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

/** Base surface — rounded, bordered dark card. */
function CardComponent({ className, elevation = "raised", style, children, ...rest }: CardProps) {
  const { shadows } = useTailwind();
  const elevationStyle: Record<CardElevation, ViewStyle | undefined> = {
    flat: undefined,
    raised: shadows.card,
    glow: shadows.glowSoft,
  };
  return (
    <View
      className={cn("rounded-card border-thin border-border bg-card p-2xl", className)}
      style={[elevationStyle[elevation], style]}
      {...rest}
    >
      {children}
    </View>
  );
}

export const Card = memo(CardComponent);
