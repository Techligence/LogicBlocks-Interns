// codeSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  codeString: '',
};


const codeSlice = createSlice({
  name: 'code',
  initialState: { jsCode: '', pythonCode: '' },
  reducers: {
    setCodeString: (state, action) => {
      state.codeString = action.payload;
    },
    setCode: (state, action) => {
      state.jsCode = action.payload.jsCode;
      state.pythonCode = action.payload.pythonCode;
    },
  },
});

export const { setCodeString } = codeSlice.actions;
export const { setCode } = codeSlice.actions;
export const selectCode = (state) => state.code;
export default codeSlice.reducer;
