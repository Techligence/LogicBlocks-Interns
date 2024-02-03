import Blockly from 'blockly';
import React, { useEffect, useState,useRef, Suspense } from 'react';
import { Card } from '@mui/material';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { store } from '../store/store';
import { useSprite, useBackdrop } from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { goToXY, setSelectedSpriteIndex, setWorkspace } from '../features/motionSlice';
import FlagButton from './Canvas/FlagButton';
import StopButton from './Canvas/StopButton';
import UndoButton from './Canvas/UndoButton';
import RedoButton from './Canvas/RedoButton';
import ZoomIn from './Canvas/ZoomIn';
import ZoomOut from './Canvas/ZoomOut';
import FullScreen from './Canvas/FullScreen';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Canvas = () => {
  const dispatch = useDispatch();
  const { removeSprite } = useSprite();
  const { selectedBackdrop } = useBackdrop();
  const { sprites: storesprites } = useSelector((state) => state.motion);
  const [selectedSprite, setSelectedSprite] = useState(null);
  const spriteRef = useRef({}); // To store refs for each sprite
  const [isStopped, setIsStopped] = useState(false);
  const workspaceRef = useRef(null);
  const [isWorkspaceStopped, setIsWorkspaceStopped] = useState(false);

  const handleStopClick = () => {
    setIsStopped(!isStopped);
    setIsWorkspaceStopped(!isWorkspaceStopped);

    // Pause or resume the execution of Blockly workspace
    if (workspaceRef.current) {
      if (isWorkspaceStopped) {
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        workspaceRef.current.traceOn(true);
      } else {
        Blockly.JavaScript.INFINITE_LOOP_TRAP = () => '';
        workspaceRef.current.traceOn(false);
      }
    }

    setSelectedSprite(null);
    dispatch(setSelectedSpriteIndex(null));
  };

 
  const saveSpriteStateToLocalStorage = () => {
    const spriteState = {};
    storesprites.forEach((sprite, index) => {
      const spriteElement = spriteRef.current[index];
      if (spriteElement) {
        spriteState[index] = {
          position: { x: spriteElement.state.x, y: spriteElement.state.y },
          size: { width: spriteElement.state.width, height: spriteElement.state.height },
        };
      }
    });

    localStorage.setItem('spriteState', JSON.stringify(spriteState));
  };

  
  const retrieveSpriteStateFromLocalStorage = () => {
    const storedSpriteState = localStorage.getItem('spriteState');
    if (storedSpriteState) {
      const spriteState = JSON.parse(storedSpriteState);
      storesprites.forEach((sprite, index) => {
        const spriteElement = spriteRef.current[index];
        const storedState = spriteState[index];
        if (spriteElement && storedState) {
          spriteElement.setState({ x: storedState.position.x, y: storedState.position.y });
          spriteElement.updateSize({ width: storedState.size.width, height: storedState.size.height });
        }
      });
    }
  };

  
  const handleSpriteClick = (index) => {
    if(index === selectedSprite) return;
    if (selectedSprite !== null) {
      // Save the current state of the main workspace to the Redux store
      const currentWorkspaceDom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
      const currentWorkspaceXml = Blockly.Xml.domToText(currentWorkspaceDom);
      dispatch(setWorkspace({ index: selectedSprite, workspace: currentWorkspaceXml }));
    }
    Blockly.getMainWorkspace().clear();
    setSelectedSprite(index);
    
    dispatch(setSelectedSpriteIndex(index));
    console.log("in canvahes",storesprites[0].sprite);

    if (!isSpriteStopped) {
      dispatch(goToXY(data.x, data.y));
      saveSpriteStateToLocalStorage();
    }
  };

  useEffect(() => {
    const handleDelete = (event) => {
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
  }, [selectedSprite, removeSprite, dispatch]);

  useEffect(() => {
    storesprites.forEach((sprite, index) => {
      if (index !== selectedSprite) return;
      const spriteElement = document.getElementById(`sprite-${index}`);
      if (spriteElement) {
        spriteElement.style.transform = `translate(${sprite.position.x}px, ${sprite.position.y}px) rotate(${sprite.angle}deg)`;
      }
    });
  }, [storesprites[selectedSprite]?.position, storesprites[selectedSprite]?.angle]);
  

  useEffect(() => {
    retrieveSpriteStateFromLocalStorage();
  }, []); 

  useEffect(() => {
    const workspace = Blockly.getMainWorkspace();

    // Add a listener for block execution
    workspace.addChangeListener((event) => {
      if (event.type === Blockly.Events.BLOCK_EXECUTED) {
        const executedBlock = workspace.getBlockById(event.blockId);

        // Check if the executed block is the one that triggers the stop action
        if (executedBlock && executedBlock.type === 'stop_block_type') {
          // Perform stop action
          // You can dispatch the stop action or perform any other logic here
          console.log('Stop action triggered');
        }
      }
    });
      return () => {
      // Remove the listener when the component is unmounted or updated
      workspace.removeChangeListener();
    };
  }, []);


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
          }}
        >
          <Suspense fallback={<div>Loading Backdrop...</div>}>
            <LazyLoadImage
              src={selectedBackdrop}
              alt="selectedBackdrop"
              width="100%"
              height="100%"
              effect="blur"
            />
          </Suspense>
        </div>

        {/* Sprite Div */}
        {storesprites.map((sprite, index) => (
          <Draggable key={index} bounds="parent" defaultPosition={sprite.position} position={sprite.position}
            onStart={() => { handleSpriteClick(index); console.log(sprite); }}
            onDrag={(e, data) => { dispatch(goToXY(data.x, data.y)) ; saveSpriteStateToLocalStorage(); }}
          >
            <Resizable
            ref={(ref) => (spriteRef.current[index] = ref)}
              id={`sprite-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'move',
                position: 'absolute',
                boxShadow: selectedSprite === index ? '0 0 0 2px #2196F3' : 'none',
              }}
              lockAspectRatio={true}
            >
              <Suspense fallback={<div>Loading Sprite...</div>}>
                <LazyLoadImage
                  src={sprite.sprite}
                  alt={`sprite-${index}`}
                  width="100%"
                  height="100%"
                  effect="blur"
                />
              </Suspense>
            </Resizable>
          </Draggable>
        ))}

      </div>

      {/* Buttons Div */}
      <div style={{
        position: 'absolute',
        bottom: 2,
        right: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <div>
          <FlagButton onClick={() => {}} />
          <StopButton onClick={handleStopClick} isStopped={isStopped} onStop={() => setIsStopped(!isStopped)} />
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