// store.js

import { configureStore } from "@reduxjs/toolkit";
import eventReducer from '../features/eventSlice';
import variableReducer from '../features/variableSlice';
import motionReducer from "../features/motionSlice";
import controlReducer from "../features/controlSlice"
import codeReducer from '../features/codeSlice';
import languageReducer from "../features/languageSlice";


export const store = configureStore({
  reducer: {
    events: eventReducer, // Add the event reducer to the store
    variables: variableReducer, // Add the variable reducer to the store
    motion: motionReducer, // Add the sprite reducer to the store
    control: controlReducer, // Add the control reducer to the store
    code: codeReducer,
    language: languageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

