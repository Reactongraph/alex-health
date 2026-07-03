import { combineReducers } from "@reduxjs/toolkit";

import weightReducer from "./slices/weightSlice";

/** Add future slices here (auth, user, protocol, settings). */
export const rootReducer = combineReducers({
  weight: weightReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
