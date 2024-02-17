// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import Blockly from 'blockly';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
// import { MyBlocks } from './BlockCategories/MyBlocks';
import initializeBlockly from './InitializeBlockly';  // import the function
import {store } from '../store/store';
import { useSelector } from 'react-redux';
const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const MyBlocks=useSelector((state)=>state.xml.xml);

  const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${MyBlocks}
        </xml>
      `;

  useEffect(() => {
    if (blocklyRef.current === null) {
      // Initialize Blockly with English
        Blockly.setLocale('en');
      // Construct the complete toolbox XML
      
      initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = true;
    }
    console.log('MyBlocks',MyBlocks)
  }, []);

  useEffect(() => {
    console.log('Updated')
    Blockly.getMainWorkspace().updateToolbox(toolboxXml);
  },[MyBlocks]);  

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%', position: 'relative' }}></div>      
    </div>
  );
};

export default BlocklyComponent;