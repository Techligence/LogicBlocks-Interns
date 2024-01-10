import React, { useEffect, useState }  from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import {store} from '../store/store';
// Import the button components
import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';
import { useSprite,useBackdrop } from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { goToXY, setSelectedSpriteIndex } from '../features/motionSlice';
const Canvas = () => {
  const dispatch = useDispatch();
  const { removeSprite } = useSprite();
  const { selectedBackdrop } = useBackdrop();
  const {sprites:storesprites} = useSelector((state) => state.motion) ;
  const [selectedSprite, setSelectedSprite] = useState(null);
  const handleSpriteClick = (index) => {
    setSelectedSprite(index);
    dispatch(setSelectedSpriteIndex(index));
    console.log("in canvahes",storesprites[0].sprite);

  };

  useEffect(() => {
    const handleDelete = (event) => {
      // Check if both 'Control' key and 'Delete' key are pressed
      if (event.ctrlKey && event.key === 'Delete' && selectedSprite !== null) {
        removeSprite(selectedSprite);
        setSelectedSprite(null);
        dispatch(setSelectedSpriteIndex(null));
      }
    };
  
    window.addEventListener('keydown', handleDelete);
  
    return () => {
      window.removeEventListener('keydown', handleDelete);
    };

  }, [selectedSprite,removeSprite,dispatch]);

  useEffect(() => {
    storesprites.forEach((sprite, index) => {
      if(index !== selectedSprite) return;
      const spriteElement = document.getElementById(`sprite-${index}`);
      if (spriteElement) {
        spriteElement.style.transform = `translate(${sprite.position.x}px, ${sprite.position.y}px) rotate(${sprite.angle}deg)`;
      }
    });
  }, [storesprites[selectedSprite]?.position, storesprites[selectedSprite]?.angle]);

  return (
    <Card className="highlighted" style={{ position: 'relative', width: '700px', margin: '28px auto', height: '600px', overflow: 'hidden' }}>
      <h1 style={{ textAlign: 'center', fontSize: '14px' }}>Canvas</h1>

      {/* Canvas Div */}
      <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'default' }}>

        {/* Backdrop */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '90%',
            background: selectedBackdrop ? `url(${selectedBackdrop}) center / cover no-repeat` : 'none',
          }}
        />

        {/* Sprite Div */}
        {storesprites.map((sprite, index) => (
          <Draggable key={index} bounds="parent" defaultPosition={sprite.position} position={sprite.position} 
          onStart={() => {handleSpriteClick(index),console.log(sprite);}}
          onDrag={(e, data) => {dispatch(goToXY(data.x, data.y))}}
          >
            <Resizable
              id={`sprite-${index}`}
              style={{
                // rotate: `${sprite.angle}deg`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `url(${sprite.sprite}) center / contain no-repeat`,
                cursor: 'move',
                position: 'absolute',
                boxShadow: selectedSprite === index ? '0 0 0 2px #2196F3' : 'none',
              }}
              lockAspectRatio={true}
            >
              <div style={{ width: '100px', height: '100px' }} />
            </Resizable>
          </Draggable>
        ))}

      </div>

      {/* Buttons Div */}
      <div  style={{
        position: 'absolute',
        bottom: 2,
        right: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <div>
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
