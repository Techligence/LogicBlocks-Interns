import audioArray from "../components/audioArray";

export const initialState = {
    activeTab: "Home",
    audioState: {
        showAudioWaveform: true,        
        fileName: '',
    },
    audioArray: audioArray,
    activeWaveform: audioArray[0],
}

import { createSlice } from "@reduxjs/toolkit";

const soundTabSlice = createSlice({
  name: "soundTab",
  initialState: initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setAudioState: (state, action) => {
      state.audioState = action.payload;
    },
    setAudioArray: (state, action) => {
      state.audioArray = action.payload;
    },
    setActiveWaveform: (state, action) => {
      state.activeWaveform = action.payload;
    }
  },
});

export const { setActiveTab, setAudioState, setAudioArray, setActiveWaveform } = soundTabSlice.actions;
export default soundTabSlice.reducer;