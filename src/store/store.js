import { configureStore } from "@reduxjs/toolkit";
import motionReducer from "../features/motionSlice";
import controlReducer from "../features/controlSlice";
export const store = configureStore({
  reducer: {
    motion: motionReducer, // Add the sprite reducer to the store
    control: controlReducer, // Add the control reducer to the store
  },
});
