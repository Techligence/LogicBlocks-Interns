import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("motionState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
   
    const serializedState = JSON.stringify(state);
    localStorage.setItem("motionState", serializedState);
  } catch (err) {
  console.log(err);
    // Handle errors here
  }
};

// Initial state of the sprite
const initialState = loadState() || {
  sprites: [], // Initial state with an empty array for sprites
  selectedSpriteIndex: null,
  mainWorkspace: null,
};

// Create the slice
export const motionSlice = createSlice({
  name: "Motion",
  initialState,
  reducers: {
    addSprite: (state, action) => {
      const { sprite } = action.payload; // Ensure action.payload is an object
      // console.log(sprite);
      if (sprite) {
        state.sprites.push({
          sprite: sprite,
          position: {
            x: Math.floor(Math.random() * 400), // Random position between 0 and 400 for x
            y: Math.floor(Math.random() * 400), // Random position between 0 and 400 for y
          },
          angle: 0,
          workspace: null,
        });
        saveState(state); // Save state to local storage
      }
      // console.log(state.sprites[0]);
    },

    removeSprite: (state, action) => {
      const index = action.payload; // Ensure action.payload is an object
      console.log("INDEXXXXXX", index);
      if (index !== undefined && index >= 0 && index < state.sprites.length) {
        state.sprites.splice(index, 1); // Remove one element at the specified index
        saveState(state);
      }
      // console.log(state.sprites);
    },
    setWorkspace: (state, action) => {
      const { index, workspace } = action.payload;
      if (index !== undefined && index >= 0 && index < state.sprites.length){
        state.sprites[index].workspace = workspace;
        saveState(state); // Save state to local storage
      }
     
    },
    setSelectedSpriteIndex: (state, action) => {
      const index = action.payload;
      state.selectedSpriteIndex = index;
      console.log(state.selectedSpriteIndex, "selectedSpriteIndex");
      saveState(state); // Save state to local storage
    },

    //below is new
    moveSteps: {
      reducer: (state, action) => {
        const { rightSteps, upSteps } = action.payload;
        const angleInRadians = (state.sprites[state.selectedSpriteIndex].angle * Math.PI) / 180;
        const newX =
          state.sprites[state.selectedSpriteIndex]?.position.x +
          rightSteps * Math.cos(angleInRadians) -
          upSteps * Math.sin(angleInRadians);
        const newY =
          state.sprites[state.selectedSpriteIndex]?.position.y +
          rightSteps * Math.sin(angleInRadians) +
          upSteps * Math.cos(angleInRadians);
        // Update the position of the selected sprite
        if (state.selectedSpriteIndex !== null) {
          state.sprites[state.selectedSpriteIndex].position.x = newX;
          state.sprites[state.selectedSpriteIndex].position.y = newY;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
    },
    setX: {
      reducer: (state, action) => {
        const { rightSteps } = action.payload;
        // Update the X coordinate of the selected sprite's position
        if (state.selectedSpriteIndex !== null) {
          state.sprites[state.selectedSpriteIndex].position.x = rightSteps;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (rightSteps) => ({ payload: { rightSteps } })
    },

    setY: {
      reducer: (state, action) => {
        const { upSteps } = action.payload;
        // Update the Y coordinate of the selected sprite's position
        if (state.selectedSpriteIndex !== null) {
          state.sprites[state.selectedSpriteIndex].position.y = upSteps;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (upSteps) => ({ payload: { upSteps } })
    },

    // goTo: {
    //     reducer: (state, action) => {
    //         if(action.payload.destination === "random_position") {
    //             state.position.x = Math.floor(Math.random() * 401) - 200;
    //             state.position.y = Math.floor(Math.random() * 401) - 200; 
    //         }
    //     },
    //     prepare: (destination) => ({ payload: { destination } })
    // },
    goTo: {
      reducer: (state, action) => {
        console.log('Before the problematic code block')
        if (action.payload.destination === "random_position") {
          const selectedSprite = state.sprites[state.selectedSpriteIndex];
          console.log('During the problematic code block')

          if (selectedSprite) {
            selectedSprite.position.x = Math.floor(Math.random() * 401) - 200;
            selectedSprite.position.y = Math.floor(Math.random() * 401) - 200;
            console.log('During the problematic code block 2')
          }
          console.log('After the problematic code block')
        }
        saveState(state); // Save state to local storage
      },
      prepare: (destination) => ({ payload: { destination } }),

    },
    //below is new
    goToXY: {
      reducer: (state, action) => {
        const { rightSteps, upSteps } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];
        if (selectedSprite) {
          selectedSprite.position.x = rightSteps;
          selectedSprite.position.y = upSteps;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
    },

    // changeX: {
    //     reducer: (state, action) => {
    //         state.position.x += action.payload.dashUnits;
    //     },
    //     prepare: (dashUnits) => ({ payload: { dashUnits } })
    // },
    changeX: {
      reducer: (state, action) => {
        const { newX } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];

        if (selectedSprite) {
          selectedSprite.position.x += newX;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (newX) => ({ payload: { newX } })
    },
    changeY: {
      reducer: (state, action) => {
        const { newY } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];

        if (selectedSprite) {
          selectedSprite.position.y += newY;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (newY) => ({ payload: { newY } }),
    },
    setSpritePosition: { //
      reducer: (state, action) => {
        state.position.x = action.payload.x;
        state.position.y = action.payload.y;
        saveState(state); // Save state to local storage
      },
      prepare: (x, y) => ({ payload: { x, y } })
    },

    //below is new
    turnRight: {
      reducer: (state, action) => {
        const { angle } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];
        console.log(state.sprites[state.selectedSpriteIndex]);

        if (selectedSprite) {
          selectedSprite.angle += angle;
          // Ensure the angle stays within 0 to 359 degrees
          selectedSprite.angle %= 360;
          console.log(selectedSprite.angle);
        }
        saveState(state); // Save state to local storage
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    turnLeft: {
      reducer: (state, action) => {
        const { angle } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];

        if (selectedSprite) {
          selectedSprite.angle -= angle;
          // Ensure the angle stays within 0 to 359 degrees
          selectedSprite.angle = (selectedSprite.angle + 360) % 360;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    pointInDirection: {
      reducer: (state, action) => {
        const { angle } = action.payload;
        const selectedSprite = state.sprites[state.selectedSpriteIndex];

        if (selectedSprite) {
          selectedSprite.angle = angle % 360;
        }
        saveState(state); // Save state to local storage
      },
      prepare: (angle) => ({ payload: { angle } }),
    },

    rotateSprite: {
      reducer: (state, action) => {
        state.angle += action.payload.rotationAngle;
        state.angle %= 360; // Ensure the angle stays within 0 to 359 degrees
        saveState(state); // Save state to local storage
      },
      prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
    },
    //check later:

    // rotateSprite: {
    //     reducer: (state, action) => {
    //       const { rotationAngle } = action.payload;
    //       const selectedSprite = state.sprites[state.selectedSpriteIndex];

    //       if (selectedSprite) {
    //         selectedSprite.angle += rotationAngle;
    //         // Ensure the angle stays within 0 to 359 degrees
    //         selectedSprite.angle = (selectedSprite.angle + 360) % 360;
    //       }
    //     },
    //     prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
    //   },

    //
    // glideSecsXY: {
    //     reducer: (state, action) => {
    //         state.position.x = action.payload.x;
    //         state.position.y = action.payload.y;
    //     },
    //     prepare: (x, y) => ({ payload: { x, y } })
    // }
  },
});

// Export the action and reducer

export const { moveSteps, setX, setY, goTo, goToXY, changeX, changeY,
  setSpritePosition, turnRight, turnLeft,
  pointInDirection, setWorkspace,
  setSelectedSpriteIndex, addSprite, removeSprite, rotateSprite } = motionSlice.actions;

export default motionSlice.reducer;

export const moveSpriteToMousePointer = () => (dispatch) => {
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Dispatch action to update sprite position
    dispatch(dispatch(moveSteps({ rightSteps: mouseX, upSteps: mouseY })));
  };

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      // Cleanup: remove event listener when 'Esc' is pressed
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleEscPress);
    }
  };

  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('keydown', handleEscPress);

  // Cleanup: remove event listeners on component unmount or as needed
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('keydown', handleEscPress);
  };
};

export const glideSecsXY = (x, y, time) => (dispatch) => {
  const spritePosition = useSelector((state) => state.motionSlice.position);
  console.log('Sprite Position:', spritePosition);
  const startX = spritePosition.x;
  const startY = spritePosition.y;
  const distanceX = x - startX;
  const distanceY = y - startY;
  const steps = time / 10;
  let currentStep = 0;

  const intervalId = setInterval(() => {
    currentStep++;
    const newX = startX + (distanceX * currentStep / steps);
    const newY = startY + (distanceY * currentStep / steps);
    dispatch(glideSecsXY(newX, newY));

    if (currentStep >= steps) {
      clearInterval(intervalId);
      dispatch(goToXY(x, y));
    }
  }, 10);
}

// Add this action in your Redux actions file (e.g., actions/motionActions.js)
export const updateSpriteSizeAndPersist = ({ index, size }) => (dispatch) => {
  // Dispatch the action to update the sprite size in the Redux store
  dispatch(updateSpriteSize({ index, size }));

  // Persist the sprite size in local storage
  const localStorageKey = `spriteSize-${index}`;
  localStorage.setItem(localStorageKey, JSON.stringify(size));
};
