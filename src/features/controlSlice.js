// Currently nothing here
import { createSlice } from "@reduxjs/toolkit";

// Create an async thunk action to wait for seconds
export async function waitSeconds(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export async function waitUntil(condition) {
  return new Promise(resolve => {
    const checkCondition = () => {
      if (condition) {
        resolve();
      } else {
        // Poll every 100 milliseconds (adjust as needed)
        setTimeout(checkCondition, 100);
      }
    };
    // Start checking the condition
    checkCondition();
  });
}


// Initial state of the control
const initialState = {};

export const controlSlice = createSlice({
  name: "Control",
  initialState,
  reducers: {},
});

export const repeatTimes = (count, action) => async (dispatch) => {
  for (let i = 0; i < count; i++) {
    await dispatch(action);
  }
};


export default controlSlice.reducer;
