// BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import initializeBlockly from './InitializeBlockly';
import BoardsSelectionModal from './BoardsSelectionModal';

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const workspaceRef = useRef(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isBoardSelectionModalOpen, setIsBoardSelectionModalOpen] = useState(false);

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
      workspaceRef.current = initializeBlockly(toolboxXml);
      console.log('Workspace initialized:', workspaceRef.current);
      blocklyRef.current = true;
    }
  }, []);

 

  const handleBoardSelection = (board) => {
    console.log('Selected Board:', board);
    setSelectedBoard(board);
  };

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%' }}></div>
      

      {/* Render the selected board */}
      {selectedBoard && <p>Selected Board: {selectedBoard}</p>}
      
      {/* Add the BoardSelectionModal component */}
      <BoardsSelectionModal
        isOpen={isBoardSelectionModalOpen}
        onClose={() => setIsBoardSelectionModalOpen(false)}
        onSelectBoard = {handleBoardSelection}
      />
    </div>
  );
};

export default BlocklyComponent;