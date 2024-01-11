// codeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const codeSlice = createSlice({
  name: 'code',
  initialState: { jsCode: '', pythonCode: '' },
  reducers: {
    setCode: (state, action) => {
      state.jsCode = action.payload.jsCode;
      state.pythonCode = action.payload.pythonCode;
    },
  },
});

export const { setCode } = codeSlice.actions;
export const selectCode = (state) => state.code;
export default codeSlice.reducer;
