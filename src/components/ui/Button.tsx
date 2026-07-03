import { memo, type ReactNode } from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTailwind } from "@/hooks/useTailwind";
import { PressableScale } from "./PressableScale";

export type ButtonVariant = "primary" | "surface";

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CONTENT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  paddingVertical: 16,
  paddingHorizontal: 24,
  borderRadius: 999,
};

/** Primary CTA (teal gradient + glow) and a subtle `surface` variant. */
function ButtonComponent({
  label,
  onPress,
  variant = "primary",
  leftIcon,
  fullWidth = false,
  disabled = false,
  style,
}: ButtonProps) {
  const { color, gradient, shadows } = useTailwind();
  const isPrimary = variant === "primary";
  const labelColor = isPrimary ? color.onAccent : color.foreground;

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={[
        { borderRadius: 999, backgroundColor: color.accent },
        { alignSelf: fullWidth ? "stretch" : "flex-start", opacity: disabled ? 0.5 : 1 },
        isPrimary ? shadows.glowSoft : undefined,
        style,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={gradient.accentButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={CONTENT}
        >
          {leftIcon}
          <Text className="text-body font-bold" style={{ color: labelColor }}>
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <View
          style={[
            CONTENT,
            { backgroundColor: color.cardElevated, borderWidth: 1, borderColor: color.border },
          ]}
        >
          {leftIcon}
          <Text className="text-body font-semibold" style={{ color: labelColor }}>
            {label}
          </Text>
        </View>
      )}
    </PressableScale>
  );
}

export const Button = memo(ButtonComponent);
