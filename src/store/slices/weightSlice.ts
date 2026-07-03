import { createSelector, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

import { DAY_MS } from "@/utils/date";

export interface WeightEntry {
  id: string;
  weight: number;
  /** Epoch ms when logged — the source of truth for sorting and date-range filtering. */
  timestamp: number;
}

export interface WeightState {
  entries: WeightEntry[];
}

/** Days of seeded history — long enough that every range tab (7D … 1Y/All) spans a
 *  distinct window of data. */
const SEED_DAYS = 420;
const SEED_START_KG = 92;
const SEED_END_KG = 84;

/** Seed ~14 months of daily entries ending today: a gentle downward trend from
 *  ~92kg to ~84kg with mild deterministic noise. Timestamps are relative to "now"
 *  so ranges stay meaningful whenever the app first runs. Newest-first (index 0 =
 *  today). Persisted state replaces this after the first run. */
function makeSeedEntries(): WeightEntry[] {
  const now = Date.now();
  return Array.from({ length: SEED_DAYS }, (_, k) => {
    const progress = k / (SEED_DAYS - 1); // 0 = today, 1 = oldest
    const base = SEED_END_KG + (SEED_START_KG - SEED_END_KG) * progress;
    const noise = Math.sin(k * 1.3) * 0.3 + Math.sin(k * 0.37) * 0.2;
    return {
      id: `seed-${k}`,
      weight: Math.round((base + noise) * 10) / 10,
      timestamp: now - k * DAY_MS,
    };
  });
}

const initialState: WeightState = {
  entries: makeSeedEntries(),
};

const weightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {
    addWeight: {
      reducer: (state, action: PayloadAction<WeightEntry>) => {
        state.entries.unshift(action.payload);
      },
      prepare: (weight: number, timestamp: number = Date.now()) => ({
        payload: { id: nanoid(), weight, timestamp },
      }),
    },
    updateWeight: (
      state,
      action: PayloadAction<{ id: string; weight?: number; timestamp?: number }>,
    ) => {
      const entry = state.entries.find((e) => e.id === action.payload.id);
      if (!entry) return;
      if (action.payload.weight !== undefined) entry.weight = action.payload.weight;
      if (action.payload.timestamp !== undefined) entry.timestamp = action.payload.timestamp;
    },
    deleteWeight: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
    clearWeights: (state) => {
      state.entries = [];
    },
  },
});

/** Raw entries in insertion order (newest-first by convention). */
export const selectWeightEntries = (state: { weight: WeightState }) => state.weight.entries;

/** Entries sorted newest-first by timestamp, regardless of insertion order. */
export const selectWeightEntriesDesc = createSelector(selectWeightEntries, (entries) =>
  [...entries].sort((a, b) => b.timestamp - a.timestamp),
);

export const { addWeight, updateWeight, deleteWeight, clearWeights } = weightSlice.actions;
export default weightSlice.reducer;
