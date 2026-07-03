import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, RootState } from "@/store";

/** Typed dispatch/selector hooks — use these instead of the plain react-redux ones. */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
