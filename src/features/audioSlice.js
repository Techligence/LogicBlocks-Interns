const initialState = {
    isPlaying: false,
    volume: 1,    
    audioObj: null,
}

import { createSlice } from "@reduxjs/toolkit"

const audioSlice = createSlice({
    name: "audio",
    initialState: initialState,
    reducers:{
        setIsPlaying: (state, action) => {            
            state.isPlaying = action.payload;            
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setAudioObj: (state, action) => {            
            state.audioObj = action.payload;
        }
    }
})

export const {setIsPlaying, setVolume, setAudioObj} = audioSlice.actions;
export default audioSlice.reducer;