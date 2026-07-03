import { memo, type ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";

import { useTailwind } from "@/hooks/useTailwind";
import { PressableScale } from "./PressableScale";

export type IconButtonVariant = "solid" | "surface" | "ghost";

export interface IconButtonProps {
  children: ReactNode;
  onPress?: () => void;
  size?: number;
  variant?: IconButtonVariant;
  accessibilityLabel: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Circular, icon-agnostic tap target (icon passed as children). */
function IconButtonComponent({
  children,
  onPress,
  size = 44,
  variant = "surface",
  accessibilityLabel,
  disabled = false,
  style,
}: IconButtonProps) {
  const { color } = useTailwind();
  const variantStyle: Record<IconButtonVariant, ViewStyle> = {
    solid: { backgroundColor: color.accent },
    surface: { backgroundColor: color.cardElevated, borderWidth: 1, borderColor: color.border },
    ghost: { backgroundColor: "transparent" },
  };
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      hitSlop={8}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.4 : 1,
        },
        variantStyle[variant],
        style,
      ]}
    >
      {children}
    </PressableScale>
  );
}

export const IconButton = memo(IconButtonComponent);
