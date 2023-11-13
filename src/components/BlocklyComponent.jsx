// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import Blockly from 'blockly';
import initializeBlockly from './InitializeBlockly';  
import './BlocklyComponent.css';

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  useEffect(() => {
    if (blocklyRef.current === null) {
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
        </xml>
      `;
      initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = true;
    }
  }, []);

  const handleUndo = () => {
    const workspace = Blockly.getMainWorkspace();
    if (workspace) {
      workspace.undo();
    }
  };

  const handleRedo = () => {
    const workspace = Blockly.getMainWorkspace();
    if (workspace) {
      workspace.undo(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      
      <div className="highlighted" id="blocklyDiv" style={{ height: '80%', width: '100%', position: 'relative' }}></div>

      <div className='undoredo'>
        <div className='circle-button' onClick={handleUndo}>
          <button style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <UndoRoundedIcon style={{ color: '#d4d4d4' }} />
          </button>
        </div>
        <div className='circle-button' onClick={handleRedo}>
          <button style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <RedoRoundedIcon style={{ color: '#d4d4d4' }} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default BlocklyComponent;