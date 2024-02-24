import React from 'react';
import BlocklyComponent from '../components/BlocklyComponent';
import Canvas from '../components/Canvas';
import AnchorMenu from '../components/AnchorMenu';
import FloatingActionButton from '../components/FloatingActionButton';
import Header from '../components/Header';
import SidePanel from '../components/SidePanel';

const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center' }}>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <BlocklyComponent />
        <Canvas />
        <SidePanel />
      </div>
      <AnchorMenu />
      <FloatingActionButton />
    </div>
  );
};

export default Home;
