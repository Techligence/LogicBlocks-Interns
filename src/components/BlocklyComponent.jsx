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
import {moveSteps,setWorkspace, setX, setY, goTo, goToXY,changeX,changeY,moveSpriteToMousePointer,turnRight,turnLeft,pointInDirection, rotateSprite, glideSecsXY
} from '../features/motionSlice';

import { waitSeconds , repeatTimes} from '../features/controlSlice';
import { setCodeString} from '../features/codeSlice';
import InitializeBlockly from './InitializeBlockly';
const BlocklyComponent = () => {
  const dispatch = useDispatch();
  const [prevSelectedSpriteIndex, setPrevSelectedSpriteIndex] = useState(null);
  const blocklyRef = useRef(null);
  const workspace = Blockly.getMainWorkspace();
  const {sprites,codeString,selectedSpriteIndex} = useSelector((state) => ({
    codeString: state.code.codeString,
    selectedSpriteIndex: state.motion.selectedSpriteIndex,
    sprites: state.motion.sprites,
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
    if (blocklyRef.current === null) {
      Blockly.setLocale('en');
      initializeBlockly(toolboxXml);
      blocklyRef.current = true;
    }

    if (selectedSpriteIndex !== null) {
      const sprite = sprites[selectedSpriteIndex];
      if (sprite) {
        if (!sprite.workspace) {
          workspace.clear();
          const workspaceText = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
          dispatch(setWorkspace({ index: selectedSpriteIndex, workspace: workspaceText }));
        } else if (prevSelectedSpriteIndex !== selectedSpriteIndex && prevSelectedSpriteIndex !== null) {
            Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(sprite.workspace),workspace);
        }
        setPrevSelectedSpriteIndex(selectedSpriteIndex);
      }
    }
  }, [selectedSpriteIndex, sprites]);

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