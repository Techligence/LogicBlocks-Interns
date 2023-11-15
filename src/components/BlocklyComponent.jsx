// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import initializeBlockly from './InitializeBlockly';  // import the function
import { ColorModeContext } from '../store/index';
import { useContext } from 'react';
import { darkTheme, lightTheme } from '../store/index'

const BlocklyComponent = () => {
  const blocklyRef = useRef(null);
  const colorMode = useContext(ColorModeContext);

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
      // Initialize Blockly using the separate function and set BlocklyRef to the return value
      blocklyRef.current = initializeBlockly(toolboxXml, colorMode.mode === 'dark' ? "#000000" : "#ffffff");;
    }
    else{
      //If Blockly has already been initialized, just update the theme
      blocklyRef.current.setTheme(colorMode.mode === 'dark' ? darkTheme : lightTheme);
    }
  });

  return (
     <div style={{ width: '100%', height: '480px'}}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default BlocklyComponent;
