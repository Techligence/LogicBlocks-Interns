import React from 'react';
import BlocklyComponent from '../components/BlocklyComponent';
import Canvas from '../components/Canvas';
import AnchorMenu from '../components/AnchorMenu';
import FloatingActionButton from '../components/FloatingActionButton';

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>LogicBlocks</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <BlocklyComponent />
        <Canvas/>
        <AnchorMenu />
        <FloatingActionButton />
      </div>
    </div>
  );
};

export default Home;
