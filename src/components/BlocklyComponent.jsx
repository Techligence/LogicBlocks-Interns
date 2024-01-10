// Updated BlocklyComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';

import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import { Variables } from './BlockCategories/Variables';
import { Events } from './BlockCategories/Events';
import initializeBlockly from './InitializeBlockly';  // import the function
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
Blockly.JavaScript = javascriptGenerator;
// import generateCodeForBlock  from './Canvas/generateCodeForBlock ';
import { Motion } from './BlockCategories/Motion';
import { Control } from './BlockCategories/Control';
import { store } from '../store/store';
import { moveSprite } from '../features/motionSlice';

import { waitSeconds } from '../features/controlSlice';
import {
  getVariable,
  clearFetchedVariable,
  setVariable,
  changeVariableBy,
  showVariable,
  hideVariable,
} from '../features/variableSlice';

import { useDispatch, useSelector } from 'react-redux';

import { triggerEvent, whenKeyPressed, whenSpriteClicked } from '../features/eventSlice';
import GenerateCodeBox from './GenerateCodeBox';


Blockly.JavaScript = javascriptGenerator;
// import generateCodeForBlock  from './Canvas/generateCodeForBlock ';

const BlocklyComponent = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const workspace = Blockly.getMainWorkspace();
  const dispatch = useDispatch();
  const blocklyRef = useRef(null);

  // const generateCode = () => {
  //   javascriptGenerator.addReservedWords('code');
  //   var code = javascriptGenerator.workspaceToCode(workspace);
  //   setGeneratedCode(code);
  //   // dispatch(setGeneratedCode(code));
  //   // eval(`(async () => { ${code} })();`);
  //   console.log(code);
  // };
  const generateCode = () => {
    javascriptGenerator.addReservedWords('code');
    var jsCode = javascriptGenerator.workspaceToCode(workspace);

    // You need to replace 'pythonGenerator' with the actual name of your Python generator instance
    var pythonCode = pythonGenerator.workspaceToCode(workspace);

    // Set the generated codes to their respective states
    setGeneratedCode({ js: jsCode, python: pythonCode });

    // Display both JavaScript and Python code
    console.log('JavaScript Code:', jsCode);
    console.log('Python Code:', pythonCode);
  };


  useEffect(() => {
    if (!blocklyRef.current) {
      // Initialize Blockly with English
      Blockly.setLocale('en');
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Variables}
          ${Events}
          ${Motion}
          ${Control}
        </xml>
      `;
      const newWorkspace = initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = newWorkspace;  // Assign the workspace to the ref
      // blocklyRef.current = true;
    }

    // Attach the click event handler to the workspace
    blocklyRef.current.addChangeListener(handleBlockClick);

    // Call generateCode after Blockly is initialized
    generateCode();

    //press_key checking
    // const handleKeyDown = (event) => {
    //   // Handle keydown event here
    //   console.log('Key pressed:', event.key);
    // };

    // window.addEventListener('keydown', handleKeyDown);

    // Clean up the event handler when the component is unmounted
    return () => {
      // window.removeEventListener('keydown', handleKeyDown);
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
      // const connectedBlocks = getAllConnectedBlocks(clickedBlock);
      // connectedBlocks.forEach((block) => {
      //   // console.log('Connected Block ID:', block.id);
      //   const generatedCode = getBlockJavaScriptCode(block);
      //   console.log(generatedCode);
      // });

      const blockType = clickedBlock?.type;
      if (blockType === 'variables_set') {
        const variableName = clickedBlock.inputList[0].fieldRow[1].getText();
        const valueInput = clickedBlock.inputList[1].fieldRow[0].getText(); // Get the value input
        const value = parseInt(valueInput) || 0; // Convert value to integer, default to 0 if not a valid number

        dispatch(setVariable({ variableName, value }));
      }
      else if (blockType === 'variables_changeby') {
        const variableName = clickedBlock.inputList[0].fieldRow[1].getText();
        const changeByInput = clickedBlock.inputList[0].fieldRow[3].getText(); // Get the changeBy input
        const changeBy = parseInt(changeByInput) || 1; // Convert changeBy to integer, default to 1 if not a valid number

        dispatch(changeVariableBy({ variableName, changeBy }));
      }
      else if (blockType === 'variables_show') {
        const variableName = clickedBlock.inputList[0].fieldRow[1].getText();
        dispatch(showVariable(variableName));
      }
      else if (blockType === 'variables_hide') {
        const variableName = clickedBlock.inputList[0].fieldRow[1].getText();
        dispatch(hideVariable(variableName));
      }

      //event 
      else if (blockType === 'event_trigger') {
        const eventName = clickedBlock.getFieldValue('EVENT_NAME');
        dispatch(triggerEvent(eventName));
      }

      // Handle key press event
      if (blockType === 'key_press_event') {
        const keyName = clickedBlock.getFieldValue('KEY_NAME');
        console.log('Key pressed:', keyName);
        dispatch(whenKeyPressed(keyName));
      }

      else if (blockType === 'sprite_clicked_event') {
        dispatch(whenSpriteClicked()); // Dispatch the sprite click action
      }
      else if (blockType === 'flag_clicked_event') {
        dispatch(whenFlagClicked()); // Dispatch the flag click action
      }
    }
  };

  const handleGenerateCode = () => {
    const code = Blockly.JavaScript.workspaceToCode(blocklyRef.current);
    dispatch(generateCode(code)); // Dispatch the code to Redux store
    console.log('Generated Code:', code);
  };

  return (
    <div className="BlockyComp">
      <div className="highlghted-text">
        <h1>Blockly Toolbox</h1>
        <h1>Blockly Workspace</h1>
        <button onClick={generateCode}>Generate Code</button>
        {/* <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
        <br></br>{generatedCode}
      </pre> */}
      </div>
      <div
        className="highlighted"
        id="blocklyDiv"
        style={{ height: '100%', width: '100%' }}
        onClick={handleBlockClick}  // Add the click handler directly to the blocklyDiv
      ></div>
      {/* <GenerateCodeBox generatedCode={generatedCode} /> */}
      <GenerateCodeBox jsCode={generatedCode.js} pythonCode={generatedCode.python} />
    </div>
  );
};

export default BlocklyComponent;