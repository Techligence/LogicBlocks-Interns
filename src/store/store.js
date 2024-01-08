import { configureStore } from "@reduxjs/toolkit";
import soundTabReducer, { initialState } from "../state/reducers/soundTabReducers";
import audioReducer from "../state/reducers/audioSlice";


export const store = configureStore({
  reducer: {
    soundTab: soundTabReducer,
    audio: audioReducer
  },
  initialState,
});
