// Updated BlocklyComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly';

import * as en from 'blockly/msg/en'; // Import English messages
import * as fr from 'blockly/msg/fr'; // Import French messages

import { Logic } from './BlockCategories/Logic';
import { Grove } from './BlockCategories/Grove';
import { setCode } from '../features/codeSlice';
import { setLanguage } from '../features/languageSlice';

import { Variables } from './BlockCategories/Variables';
import { Events } from './BlockCategories/Events';
import { InputOutput } from './BlockCategories/InputOutput';
// import { Operators } from './BlockCategories/Operators';
// import { generateCode } from '../features/codeSlice'; // Make sure to import the correct action

import initializeBlockly from './InitializeBlockly';  // import the function
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
Blockly.JavaScript = javascriptGenerator;
// import generateCodeForBlock  from './Canvas/generateCodeForBlock ';
import { Motion } from './BlockCategories/Motion';
import { Control } from './BlockCategories/Control';
import { store } from '../store/store';
import { moveSprite } from '../features/motionSlice';
import countryFlagEmoji from "country-flag-emoji";
import { GrLanguage } from "react-icons/gr";

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
import emoji from "emoji-dictionary";


Blockly.JavaScript = javascriptGenerator;
// import generateCodeForBlock  from './Canvas/generateCodeForBlock ';

const BlocklyComponent = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  // const [language, setLanguage] = useState('en');   // state to handle language
  const language = useSelector(state => state.language);
  const workspace = Blockly.getMainWorkspace();
  const dispatch = useDispatch();
  const blocklyRef = useRef(null);
  const ukEmoji = countryFlagEmoji.get('GB');
  const franceEmoji = countryFlagEmoji.get('FR');

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
    // const jsCode = javascriptGenerator.workspaceToCode(
    //   blocklyRef.current,
    //   'JavaScript'
    // );

    // const pythonCode = pythonGenerator.workspaceToCode(
    //   blocklyRef.current,
    //   'Python'
    // );
    const jsCode = javascriptGenerator.workspaceToCode(
      blocklyRef.current,
      { blockToCode: (block) => javascriptGenerator[block.type].call(block, block) }
    );

    const pythonCode = pythonGenerator.workspaceToCode(
      blocklyRef.current,
      { blockToCode: (block) => pythonGenerator[block.type].call(block, block) }
    );

    // Set the generated codes to their respective states
    // setGeneratedCode({ js: jsCode, python: pythonCode });
    dispatch(setCode({ jsCode, pythonCode }));


    // Display both JavaScript and Python code
    console.log('JavaScript Code:', jsCode);
    console.log('Python Code:', pythonCode);
  };

  const toggleLanguage = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    updateBlocklyLocale(selectedLanguage);
  };

  const updateBlocklyLocale = (lang) => {
    const languageMap = {
      en,
      fr,
    };
    Blockly.setLocale(languageMap[lang]);
  };



  useEffect(() => {
    updateBlocklyLocale(language); // Update Blockly locale based on the initial language

    if (!blocklyRef.current) {
      // Initialize Blockly with English
      Blockly.setLocale('en');
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Variables}
          ${Events}
          ${Motion}
          ${Control}
        </xml>
      `;
      const newWorkspace = initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = newWorkspace;  // Assign the workspace to the ref
      // blocklyRef.current = true;

      // dynamic generation of code with event changes in workspace
      { blocklyRef.current.addChangeListener(generateCode) }
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
  }, [language]);


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

  // Dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (selectedLanguage) => {
    toggleDropdown(); // Close the dropdown after selecting an option
    toggleLanguage(selectedLanguage);
  };



  return (
    <div className="BlockyComp">
      <div className="highlghted-text">
      
        <h1>{language === 'en' ? 'Blockly Toolbox' : ' Boîte à outils Blockly'}</h1>
        <h1>{language === 'en' ? 'Blockly Workspace' : 'Espace de travail Blockly'}</h1>

        {/* Custom dropdown with icon */}
        {/* <div className="custom-dropdown"> */}
          {/* <label htmlFor="languageDropdown" onClick={toggleDropdown} style={{position: 'absolute',top: '81px'  ,left: '1054px'}}>
            <GrLanguage />
          </label>
          {isDropdownOpen && (
            // <div className="dropdown-options">
              <select
                id="languageDropdown"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                style={{  padding: '5px',
                          top: '77px',
                          left: '1079px',
                          marginleft: '3px',
                          position: 'absolute' }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            // </div>
          )} */}
        {/* </div> */}

        {/* Display the current language
        <span>{`Current Language: ${language.toUpperCase()}`}</span> */}
      </div>
      <div
        className="highlighted"
        id="blocklyDiv"
        style={{ height: '100%', width: '100%' }}
        onClick={handleBlockClick}  // Add the click handler directly to the blocklyDiv
      ></div>
    </div>
  );
}
export default BlocklyComponent;


