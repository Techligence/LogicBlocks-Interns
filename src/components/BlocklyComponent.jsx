// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import { Looks } from './BlockCategories/Looks';
import initializeBlockly from './InitializeBlockly';
import Blockly from 'blockly';

//import the Functions and Custom Blocks
import "./BlockCategoriesFunctions/Looks";
import { javascriptGenerator } from 'blockly/javascript';

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const workspace = useRef(null);

  useEffect(() => {
    if (blocklyRef.current === null) {
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Looks}
        </xml>
      `;
      workspace.current = initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = true;
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default BlocklyComponent;
