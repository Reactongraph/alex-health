/**
 * Tiny className joiner for NativeWind. Filters falsy values so conditional
 * classes read cleanly: `cn("base", isActive && "active")`.
 */
export type ClassValue = string | false | null | undefined;

export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(" ");
