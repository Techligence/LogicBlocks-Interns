import { configureStore } from "@reduxjs/toolkit";
import xmlReducer from "../features/xmlSlice";
export const store = configureStore({
  reducer: {
    xml: xmlReducer,
  },
});
