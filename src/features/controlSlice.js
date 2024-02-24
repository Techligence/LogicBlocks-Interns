// Currently nothing here
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk action to wait for seconds
export const waitSeconds = createAsyncThunk(
  "Control/waitSeconds",
  async (seconds) => {
    await new Promise((resolve) => {
      console.log("Waiting for " + seconds + " seconds");
      setTimeout(resolve, seconds * 1000)
    });
    console.log("Done waiting for " + seconds + " seconds");
  }
);

// Initial state of the control
const initialState = {};

export const controlSlice = createSlice({
  name: "Control",
  initialState,
  reducers: {},
});

// Export the waitSeconds action
export default controlSlice.reducer;
