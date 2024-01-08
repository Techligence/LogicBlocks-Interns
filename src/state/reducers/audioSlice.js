const initialState = {
    isPlaying: false,
    volume: 1,    
}

import { createSlice } from "@reduxjs/toolkit"

const audioSlice = createSlice({
    name: "audio",
    initialState: initialState,
    reducers:{
        setIsPlaying: (state, action) => {
            console.log("setIsPlaying action dispatched");
            state.isPlaying = action.payload;            
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    }
})

export const {setIsPlaying, setVolume} = audioSlice.actions;
export default audioSlice.reducer;