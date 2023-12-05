import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

// Initial state of the sprite
const initialState = {
    position: { x: 150, y: 100 }, // Assuming default position
    angle: 0, 
};

// Create the slice
export const motionSlice = createSlice({
    name: "Motion",
    initialState,
    reducers: {
        moveSteps: {
            reducer: (state, action) => {
               const { rightSteps, upSteps } = action.payload;
                const angleInRadians = (state.angle * Math.PI) / 180;
                const newX = state.position.x + rightSteps * Math.cos(angleInRadians) - upSteps * Math.sin(angleInRadians);
                const newY = state.position.y + rightSteps * Math.sin(angleInRadians) + upSteps * Math.cos(angleInRadians);
                state.position.x = newX;
                state.position.y = newY;
            },
            prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
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
                    state.position.x = Math.floor(Math.random() * 401) - 200;
                    state.position.y = Math.floor(Math.random() * 401) - 200; 
                }
            },
            prepare: (destination) => ({ payload: { destination } })
        },
        goToXY: {
            reducer: (state, action) => {
                state.position.x = action.payload.rightSteps;
                state.position.y = action.payload.upSteps;
            },
            prepare: (rightSteps, upSteps) => ( { payload: {rightSteps, upSteps} } )            
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
        turnRight:{
            reducer: (state, action) => {
                state.angle += action.payload.angle;
                console.log(state.angle);
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
    pointInDirection, rotateSprite } = motionSlice.actions;

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