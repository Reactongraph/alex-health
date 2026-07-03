/**
 * Date helpers for formatting logged-entry timestamps.
 * Generic and pure — no app-specific business logic.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Milliseconds in one day. */
export const DAY_MS = 24 * 60 * 60 * 1000;

/** Epoch ms at local midnight for the day containing `ts`. */
export function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Whole calendar days between `ts` and `now` (ignores time of day). */
function calendarDaysAgo(ts: number, now: number): number {
  return Math.round((startOfDay(now) - startOfDay(ts)) / DAY_MS);
}

/** Full display date for history rows: "Today", "Yesterday", or "May 28, 2025". */
export function formatEntryDate(ts: number, now: number = Date.now()): string {
  const diff = calendarDaysAgo(ts, now);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  const d = new Date(ts);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Short axis label: "Today" or "May 28". */
export function formatAxisDate(ts: number, now: number = Date.now()): string {
  if (calendarDaysAgo(ts, now) === 0) return "Today";
  const d = new Date(ts);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
