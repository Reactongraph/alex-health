import type { ViewStyle } from "react-native";
import type { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

/**
 * JS-side access to the design tokens in `tailwind.config.js`.
 *
 * NativeWind styles everything via `className`, but a few RN APIs can't take one
 * (react-native-svg fills/strokes, the vector-icons `color` prop, expo-linear-
 * gradient color arrays, Reanimated animated backgrounds, native shadows). For
 * those, read the SAME tokens here — resolved straight from the config with
 * tailwind's `resolveConfig`, so nothing is hand-duplicated.
 *
 *   const { color, gradient, shadows } = useTailwind();
 *
 * The theme is static (single dark theme), so the resolved object is built once
 * at module load and returned as a stable singleton.
 */

const theme = resolveConfig(tailwindConfig as unknown as Config).theme as unknown as {
  colors: Record<string, string>;
  gradients: Record<string, [string, string]>;
  shadows: Record<string, RNShadow>;
};

type RNShadow = Pick<
  ViewStyle,
  "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "elevation"
>;

const c = theme.colors;

/** Raw colors (camelCase mirror of the `colors` keys in tailwind.config.js). */
export const color = {
  background: c.background,
  backgroundElevated: c["background-elevated"],
  card: c.card,
  cardElevated: c["card-elevated"],
  accent: c.accent,
  accentDim: c["accent-dim"],
  accentGlow: c["accent-glow"],
  onAccent: c["on-accent"],
  foreground: c.foreground,
  muted: c.muted,
  subtle: c.subtle,
  border: c.border,
  borderStrong: c["border-strong"],
  success: c.success,
  danger: c.danger,
  actionLogDose: c["action-log-dose"],
  actionCalculator: c["action-calculator"],
  actionInventory: c["action-inventory"],
  actionHistory: c["action-history"],
} as const;

/** Gradient colour stops (start -> end) for expo-linear-gradient. */
export const gradient = {
  accentButton: theme.gradients.accentButton as readonly [string, string],
} as const;

/** Elevation presets (iOS shadow* + Android elevation). */
export const shadows = theme.shadows as {
  card: RNShadow;
  glowSoft: RNShadow;
  glowStrong: RNShadow;
  fab: RNShadow;
  floating: RNShadow;
};

const tokens = { color, gradient, shadows } as const;

export type TailwindTokens = typeof tokens;

/**
 * Returns the resolved design tokens for use in JS/TS.
 * Prefer `className` for styling; reach for this only when an RN API can't take one.
 */
export const useTailwind = (): TailwindTokens => tokens;
