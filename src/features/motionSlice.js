import { createSlice } from "@reduxjs/toolkit";

// Initial state of the sprite
const initialState = {
    position: { x: 150, y: 100 } // Assuming default position
};

// Create the slice
export const motionSlice = createSlice({
    name: "Motion",
    initialState,
    reducers: {
        moveSprite: {
            reducer: (state, action) => {
                state.position.x += action.payload.rightSteps;
                state.position.y += action.payload.upSteps;
            },
            prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
        },
    },
});

// Export the action and reducer
export const { moveSprite } = motionSlice.actions;
export default motionSlice.reducer;