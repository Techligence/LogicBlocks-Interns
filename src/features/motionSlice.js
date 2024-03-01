import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Initial state of the sprite
const initialState = {
  position: { x: 150, y: 100 }, // Assuming default position
  angle: 0,
  glideClicked: false,
  glideStartPosn: { x: -1, y: -1 },
  glideEndPosn: { x: -1, y: -1, sec: 0 },
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
        let newX =
          state.position.x +
          rightSteps * Math.cos(angleInRadians) -
          upSteps * Math.sin(angleInRadians);
        let newY =
          state.position.y +
          rightSteps * Math.sin(angleInRadians) +
          upSteps * Math.cos(angleInRadians);

        const spriteElement = document.getElementById("sprite");
        const canvasElement = document.getElementsByClassName("highlighted")[1];

        if (newX >= 300) {
          newX = 300;
        }
        if (newX <= -100) {
          newX = -100;
        }
        if (newY >= 300) {
          newY = 300;
        }
        if (newY <= -100) {
          newY = -100;
        }
        state.position.x = newX;
        state.position.y = newY;
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
    },
    setX: {
      reducer: (state, action) => {
        state.position.x = action.payload.rightSteps;
        //state.position.y += action.payload.upSteps;
      },
      prepare: (rightSteps) => ({ payload: { rightSteps } }),
    },
    setY: {
      reducer: (state, action) => {
        //state.position.x = action.payload.rightSteps;
        state.position.y = action.payload.upSteps;
      },
      prepare: (upSteps) => ({ payload: { upSteps } }),
    },
    goTo: {
      reducer: (state, action) => {
        if (action.payload.destination === "random_position") {
          state.position.x = Math.floor(Math.random() * 401) - 200;
          state.position.y = Math.floor(Math.random() * 401) - 200;
        }
      },
      prepare: (destination) => ({ payload: { destination } }),
    },
    goToXY: {
      reducer: (state, action) => {
        state.position.x = action.payload.rightSteps;
        state.position.y = action.payload.upSteps;
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
    },

    changeX: {
      reducer: (state, action) => {
        console.log(action.payload);
        state.position.x += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    changeY: {
      reducer: (state, action) => {
        state.position.y += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    setSpritePosition: {
      reducer: (state, action) => {
        state.position.x = action.payload.x;
        state.position.y = action.payload.y;
      },
      prepare: (x, y) => ({ payload: { x, y } }),
    },
    turnRight: {
      reducer: (state, action) => {
        state.angle += action.payload.angle;
        console.log(state.angle);
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    turnLeft: {
      reducer: (state, action) => {
        state.angle -= action.payload.angle;
        console.log(state.angle);
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    pointInDirection: {
      reducer: (state, action) => {
        if (action.payload.angle == -1) {
          let clientX, clientY;

          const move = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            console.log(clientX, clientY);
            state.angle = Math.atan2((clientY - state.y) / (clientX - state.x));
          };

          // Initialize clientX and clientY to the current cursor position

          const getCursorPosition = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            move({ clientX, clientY });
          };
          window.addEventListener("onmousemove", getCursorPosition);
        } else {
          state.angle = action.payload.angle % 360; // Ensure the angle stays within 0 to 359 degrees
          state.angle %= 360;
        }
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    rotateSprite: {
      reducer: (state, action) => {
        state.angle = action.payload.rotationAngle;
        state.angle %= 360; // Ensure the angle stays within 0 to 359 degrees
      },
      prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
    },
    ifOnEdgeBounce: {
      reducer: (state, action) => {
        if (
          state.position.x <= -100 ||
          state.position.x >= 300 ||
          state.position.y <= -100 ||
          state.position.y >= 300
        ) {
          state.angle += 270;
          state.angle %= 360;
          console.log("bounce");
        }
      },
    },
    glideSecsXY: {
      reducer: (state, action) => {
        state.glideStartPosn = state.position;
        state.glideEndPosn = action.payload;
        if (state.glideClicked == false) {
          state.glideClicked = true;
          return;
        }
        state.position = action.payload;
      },
      prepare: (x, y, sec) => ({ payload: { x, y, sec } }),
    },
    done: {
      reducer: (state, action) => {
        state.glideClicked = false;
        console.log("Made false")
      },
    },
  },
});

// Export the action and reducer

export const {
  moveSteps,
  setX,
  setY,
  goTo,
  goToXY,
  setSpritePosition,
  turnRight,
  turnLeft,
  pointInDirection,
  rotateSprite,
  changeX,
  changeY,
  ifOnEdgeBounce,
  glideSecsXY,
  done
} = motionSlice.actions;

// export default motionSlice.reducer;

export const moveSpriteToMousePointer = () => (dispatch) => {
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Dispatch action to update sprite position
    dispatch(setSpritePosition(mouseX, mouseY));
  };

  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      // Cleanup: remove event listener when 'Esc' is pressed
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleEscPress);
    }
  };

  // Add event listeners
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("keydown", handleEscPress);

  // Cleanup: remove event listeners on component unmount or as needed
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("keydown", handleEscPress);
  };
};

// Export the action and reducer
export const { moveSprite } = motionSlice.actions;
export default motionSlice.reducer;
