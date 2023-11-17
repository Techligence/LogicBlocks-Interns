// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import initializeBlockly from './InitializeBlockly';  // import the function

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

  return (
    // <div style={{ width: '100%', height: '480px' }}>
      /* <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px'}}>Blockly Toolbox</h1> */
      /* <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1> */

    <div className="BlockyComp">
      <div className="highlghted-text"><h1>Blockly Toolbox</h1>
      <h1>Blockly Workspace</h1></div>


      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default BlocklyComponent;
