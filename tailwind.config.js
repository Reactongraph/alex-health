/** @type {import('tailwindcss').Config} */
/**
 * PepMind Design System — the SINGLE SOURCE OF TRUTH for design tokens
 * (rem base: 1rem = 16px). Consumed via NativeWind `className` utilities.
 *
 * A few RN APIs cannot be styled with className — react-native-svg fills/strokes,
 * the vector-icons `color` prop, expo-linear-gradient color arrays, Reanimated
 * animated backgrounds, and native shadows. Those read the SAME tokens from JS via
 * the `useTailwind()` hook (src/hooks/useTailwind.ts), which resolves this config
 * with tailwind's `resolveConfig` — so there is no hand-maintained duplicate. The
 * `gradients` and `shadows` sections below exist only for that JS-side consumption
 * (they generate no className utilities); everything else is available as classes.
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["System"],
      },

      // Colors — PepMind dark theme.
      colors: {
        // Surfaces
        background: "#090B14",
        "background-elevated": "#0F131C",
        card: "#161A23",
        "card-elevated": "#1B212C",
        // Brand accent
        accent: "#28E7C5",
        "accent-dim": "#1FB9A0",
        "accent-glow": "rgba(40, 231, 197, 0.35)", // JS-only: Reanimated glow fills
        "on-accent": "#052018",
        // Text  -> text-foreground / text-muted / text-subtle
        foreground: "#FFFFFF",
        muted: "#A7ABB5",
        subtle: "#6B7180",
        // Borders -> border-border / border-border-strong
        border: "rgba(255, 255, 255, 0.08)",
        "border-strong": "rgba(255, 255, 255, 0.12)",
        // Status
        success: "#3BE38B",
        danger: "#FF6B6B",
        // Quick-action accent tints
        "action-log-dose": "#28E7C5",
        "action-calculator": "#8B5CF6",
        "action-inventory": "#F5A623",
        "action-history": "#3B9EFF",
      },

      // Font sizes (rem) with line-heights. Example: text-h1, text-body, text-caption
      fontSize: {
        logo: ["2.75rem", { lineHeight: "3.125rem" }], // 44 / 50
        display: ["2.25rem", { lineHeight: "2.5rem" }], // 36 / 40
        h1: ["1.875rem", { lineHeight: "2.0625rem" }], // 30 / 33
        h2: ["1.5rem", { lineHeight: "1.6875rem" }], // 24 / 27
        title: ["1.25rem", { lineHeight: "1.5rem" }], // 20 / 24
        body: ["1.0625rem", { lineHeight: "1.375rem" }], // 17 / 22
        label: ["0.9375rem", { lineHeight: "1.3125rem" }], // 15 / 21
        caption: ["0.8125rem", { lineHeight: "1.125rem" }], // 13 / 18
        micro: ["0.75rem", { lineHeight: "1rem" }], // 12 / 16
        nano: ["0.625rem", { lineHeight: "0.8125rem" }], // 10 / 13
      },

      // Font weights. Example: font-medium, font-bold, font-extrabold
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // Spacing (rem) — 4px base scale. Example: p-2xl, gap-md, mb-lg
      spacing: {
        none: "0rem",
        xxs: "0.125rem", // 2px
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
        "4xl": "2.5rem", // 40px
        "5xl": "3.5rem", // 56px
        "tab-clear": "10rem", // 160px — bottom-tab scroll clearance
      },

      // Corner radii (rem). Example: rounded-card, rounded-pill
      borderRadius: {
        none: "0rem",
        xs: "0.375rem", // 6px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        card: "1.5rem", // 24px
        "2xl": "1.75rem", // 28px
        pill: "62.4375rem", // 999px
      },

      // Border widths. Example: border-thin, border-thick
      borderWidth: {
        hairline: "0.5px",
        thin: "1px",
        thick: "1.5px",
        heavy: "2px",
      },

      // Opacity tokens. Example: opacity-disabled
      opacity: {
        disabled: "0.4",
        muted: "0.6",
      },

      // Z-index tokens. Example: z-overlay
      zIndex: {
        base: "0",
        raised: "10",
        overlay: "100",
      },

      // --- JS-only token groups (no className utilities generated) --------------
      // Read via useTailwind() for RN APIs that can't take a className:
      // expo-linear-gradient color arrays and native iOS/Android shadows.

      // Gradient colour stops (start -> end) for expo-linear-gradient.
      gradients: {
        accentButton: ["#2AF0CD", "#1FC9AD"],
      },

      // Elevation presets (iOS shadow* + Android elevation). Teal glows for depth.
      shadows: {
        card: {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        },
        glowSoft: {
          shadowColor: "#28E7C5",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 6,
        },
        glowStrong: {
          shadowColor: "#28E7C5",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.55,
          shadowRadius: 24,
          elevation: 12,
        },
        fab: {
          shadowColor: "#28E7C5",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.6,
          shadowRadius: 22,
          elevation: 16,
        },
        floating: {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.4,
          shadowRadius: 24,
          elevation: 14,
        },
      },
    },
  },
  plugins: [],
};
