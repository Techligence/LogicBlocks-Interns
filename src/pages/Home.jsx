import React, { useState } from 'react';
import BlocklyComponent from '../components/BlocklyComponent';
import Canvas from '../components/Canvas';
import AnchorMenu from '../components/AnchorMenu';
import FloatingActionButton from '../components/FloatingActionButton';
import ExtensionIcon from '@mui/icons-material/Extension';
import Extension from '../components/Canvas/Extension/Extension';

const Home = () => {
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);

  const openExtension = () => {
    setIsExtensionOpen(true);
  };

  const closeExtension = () => {
    setIsExtensionOpen(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>LogicBlocks</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <BlocklyComponent />
        <AnchorMenu />
        <FloatingActionButton />      
        <Canvas />
        <button onClick={openExtension}>
          <ExtensionIcon style={{ position: 'absolute', bottom: 20, left: 20 }} />
        </button>
        
      </div>
      {isExtensionOpen && (
        <Extension onClose={closeExtension} />
      )}
    </div>
  );
};

export default Home;