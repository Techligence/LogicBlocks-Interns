import React, { createContext, useContext, useState } from 'react';
import BlocklyComponent from '../components/BlocklyComponent';
import Canvas from '../components/Canvas';
import AnchorMenu from '../components/AnchorMenu';
import FloatingActionButton from '../components/FloatingActionButton';
import Header from '../components/Header';
import { Box } from '@mui/material';
import {addSprite as addSpriteToStore,removeSprite as removeSpriteFromStore} from '../features/motionSlice';
import { useDispatch, useSelector } from 'react-redux';
// Context for Sprite
const SpriteContext = createContext();

export const useSprite = () => {
  const context = useContext(SpriteContext);
  if (!context) {
    throw new Error('useSprite must be used within a SpriteProvider');
  }
  return context;
};

// Context for Backdrop
const BackdropContext = createContext();

export const useBackdrop = () => {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error('useBackdrop must be used within a BackdropProvider');
  }
  return context;
};

const Home = () => {
  const dispatch = useDispatch(); 
  const [selectedBackdrop, setSelectedBackdrop] = useState(null);

  const [sprites, setSprites] = useState([]);

  const addSprite = (sprite) => {
    setSprites((prevSprites) => [...prevSprites, sprite]);
    // console.log("in home",sprite);
    dispatch(addSpriteToStore({sprite}));
  };

  const removeSprite = (index) => {
    setSprites((prevSprites) => prevSprites.filter((_, i) => i !== index));
    dispatch(removeSpriteFromStore(index));
  };

  const spriteContextValue = {
    sprites,
    addSprite,
    removeSprite,
  };

  const setBackdrop = (backdrop) => {
    setSelectedBackdrop(backdrop);
  };

  
  const backdropContextValue = {
    selectedBackdrop,
    setBackdrop,
  };

  return (
    <SpriteContext.Provider value={spriteContextValue}>
      <BackdropContext.Provider value={backdropContextValue}>
        <Box sx={{
          bgcolor: "background.default",
          color: 'text.primary'
        }}>
          <Header />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px',
            }}
          >
            <BlocklyComponent />
            <Canvas />
          </Box>
          <AnchorMenu />
          <FloatingActionButton />
        </Box>
      </BackdropContext.Provider>
    </SpriteContext.Provider>
  );
};

export default Home;
