import { createSlice } from "@reduxjs/toolkit"

const cameraSlice = createSlice({
    name: 'camera',
    initialState: {
      isCameraOn: false,
    },
    reducers: {
      setCameraOn: (state, action) => {
        state.isCameraOn = action.payload;
      },
    },
});


export const {setCameraOn} = cameraSlice.actions;
export default cameraSlice.reducer;