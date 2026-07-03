import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMigrate, type PersistConfig, type PersistedState } from "redux-persist";

import type { RootReducerState } from "./rootReducer";

/** v3: weight entries now use a numeric `timestamp` and a longer seeded history so
 *  the range tabs (7D/30D/…) each span distinct data. Drop any persisted weight
 *  state so the fresh seed initializes. NOTE: this discards previously logged demo
 *  weights — acceptable while the data is seed/mock. */
const migrations = {
  3: (state: PersistedState): PersistedState => {
    if (!state) return state;
    const next = { ...(state as Record<string, unknown>) };
    delete next.weight;
    return next as PersistedState;
  },
};

/** Persist ONLY the weight slice for now — extend the whitelist per slice. */
export const persistConfig: PersistConfig<RootReducerState> = {
  key: "root",
  version: 3,
  storage: AsyncStorage,
  whitelist: ["weight"],
  migrate: createMigrate(migrations, { debug: false }),
};
