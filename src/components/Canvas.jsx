import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import Blockly from "blockly";
import "blockly/javascript";
import GenerateCodeBox from "./GenerateCodeBox";
import { useRef } from "react";
import { javascriptGenerator } from "blockly/javascript";
import { useSelector, useDispatch } from "react-redux";
import { spriteClickedEvent, flagClickedEvent } from "./BlockCategories/Events";
import { whenSpriteClicked } from "../features/eventSlice";
import { whenFlagClicked } from "../features/eventSlice";
import { whenKeyPressed } from "../features/eventSlice"; // keypress

import { glideSecsXY, done } from "../features/motionSlice";

// Import Image from src
// import Demo from '../Images/trial_sprite_nobkg.png'

// Import the button components
import FlagButton from "./Canvas/FlagButton";
import StopButton from "./Canvas/StopButton";
import UndoButton from "./Canvas/UndoButton";
import RedoButton from "./Canvas/RedoButton";
import ZoomIn from "./Canvas/ZoomIn";
import ZoomOut from "./Canvas/ZoomOut";
import FullScreen from "./Canvas/FullScreen";
import Pencil from "./Canvas/Pencil";

//Start of key press
const useKeyPress = (targetKey, callback) => {
  const handleKeyDown = (event) => {
    if (event.key === targetKey) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, callback]);
};
//End of key press

const Canvas = () => {
  const { position, angle } = useSelector((state) => ({
    position: state.motion.position,
    angle: state.motion.angle,
  }));
  const glideEndPosn = useSelector((state) => state.motion.glideEndPosn);
  const glideStartPosn = useSelector((state) => state.motion.position);
  const glideClicked = useSelector((state) => state.motion.glideClicked);
  const language = useSelector((state) => state.language); // Language
  const dispatch = useDispatch(); //dispatch fore event click
  const [start, setStart] = useState({ x: -1, y: -1 });
  const [end, setEnd] = useState({ x: -1, y: -1 });
  const [arr, setArr] = useState([]);

  const [imageSize, setImageSize] = useState(100); // useState for zooming in-out
  const maxImageSize = 200; // Maximum limit for image size
  const minImageSize = 100; // Minimum limit for image size
  useEffect(() => {
    const spriteElement = document.getElementById("sprite");
    if (spriteElement) {
      spriteElement.style.transform = `translate(${position?.x}px, ${position?.y}px) rotate(${angle}deg)`;
    }
  }, [position, angle]);

  useEffect(() => {
    if (arr.length > 0) {
      let c = 0;
      const startX = arr[c].x;
      const startY = arr[c].y;
      const targetX = arr[arr.length-1].x;
      const targetY = arr[arr.length-1].y;
      const sec = start.x != -1 ? glideEndPosn.sec : glideEndPosn.sec;
      console.log("Second:",sec)
      if (!glideClicked) {
        return;
      }
      
      let startTime;
      const updatePosition = () => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds
        if(c>=arr.length){
          dispatch(done());
          return;
        }
        if (elapsedTime >= sec) {
          
          dispatch(glideSecsXY(targetX, targetY, sec));
          dispatch(done());
        } else {
          const ratio = elapsedTime / sec;
          let newX = arr[c].x;
          let newY = arr[c].y;
          c++;
          dispatch(glideSecsXY(newX, newY, sec));
          requestAnimationFrame(updatePosition);
        }
      };

      startTime = Date.now();
      requestAnimationFrame(updatePosition);
    } else {
      let c = 0;
      const startX = start.x != -1 ? start.x : glideStartPosn.x;
      const startY = start.y != -1 ? start.y : glideStartPosn.y;
      const targetX = end.x != -1 ? end.x : glideEndPosn.x;
      const targetY = end.y != -1 ? end.y : glideEndPosn.y;
      const sec = start.x != -1 ? glideEndPosn.sec : glideEndPosn.sec;
      console.log(startX, startY, targetX, targetY, sec);
      if (!glideClicked) {
        return;
      }
      let startTime;
      const updatePosition = () => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds

        if (elapsedTime >= sec) {
          dispatch(glideSecsXY(targetX, targetY, sec));
          dispatch(done());
        } else {
          const ratio = elapsedTime / sec;
          let newX = startX + (targetX - startX) * ratio;
          let newY = startY + (targetY - startY) * ratio;
          dispatch(glideSecsXY(newX, newY, sec));
          requestAnimationFrame(updatePosition);
        }
      };

      startTime = Date.now();
      requestAnimationFrame(updatePosition);
    }
    return () => {
      // Clean up if needed
      setStart({ x: -1, y: -1 });
      setEnd({ x: -1, y: -1 });
      // setArr([]);
    };
  }, [glideClicked]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPencilActive, setIsPencilActive] = useState(false);

  const startDrawing = (e) => {
    if (!isPencilActive) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setArr([...arr, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top); // Adjust coordinates using the bounding rectangle
  };

  const draw = (e) => {
    if (!isDrawing || !isPencilActive) return; // Check if drawing and pencil are active
    // if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect(); // Get the bounding rectangle of the canvas
    // setEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setArr([...arr, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    context.lineTo(e.clientX - rect.left, e.clientY - rect.top); // Adjust coordinates using the bounding rectangle
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handlePencilClick = () => {
    // Add code to handle pencil click
    if(isPencilActive){setArr([])}
    setIsPencilActive(!isPencilActive);
  };

  return (
    <Card
      class="highlighted"
      style={{
        position: "relative",
        width: "700px",
        margin: "28px auto",
        height: "600px",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "14px" }}>Canvas</h1>
      <Draggable
        bounds="parent"
        position={position}
        defaultPosition={position}
        style={{ transform: `rotate(100deg)` }}
      >
        <Resizable
          id="sprite"
          defaultSize={{
            width: "50%",
            height: "50%",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `url(trial_sprite_nobkg.png) center / contain no-repeat`,
            cursor: "move",
          }}
          lockAspectRatio={true}
        >
          <div style={{ width: "100%", height: "100%" }} />
        </Resizable>
      </Draggable>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      ></div>
      <canvas
        ref={canvasRef}
        id="drawingCanvas"
        width="700"
        height="600"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px solid #000",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      ></canvas>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          width: "100%",
        }}
      >
        <FlagButton onClick={() => {}} />
        <FlagButton onClick={() => {}} />
        <StopButton onClick={() => {}} />
        <UndoButton onClick={() => {}} />
        <RedoButton onClick={() => {}} />
        <Pencil onClick={handlePencilClick} isActive={isPencilActive} />

        <ZoomIn onClick={() => {}} />
        <ZoomOut onClick={() => {}} />
        <FullScreen onClick={() => {}} />
      </div>
    </Card>
  );
};

export default Canvas;
