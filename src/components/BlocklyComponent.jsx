// Updated BlocklyComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import initializeBlockly from './InitializeBlockly';  // import the function
import { Motion } from './BlockCategories/Motion';
import { Control } from './BlockCategories/Control';
import { javascriptGenerator } from 'blockly/javascript';
import {store} from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {moveSteps, setX, setY, goTo, goToXY,changeX,changeY,moveSpriteToMousePointer,turnRight,turnLeft,pointInDirection, rotateSprite, glideSecsXY
} from '../features/motionSlice';

import { waitSeconds , repeatTimes} from '../features/controlSlice';
import { setCodeString} from '../features/codeSlice';
const BlocklyComponent = () => {
  const dispatch = useDispatch();
  const blocklyRef = useRef(null);
  const workspace = Blockly.getMainWorkspace();
  const {codeString} = useSelector((state) => ({
    codeString: state.code.codeString,
  }))

  const generateCode = async () => {
    javascriptGenerator.addReservedWords('code');
    const code = javascriptGenerator.workspaceToCode(workspace);
    dispatch(setCodeString(code));
    await eval(`(async () => { ${code} })();`);
  };

  const displayCodeString = () => {
    const copyString = codeString;
    // Use a regular expression to remove store.dispatch() calls for display and display inner contents
    return copyString.replace(/store\.dispatch\((.*?)\);/g, 'sprite.$1'); 
    // Use the below rather than the above to debug the code if required as it displays perfect code
    // return copyString;
  };

  useEffect(() => {
    if (blocklyRef.current === null) {
      Blockly.setLocale('en');
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Motion}
          ${Control}
        </xml>
      `;
      initializeBlockly(toolboxXml);
      blocklyRef.current = true;
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>Blockly Toolbox</h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>Blockly Workspace</h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%', position: 'relative' }}></div>
      <button onClick={generateCode}>Generate Code</button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
      {displayCodeString()}
      </pre>
    </div>
  );
};

export default BlocklyComponent;