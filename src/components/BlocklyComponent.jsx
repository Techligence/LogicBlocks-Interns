// BlocklyComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { useDispatch } from 'react-redux';
import { moveSprite } from '../features/motionSlice';
import { waitSeconds } from '../features/controlSlice';
import { BoardsSelectionModal } from './BoardsSelectionModal';
import initializeBlockly from './InitializeBlockly';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import { Control } from './BlockCategories/Control';
import { Operators } from './BlockCategories/Operators';
import { Motion } from './BlockCategories/Motion';
import { Looks } from './BlockCategories/Looks';

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const workspaceRef = useRef(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isBoardSelectionModalOpen, setIsBoardSelectionModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!blocklyRef.current) {
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Control}
          ${Operators}
          ${Motion}
          ${Looks}
        </xml>
      `;

      workspaceRef.current = initializeBlockly(toolboxXml);
      blocklyRef.current = true;
    }
  }, []);

  const generateCode = () => {
    javascriptGenerator.addReservedWords('code');
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
    setGeneratedCode(code);
    try {
      eval(code);
    } catch (error) {
      console.error('Error executing generated code:', error);
    }
  };

  const handleBoardSelection = (board) => {
    console.log('Selected Board:', board);
    setSelectedBoard(board);
  };

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%', position: 'relative' }}></div>
      
      {/* Render the selected board */}
      {selectedBoard && <p>Selected Board: {selectedBoard}</p>}
      
      {/* Add the BoardSelectionModal component */}
      <BoardsSelectionModal
        isOpen={isBoardSelectionModalOpen}
        onClose={() => setIsBoardSelectionModalOpen(false)}
        onSelectBoard={handleBoardSelection}
      />
      <button onClick={generateCode}>Generate Code</button>  
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
        <br></br>{generatedCode}
      </pre>
    </div>
  );
};

export default BlocklyComponent;
