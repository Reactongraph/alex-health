import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

import { WEIGHT_HISTORY } from "@/features/progress/constants";

export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
}

export interface WeightState {
  entries: WeightEntry[];
}

/** Seeded with the mock history so the list isn't empty on first launch;
 *  persisted state replaces this after the first run. */
const initialState: WeightState = {
  entries: WEIGHT_HISTORY.map((e) => ({ id: e.id, weight: e.weightKg, date: e.date })),
};

const weightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {
    addWeight: {
      reducer: (state, action: PayloadAction<WeightEntry>) => {
        state.entries.unshift(action.payload);
      },
      prepare: (weight: number, date: string) => ({ payload: { id: nanoid(), weight, date } }),
    },
    updateWeight: (
      state,
      action: PayloadAction<{ id: string; weight?: number; date?: string }>,
    ) => {
      const entry = state.entries.find((e) => e.id === action.payload.id);
      if (!entry) return;
      if (action.payload.weight !== undefined) entry.weight = action.payload.weight;
      if (action.payload.date !== undefined) entry.date = action.payload.date;
    },
    deleteWeight: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
    clearWeights: (state) => {
      state.entries = [];
    },
  },
});

export const { addWeight, updateWeight, deleteWeight, clearWeights } = weightSlice.actions;
export default weightSlice.reducer;
