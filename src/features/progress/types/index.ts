export type RangeId = "7D" | "30D" | "90D" | "1Y" | "All";

export interface WeightSummary {
  todayKg: number;
  /** Negative = loss vs yesterday. */
  deltaKg: number;
  goalKg: number;
  toGoKg: number;
  goalPercent: number;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  deltaKg: number;
}
