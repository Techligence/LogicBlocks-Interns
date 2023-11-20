
import React, {useState} from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

// Import Image from src
import Demo from '../Images/trial_sprite_nobkg.png'

// Import the button components
import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';

const Canvas = () => {

  const [imageSize, setImageSize] = useState(100); // useState for zooming in-out
  const maxImageSize = 200; // Maximum limit for image size
  const minImageSize = 100; // Minimum limit for image size

  const [position, setPosition] = useState({ x: 150, y: 100 }); // useState for image position
  const [dragging, setDragging] = useState(false); // useState for dragging
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // useState for mouse position
  const [positionHistory, setPositionHistory] = useState([{ x: 150, y: 100 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 150, y: 100 });
  const [historyPointer, setHistoryPointer] = useState(0);
  const [zoomHistory, setZoomHistory] = useState([100]); // useState for zoom history
  const [zoomPointer, setZoomPointer] = useState(0);

  const undo = () => {
    if (historyPointer > 0 || zoomPointer > 0) {
      if (historyPointer > 0) {
        setHistoryPointer(historyPointer - 1);
        setCurrentPosition(positionHistory[historyPointer - 1]);
      }
      if (zoomPointer > 0) {
        setZoomPointer(zoomPointer - 1);
        setImageSize(zoomHistory[zoomPointer - 1]);
      }
    } else {
      // If no more undo is possible, set current position and zoom to default
      setHistoryPointer(-1);
      setCurrentPosition({ x: 150, y: 100 });
      setZoomPointer(0);
      setImageSize(minImageSize);
    }
  };

  const redo = () => {
    if (historyPointer < positionHistory.length - 1 || zoomPointer < zoomHistory.length - 1) {
      if (historyPointer < positionHistory.length - 1) {
        setHistoryPointer(historyPointer + 1);
        setCurrentPosition(positionHistory[historyPointer + 1]);
      }
      if (zoomPointer < zoomHistory.length - 1) {
        setZoomPointer(zoomPointer + 1);
        setImageSize(zoomHistory[zoomPointer + 1]);
      }
    } else {
      // If no more redo is possible, set the current position and zoom to the latest values
      setCurrentPosition(positionHistory[positionHistory.length - 1]);
      setImageSize(zoomHistory[zoomHistory.length - 1]);
    }
  };

  const handleZoomIn = () => {
    setImageSize(prevSize => {
      const newSize = prevSize * 1.2;
      const updatedZoomHistory = [...zoomHistory.slice(0, zoomPointer + 1), newSize];
      setZoomHistory(updatedZoomHistory);
      setZoomPointer(zoomPointer + 1);
      return newSize > maxImageSize ? maxImageSize : newSize;
    });
  };

  const handleZoomOut = () => {
    setImageSize(prevSize => {
      const newSize = prevSize * 0.8;
      const updatedZoomHistory = [...zoomHistory.slice(0, zoomPointer + 1), newSize];
      setZoomHistory(updatedZoomHistory);
      setZoomPointer(zoomPointer + 1);
      return newSize < minImageSize ? minImageSize : newSize;
    });
  };
  

  const handleMouseDown = (e) => {
    setDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
    setPositionHistory([...positionHistory.slice(0, historyPointer + 1), { ...currentPosition }]);
    setHistoryPointer(historyPointer + 1);
  };
  

  const handleMouseUp = () => {
    setDragging(false);
  
    if (
      currentPosition.x !== position.x ||
      currentPosition.y !== position.y
    ) {
      setPositionHistory([...positionHistory.slice(0, historyPointer + 1), { ...currentPosition }]);
      setHistoryPointer(historyPointer + 1);
    }
  };
  
  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - mousePosition.x;
      const dy = e.clientY - mousePosition.y;
      setCurrentPosition(prevPosition => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy
      }));
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  //fullscreen
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };


  return (
    <div className={`Canvasbox ${isFullScreen ? 'fullscreen' : ''}`}>
    <Card className={`highlighted ${isFullScreen ? 'fullscreen-card' : ''}`}>
      <h1 style={{ textAlign: 'center' ,fontSize: '14px'}}>Canvas</h1>
      <img
        src={Demo}
        alt="Your Image"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          position: 'absolute',
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          cursor: 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        draggable="false"
      />


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
            <UndoButton onClick={undo} disabled={historyPointer <= 0 && zoomPointer <= 0} />
            <RedoButton onClick={redo} disabled={historyPointer >= positionHistory.length - 1 && zoomPointer >= zoomHistory.length - 1} />
          </div>
          <div>
            <ZoomIn onClick={handleZoomIn} disabled={imageSize >= maxImageSize} />
            <ZoomOut onClick={handleZoomOut} disabled={imageSize <= minImageSize} />
            <FullScreen onClick={handleFullScreen} />
        </div>
      </div>
    </Card>
  </div>
  );
};

export default Canvas;
