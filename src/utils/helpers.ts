/**
 * Small, generic, pure helper functions shared across the app.
 * No app-specific / business logic lives here.
 */

/** Resolve after `ms` milliseconds. Useful for debouncing and retries. */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Uppercase the first character of a string. */
export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/** True when a value is null, undefined, or an empty/whitespace string. */
export const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || (typeof value === "string" && value.trim().length === 0);

/** Convert a `#RGB`/`#RRGGBB` hex colour to an `rgba()` string with alpha. */
export const withAlpha = (hex: string, alpha: number): string => {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
