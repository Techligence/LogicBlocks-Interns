import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import Blockly from 'blockly';
import 'blockly/javascript';
import GenerateCodeBox from './GenerateCodeBox';

import {javascriptGenerator} from 'blockly/javascript';
import { useSelector, useDispatch } from 'react-redux';
import { spriteClickedEvent,flagClickedEvent} from './BlockCategories/Events';
import { whenSpriteClicked } from '../features/eventSlice';  
import { whenFlagClicked } from '../features/eventSlice';
import { whenKeyPressed } from '../features/eventSlice'; // keypress

// Import Image from src
// import Demo from '../Images/trial_sprite_nobkg.png'

// Import the button components
import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';

//Start of key press
const useKeyPress = (targetKey, callback) => {
  const handleKeyDown = (event) => {
    if (event.key === targetKey) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKey, callback]);
};
  //End of key press


const Canvas = () => {
  const { position, angle } = useSelector((state) => ({
    position: state.motion.position,
    angle: state.motion.angle,
  }));

  const language = useSelector(state => state.language); // Language
  const dispatch = useDispatch(); //dispatch fore event click

  // const { position, angle } = useSelector((state) => ({
  //   position: state.motion.position,
  //   angle: state.motion.angle,
  // }));


  // useEffect(() => {
  //   const spriteElement = document.getElementById('sprite');
  //   if (spriteElement) {
  //     spriteElement.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}deg)`;
  //   }
  // }, [position, angle]); 
  


  const [imageSize, setImageSize] = useState(100); // useState for zooming in-out
  const maxImageSize = 200; // Maximum limit for image size
  const minImageSize = 100; // Minimum limit for image size

  useEffect(() => {
    const spriteElement = document.getElementById('sprite');
    if (spriteElement) {
      spriteElement.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}deg)`;
    }
  }, [position, angle]); 

  return (
    <Card class="highlighted" style={{ position: 'relative', width: '700px', margin: '28px auto', height: '600px', overflow: 'hidden' }}>
      <h1 style={{ textAlign: 'center' ,fontSize: '14px'}}>Canvas</h1>
      <Draggable bounds="parent" position={position} defaultPosition={position} style={{transform: `rotate(100deg)`}}>
        <Resizable
         id="sprite"
          defaultSize={{
            width: '50%',
            height: '50%'
          }}
          
          style={{  
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url(trial_sprite_nobkg.png) center / contain no-repeat`,
            cursor: 'move',
          }}
          lockAspectRatio={true}
        >
          <div style={{ width: '100%', height: '100%' }} />
        </Resizable>
      </Draggable>

      <div style={{ 
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%'
      }}>
        <div>
        <FlagButton onClick={() => {}} />
          <FlagButton onClick={() => {}} />
          <StopButton onClick={() => {}} />
          <UndoButton onClick={() => {}} />
          <RedoButton onClick={() => {}} />
        </div>
        <div>
          <ZoomIn onClick={() => {}} />
          <ZoomOut onClick={() => {}} />
          <FullScreen onClick={() => {}} />
        </div>
      </div>
    </Card>
  
  );
};

export default Canvas;