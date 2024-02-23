// codeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  codeString: '',
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setCodeString: (state, action) => {
      state.codeString = action.payload;
    },
  },
});

export const { setCodeString } = codeSlice.actions;
export default codeSlice.reducer;
