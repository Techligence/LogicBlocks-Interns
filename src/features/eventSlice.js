// eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const blockFunctions = {
  'KEY_SPACE': () => console.log("Space key pressed"),
  'KEY_A': () => console.log("A key pressed"),
  'KEY_B': () => console.log("B key pressed"),
  'KEY_C': () => console.log("C key pressed"),
  // Add more key-block mappings as needed
};



export const eventSlice = createSlice({
  name: 'event',
  initialState: {},
  reducers: {
    triggerEvent: (state, action) => {
      // handle triggerEvent action
    },

    whenKeyPressed: (state, action) => {
      const keyName = action.payload;
      console.log(`Key pressed: ${keyName}`);
    
      // Execute the block's JavaScript code if it exists
      const clickedBlock = blockFunctions[keyName];
      if (clickedBlock) {
        clickedBlock();
      }
    },
    
    
    whenSpriteClicked: (state, action) => {
      // handle whenSpriteClicked action
      console.log('Sprite clicked!');
      // Add your logic for sprite click here
    },

    whenFlagClicked: (state, action) => {
      // handle whenFlagClicked action
      console.log('Flag clicked!');
      // Add your logic for flag click here
    },
  
  },
});

export const { triggerEvent, whenKeyPressed, whenSpriteClicked,whenFlagClicked } = eventSlice.actions;
export default eventSlice.reducer