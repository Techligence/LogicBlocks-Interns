// variablesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for variables
const initialState = {
    variables: {
        VAR_NAME: {
          value: 0,
          isVisible: true,
        },
        // Add more variables as needed...
    },
    fetchedVariable: null, // Hold the fetched variable temporarily 
}

// Create a slice for variables
export const variableSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        getVariable: (state, action) => {
            const variableName = action.payload;
            state.fetchedVariable = {
                name: variableName,
                value: state.variables[variableName]?.value || null,
            };
        },
        clearFetchedVariable: (state) => {
            state.fetchedVariable = null;
        },
        setVariable: (state, action) => {
            const { variableName, value } = action.payload;
            state.variables[variableName].value = value;
        },
        changeVariableBy: (state, action) => {
            const { variableName, changeBy } = action.payload;
            state.variables[variableName].value += changeBy;
        },
        showVariable: (state, action) => {
            const variableName = action.payload;
            state.variables[variableName].isVisible = true;
        },
        hideVariable: (state, action) => {
            const variableName = action.payload;
            state.variables[variableName].isVisible = false;
        }
    }
})

// Export actions
export const { 
    getVariable,
    clearFetchedVariable,
    setVariable, 
    changeVariableBy,
    showVariable,
    hideVariable,
} = variableSlice.actions;



// Export reducer
export default variableSlice.reducer;





