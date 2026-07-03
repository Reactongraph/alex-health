import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PersistConfig } from "redux-persist";

import type { RootReducerState } from "./rootReducer";

/** Persist ONLY the weight slice for now — extend the whitelist per slice. */
export const persistConfig: PersistConfig<RootReducerState> = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["weight"],
};
