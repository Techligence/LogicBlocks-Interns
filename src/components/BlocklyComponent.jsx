// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import Blockly from 'blockly';

import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import { Variables } from './BlockCategories/Variables';
import { Events } from './BlockCategories/Events';
import initializeBlockly from './InitializeBlockly';  // import the function

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);

  useEffect(() => {
    if (!blocklyRef.current) {
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Variables}
          ${Events}
        </xml>
      `;
      const newWorkspace = initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = newWorkspace;  // Assign the workspace to the ref
    }
  
    // Attach the click event handler to the workspace
    blocklyRef.current.addChangeListener(handleBlockClick);
  
    // Clean up the event handler when the component is unmounted
    return () => {
      if (blocklyRef.current) {
        blocklyRef.current.removeChangeListener(handleBlockClick);
      }
    };
  }, []);
  

  const getAllConnectedBlocks = (block) => {
    const connectedBlocks = [];
  
    const populateConnectedBlocks = (currentBlock) => {
      if (currentBlock) {
        connectedBlocks.push(currentBlock);
        currentBlock.getChildren().forEach((childBlock) => {
          populateConnectedBlocks(childBlock);
        });
      }
    };
  
    populateConnectedBlocks(block);
    return connectedBlocks;
  };
  
  const handleBlockClick = (event) => {
    if (event.type === Blockly.Events.CLICK) {
      const clickedBlock = blocklyRef.current.getBlockById(event.blockId);
  
      // Include connected blocks
      const connectedBlocks = getAllConnectedBlocks(clickedBlock);
  
      // Log block IDs to the console
      connectedBlocks.forEach((block) => {
        console.log('Connected Block ID:', block.id);
      });
    }
  };
  
  

  return (
    <div className="BlockyComp">
      <div className="highlghted-text">
        <h1>Blockly Toolbox</h1>
        <h1>Blockly Workspace</h1>
      </div>
      <div
        className="highlighted"
        id="blocklyDiv"
        style={{ height: '100%', width: '100%' }}
        onClick={handleBlockClick}  // Add the click handler directly to the blocklyDiv
      ></div>
    </div>
  );
};

export default BlocklyComponent;