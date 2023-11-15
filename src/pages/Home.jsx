import React from 'react';
import BlocklyComponent from '../components/BlocklyComponent';
import Canvas from '../components/Canvas';
import AnchorMenu from '../components/AnchorMenu';
import FloatingActionButton from '../components/FloatingActionButton';
import Header from '../components/Header';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{
      bgcolor: "background.default",
      color: 'text.primary'
    }}>
      <Header />
      <div style={{ textAlign: 'center' }}>
      </div>
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
  );
};

export default Home;
