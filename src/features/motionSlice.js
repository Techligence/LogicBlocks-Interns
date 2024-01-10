import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { useSelector } from 'react-redux';

// Initial state of the sprite
const initialState = {
    sprites: [], // Initial state with an empty array for sprites
    selectedSpriteIndex: null,
  };

// Create the slice
export const motionSlice = createSlice({
    name: "Motion",
    initialState,
    reducers: {
        addSprite: (state, action) => {
            const {sprite} = action.payload ; // Ensure action.payload is an object
            // console.log(sprite);
            if (sprite) {
                state.sprites.push({
                    sprite: sprite,
                    position: {
                        x: Math.floor(Math.random() * 400), // Random position between 0 and 400 for x
                        y: Math.floor(Math.random() * 400), // Random position between 0 and 400 for y
                      },
                    angle: 0,
                });
            }
            // console.log(state.sprites[0]);
        },        
        removeSprite: (state, action) => {
            const index  = action.payload; // Ensure action.payload is an object
            console.log("INDEXXXXXX",index);
            if (index !== undefined && index >= 0 && index < state.sprites.length) {
                state.sprites.splice(index, 1); // Remove one element at the specified index
            }
            // console.log(state.sprites);
        },
        setSelectedSpriteIndex: (state, action) => {
            const index = action.payload;
            state.selectedSpriteIndex = index;
            console.log(state.selectedSpriteIndex,"selectedSpriteIndex");
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
              if(state.selectedSpriteIndex !== null){
                  state.sprites[state.selectedSpriteIndex].position.x = newX;
                  state.sprites[state.selectedSpriteIndex].position.y = newY;
              }
            },
            prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
          },
        setX: {
            reducer:(state,action)=> {
                state.position.x = action.payload.rightSteps;
                //state.position.y += action.payload.upSteps;
            },
            prepare: (rightSteps) => ({ payload: { rightSteps} })
        },
        setY: {
            reducer:(state,action)=> {
                //state.position.x = action.payload.rightSteps;
                state.position.y = action.payload.upSteps;
            },
            prepare: (upSteps) => ({ payload: { upSteps} })
        },
        goTo: {
            reducer: (state, action) => {
                if(action.payload.destination === "random_position") {
                    state.position.x = Math.floor(Math.random() * 301) - 200;
                    state.position.y = Math.floor(Math.random() * 301) - 200; 
                }
            },
            prepare: (destination) => ({ payload: { destination } })
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
            },
            prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
        },

        changeX: {
            reducer: (state, action) => {
                state.position.x += action.payload.dashUnits;
            },
            prepare: (dashUnits) => ({ payload: { dashUnits } })
        },
        changeY: {
            reducer: (state, action) => {
                state.position.y += action.payload.dashUnits;
            },
            prepare: (dashUnits) => ({ payload: { dashUnits } })
        },
        setSpritePosition: { //
            reducer: (state, action) => {
                state.position.x = action.payload.x;
                state.position.y = action.payload.y;
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
            },
            prepare: (angle) => ({ payload: { angle } }),
        },
        turnLeft:{
            reducer: (state, action) => {
                state.angle -= action.payload.angle;
                console.log(state.angle);
            },
            prepare: (angle) => ({ payload: { angle } }),
        },
        pointInDirection: {
            reducer: (state, action) => {
                state.angle = action.payload.angle % 360; // Ensure the angle stays within 0 to 359 degrees
            },
            prepare: (angle) => ({ payload: { angle } }),
        },
        rotateSprite: {
            reducer: (state, action) => {
                state.angle += action.payload.rotationAngle;
                state.angle %= 360; // Ensure the angle stays within 0 to 359 degrees
            },
            prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
        },
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

export const { moveSteps,setX, setY, goTo, goToXY,
    setSpritePosition,turnRight,turnLeft,
    pointInDirection,setSelectedSpriteIndex,addSprite,removeSprite, rotateSprite } = motionSlice.actions;

export default motionSlice.reducer;

export const moveSpriteToMousePointer = () => (dispatch) => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
  
      // Dispatch action to update sprite position
      dispatch(setSpritePosition( mouseX, mouseY ));
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

  export const  glideSecsXY = (x, y, time) => (dispatch) =>{
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
            dispatch(goToXY(x,y)); 
        }
    }, 10);
}