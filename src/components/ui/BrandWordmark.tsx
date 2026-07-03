import { memo } from "react";
import { Text } from "react-native";

import { cn } from "@/utils/cn";

export type BrandWordmarkSize = "header" | "display";

export interface BrandWordmarkProps {
  size?: BrandWordmarkSize;
  className?: string;
}

/** The PepMind wordmark — "Pep" (white) + "Mind" (teal). */
function BrandWordmarkComponent({ size = "header", className }: BrandWordmarkProps) {
  return (
    <Text
      accessibilityRole="header"
      accessibilityLabel="PepMind"
      className={cn(
        "font-extrabold text-foreground",
        size === "display" ? "text-logo" : "text-h1",
        className,
      )}
    >
      Pep<Text className="text-accent">Mind</Text>
    </Text>
  );
}

export const BrandWordmark = memo(BrandWordmarkComponent);
