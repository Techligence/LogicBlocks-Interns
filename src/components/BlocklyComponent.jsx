import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';

import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import { Variables } from './BlockCategories/Variables';
import { Events } from './BlockCategories/Events';
import initializeBlockly from './InitializeBlockly';
import { useDispatch } from 'react-redux';
import { javascriptGenerator } from 'blockly/javascript';
import { generateCode } from '../features/codeSlice'; // Make sure to import the correct action

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const workspace = Blockly.getMainWorkspace();
  const dispatch = useDispatch();

  const generateCode = () => {
    javascriptGenerator.addReservedWords('code');
    const code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
    console.log(code);
  };

  useEffect(() => {
    if (!blocklyRef.current) {
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
      const newWorkspace = initializeBlockly(toolboxXml);
      blocklyRef.current = newWorkspace;
    }

    blocklyRef.current.addChangeListener(handleBlockClick);

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

  const getBlockJavaScriptCode = (block) => {
    javascriptGenerator.addReservedWords('code');
    const code = Blockly.JavaScript.blockToCode(block);
    return code.trim();
  };

  const handleBlockClick = (event) => {
    if (event.type === Blockly.Events.CLICK) {
      const clickedBlock = blocklyRef.current.getBlockById(event.blockId);
      const connectedBlocks = getAllConnectedBlocks(clickedBlock);
      connectedBlocks.forEach((block) => {
        const generatedCode = getBlockJavaScriptCode(block);
        console.log(generatedCode);
      });
    }
  };

  const handleGenerateCode = () => {
    const code = javascriptGenerator.workspaceToCode(blocklyRef.current);
    dispatch(generateCode(generatedCode)); // Fix the argument here
    console.log('Generated Code:', code);
  };

  return (
    <div className="BlockyComp">
      <div className="highlghted-text">
        <h1>Blockly Toolbox</h1>
        <h1>Blockly Workspace</h1>
        <button onClick={generateCode}>Generate Code</button>
      </div>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%' }} onClick={handleBlockClick}></div>
    </div>
  );
};

export default BlocklyComponent;
