import { configureStore } from "@reduxjs/toolkit";
import motionReducer from "../features/motionSlice";
import controlReducer from "../features/controlSlice";
import codeReducer from "../features/codeSlice";
export const store = configureStore({
  reducer: {
    motion: motionReducer, // Add the sprite reducer to the store
    control: controlReducer, // Add the control reducer to the store
    code: codeReducer, // Add the code reducer to the store
  },
});