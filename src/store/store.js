// store.js

import { configureStore } from "@reduxjs/toolkit";
// import eventReducer from '../features/eventSlice';
import variableReducer from '../features/variableSlice';

export const store = configureStore({
  reducer: {
    // events: eventReducer, // Add the event reducer to the store
    variables: variableReducer, // Add the variable reducer to the store
  },
});
