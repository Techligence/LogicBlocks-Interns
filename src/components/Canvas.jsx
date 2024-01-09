import React  from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

// Import the button components
import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';
import { useSprite,useBackdrop } from '../pages/Home';

const Canvas = () => {
  const { sprites } = useSprite();
  const { selectedBackdrop } = useBackdrop();

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
        {sprites.map((sprite, index) => (
          <Draggable key={index} bounds="parent" defaultPosition={sprite.position}>
            <Resizable
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `url(${sprite}) center / contain no-repeat`,
                cursor: 'move',
                position: 'absolute',
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
