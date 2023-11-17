import React, { useState } from 'react';
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

const Canvas = () => {
  /* zoom in zoom out section */
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel + 0.1;
    if (newZoomLevel <= 2) {
      setZoomLevel(newZoomLevel);
    }
    else {
      alert('Zoom level cannot be less than 0.5.');
    }
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel - 0.1;
    if (newZoomLevel >= 0.5) {
      setZoomLevel(newZoomLevel);
    }
    else {
      alert('Zoom level cannot exceed 2.');
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };


  // Define a function to check if the zoom level is at its limit
  const isZoomAtLimit = () => {
    const isMaxZoom = zoomLevel >= 2;
    const isMinZoom = zoomLevel <= 0.5;
    return { isMaxZoom, isMinZoom };
  };



  // const backgroundSize = `${100 / zoomLevel}%`;



  /* Undo Redo Section */
  const [positionHistory, setPositionHistory] = useState([{ x: 150, y: 100 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 150, y: 100 });
  const [historyPointer, setHistoryPointer] = useState(0);

  const handleDrag = (e, ui) => {
    // Update the current position while dragging
    // console.log('Dragging...', ui.x, ui.y);
    setCurrentPosition({ x: ui.x, y: ui.y });
  };

  const handleDragStop = () => {
    // console.log('Drag stopped. Current position:', currentPosition);
    // console.log('Position history:', positionHistory);
    setPositionHistory([...positionHistory.slice(0, historyPointer + 1), { ...currentPosition }]);
    setHistoryPointer(historyPointer + 1);
  };

  const undo = () => {
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
      setCurrentPosition(positionHistory[historyPointer - 1]);
    } else {
      // If no more undo is possible, set current position to default
      setHistoryPointer(-1);
      setCurrentPosition({ x: 150, y: 100 });
    }
  };


  const redo = () => {
    if (historyPointer < positionHistory.length - 1) {
      setHistoryPointer(historyPointer + 1);
      setCurrentPosition(positionHistory[historyPointer + 1]);
    }
  };

  /* Spirit Section */
  const [StoredImage, setStoredImage] = useState("trial_sprite_nobkg.png");

  const handleClick = (event) => {
    const buttonValue = event.target.value;
    setStoredImage(buttonValue);
    // Here, you can store 'buttonValue' in state, a context, local storage, or make an API call
    console.log("Image before clicking : " + StoredImage);
    console.log("Button value stored: " + buttonValue);
    // img = buttonValue;
    console.log("Image after clicking: " + StoredImage);
  };

  return (
    <div className={`Canvasbox ${isFullScreen ? 'fullscreen' : ''}`}>
      <Card className={`highlighted ${isFullScreen ? 'fullscreen-card' : ''}`}>
        <h1 style={{ textAlign: 'center', fontSize: '14px' }}>Canvas</h1>
        <Draggable
          bounds="parent"
          defaultPosition={{ x: 150, y: 100 }}
          position={{ x: currentPosition.x, y: currentPosition.y }}
          onDrag={handleDrag}
          onStop={handleDragStop}

        >
          <Resizable
            defaultSize={{
              width: '50%',
              height: '50%',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'move',
              transform: `scale(${zoomLevel})`,
            }}
          >
            <img
              src={StoredImage}
              alt="Canvas Image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `scale(${1 / zoomLevel})`,
                // border: isZoomAtLimit() ? '2px solid red' : 'none', // Apply red border if limit is reached
              }}
            />
          </Resizable>
        </Draggable>

        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div>
            <FlagButton onClick={() => { }} />
            <StopButton onClick={() => { }} />
            <UndoButton onClick={undo} disabled={historyPointer <= 0} />
            <RedoButton onClick={redo} disabled={historyPointer >= positionHistory.length - 1} />
          </div>
          <div>
            <ZoomIn onClick={handleZoomIn} disabled={isZoomAtLimit().isMaxZoom} />
            <ZoomOut onClick={handleZoomOut} disabled={isZoomAtLimit().isMinZoom} />
            <FullScreen onClick={handleFullScreen} />
          </div>
        </div>
      </Card>

      <Card 
        className="highlighted" 
        style={{height : "282.5px", width:"446px"}} 
        // isFullScreen={isFullScreen}
        // style={{ width: isFullScreen ? 'gray' : 'skyblue' }}

      >
        <table className = "scrolldown">
          <thead>
            <tr>
              <th>Sprite No.</th>
              <th>Sprite</th>
              <th>Image</th>
              <th>+</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Giraffe</td>
              <td><img src="trial_sprite_nobkg.png"></img></td>
              <td><button onClick={handleClick} value = 'trial_sprite_nobkg.png' >Add Giraffe</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bee</td>
              <td><img src="https://mir-s3-cdn-cf.behance.net/projects/404/f8461482324091.Y3JvcCw4MDgsNjMyLDAsMA.png"></img></td>
              <td><button onClick={handleClick} value = 'https://mir-s3-cdn-cf.behance.net/projects/404/f8461482324091.Y3JvcCw4MDgsNjMyLDAsMA.png' >Add Bee</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Robot</td>
              <td><img src='https://opengameart.org/sites/default/files/brawlbot_trans.png'></img></td>
              <td><button onClick={handleClick} value = 'https://opengameart.org/sites/default/files/brawlbot_trans.png' >Add Robot</button></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Football</td>
              <td><img src="https://cdn-icons-png.flaticon.com/512/419/419965.png"></img></td>
              <td><button onClick={handleClick} value = 'https://cdn-icons-png.flaticon.com/512/419/419965.png' >Add Football</button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Pokemon</td>
              <td><img src="https://tiermaker.com/images/chart/chart/pokemon-smile-sprites-74904/007png.png"></img></td>
              <td><button onClick={handleClick} value = 'https://tiermaker.com/images/chart/chart/pokemon-smile-sprites-74904/007png.png'>Add Pokemon</button></td>
            </tr>
          </tbody>
        </table>
      </Card>

    </div>
  );
};

export default Canvas;


