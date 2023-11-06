import React from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';


import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';

const Canvas = () => {

  return (
    <Card class="highlighted" style={{ position: 'relative', width: '700px', margin: '28px auto', height: '600px', overflow: 'hidden', background:"url({camera}) center / contain no-repeat" }}>
      <h1 style={{ textAlign: 'center' ,fontSize: '14px'}}>Canvas</h1>
      <Draggable bounds="parent" defaultPosition={{x: 150, y: 100}}>
        <Resizable
          defaultSize={{
            width: '50%',
            height: '50%'
          }}
          style={{  
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url(trial_sprite.png) center / contain no-repeat`,
            cursor: 'move'
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

      
      <video  //Rendering the Feed of the Camera
        id="cameraFeed" 
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
    </Card>
  );
};

export default Canvas;
